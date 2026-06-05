import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import {
  Page, PageHeader, Badge, PageTitle, PageSubtitle,
  Layout, ItemsList, CartItem, ItemImage, ItemBody, ItemName,
  ItemMeta, MetaPill, ItemFooter, ItemPrice, QtyControls, QtyBtn, QtyValue,
  RemoveBtn, Summary, SummaryTitle, SummaryRow, SummaryLabel, SummaryValue,
  Divider, TotalRow, TotalLabel, TotalValue, CheckoutBtn, ContinueBtn,
  EmptyState, EmptyIcon, EmptyTitle, EmptyText, EmptyBtn,
  PromoRow, PromoInput, PromoBtn, PromoNotice,
  PromoApplied, PromoAppliedInfo, PromoAppliedCode, PromoAppliedSub, PromoRemoveBtn,
} from './CartPage.styles';
import CheckoutModal from './CheckoutModal';

const SKILL_STARS = { 1: '★☆☆', 2: '★★☆', 3: '★★★' };

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function pluralPets(n) {
  if (n === 1) return 'питомец';
  if (n >= 2 && n <= 4) return 'питомца';
  return 'питомцев';
}

function getItemPrice(item) {
  if (item.item_type === 'snake') return item.snake.price + (item.morph?.price_modifier ?? 0);
  if (item.item_type === 'terrarium') return item.terrarium.price;
  if (item.item_type === 'food') return item.food.price;
  return 0;
}

function getItemName(item) {
  if (item.item_type === 'snake') return item.morph ? `${item.snake.name} (${item.morph.name})` : item.snake.name;
  if (item.item_type === 'terrarium') return item.terrarium.name;
  if (item.item_type === 'food') return item.food.name;
  return '—';
}

function getItemImage(item) {
  if (item.item_type === 'snake') return item.snake.images?.[0]?.image_url ?? null;
  if (item.item_type === 'terrarium') return item.terrarium.images?.[0]?.image_url ?? null;
  if (item.item_type === 'food') return item.food.images?.[0]?.image_url ?? null;
  return null;
}

