import React, { useState, useMemo, useEffect } from 'react';
import {
  Page, PageHeader, Badge, PageTitle, PageSubtitle,
  Layout, Sidebar, FilterSection, FilterTitle,
  ToggleRow, ToggleLabel, ToggleTrack,
  RangeWrap, TrackWrap, TrackBg, TrackFill, RangeInput,
  RangeInputsRow, RangeNumberInput, RangeSep,
  ChipGroup, Chip,
  ResetBtn, MobileFilterBtn,
  Content, Toolbar, ResultCount, SortWrap, SortSelect, SortIcon,
  Grid, Empty,
  Card, ImageWrap, AvailBadge, Body, Name,
  Stats, StatPill,
  Desc, CardFooter, PriceBlock, PriceLabel, Price, BuyButton, StatusTag,
} from '../CatalogPage/CatalogPage.styles';
import {
  Breadcrumb, BreadcrumbLink, BreadcrumbSep, BreadcrumbCurrent,
} from '../SnakePage/SnakePage.styles';

const SORT_OPTIONS = [
  { value: 'default',    label: 'По умолчанию' },
  { value: 'price_asc',  label: 'Цена: сначала дешевле' },
  { value: 'price_desc', label: 'Цена: сначала дороже' },
  { value: 'name_asc',   label: 'Название: А → Я' },
  { value: 'name_desc',  label: 'Название: Я → А' },
];

const PRICE_MIN = 0;
const PRICE_MAX = 500000;
const VOL_MIN = 0;
const VOL_MAX = 1000;

function volume(t) {
  return Math.round((t.length_cm * t.width_cm * t.height_cm) / 1000);
}

function toPct(val, absMin, absMax) {
  return Math.round(((val - absMin) / (absMax - absMin)) * 100);
}

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function pluralTerrariums(n) {
  if (n === 1) return 'террариум';
  if (n >= 2 && n <= 4) return 'террариума';
  return 'террариумов';
}

function getCategorySlug() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

function TerrariumCard({ terrarium }) {
  const available = terrarium.quantity > 0;
  const image = terrarium.images?.[0]?.image_url ?? null;
  const badge = terrarium.tag ? { label: terrarium.tag.name, color: terrarium.tag.color } : null;
  const vol = volume(terrarium);
  return (
    <Card as="a" href={`/terrariums/${terrarium.slug}`} style={{ textDecoration: 'none' }}>
      <ImageWrap $src={image}>
        <AvailBadge $avail={available}>
          {available ? 'В наличии' : 'Нет в наличии'}
        </AvailBadge>
      </ImageWrap>
      <Body>
        <Name>{terrarium.name}</Name>
        <Stats>
          <StatPill>📐 {terrarium.length_cm}×{terrarium.width_cm}×{terrarium.height_cm} см</StatPill>
          <StatPill>💧 {vol} л</StatPill>
          <StatPill>🪨 {terrarium.material}</StatPill>
        </Stats>
        <Desc>{terrarium.description}</Desc>
        <CardFooter>
          <PriceBlock>
            <PriceLabel>Цена</PriceLabel>
            <Price>{formatPrice(terrarium.price)}</Price>
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
  material: null,
  price: [PRICE_MIN, PRICE_MAX],
  volume: [VOL_MIN, VOL_MAX],
};

function TerrariumCategoryPage() {
  const categorySlug = getCategorySlug();
  const [terrariums, setTerrariums] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/v1/terrarium-categories/?search=${categorySlug}`).then(r => r.json()),
      fetch(`/api/v1/terrariums/?page_size=100`).then(r => r.json()),
    ]).then(([catsData, terData]) => {
      const cats = catsData.results ?? catsData;
      const cat = cats.find(c => c.slug === categorySlug);
      if (!cat) { setNotFound(true); setLoading(false); return; }
      setCategory(cat);
      const all = terData.results ?? terData;
      setTerrariums(all.filter(t => t.category?.id === cat.id));
      setLoading(false);
    }).catch(() => { setNotFound(true); setLoading(false); });
  }, [categorySlug]);

  const materials = useMemo(() => {
    const seen = new Set();
    terrariums.forEach(t => { if (t.material) seen.add(t.material); });
    return [...seen].sort((a, b) => a.localeCompare(b, 'ru'));
  }, [terrariums]);

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const reset = () => setFilters(DEFAULT_FILTERS);
  const isModified = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const result = useMemo(() => {
    let list = terrariums.filter(t => {
      if (filters.onlyAvailable && t.quantity <= 0) return false;
      if (filters.material !== null && t.material !== filters.material) return false;
      if (t.price < filters.price[0] || t.price > filters.price[1]) return false;
      const vol = volume(t);
      if (vol < filters.volume[0] || vol > filters.volume[1]) return false;
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
  }, [terrariums, filters, sort]);

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
          <span style={{ fontSize: 40 }}>🪴</span>
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
        <BreadcrumbLink href="/terrariums">Террариумы</BreadcrumbLink>
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
          {materials.length > 1 && (
            <FilterSection>
              <FilterTitle>Материал</FilterTitle>
              <ChipGroup>
                <Chip $active={filters.material === null} onClick={() => set('material', null)}>
                  Все
                </Chip>
                {materials.map(m => (
                  <Chip key={m} $active={filters.material === m} onClick={() => set('material', m)}>
                    {m}
                  </Chip>
                ))}
              </ChipGroup>
            </FilterSection>
          )}
          <FilterSection>
            <FilterTitle>Цена, ₸</FilterTitle>
            <RangeFilter
              min={filters.price[0]} max={filters.price[1]}
              absMin={PRICE_MIN} absMax={PRICE_MAX}
              onChange={v => set('price', v)}
            />
          </FilterSection>
          <FilterSection>
            <FilterTitle>Объём, л</FilterTitle>
            <RangeFilter
              min={filters.volume[0]} max={filters.volume[1]}
              absMin={VOL_MIN} absMax={VOL_MAX}
              onChange={v => set('volume', v)}
            />
          </FilterSection>
          {isModified && <ResetBtn onClick={reset}>Сбросить все фильтры</ResetBtn>}
        </Sidebar>

        <Content>
          <Toolbar>
            <ResultCount>
              Найдено: <strong>{result.length}</strong> {pluralTerrariums(result.length)}
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
              result.map(t => <TerrariumCard key={t.id} terrarium={t} />)
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

export default TerrariumCategoryPage;
