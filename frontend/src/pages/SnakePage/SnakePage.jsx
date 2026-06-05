import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import {
  Page, Breadcrumb, BreadcrumbLink, BreadcrumbSep, BreadcrumbCurrent,
  Layout, Gallery, MainImage, AvailBadge, TagBadge, Thumbs, Thumb,
  Info, TopRow, CategoryLabel, SkuLabel, SnakeName,
  StatRow, StatPill, SkillPill, Desc,
  Section, SectionTitle, MorphGrid, MorphChip, MorphDot, MorphDesc,
  PriceBlock, PriceLeft, PriceLabel, Price, PriceModNote, BuyBtn,
  CharGrid, CharCard, CharLabel, CharValue,
  Divider, CenterBox, CenterIcon, CenterTitle, CenterText, BackLink,
  AddedNotice,
} from './SnakePage.styles';

const SKILL_STARS = { 1: '★☆☆', 2: '★★☆', 3: '★★★' };

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function getSnakeSlug() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

function getImagesForMorph(allImages, morphId) {
  const morphImages = allImages.filter(img => img.morph === morphId);
  if (morphImages.length > 0) return morphImages;
  return allImages.filter(img => img.morph === null);
}

function SnakePage({ onCartChange }) {
  const [snake, setSnake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedMorph, setSelectedMorph] = useState('pending');
  const [activeThumb, setActiveThumb] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const slug = getSnakeSlug();

  const loadSnake = useCallback(async () => {
    try {
      const res = await api.get(`/snakes/${slug}/`);
      if (res.status === 404) { setNotFound(true); return; }
      const data = await api.parse(res);
      setSnake(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { loadSnake(); }, [loadSnake]);

  useEffect(() => {
    if (!snake) return;
    const morphs = snake.morphs ?? [];
    setSelectedMorph(morphs.length > 0 ? morphs[0] : null);
  }, [snake]);

  function selectMorph(morph) {
    setSelectedMorph(morph);
    setActiveThumb(0);
    setAdded(false);
  }

  async function handleAddToCart() {
    setAdding(true);
    try {
      await api.addCartItem(snake.id, selectedMorph?.id ?? null, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
      onCartChange?.(prev => prev + 1);
    } catch {
      // пользователь не авторизован — редиректим на логин
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
          <CenterIcon>🐍</CenterIcon>
          <CenterTitle>Змея не найдена</CenterTitle>
          <CenterText>Возможно, она уже нашла хозяина или была удалена</CenterText>
          <BackLink href="/catalog">Вернуться в каталог</BackLink>
        </CenterBox>
      </Page>
    );
  }

  if (selectedMorph === 'pending') return null;

  const available = snake.quantity > 0;
  const images = snake.images ?? [];
  const morphs = snake.morphs ?? [];
  const char = snake.characteristic ?? null;
  const skill = snake.difficulty?.stars ?? null;

  const displayImages = selectedMorph
    ? getImagesForMorph(images, selectedMorph.id)
    : images.filter(img => img.morph === null).length > 0
      ? images.filter(img => img.morph === null)
      : images;

  const mainSrc = displayImages[activeThumb]?.image_url ?? null;

  const basePrice = snake.price;
  const morphMod = selectedMorph?.price_modifier ?? 0;
  const finalPrice = basePrice + morphMod;

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        {snake.category && (
          <>
            <BreadcrumbLink href={`/catalog/category/${snake.category.slug}`}>
              {snake.category.name}
            </BreadcrumbLink>
            <BreadcrumbSep>/</BreadcrumbSep>
          </>
        )}
        <BreadcrumbCurrent>{snake.name}</BreadcrumbCurrent>
      </Breadcrumb>

      <Layout>
        {/* ── Галерея ── */}
        <Gallery>
          <MainImage $src={mainSrc}>
            <AvailBadge $avail={available}>
              {available ? 'В наличии' : 'Нет в наличии'}
            </AvailBadge>
            {snake.tag && (
              <TagBadge
                $bg={snake.tag.color + '33'}
                $border={snake.tag.color}
                $color={snake.tag.color}
              >
                {snake.tag.name}
              </TagBadge>
            )}
          </MainImage>

          {displayImages.length > 1 && (
            <Thumbs>
              {displayImages.map((img, i) => (
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
              {snake.category && <CategoryLabel>{snake.category.name}</CategoryLabel>}
              <SkuLabel>SKU: {snake.sku}</SkuLabel>
            </TopRow>
            <SnakeName>{snake.name}</SnakeName>
          </div>

          <StatRow>
            <StatPill>📏 {snake.size_min_cm}–{snake.size_max_cm} см</StatPill>
            <StatPill>🌡 {snake.temp_min_c}–{snake.temp_max_c}°C</StatPill>
            {char && (
              <>
                <StatPill>💧 {char.humidity_min}–{char.humidity_max}%</StatPill>
                <StatPill>⏳ до {char.lifespan_years} лет</StatPill>
              </>
            )}
            {skill && (
              <SkillPill $level={skill}>
                {SKILL_STARS[skill]} {snake.difficulty.name}
              </SkillPill>
            )}
          </StatRow>

          <Desc>{snake.description}</Desc>

          {/* ── Морфы ── */}
          {morphs.length > 0 && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Морф / окраска — {morphs.length} вариантов</SectionTitle>
                <MorphGrid>
                  {morphs.map(m => (
                    <MorphChip
                      key={m.id}
                      $active={selectedMorph?.id === m.id}
                      $disabled={m.quantity <= 0}
                      disabled={m.quantity <= 0}
                      onClick={() => selectMorph(m)}
                    >
                      <MorphDot $color={m.color} />
                      {m.name}
                      {m.quantity <= 0 && ' — нет'}
                    </MorphChip>
                  ))}
                </MorphGrid>
                {selectedMorph && selectedMorph.description && (
                  <MorphDesc>{selectedMorph.description}</MorphDesc>
                )}
              </Section>
            </>
          )}

          {/* ── Цена и кнопка ── */}
          <Divider />
          <PriceBlock>
            <PriceLeft>
              <PriceLabel>Цена</PriceLabel>
              <Price>{formatPrice(finalPrice)}</Price>
              {morphMod !== 0 && (
                <PriceModNote $positive={morphMod > 0}>
                  {morphMod > 0 ? '+' : ''}{formatPrice(morphMod)} за морф
                </PriceModNote>
              )}
            </PriceLeft>
            {added ? (
              <AddedNotice>✓ Добавлено в корзину</AddedNotice>
            ) : (
              <BuyBtn
                disabled={!available || adding}
                onClick={handleAddToCart}
              >
                {adding ? 'Добавляем...' : available ? '🛒 В корзину' : 'Нет в наличии'}
              </BuyBtn>
            )}
          </PriceBlock>

          {/* ── Характеристики ── */}
          {char && (
            <>
              <Divider />
              <Section>
                <SectionTitle>Характеристики</SectionTitle>
                <CharGrid>
                  <CharCard>
                    <CharLabel>Размер</CharLabel>
                    <CharValue>{snake.size_min_cm}–{snake.size_max_cm} см</CharValue>
                  </CharCard>
                  <CharCard>
                    <CharLabel>Температура</CharLabel>
                    <CharValue>{snake.temp_min_c}–{snake.temp_max_c}°C</CharValue>
                  </CharCard>
                  <CharCard>
                    <CharLabel>Влажность</CharLabel>
                    <CharValue>{char.humidity_min}–{char.humidity_max}%</CharValue>
                  </CharCard>
                  <CharCard>
                    <CharLabel>Продолжительность жизни</CharLabel>
                    <CharValue>до {char.lifespan_years} лет</CharValue>
                  </CharCard>
                  <CharCard>
                    <CharLabel>Питание</CharLabel>
                    <CharValue>{char.feeding_type}</CharValue>
                  </CharCard>
                  <CharCard>
                    <CharLabel>Происхождение</CharLabel>
                    <CharValue>{char.origin_country}</CharValue>
                  </CharCard>
                </CharGrid>
              </Section>
            </>
          )}
        </Info>
      </Layout>
    </Page>
  );
}

export default SnakePage;
