import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import {
  Page, Breadcrumb, BreadcrumbLink, BreadcrumbSep, BreadcrumbCurrent,
  Layout, Gallery, MainImage, AvailBadge, TagBadge, Thumbs, Thumb,
  Info, TopRow, CategoryLabel, SkuLabel, SnakeName as ItemName,
  StatRow, StatPill, Desc,
  PriceBlock, PriceLeft, PriceLabel, Price, BuyBtn,
  CharGrid, CharCard, CharLabel, CharValue,
  Divider, Section, SectionTitle,
  CenterBox, CenterIcon, CenterTitle, CenterText, BackLink,
  AddedNotice,
} from '../SnakePage/SnakePage.styles';

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function volume(t) {
  return Math.round((t.length_cm * t.width_cm * t.height_cm) / 1000);
}

function getTerrariumSlug() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

function TerrariumPage({ onCartChange }) {
  const [terrarium, setTerrarium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const slug = getTerrariumSlug();

  const loadTerrarium = useCallback(async () => {
    try {
      const res = await fetch(`/api/v1/terrariums/${slug}/`);
      if (res.status === 404) { setNotFound(true); return; }
      const data = await res.json();
      setTerrarium(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { loadTerrarium(); }, [loadTerrarium]);

  async function handleAddToCart() {
    setAdding(true);
    try {
      await api.addTerrariumCartItem(terrarium.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
      onCartChange?.(prev => prev + 1);
    } catch {
      window.location.href = '/login';
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return (
      <Page>
        <CenterBox>
          <CenterIcon>⏳</CenterIcon>
          <CenterTitle>Загружаем...</CenterTitle>
        </CenterBox>
      </Page>
    );
  }

  if (notFound) {
    return (
      <Page>
        <CenterBox>
          <CenterIcon>🪴</CenterIcon>
          <CenterTitle>Террариум не найден</CenterTitle>
          <CenterText>Возможно, он уже продан или был удалён</CenterText>
          <BackLink href="/terrariums">Вернуться в каталог</BackLink>
        </CenterBox>
      </Page>
    );
  }

  const available = terrarium.quantity > 0;
  const images = terrarium.images ?? [];
  const vol = volume(terrarium);
  const mainSrc = images[activeThumb]?.image_url ?? null;

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbLink href="/terrariums">Террариумы</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        {terrarium.category && (
          <>
            <BreadcrumbLink href={`/terrariums/category/${terrarium.category.slug}`}>
              {terrarium.category.name}
            </BreadcrumbLink>
            <BreadcrumbSep>/</BreadcrumbSep>
          </>
        )}
        <BreadcrumbCurrent>{terrarium.name}</BreadcrumbCurrent>
      </Breadcrumb>

      <Layout>
        {/* ── Галерея ── */}
        <Gallery>
          <MainImage $src={mainSrc}>
            <AvailBadge $avail={available}>
              {available ? 'В наличии' : 'Нет в наличии'}
            </AvailBadge>
            {terrarium.tag && (
              <TagBadge
                $bg={terrarium.tag.color + '33'}
                $border={terrarium.tag.color}
                $color={terrarium.tag.color}
              >
                {terrarium.tag.name}
              </TagBadge>
            )}
          </MainImage>

          {images.length > 1 && (
            <Thumbs>
              {images.map((img, i) => (
                <Thumb
                  key={img.id}
                  $src={img.image_url}
                  $active={i === activeThumb}
                  onClick={() => setActiveThumb(i)}
                />
              ))}
            </Thumbs>
          )}
        </Gallery>

        {/* ── Информация ── */}
        <Info>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TopRow>
              {terrarium.category && (
                <CategoryLabel>{terrarium.category.name}</CategoryLabel>
              )}
              <SkuLabel>SKU: {terrarium.sku}</SkuLabel>
            </TopRow>
            <ItemName>{terrarium.name}</ItemName>
          </div>

          <StatRow>
            <StatPill>📐 {terrarium.length_cm}×{terrarium.width_cm}×{terrarium.height_cm} см</StatPill>
            <StatPill>💧 {vol} л</StatPill>
            <StatPill>🪨 {terrarium.material}</StatPill>
          </StatRow>

          <Desc>{terrarium.description}</Desc>

          {/* ── Цена и кнопка ── */}
          <Divider />
          <PriceBlock>
            <PriceLeft>
              <PriceLabel>Цена</PriceLabel>
              <Price>{formatPrice(terrarium.price)}</Price>
            </PriceLeft>
            {added ? (
              <AddedNotice>✓ Добавлено в корзину</AddedNotice>
            ) : (
              <BuyBtn disabled={!available || adding} onClick={handleAddToCart}>
                {adding ? 'Добавляем...' : available ? '🛒 В корзину' : 'Нет в наличии'}
              </BuyBtn>
            )}
          </PriceBlock>

          {/* ── Характеристики ── */}
          <Divider />
          <Section>
            <SectionTitle>Характеристики</SectionTitle>
            <CharGrid>
              <CharCard>
                <CharLabel>Размеры (Д×Ш×В)</CharLabel>
                <CharValue>{terrarium.length_cm}×{terrarium.width_cm}×{terrarium.height_cm} см</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Объём</CharLabel>
                <CharValue>~{vol} л</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Материал</CharLabel>
                <CharValue>{terrarium.material}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Категория</CharLabel>
                <CharValue>{terrarium.category?.name ?? '—'}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>В наличии</CharLabel>
                <CharValue>{terrarium.quantity > 0 ? `${terrarium.quantity} шт.` : 'Нет в наличии'}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Артикул</CharLabel>
                <CharValue>{terrarium.sku}</CharValue>
              </CharCard>
            </CharGrid>
          </Section>
        </Info>
      </Layout>
    </Page>
  );
}

export default TerrariumPage;
