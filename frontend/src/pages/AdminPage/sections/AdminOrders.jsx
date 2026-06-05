import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle, Btn,
  TableWrap, TableControls, SearchInput, FilterSelect,
  TableScroll, Table, Th, Td, Tr, EmptyRow, StatusBadge, Pagination, PageBtns, PageBtn,
  ModalOverlay, ModalBox, ModalHead, ModalTitle, ModalClose, ModalBody, ModalActions,
  FormGrid, FieldWrap, FieldLabel, FieldSelect, FieldTextarea, FieldInput,
  DetailBlock, DetailLabel, DetailValue,
  Notice,
} from '../Admin.styles';

const STATUS_OPTIONS = [
  { value: '', label: 'Все статусы' },
  { value: 'pending',   label: 'Ожидает' },
  { value: 'confirmed', label: 'Подтверждён' },
  { value: 'paid',      label: 'Оплачен' },
  { value: 'shipped',   label: 'Отправлен' },
  { value: 'delivered', label: 'Доставлен' },
  { value: 'cancelled', label: 'Отменён' },
];

const STATUS_LABELS = {
  pending: 'Ожидает', confirmed: 'Подтверждён', paid: 'Оплачен',
  shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён',
};

const PAYMENT_LABELS = { card: '💳 Карта', cash: '💵 Наличные' };

