import React, { useState, useMemo, useEffect } from 'react';
import {
  Page, PageHeader, Badge, PageTitle, PageSubtitle,
  Layout, Sidebar, FilterSection, FilterTitle, ChipGroup, Chip,
  ToggleRow, ToggleLabel, ToggleTrack,
  RangeWrap, TrackWrap, TrackBg, TrackFill, RangeInput,
  RangeInputsRow, RangeNumberInput, RangeSep,
  ResetBtn, MobileFilterBtn,
  Content, Toolbar, ResultCount, SortWrap, SortSelect, SortIcon,
  Grid, Empty,
  Card, ImageWrap, AvailBadge, Body, Name,
  Stats, StatPill, SkillRow, Stars, SkillLabel, ColorRow,
  Desc, CardFooter, PriceBlock, PriceLabel, Price, BuyButton, StatusTag,
} from '../CatalogPage/CatalogPage.styles';
import {
  Breadcrumb, BreadcrumbLink, BreadcrumbSep, BreadcrumbCurrent,
} from '../SnakePage/SnakePage.styles';

const SKILLS = [
  { key: 0, label: 'Любой' },
  { key: 1, label: '★ Начинающий' },
  { key: 2, label: '★★ Средний' },
  { key: 3, label: '★★★ Эксперт' },
];
const SORT_OPTIONS = [
  { value: 'default',    label: 'По умолчанию' },
  { value: 'price_asc',  label: 'Цена: сначала дешевле' },
  { value: 'price_desc', label: 'Цена: сначала дороже' },
  { value: 'name_asc',   label: 'Название: А → Я' },
  { value: 'name_desc',  label: 'Название: Я → А' },
];
const PRICE_MIN = 0;
const PRICE_MAX = 700000;
const SIZE_MIN = 0;
const SIZE_MAX = 700;
const TEMP_MIN = 18;
const TEMP_MAX = 40;
const SKILL_STARS = { 1: '★☆☆', 2: '★★☆', 3: '★★★' };

function toPct(val, absMin, absMax) {
  return Math.round(((val - absMin) / (absMax - absMin)) * 100);
}
function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}
function pluralSnakes(n) {
  if (n === 1) return 'змея';
  if (n >= 2 && n <= 4) return 'змеи';
  return 'змей';
}
function pluralColors(n) {
  if (n === 1) return 'цвет';
  if (n >= 2 && n <= 4) return 'цвета';
  return 'цветов';
}

function getCategorySlug() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

function SnakeCard({ snake, categorySlug }) {
  const available = snake.quantity > 0;
  const skill = snake.difficulty?.stars ?? null;
  const skillLabel = snake.difficulty?.name ?? '';
  const image = snake.images?.[0]?.image_url ?? null;
  const morphsCount = snake.morphs_count > 0 ? snake.morphs_count : 1;
  const badge = snake.tag ? { label: snake.tag.name, color: snake.tag.color } : null;
  return (
    <Card as="a" href={`/catalog/${snake.slug}`} style={{ textDecoration: 'none' }}>
      <ImageWrap $src={image}>
        <AvailBadge $avail={available}>
          {available ? 'В наличии' : 'Нет в наличии'}
        </AvailBadge>
      </ImageWrap>
      <Body>
        <Name>{snake.name}</Name>
        <Stats>
          <StatPill>📏 {snake.size_min_cm}–{snake.size_max_cm} см</StatPill>
          <StatPill>🌡 {snake.temp_min_c}–{snake.temp_max_c}°C</StatPill>
        </Stats>
        {skill && (
          <SkillRow>
            <Stars $level={skill}>{SKILL_STARS[skill]}</Stars>
            <SkillLabel $level={skill}>{skillLabel}</SkillLabel>
          </SkillRow>
        )}
        <ColorRow>🎨 {morphsCount} {pluralColors(morphsCount)}</ColorRow>
        <Desc>{snake.description}</Desc>
        <CardFooter>
          <PriceBlock>
            <PriceLabel>Цена</PriceLabel>
            <Price>{formatPrice(snake.price)}</Price>
          </PriceBlock>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
            {badge && (
              <StatusTag $bg={badge.color + '33'} $border={badge.color} $color={badge.color}>
                {badge.label}
              </StatusTag>
            )}
            <BuyButton as="span" disabled={!available}>
              {available ? 'Подробнее' : 'Нет в наличии'}
            </BuyButton>
          </div>
        </CardFooter>
      </Body>
    </Card>
  );
}

function RangeFilter({ min, max, absMin, absMax, onChange }) {
  const leftPct  = toPct(min, absMin, absMax);
  const rightPct = 100 - toPct(max, absMin, absMax);
  return (
    <RangeWrap>
      <TrackWrap>
        <TrackBg />
        <TrackFill $left={leftPct} $right={rightPct} />
        <RangeInput
          type="range" min={absMin} max={absMax} value={min}
          onChange={e => { const v = Number(e.target.value); onChange([Math.min(v, max - 1), max]); }}
        />
        <RangeInput
          type="range" min={absMin} max={absMax} value={max}
          onChange={e => { const v = Number(e.target.value); onChange([min, Math.max(v, min + 1)]); }}
        />
      </TrackWrap>
      <RangeInputsRow>
        <RangeNumberInput
          type="number" min={absMin} max={absMax} value={min}
          onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) onChange([Math.max(absMin, Math.min(v, max - 1)), max]); }}
        />
        <RangeSep>—</RangeSep>
        <RangeNumberInput
          type="number" min={absMin} max={absMax} value={max}
          onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) onChange([min, Math.min(absMax, Math.max(v, min + 1))]); }}
        />
      </RangeInputsRow>
    </RangeWrap>
  );
}

