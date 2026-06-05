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
  Stats, StatPill, Desc, CardFooter, PriceBlock, PriceLabel, Price, BuyButton, StatusTag,
} from '../CatalogPage/CatalogPage.styles';

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
        <RangeInput type="range" min={absMin} max={absMax} value={min} onChange={handleMinSlider} />
        <RangeInput type="range" min={absMin} max={absMax} value={max} onChange={handleMaxSlider} />
      </TrackWrap>
      <RangeInputsRow>
        <RangeNumberInput
          type="number" min={absMin} max={absMax} value={min}
          placeholder={`от ${absMin}`} onChange={handleMinInput}
        />
        <RangeSep>—</RangeSep>
        <RangeNumberInput
          type="number" min={absMin} max={absMax} value={max}
          placeholder={`до ${absMax}`} onChange={handleMaxInput}
        />
      </RangeInputsRow>
    </RangeWrap>
  );
}

const DEFAULT_FILTERS = {
  onlyAvailable: false,
  category: null,
  material: null,
  price: [PRICE_MIN, PRICE_MAX],
  volume: [VOL_MIN, VOL_MAX],
};

function TerrariumCatalogPage() {
  const [terrariums, setTerrariums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/terrariums/?page_size=100').then(r => r.json()),
      fetch('/api/v1/terrarium-categories/').then(r => r.json()),
    ]).then(([terData, catsData]) => {
      setTerrariums(terData.results ?? terData);
      setCategories(catsData.results ?? catsData);
      setLoading(false);
    });
  }, []);

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
      if (filters.category !== null && t.category?.id !== filters.category) return false;
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

  return (
    <Page>
      <PageHeader>
        <Badge>Каталог</Badge>
        <PageTitle>Террариумы</PageTitle>
        <PageSubtitle>
          Выберите идеальный дом для вашего питомца — от компактных до просторных вольеров
        </PageSubtitle>
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
            <FilterTitle>Категория</FilterTitle>
            <ChipGroup>
              <Chip $active={filters.category === null} onClick={() => set('category', null)}>
                Все
              </Chip>
              {categories.map(c => (
                <Chip key={c.id} $active={filters.category === c.id} onClick={() => set('category', c.id)}>
                  {c.name}
                </Chip>
              ))}
            </ChipGroup>
          </FilterSection>
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
          {isModified && (
            <ResetBtn onClick={reset}>Сбросить все фильтры</ResetBtn>
          )}
        </Sidebar>
        <Content>
          <Toolbar>
            <ResultCount>
              {loading
                ? 'Загрузка...'
                : <>Найдено: <strong>{result.length}</strong> {pluralTerrariums(result.length)}</>
              }
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
            {loading ? (
              <Empty><span style={{ fontSize: 40 }}>⏳</span>Загружаем каталог...</Empty>
            ) : result.length > 0 ? (
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

export default TerrariumCatalogPage;
