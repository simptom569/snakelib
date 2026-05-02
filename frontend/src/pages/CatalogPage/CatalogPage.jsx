import React, { useState, useMemo } from 'react';
import { SNAKES } from './snakes';
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
} from './CatalogPage.styles';

/* ─── constants ──────────────────────────────────────────── */

const CATEGORIES = ['Все', 'Ужовые', 'Питоны', 'Удавы'];
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
const PRICE_MAX = 150000;
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

/* ─── SnakeCard ──────────────────────────────────────────── */

function SnakeCard({ snake }) {
  const { image, available, name, lengthMin, lengthMax, tempMin, tempMax,
          colors, skill, skillLabel, description, price, badge } = snake;
  return (
    <Card>
      <ImageWrap $src={image}>
        <AvailBadge $avail={available}>
          {available ? 'В наличии' : 'Нет в наличии'}
        </AvailBadge>
      </ImageWrap>
      <Body>
        <Name>{name}</Name>
        <Stats>
          <StatPill>📏 {lengthMin}–{lengthMax} см</StatPill>
          <StatPill>🌡 {tempMin}–{tempMax}°C</StatPill>
        </Stats>
        <SkillRow>
          <Stars>{SKILL_STARS[skill]}</Stars>
          <SkillLabel $level={skill}>{skillLabel}</SkillLabel>
        </SkillRow>
        <ColorRow>🎨 {colors} {colors === 1 ? 'цвет' : colors < 5 ? 'цвета' : 'цветов'}</ColorRow>
        <Desc>{description}</Desc>
        <CardFooter>
          <PriceBlock>
            <PriceLabel>Цена</PriceLabel>
            <Price>{formatPrice(price)}</Price>
          </PriceBlock>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
            {badge && (
              <StatusTag $bg={badge.bg} $border={badge.border} $color={badge.color}>
                {badge.label}
              </StatusTag>
            )}
            <BuyButton disabled={!available}>
              {available ? 'Купить' : 'Сообщить'}
            </BuyButton>
          </div>
        </CardFooter>
      </Body>
    </Card>
  );
}

/* ─── RangeFilter ────────────────────────────────────────── */

function RangeFilter({ min, max, absMin, absMax, unit, onChange }) {
  const leftPct  = toPct(min, absMin, absMax);
  const rightPct = 100 - toPct(max, absMin, absMax);

  function handleMinSlider(e) {
    const v = Number(e.target.value);
    onChange([Math.min(v, max - 1), max]);
  }
  function handleMaxSlider(e) {
    const v = Number(e.target.value);
    onChange([min, Math.max(v, min + 1)]);
  }
  function handleMinInput(e) {
    const v = Number(e.target.value);
    if (isNaN(v)) return;
    onChange([Math.max(absMin, Math.min(v, max - 1)), max]);
  }
  function handleMaxInput(e) {
    const v = Number(e.target.value);
    if (isNaN(v)) return;
    onChange([min, Math.min(absMax, Math.max(v, min + 1))]);
  }

  return (
    <RangeWrap>
      <TrackWrap>
        <TrackBg />
        <TrackFill $left={leftPct} $right={rightPct} />
        <RangeInput
          type="range"
          min={absMin} max={absMax}
          value={min}
          onChange={handleMinSlider}
        />
        <RangeInput
          type="range"
          min={absMin} max={absMax}
          value={max}
          onChange={handleMaxSlider}
        />
      </TrackWrap>
      <RangeInputsRow>
        <RangeNumberInput
          type="number"
          min={absMin} max={absMax}
          value={min}
          placeholder={`от ${absMin}`}
          onChange={handleMinInput}
        />
        <RangeSep>—</RangeSep>
        <RangeNumberInput
          type="number"
          min={absMin} max={absMax}
          value={max}
          placeholder={`до ${absMax}`}
          onChange={handleMaxInput}
        />
      </RangeInputsRow>
    </RangeWrap>
  );
}

/* ─── CatalogPage ────────────────────────────────────────── */

const DEFAULT_FILTERS = {
  onlyAvailable: false,
  category: 'Все',
  skill: 0,
  price: [PRICE_MIN, PRICE_MAX],
  size: [SIZE_MIN, SIZE_MAX],
  temp: [TEMP_MIN, TEMP_MAX],
};

function CatalogPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const reset = () => setFilters(DEFAULT_FILTERS);

  const isModified = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const result = useMemo(() => {
    let list = SNAKES.filter(s => {
      if (filters.onlyAvailable && !s.available) return false;
      if (filters.skill !== 0 && s.skill !== filters.skill) return false;
      if (s.price < filters.price[0] || s.price > filters.price[1]) return false;
      if (s.lengthMax < filters.size[0] || s.lengthMin > filters.size[1]) return false;
      if (s.tempMax < filters.temp[0] || s.tempMin > filters.temp[1]) return false;
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
  }, [filters, sort]);

  return (
    <Page>
      <PageHeader>
        <Badge>Каталог</Badge>
        <PageTitle>Все змеи</PageTitle>
        <PageSubtitle>
          Выберите своего питомца — от спокойных полозов до редких экзотических видов
        </PageSubtitle>
      </PageHeader>

      <Layout>
        {/* ── Sidebar ── */}
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
            <FilterTitle>Категория</FilterTitle>
            <ChipGroup>
              {CATEGORIES.map(c => (
                <Chip key={c} $active={filters.category === c} onClick={() => set('category', c)}>
                  {c}
                </Chip>
              ))}
            </ChipGroup>
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
              unit=" ₸"
              onChange={v => set('price', v)}
            />
          </FilterSection>

          <FilterSection>
            <FilterTitle>Размер, см</FilterTitle>
            <RangeFilter
              min={filters.size[0]} max={filters.size[1]}
              absMin={SIZE_MIN} absMax={SIZE_MAX}
              unit=" см"
              onChange={v => set('size', v)}
            />
          </FilterSection>

          <FilterSection>
            <FilterTitle>Температура, °C</FilterTitle>
            <RangeFilter
              min={filters.temp[0]} max={filters.temp[1]}
              absMin={TEMP_MIN} absMax={TEMP_MAX}
              unit="°"
              onChange={v => set('temp', v)}
            />
          </FilterSection>

          {isModified && (
            <ResetBtn onClick={reset}>Сбросить все фильтры</ResetBtn>
          )}
        </Sidebar>

        {/* ── Content ── */}
        <Content>
          <Toolbar>
            <ResultCount>
              Найдено: <strong>{result.length}</strong>{' '}
              {result.length === 1 ? 'змея' : result.length < 5 ? 'змеи' : 'змей'}
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
              result.map(snake => <SnakeCard key={snake.id} snake={snake} />)
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

export default CatalogPage;
