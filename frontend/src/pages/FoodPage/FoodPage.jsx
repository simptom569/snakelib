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

function getFoodSlug() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

function FoodPage({ onCartChange }) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const slug = getFoodSlug();

  const loadFood = useCallback(async () => {
    try {
      const res = await fetch(`/api/v1/foods/${slug}/`);
      if (res.status === 404) { setNotFound(true); return; }
      const data = await res.json();
      setFood(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { loadFood(); }, [loadFood]);

  async function handleAddToCart() {
    setAdding(true);
    try {
      await api.addFoodCartItem(food.id, 1);
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
          <CenterIcon>🍖</CenterIcon>
          <CenterTitle>Корм не найден</CenterTitle>
          <CenterText>Возможно, он уже закончился или был удалён</CenterText>
          <BackLink href="/food">Вернуться в каталог</BackLink>
        </CenterBox>
      </Page>
    );
  }

  const available = food.quantity > 0;
  const images = food.images ?? [];
  const mainSrc = images[activeThumb]?.image_url ?? null;

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbLink href="/food">Корма</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        {food.category && (
          <>
            <BreadcrumbLink href={`/food/category/${food.category.slug}`}>
              {food.category.name}
            </BreadcrumbLink>
            <BreadcrumbSep>/</BreadcrumbSep>
          </>
        )}
        <BreadcrumbCurrent>{food.name}</BreadcrumbCurrent>
      </Breadcrumb>

      <Layout>
        <Gallery>
          <MainImage $src={mainSrc}>
            <AvailBadge $avail={available}>
              {available ? 'В наличии' : 'Нет в наличии'}
            </AvailBadge>
            {food.tag && (
              <TagBadge
                $bg={food.tag.color + '33'}
                $border={food.tag.color}
                $color={food.tag.color}
              >
                {food.tag.name}
              </TagBadge>
            )}
          </MainImage>
          {images.length > 1 && (
            <Thumbs>
              {images.map((img, i) => (
                <Thumb key={img.id} $src={img.image_url} $active={i === activeThumb}
                  onClick={() => setActiveThumb(i)} />
              ))}
            </Thumbs>
          )}
        </Gallery>

        <Info>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TopRow>
              {food.category && <CategoryLabel>{food.category.name}</CategoryLabel>}
              <SkuLabel>SKU: {food.sku}</SkuLabel>
            </TopRow>
            <ItemName>{food.name}</ItemName>
          </div>

          <StatRow>
            <StatPill>{food.is_frozen ? '❄️ Заморозка' : '🐾 Живой'}</StatPill>
            <StatPill>⚖️ {food.weight_g} г</StatPill>
            <StatPill>📏 Размер: {food.size}</StatPill>
            <StatPill>🐀 {food.animal_type}</StatPill>
          </StatRow>

          <Desc>{food.description}</Desc>

          <Divider />
          <PriceBlock>
            <PriceLeft>
              <PriceLabel>Цена за штуку</PriceLabel>
              <Price>{formatPrice(food.price)}</Price>
            </PriceLeft>
            {added ? (
              <AddedNotice>✓ Добавлено в корзину</AddedNotice>
            ) : (
              <BuyBtn disabled={!available || adding} onClick={handleAddToCart}>
                {adding ? 'Добавляем...' : available ? '🛒 В корзину' : 'Нет в наличии'}
              </BuyBtn>
            )}
          </PriceBlock>

          <Divider />
          <Section>
            <SectionTitle>Характеристики</SectionTitle>
            <CharGrid>
              <CharCard>
                <CharLabel>Тип корма</CharLabel>
                <CharValue>{food.is_frozen ? 'Замороженный' : 'Живой'}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Вид животного</CharLabel>
                <CharValue>{food.animal_type}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Вес</CharLabel>
                <CharValue>{food.weight_g} г</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Размер</CharLabel>
                <CharValue>{food.size}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>В наличии</CharLabel>
                <CharValue>{food.quantity > 0 ? `${food.quantity} шт.` : 'Нет в наличии'}</CharValue>
              </CharCard>
              <CharCard>
                <CharLabel>Артикул</CharLabel>
                <CharValue>{food.sku}</CharValue>
              </CharCard>
            </CharGrid>
          </Section>
        </Info>
      </Layout>
    </Page>
  );
}

export default FoodPage;
