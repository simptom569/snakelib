import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle, Btn,
  TableWrap, TableControls, SearchInput,
  TableScroll, Table, Th, Td, Tr, EmptyRow, StatusBadge,
  ModalOverlay, ModalBox, ModalHead, ModalTitle, ModalClose, ModalBody, ModalActions,
  FormGrid, FieldWrap, FieldLabel, FieldInput, FieldSelect, CheckLabel,
  Notice,
} from '../Admin.styles';

const emptyForm = {
  code: '', discount_type: 'percent', discount_value: '', min_order_amount: '0',
  max_uses: '', is_active: true, valid_from: '', valid_until: '',
};

function toDatetimeLocal(iso) {
  if (!iso) return '';
  return iso.slice(0, 16);
}

function PromoModal({ promo, onClose, onSaved }) {
  const [form, setForm] = useState(promo ? {
    code: promo.code,
    discount_type: promo.discount_type,
    discount_value: String(promo.discount_value),
    min_order_amount: String(promo.min_order_amount),
    max_uses: promo.max_uses != null ? String(promo.max_uses) : '',
    is_active: promo.is_active,
    valid_from: toDatetimeLocal(promo.valid_from),
    valid_until: toDatetimeLocal(promo.valid_until),
  } : { ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      code: form.code.trim().toUpperCase(),
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_amount: Number(form.min_order_amount) || 0,
      max_uses: form.max_uses !== '' ? Number(form.max_uses) : null,
      is_active: form.is_active,
      valid_from: form.valid_from ? new Date(form.valid_from).toISOString() : null,
      valid_until: form.valid_until ? new Date(form.valid_until).toISOString() : null,
    };
    try {
      const res = promo
        ? await api.adminUpdatePromo(promo.id, payload)
        : await api.adminCreatePromo(payload);
      const data = await api.parse(res);
      if (res.ok) { onSaved(data, !promo); onClose(); }
      else {
        const msg = typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Ошибка';
        setError(msg);
      }
    } catch { setError('Ошибка соединения'); }
    finally { setSaving(false); }
  }

  return createPortal(
    <ModalOverlay onClick={e => e.target === e.currentTarget && onClose()}>
      <ModalBox>
        <ModalHead>
          <ModalTitle>{promo ? 'Редактировать промокод' : 'Новый промокод'}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <form onSubmit={save} id="promo-form">
            <FormGrid>
              <FieldWrap>
                <FieldLabel>Код</FieldLabel>
                <FieldInput name="code" value={form.code} onChange={change} placeholder="SUMMER20" required style={{ textTransform: 'uppercase' }} />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Тип скидки</FieldLabel>
                <FieldSelect name="discount_type" value={form.discount_type} onChange={change}>
                  <option value="percent">Процент (%)</option>
                  <option value="fixed">Фиксированная сумма (₸)</option>
                </FieldSelect>
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Размер скидки</FieldLabel>
                <FieldInput name="discount_value" type="number" min="1" value={form.discount_value} onChange={change} placeholder={form.discount_type === 'percent' ? '20' : '500'} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Мин. сумма заказа (₸)</FieldLabel>
                <FieldInput name="min_order_amount" type="number" min="0" value={form.min_order_amount} onChange={change} placeholder="0" />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Макс. использований (пусто = ∞)</FieldLabel>
                <FieldInput name="max_uses" type="number" min="1" value={form.max_uses} onChange={change} placeholder="∞" />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Начало действия</FieldLabel>
                <FieldInput name="valid_from" type="datetime-local" value={form.valid_from} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Конец действия (пусто = бессрочно)</FieldLabel>
                <FieldInput name="valid_until" type="datetime-local" value={form.valid_until} onChange={change} />
              </FieldWrap>
              <FieldWrap style={{ justifyContent: 'flex-end', paddingBottom: 4 }}>
                <CheckLabel>
                  <input type="checkbox" name="is_active" checked={form.is_active} onChange={change} />
                  Активен
                </CheckLabel>
              </FieldWrap>
            </FormGrid>
          </form>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn type="submit" form="promo-form" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminPromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = search ? `?search=${search}` : '';
      const res = await api.adminGetPromos(params);
      const data = await api.parse(res);
      if (res.ok) setPromos(data.results ?? data);
    } catch {}
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);

  function handleSaved(item, isNew) {
    if (isNew) setPromos(prev => [item, ...prev]);
    else setPromos(prev => prev.map(p => p.id === item.id ? item : p));
  }

  async function handleDelete(id) {
    try {
      await api.adminDeletePromo(id);
      setPromos(prev => prev.filter(p => p.id !== id));
    } catch { setError('Ошибка при удалении'); }
    setDeleteId(null);
  }

  function formatDate(iso) {
    if (!iso) return '∞';
    return new Date(iso).toLocaleDateString('ru-RU');
  }

  function getPromoStatus(p) {
    if (!p.is_active) return { status: 'inactive', label: 'Отключён' };
    if (p.valid_until && new Date(p.valid_until) < new Date()) return { status: 'cancelled', label: 'Просрочен' };
    if (new Date(p.valid_from) > new Date()) return { status: 'pending', label: 'Не начался' };
    return { status: 'active', label: 'Активен' };
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Промокоды</SectionTitle>
        <Btn onClick={() => setModal('new')}>+ Новый промокод</Btn>
      </SectionHeader>

      {error && <Notice $error style={{ marginBottom: 16 }}>{error}</Notice>}

      <TableWrap>
        <TableControls>
          <SearchInput placeholder="Поиск по коду..." value={search} onChange={e => setSearch(e.target.value)} />
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>Код</Th>
              <Th>Скидка</Th>
              <Th>Мин. сумма</Th>
              <Th>Использований</Th>
              <Th>Действует до</Th>
              <Th>Статус</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={7}>Загрузка...</Td></EmptyRow>
            ) : promos.length === 0 ? (
              <EmptyRow><Td colSpan={7}>Промокодов нет</Td></EmptyRow>
            ) : promos.map(p => (
              <Tr key={p.id}>
                <Td style={{ fontWeight: 800, letterSpacing: '0.04em' }}>{p.code}</Td>
                <Td>{p.discount_type === 'percent' ? `${p.discount_value}%` : `${p.discount_value} ₸`}</Td>
                <Td>{p.min_order_amount ? `${p.min_order_amount} ₸` : '—'}</Td>
                <Td>{p.used_count}{p.max_uses ? ` / ${p.max_uses}` : ''}</Td>
                <Td>{formatDate(p.valid_until)}</Td>
                <Td><StatusBadge $status={getPromoStatus(p).status}>{getPromoStatus(p).label}</StatusBadge></Td>
                <Td style={{ display: 'flex', gap: 6 }}>
                  <Btn $sm $secondary onClick={() => setModal(p)}>Изменить</Btn>
                  {deleteId === p.id ? (
                    <>
                      <Btn $sm $danger onClick={() => handleDelete(p.id)}>Подтвердить</Btn>
                      <Btn $sm $secondary onClick={() => setDeleteId(null)}>Отмена</Btn>
                    </>
                  ) : (
                    <Btn $sm $danger onClick={() => setDeleteId(p.id)}>Удалить</Btn>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table></TableScroll>
      </TableWrap>

      {modal && (
        <PromoModal
          promo={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export default AdminPromos;
