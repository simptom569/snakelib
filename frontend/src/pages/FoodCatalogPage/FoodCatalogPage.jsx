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

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const PRICE_MIN = 0;
const PRICE_MAX = 5000;

function toPct(val, absMin, absMax) {
  return Math.round(((val - absMin) / (absMax - absMin)) * 100);
}

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function pluralFood(n) {
  if (n === 1) return 'позиция';
  if (n >= 2 && n <= 4) return 'позиции';
  return 'позиций';
}

function FoodCard({ food }) {
  const available = food.quantity > 0;
  const image = food.images?.[0]?.image_url ?? null;
  const badge = food.tag ? { label: food.tag.name, color: food.tag.color } : null;
  return (
    <Card as="a" href={`/food/${food.slug}`} style={{ textDecoration: 'none' }}>
      <ImageWrap $src={image}>
        <AvailBadge $avail={available}>
          {available ? 'В наличии' : 'Нет в наличии'}
        </AvailBadge>
      </ImageWrap>
      <Body>
        <Name>{food.name}</Name>
        <Stats>
          <StatPill>{food.is_frozen ? '❄️ Заморозка' : '🐾 Живой'}</StatPill>
          <StatPill>⚖️ {food.weight_g} г</StatPill>
          <StatPill>📏 {food.size}</StatPill>
        </Stats>
        <Desc>{food.description}</Desc>
        <CardFooter>
          <PriceBlock>
            <PriceLabel>Цена</PriceLabel>
            <Price>{formatPrice(food.price)}</Price>
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
        <RangeInput type="range" min={absMin} max={absMax} value={min}
          onChange={e => { const v = Number(e.target.value); onChange([Math.min(v, max - 1), max]); }} />
        <RangeInput type="range" min={absMin} max={absMax} value={max}
          onChange={e => { const v = Number(e.target.value); onChange([min, Math.max(v, min + 1)]); }} />
      </TrackWrap>
      <RangeInputsRow>
        <RangeNumberInput type="number" min={absMin} max={absMax} value={min}
          onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) onChange([Math.max(absMin, Math.min(v, max - 1)), max]); }} />
        <RangeSep>—</RangeSep>
        <RangeNumberInput type="number" min={absMin} max={absMax} value={max}
          onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) onChange([min, Math.min(absMax, Math.max(v, min + 1))]); }} />
      </RangeInputsRow>
    </RangeWrap>
  );
}

const DEFAULT_FILTERS = {
  onlyAvailable: false,
  category: null,
  frozen: null,
  size: null,
  price: [PRICE_MIN, PRICE_MAX],
};

function FoodCatalogPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/foods/?page_size=100').then(r => r.json()),
      fetch('/api/v1/food-categories/').then(r => r.json()),
    ]).then(([foodData, catsData]) => {
      setFoods(foodData.results ?? foodData);
      setCategories(catsData.results ?? catsData);
      setLoading(false);
    });
  }, []);

  const set = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const reset = () => setFilters(DEFAULT_FILTERS);
  const isModified = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const result = useMemo(() => {
    let list = foods.filter(f => {
      if (filters.onlyAvailable && f.quantity <= 0) return false;
      if (filters.category !== null && f.category?.id !== filters.category) return false;
      if (filters.frozen !== null && f.is_frozen !== filters.frozen) return false;
      if (filters.size !== null && f.size !== filters.size) return false;
      if (f.price < filters.price[0] || f.price > filters.price[1]) return false;
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
  }, [foods, filters, sort]);

  return (
    <Page>
      <PageHeader>
        <Badge>Каталог</Badge>
        <PageTitle>Корма</PageTitle>
        <PageSubtitle>
          Правильное питание для здоровья вашего питомца — замороженные и живые корма
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
              <Chip $active={filters.category === null} onClick={() => set('category', null)}>Все</Chip>
              {categories.map(c => (
                <Chip key={c.id} $active={filters.category === c.id} onClick={() => set('category', c.id)}>
                  {c.name}
                </Chip>
              ))}
            </ChipGroup>
          </FilterSection>
          <FilterSection>
            <FilterTitle>Тип корма</FilterTitle>
            <ChipGroup>
              <Chip $active={filters.frozen === null} onClick={() => set('frozen', null)}>Все</Chip>
              <Chip $active={filters.frozen === true} onClick={() => set('frozen', true)}>❄️ Заморозка</Chip>
              <Chip $active={filters.frozen === false} onClick={() => set('frozen', false)}>🐾 Живой</Chip>
            </ChipGroup>
          </FilterSection>
          <FilterSection>
            <FilterTitle>Размер</FilterTitle>
            <ChipGroup>
              <Chip $active={filters.size === null} onClick={() => set('size', null)}>Все</Chip>
              {SIZES.map(s => (
                <Chip key={s} $active={filters.size === s} onClick={() => set('size', s)}>{s}</Chip>
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
          {isModified && <ResetBtn onClick={reset}>Сбросить все фильтры</ResetBtn>}
        </Sidebar>
        <Content>
          <Toolbar>
            <ResultCount>
              {loading ? 'Загрузка...' : <>Найдено: <strong>{result.length}</strong> {pluralFood(result.length)}</>}
            </ResultCount>
            <SortWrap>
              <SortSelect value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </SortSelect>
              <SortIcon>▼</SortIcon>
            </SortWrap>
          </Toolbar>
          <Grid>
            {loading ? (
              <Empty><span style={{ fontSize: 40 }}>⏳</span>Загружаем каталог...</Empty>
            ) : result.length > 0 ? (
              result.map(f => <FoodCard key={f.id} food={f} />)
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

export default FoodCatalogPage;