const DEFAULT_FILTERS = {
  onlyAvailable: false,
  skill: 0,
  price: [PRICE_MIN, PRICE_MAX],
  size: [SIZE_MIN, SIZE_MAX],
  temp: [TEMP_MIN, TEMP_MAX],
};

function CategoryPage() {
  const categorySlug = getCategorySlug();
  const [snakes, setSnakes] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/v1/categories/?search=${categorySlug}`).then(r => r.json()),
      fetch(`/api/v1/snakes/?page_size=100`).then(r => r.json()),
    ]).then(([catsData, snakesData]) => {
      const cats = catsData.results ?? catsData;
      const cat = cats.find(c => c.slug === categorySlug);
      if (!cat) { setNotFound(true); setLoading(false); return; }
      setCategory(cat);
      const all = snakesData.results ?? snakesData;
      setSnakes(all.filter(s => s.category?.id === cat.id));
      setLoading(false);
    }).catch(() => { setNotFound(true); setLoading(false); });
  }, [categorySlug]);

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const reset = () => setFilters(DEFAULT_FILTERS);
  const isModified = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const result = useMemo(() => {
    let list = snakes.filter(s => {
      if (filters.onlyAvailable && s.quantity <= 0) return false;
      if (filters.skill !== 0 && s.difficulty?.stars !== filters.skill) return false;
      if (s.price < filters.price[0] || s.price > filters.price[1]) return false;
      if (s.size_max_cm < filters.size[0] || s.size_min_cm > filters.size[1]) return false;
      if (s.temp_max_c < filters.temp[0] || s.temp_min_c > filters.temp[1]) return false;
      return true;
    });
    switch (sort) {
      case 'price_asc':  list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price_desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'name_asc':   list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru')); break;
      case 'name_desc':  list = [...list].sort((a, b) => b.name.localeCompare(a.name, 'ru')); break;
      default: break;
    }
    return list;
  }, [snakes, filters, sort]);

  if (loading) {
    return (
      <Page>
        <Empty><span style={{ fontSize: 40 }}>⏳</span>Загружаем категорию...</Empty>
      </Page>
    );
  }

  if (notFound) {
    return (
      <Page>
        <Empty>
          <span style={{ fontSize: 40 }}>🐍</span>
          Категория не найдена
        </Empty>
      </Page>
    );
  }

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbCurrent>{category.name}</BreadcrumbCurrent>
      </Breadcrumb>

      <PageHeader>
        <Badge>Категория</Badge>
        <PageTitle>{category.name}</PageTitle>
        {category.description && (
          <PageSubtitle>{category.description}</PageSubtitle>
        )}
      </PageHeader>

      <Layout>
        <MobileFilterBtn onClick={() => setSidebarOpen(v => !v)}>
          {sidebarOpen ? '✕ Скрыть фильтры' : '⚙ Фильтры'}
          {isModified && ' •'}
        </MobileFilterBtn>
        <Sidebar $open={sidebarOpen}>
          <FilterSection>
            <ToggleRow onClick={() => set('onlyAvailable', !filters.onlyAvailable)}>
              <ToggleLabel>Только в наличии</ToggleLabel>
              <ToggleTrack $on={filters.onlyAvailable} />
            </ToggleRow>
          </FilterSection>
          <FilterSection>
            <FilterTitle>Уровень сложности</FilterTitle>
            <ChipGroup>
              {SKILLS.map(s => (
                <Chip key={s.key} $active={filters.skill === s.key} onClick={() => set('skill', s.key)}>
                  {s.label}
                </Chip>
              ))}
            </ChipGroup>
          </FilterSection>
          <FilterSection>
            <FilterTitle>Цена, ₸</FilterTitle>
            <RangeFilter
              min={filters.price[0]} max={filters.price[1]}
              absMin={PRICE_MIN} absMax={PRICE_MAX}
              onChange={v => set('price', v)}
            />
          </FilterSection>
          <FilterSection>
            <FilterTitle>Размер, см</FilterTitle>
            <RangeFilter
              min={filters.size[0]} max={filters.size[1]}
              absMin={SIZE_MIN} absMax={SIZE_MAX}
              onChange={v => set('size', v)}
            />
          </FilterSection>
          <FilterSection>
            <FilterTitle>Температура, °C</FilterTitle>
            <RangeFilter
              min={filters.temp[0]} max={filters.temp[1]}
              absMin={TEMP_MIN} absMax={TEMP_MAX}
              onChange={v => set('temp', v)}
            />
          </FilterSection>
          {isModified && <ResetBtn onClick={reset}>Сбросить все фильтры</ResetBtn>}
        </Sidebar>

        <Content>
          <Toolbar>
            <ResultCount>
              Найдено: <strong>{result.length}</strong> {pluralSnakes(result.length)}
            </ResultCount>
            <SortWrap>
              <SortSelect value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </SortSelect>
              <SortIcon>▼</SortIcon>
            </SortWrap>
          </Toolbar>
          <Grid>
            {result.length > 0 ? (
              result.map(snake => <SnakeCard key={snake.id} snake={snake} categorySlug={categorySlug} />)
            ) : (
              <Empty>
                <span style={{ fontSize: 40 }}>🔍</span>
                Ничего не найдено — попробуйте изменить фильтры
              </Empty>
            )}
          </Grid>
        </Content>
      </Layout>
    </Page>
  );
}

export default CategoryPage;