function formatPrice(n) { return Number(n).toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ₸'; }
function formatDate(iso) {
  return new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function formatAddr(s) {
  if (!s || !Object.keys(s).length) return '—';
  const parts = [s.city, s.street, `д.${s.house}`];
  if (s.apartment) parts.push(`кв.${s.apartment}`);
  return parts.join(', ');
}

function getItemName(item) {
  if (item.item_type === 'snake') return item.morph ? `${item.snake?.name} (${item.morph.name})` : item.snake?.name ?? '—';
  if (item.item_type === 'terrarium') return item.terrarium?.name ?? '—';
  if (item.item_type === 'food') return item.food?.name ?? '—';
  return '—';
}

const ADDR_FIELDS = [
  { key: 'country',     label: 'Страна' },
  { key: 'city',        label: 'Город' },
  { key: 'street',      label: 'Улица' },
  { key: 'house',       label: 'Дом' },
  { key: 'apartment',   label: 'Квартира' },
  { key: 'postal_code', label: 'Индекс' },
];

function OrderModal({ order, onClose, onSaved }) {
  const [status, setStatus] = useState(order.status);
  const [comment, setComment] = useState(order.comment || '');
  const [addr, setAddr] = useState({ ...order.delivery_address_snapshot });
  const [editAddr, setEditAddr] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function addrChanged() {
    const snap = order.delivery_address_snapshot;
    return ADDR_FIELDS.some(f => (addr[f.key] ?? '') !== (snap[f.key] ?? ''));
  }

  async function save(overrideStatus) {
    setSaving(true); setError('');
    try {
      const payload = { status: overrideStatus ?? status, comment };
      if (editAddr && addrChanged()) payload.delivery_address_snapshot = addr;
      const res = await api.adminUpdateOrder(order.id, payload);
      const data = await api.parse(res);
      if (res.ok) { onSaved(data); onClose(); }
      else setError(data?.detail || 'Ошибка сохранения');
    } catch { setError('Ошибка соединения'); }
    finally { setSaving(false); }
  }

  return createPortal(
    <ModalOverlay onClick={e => e.target === e.currentTarget && onClose()}>
      <ModalBox $wide>
        <ModalHead>
          <ModalTitle>Заказ #{order.id}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <FormGrid>
            <DetailBlock>
              <DetailLabel>Клиент</DetailLabel>
              <DetailValue>{order.user_email}</DetailValue>
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Дата</DetailLabel>
              <DetailValue>{formatDate(order.created_at)}</DetailValue>
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Оплата</DetailLabel>
              <DetailValue>{PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</DetailValue>
            </DetailBlock>
            {order.promo_code && (
              <DetailBlock>
                <DetailLabel>Промокод</DetailLabel>
                <DetailValue>{order.promo_code.code}</DetailValue>
              </DetailBlock>
            )}
            <DetailBlock>
              <DetailLabel>Сумма</DetailLabel>
              <DetailValue style={{ fontSize: 18, fontWeight: 900, color: '#068d27' }}>
                {formatPrice(order.total_price)}
              </DetailValue>
            </DetailBlock>
          </FormGrid>

          {/* Адрес доставки */}
          <FieldWrap>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <FieldLabel style={{ margin: 0 }}>Адрес доставки</FieldLabel>
              <Btn $sm $secondary onClick={() => setEditAddr(v => !v)}>
                {editAddr ? 'Отменить правку' : 'Изменить'}
              </Btn>
            </div>
            {editAddr ? (
              <FormGrid>
                {ADDR_FIELDS.map(({ key, label }) => (
                  <FieldWrap key={key}>
                    <FieldLabel>{label}</FieldLabel>
                    <FieldInput
                      value={addr[key] ?? ''}
                      onChange={e => setAddr(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={label}
                    />
                  </FieldWrap>
                ))}
              </FormGrid>
            ) : (
              <DetailValue style={{ paddingLeft: 0 }}>{formatAddr(addr)}</DetailValue>
            )}
          </FieldWrap>

          <div>
            <FieldLabel style={{ marginBottom: 8, display: 'block' }}>Товары</FieldLabel>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 14, fontWeight: 600 }}>
                <span>{getItemName(item)} × {item.quantity}</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(item.unit_price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <FormGrid>
            <FieldWrap>
              <FieldLabel>Статус</FieldLabel>
              <FieldSelect value={status} onChange={e => setStatus(e.target.value)}>
                {STATUS_OPTIONS.filter(o => o.value).map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </FieldSelect>
            </FieldWrap>
          </FormGrid>

          <FieldWrap>
            <FieldLabel>Комментарий</FieldLabel>
            <FieldTextarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Комментарий к заказу..." />
          </FieldWrap>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn $warning onClick={() => save('cancelled')} disabled={saving || order.status === 'cancelled'}>
              Отменить заказ
            </Btn>
            <Btn onClick={() => save()} disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const PAGE_SIZE = 15;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    params.set('page', page);
    params.set('page_size', PAGE_SIZE);
    try {
      const res = await api.adminGetOrders(`?${params}`);
      const data = await api.parse(res);
      if (res.ok) {
        setOrders(data.results ?? data);
        setCount(data.count ?? (data.results ?? data).length);
      }
    } catch {}
    setLoading(false);
  }, [search, statusFilter, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSaved(updated) {
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Заказы</SectionTitle>
      </SectionHeader>

      <TableWrap>
        <TableControls>
          <SearchInput
            placeholder="Поиск по email или ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </FilterSelect>
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Клиент</Th>
              <Th>Статус</Th>
              <Th>Оплата</Th>
              <Th>Сумма</Th>
              <Th>Дата</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={7}>Загрузка...</Td></EmptyRow>
            ) : orders.length === 0 ? (
              <EmptyRow><Td colSpan={7}>Заказов не найдено</Td></EmptyRow>
            ) : orders.map(order => (
              <Tr key={order.id}>
                <Td>#{order.id}</Td>
                <Td>{order.user_email}</Td>
                <Td><StatusBadge $status={order.status}>{STATUS_LABELS[order.status] ?? order.status}</StatusBadge></Td>
                <Td>{PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</Td>
                <Td style={{ fontWeight: 800 }}>{formatPrice(order.total_price)}</Td>
                <Td>{formatDate(order.created_at)}</Td>
                <Td><Btn $sm onClick={() => setSelected(order)}>Открыть</Btn></Td>
              </Tr>
            ))}
          </tbody>
        </Table></TableScroll>

        {totalPages > 1 && (
          <Pagination>
            <span>Всего: {count}</span>
            <PageBtns>
              <PageBtn disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <PageBtn key={p} $active={p === page} onClick={() => setPage(p)}>{p}</PageBtn>
              ))}
              <PageBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>→</PageBtn>
            </PageBtns>
          </Pagination>
        )}
      </TableWrap>

      {selected && (
        <OrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export default AdminOrders;