function CartPage({ onCartChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notAuthed, setNotAuthed] = useState(false);
  const [updating, setUpdating] = useState(new Set());
  const [promo, setPromo] = useState('');
  const [promoData, setPromoData] = useState(null);
  const [promoStatus, setPromoStatus] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(null);

  const loadCart = useCallback(async () => {
    try {
      const res = await api.getCart();
      if (res.status === 401) {
        setNotAuthed(true);
        return;
      }
      const data = await api.parse(res);
      const newItems = data.items ?? [];
      setItems(newItems);
      onCartChange?.(newItems.reduce((sum, i) => sum + i.quantity, 0));
    } catch {
      setNotAuthed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCart(); }, [loadCart]);

  async function changeQty(item, delta) {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    setUpdating(prev => new Set(prev).add(item.id));
    setItems(prev => {
      const updated = prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
      onCartChange?.(updated.reduce((sum, i) => sum + i.quantity, 0));
      return updated;
    });

    try {
      await api.updateCartItem(item.id, newQty);
    } catch {
      setItems(prev => {
        const reverted = prev.map(i => i.id === item.id ? { ...i, quantity: item.quantity } : i);
        onCartChange?.(reverted.reduce((sum, i) => sum + i.quantity, 0));
        return reverted;
      });
    } finally {
      setUpdating(prev => { const s = new Set(prev); s.delete(item.id); return s; });
    }
  }

  async function remove(itemId) {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      onCartChange?.(updated.reduce((sum, i) => sum + i.quantity, 0));
      return updated;
    });
    try {
      await api.removeCartItem(itemId);
    } catch {
      loadCart();
    }
  }

  const subtotal = items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0);

  const promoInvalid = promoData && promoData.min_order_amount > 0 && subtotal < promoData.min_order_amount;
  const computedDiscount = promoData && !promoInvalid
    ? promoData.discount_type === 'percent'
      ? Math.floor(subtotal * promoData.discount_value / 100)
      : Math.min(promoData.discount_value, subtotal)
    : 0;
  const total = subtotal - computedDiscount;
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

  async function applyPromo() {
    const code = promo.trim();
    if (!code) return;
    setPromoLoading(true);
    setPromoStatus(null);
    setPromoError('');
    try {
      const res = await api.applyPromo(code, subtotal);
      const data = await api.parse(res);
      if (res.ok) {
        setPromoData(data);
        setPromoStatus('ok');
      } else {
        setPromoData(null);
        setPromoError(data?.detail || 'Промокод не найден или недействителен');
        setPromoStatus('error');
      }
    } catch {
      setPromoData(null);
      setPromoError('Ошибка при проверке промокода');
      setPromoStatus('error');
    } finally {
      setPromoLoading(false);
    }
  }

  function handleOrderSuccess(order) {
    setCheckoutOpen(false);
    setOrderDone(order);
    setItems([]);
    onCartChange?.(0);
  }

  if (orderDone) {
    return (
      <Page>
        <EmptyState>
          <EmptyIcon>🎉</EmptyIcon>
          <EmptyTitle>Заказ оформлен!</EmptyTitle>
          <EmptyText>
            Заказ №{orderDone.id} принят. Мы свяжемся с вами для подтверждения доставки.
          </EmptyText>
          <EmptyBtn href="/catalog">Продолжить покупки</EmptyBtn>
        </EmptyState>
      </Page>
    );
  }

  if (loading) {
    return (
      <Page>
        <EmptyState>
          <EmptyIcon style={{ fontSize: 48 }}>⏳</EmptyIcon>
          <EmptyTitle>Загружаем корзину...</EmptyTitle>
        </EmptyState>
      </Page>
    );
  }

  if (notAuthed) {
    return (
      <Page>
        <EmptyState>
          <EmptyIcon>🔒</EmptyIcon>
          <EmptyTitle>Войдите в аккаунт</EmptyTitle>
          <EmptyText>Чтобы видеть корзину, нужно авторизоваться</EmptyText>
          <EmptyBtn href="/login">Войти</EmptyBtn>
        </EmptyState>
      </Page>
    );
  }

  if (items.length === 0) {
    return (
      <Page>
        <EmptyState>
          <EmptyIcon>🛒</EmptyIcon>
          <EmptyTitle>Корзина пуста</EmptyTitle>
          <EmptyText>Добавьте змей из каталога — они уже ждут нового хозяина</EmptyText>
          <EmptyBtn href="/catalog">Перейти в каталог</EmptyBtn>
        </EmptyState>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader>
        <Badge>Корзина</Badge>
        <PageTitle>Ваш заказ</PageTitle>
        <PageSubtitle>{totalQty} {pluralPets(totalQty)} ждут вас</PageSubtitle>
      </PageHeader>

      <Layout>
        <ItemsList>
          {items.map(item => {
            const price = getItemPrice(item);
            const name = getItemName(item);
            const image = getItemImage(item);
            const snake = item.snake;
            const skill = snake?.difficulty?.stars;
            const busy = updating.has(item.id);

            const terrarium = item.terrarium;

            return (
              <CartItem key={item.id}>
                <ItemImage $src={image} />
                <ItemBody>
                  <ItemName>{name}</ItemName>
                  <ItemMeta>
                    {snake && (
                      <>
                        <MetaPill>📏 {snake.size_min_cm}–{snake.size_max_cm} см</MetaPill>
                        <MetaPill>🌡 {snake.temp_min_c}–{snake.temp_max_c}°C</MetaPill>
                        {skill && <MetaPill>{SKILL_STARS[skill]} {snake.difficulty.name}</MetaPill>}
                        {item.morph && <MetaPill>🎨 {item.morph.name}</MetaPill>}
                      </>
                    )}
                    {terrarium && (
                      <>
                        <MetaPill>📐 {terrarium.length_cm}×{terrarium.width_cm}×{terrarium.height_cm} см</MetaPill>
                        <MetaPill>🪨 {terrarium.material}</MetaPill>
                      </>
                    )}
                    {item.food && (
                      <>
                        <MetaPill>{item.food.is_frozen ? '❄️ Заморозка' : '🐾 Живой'}</MetaPill>
                        <MetaPill>⚖️ {item.food.weight_g} г</MetaPill>
                        <MetaPill>📏 {item.food.size}</MetaPill>
                      </>
                    )}
                  </ItemMeta>
                  <ItemFooter>
                    <ItemPrice>{formatPrice(price)}</ItemPrice>
                    <QtyControls>
                      <QtyBtn onClick={() => changeQty(item, -1)} disabled={busy || item.quantity <= 1}>−</QtyBtn>
                      <QtyValue>{item.quantity}</QtyValue>
                      <QtyBtn onClick={() => changeQty(item, 1)} disabled={busy}>+</QtyBtn>
                    </QtyControls>
                    <RemoveBtn onClick={() => remove(item.id)}>✕ Удалить</RemoveBtn>
                  </ItemFooter>
                </ItemBody>
              </CartItem>
            );
          })}
        </ItemsList>

        <Summary>
          <SummaryTitle>Итого</SummaryTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(item => (
              <SummaryRow key={item.id}>
                <SummaryLabel>
                  {getItemName(item)} × {item.quantity}
                </SummaryLabel>
                <SummaryValue>{formatPrice(getItemPrice(item) * item.quantity)}</SummaryValue>
              </SummaryRow>
            ))}
          </div>

          <Divider />

          <SummaryRow>
            <SummaryLabel>Подытог</SummaryLabel>
            <SummaryValue>{formatPrice(subtotal)}</SummaryValue>
          </SummaryRow>

          {promoData && !promoInvalid && (
            <SummaryRow>
              <SummaryLabel style={{ color: '#068D27' }}>Скидка</SummaryLabel>
              <SummaryValue style={{ color: '#068D27' }}>− {formatPrice(computedDiscount)}</SummaryValue>
            </SummaryRow>
          )}

          <Divider />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {promoData ? (
              <>
                <PromoApplied $invalid={promoInvalid}>
                  <PromoAppliedInfo>
                    <PromoAppliedCode $invalid={promoInvalid}>{promoData.code}</PromoAppliedCode>
                    <PromoAppliedSub>
                      {promoInvalid
                        ? `Минимальная сумма заказа — ${formatPrice(promoData.min_order_amount)}`
                        : `Скидка ${promoData.discount_type === 'percent'
                            ? `${promoData.discount_value}%`
                            : `−${formatPrice(promoData.discount_value)}`}`}
                    </PromoAppliedSub>
                  </PromoAppliedInfo>
                  <PromoRemoveBtn
                    onClick={() => { setPromoData(null); setPromoStatus(null); setPromo(''); setPromoError(''); }}
                    title="Убрать промокод"
                  >✕</PromoRemoveBtn>
                </PromoApplied>
                {promoInvalid && (
                  <PromoNotice $error>Промокод не применяется: сумма заказа ниже минимальной</PromoNotice>
                )}
              </>
            ) : (
              <>
                <PromoRow>
                  <PromoInput
                    type="text"
                    placeholder="Промокод"
                    value={promo}
                    onChange={e => { setPromo(e.target.value); setPromoStatus(null); setPromoError(''); }}
                    onKeyDown={e => e.key === 'Enter' && applyPromo()}
                    $error={promoStatus === 'error'}
                    disabled={promoLoading}
                  />
                  <PromoBtn onClick={applyPromo} disabled={promoLoading}>
                    {promoLoading ? '...' : 'Применить'}
                  </PromoBtn>
                </PromoRow>
                {promoStatus === 'error' && (
                  <PromoNotice $error>{promoError}</PromoNotice>
                )}
              </>
            )}
          </div>

          <Divider />

          <TotalRow>
            <TotalLabel>К оплате</TotalLabel>
            <TotalValue>{formatPrice(total)}</TotalValue>
          </TotalRow>

          <CheckoutBtn onClick={() => setCheckoutOpen(true)}>Оформить заказ</CheckoutBtn>
          <ContinueBtn href="/catalog">Продолжить покупки</ContinueBtn>
        </Summary>
      </Layout>

      {checkoutOpen && (
        <CheckoutModal
          items={items}
          subtotal={subtotal}
          promoData={promoData}
          promoInvalid={promoInvalid}
          computedDiscount={computedDiscount}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={handleOrderSuccess}
        />
      )}
    </Page>
  );
}

export default CartPage;
