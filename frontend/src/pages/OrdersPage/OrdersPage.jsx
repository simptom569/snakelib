import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import {
  Wrapper, Inner, PageTitle, PageSub,
  OrderCard, OrderHeader, OrderHeaderLeft, OrderHeaderRight,
  OrderNumber, OrderDate, StatusBadge, ChevronIcon,
  OrderBody, SectionTitle, ItemsList, OrderItem, ItemImage, ItemInfo, ItemName, ItemMeta, ItemPrice,
  InfoGrid, InfoBlock, InfoLabel, InfoValue,
  TotalRow, TotalLabel, TotalValue, Divider,
  EmptyState, EmptyIcon, EmptyTitle, EmptyText, EmptyBtn,
  Notice,
} from './OrdersPage.styles';

const STATUS_LABELS = {
  pending:   'Ожидает подтверждения',
  confirmed: 'Подтверждён',
  paid:      'Оплачен',
  shipped:   'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const PAYMENT_LABELS = {
  card: '💳 Банковская карта (терминал)',
  cash: '💵 Наличные',
};

function formatPrice(n) {
  return Number(n).toLocaleString('ru-RU') + ' ₸';
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function getItemName(item) {
  if (item.item_type === 'snake') return item.morph ? `${item.snake.name} (${item.morph.name})` : item.snake?.name ?? '—';
  if (item.item_type === 'terrarium') return item.terrarium?.name ?? '—';
  if (item.item_type === 'food') return item.food?.name ?? '—';
  return '—';
}

function getItemImage(item) {
  if (item.item_type === 'snake') return item.snake?.images?.[0]?.image_url ?? null;
  if (item.item_type === 'terrarium') return item.terrarium?.images?.[0]?.image_url ?? null;
  if (item.item_type === 'food') return item.food?.images?.[0]?.image_url ?? null;
  return null;
}

function getItemMeta(item) {
  if (item.item_type === 'snake') {
    const s = item.snake;
    if (!s) return null;
    return `${s.size_min_cm}–${s.size_max_cm} см · ${s.temp_min_c}–${s.temp_max_c}°C`;
  }
  if (item.item_type === 'terrarium') {
    const t = item.terrarium;
    if (!t) return null;
    return `${t.length_cm}×${t.width_cm}×${t.height_cm} см · ${t.material}`;
  }
  if (item.item_type === 'food') {
    const f = item.food;
    if (!f) return null;
    return `${f.weight_g} г · ${f.size} · ${f.is_frozen ? 'Заморозка' : 'Живой'}`;
  }
  return null;
}

function formatAddress(snapshot) {
  if (!snapshot || !Object.keys(snapshot).length) return '—';
  const parts = [snapshot.city, snapshot.street, `д. ${snapshot.house}`];
  if (snapshot.apartment) parts.push(`кв. ${snapshot.apartment}`);
  return `${parts.join(', ')}, ${snapshot.postal_code}, ${snapshot.country}`;
}

function OrderCardItem({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <OrderCard>
      <OrderHeader onClick={() => setOpen(v => !v)}>
        <OrderHeaderLeft>
          <OrderNumber>Заказ #{order.id}</OrderNumber>
          <OrderDate>{formatDate(order.created_at)}</OrderDate>
        </OrderHeaderLeft>
        <OrderHeaderRight>
          <StatusBadge $status={order.status}>
            {STATUS_LABELS[order.status] ?? order.status}
          </StatusBadge>
          <ChevronIcon $open={open}>▼</ChevronIcon>
        </OrderHeaderRight>
      </OrderHeader>

      {open && (
        <OrderBody>
          <div>
            <SectionTitle>Товары</SectionTitle>
            <ItemsList>
              {order.items.map((item, idx) => (
                <OrderItem key={idx}>
                  <ItemImage $src={getItemImage(item)} />
                  <ItemInfo>
                    <ItemName>{getItemName(item)}</ItemName>
                    {getItemMeta(item) && <ItemMeta>{getItemMeta(item)}</ItemMeta>}
                    <ItemMeta>Кол-во: {item.quantity}</ItemMeta>
                  </ItemInfo>
                  <ItemPrice>{formatPrice(item.unit_price * item.quantity)}</ItemPrice>
                </OrderItem>
              ))}
            </ItemsList>
          </div>

          <Divider />

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Адрес доставки</InfoLabel>
              <InfoValue>{formatAddress(order.delivery_address_snapshot)}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Способ оплаты</InfoLabel>
              <InfoValue>{PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</InfoValue>
            </InfoBlock>
            {order.promo_code && (
              <InfoBlock>
                <InfoLabel>Промокод</InfoLabel>
                <InfoValue>{order.promo_code.code}</InfoValue>
              </InfoBlock>
            )}
            {order.comment && (
              <InfoBlock>
                <InfoLabel>Комментарий</InfoLabel>
                <InfoValue>{order.comment}</InfoValue>
              </InfoBlock>
            )}
          </InfoGrid>

          <TotalRow>
            <TotalLabel>Итого</TotalLabel>
            <TotalValue>{formatPrice(order.total_price)}</TotalValue>
          </TotalRow>
        </OrderBody>
      )}
    </OrderCard>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notAuthed, setNotAuthed] = useState(false);
  const [error, setError] = useState('');

  const loadOrders = useCallback(async () => {
    try {
      const res = await api.getOrders();
      if (res.status === 401) { setNotAuthed(true); return; }
      const data = await api.parse(res);
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : (data?.results ?? []));
      } else {
        setError('Не удалось загрузить заказы');
      }
    } catch {
      setError('Нет связи с сервером');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  if (loading) {
    return (
      <Wrapper>
        <Inner>
          <EmptyState>
            <EmptyIcon>⏳</EmptyIcon>
            <EmptyTitle>Загружаем заказы...</EmptyTitle>
          </EmptyState>
        </Inner>
      </Wrapper>
    );
  }

  if (notAuthed) {
    return (
      <Wrapper>
        <Inner>
          <EmptyState>
            <EmptyIcon>🔒</EmptyIcon>
            <EmptyTitle>Войдите в аккаунт</EmptyTitle>
            <EmptyText>Чтобы видеть заказы, нужно авторизоваться</EmptyText>
            <EmptyBtn href="/login">Войти</EmptyBtn>
          </EmptyState>
        </Inner>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Inner>
        <PageTitle>Мои заказы</PageTitle>
        <PageSub>История ваших заказов в SnakeLab</PageSub>

        {error && <Notice $error style={{ marginBottom: 24 }}>{error}</Notice>}

        {orders.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>Заказов пока нет</EmptyTitle>
            <EmptyText>Оформите первый заказ — ваш питомец уже ждёт!</EmptyText>
            <EmptyBtn href="/catalog">Перейти в каталог</EmptyBtn>
          </EmptyState>
        ) : (
          orders.map(order => (
            <OrderCardItem key={order.id} order={order} />
          ))
        )}
      </Inner>
    </Wrapper>
  );
}

export default OrdersPage;
