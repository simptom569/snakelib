import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle, Btn,
  TableWrap, TableControls, SearchInput, FilterSelect,
  TableScroll, Table, Th, Td, Tr, EmptyRow, StatusBadge, Pagination, PageBtns, PageBtn,
  ModalOverlay, ModalBox, ModalHead, ModalTitle, ModalClose, ModalBody, ModalActions,
  FormGrid, FieldWrap, FieldLabel, FieldInput, FieldSelect, FieldTextarea, CheckLabel,
  Notice,
} from '../Admin.styles';

const emptyForm = {
  name: '', slug: '', description: '', price: '', quantity: '',
  length_cm: '', width_cm: '', height_cm: '', material: '',
  category: '', tag: '', is_active: true, sku: '',
};

function TerrariumModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState(item ? {
    name: item.name, slug: item.slug, description: item.description,
    price: String(item.price), quantity: String(item.quantity),
    length_cm: String(item.length_cm), width_cm: String(item.width_cm), height_cm: String(item.height_cm),
    material: item.material,
    category: (typeof item.category === 'object' ? item.category?.id : item.category) ?? '',
    tag: (typeof item.tag === 'object' ? item.tag?.id : item.tag) ?? '',
    is_active: item.is_active, sku: item.sku,
  } : { ...emptyForm });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/terrarium-categories/?page_size=100').then(r => r.json()),
      fetch('/api/v1/tags/?page_size=50').then(r => r.json()),
    ]).then(([cats, tgs]) => {
      setCategories(cats.results ?? cats);
      setTags(tgs.results ?? tgs);
    }).catch(() => {});
  }, []);

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      name: form.name, slug: form.slug, description: form.description,
      price: Number(form.price), quantity: Number(form.quantity),
      length_cm: Number(form.length_cm), width_cm: Number(form.width_cm), height_cm: Number(form.height_cm),
      material: form.material,
      category: form.category || null,
      tag: form.tag || null,
      is_active: form.is_active, sku: form.sku,
    };
    try {
      const res = item
        ? await api.adminUpdateTerrarium(item.id, payload)
        : await api.adminCreateTerrarium(payload);
      const data = await api.parse(res);
      if (res.ok) { onSaved(data, !item); onClose(); }
      else {
        const msg = typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Ошибка';
        setError(msg);
      }
    } catch { setError('Ошибка соединения'); }
    finally { setSaving(false); }
  }

  return createPortal(
    <ModalOverlay onClick={e => e.target === e.currentTarget && onClose()}>
      <ModalBox $wide>
        <ModalHead>
          <ModalTitle>{item ? 'Редактировать террариум' : 'Добавить террариум'}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <form onSubmit={save} id="terrarium-form">
            <FormGrid>
              <FieldWrap>
                <FieldLabel>Название</FieldLabel>
                <FieldInput name="name" value={form.name} onChange={change} placeholder="Тропический террариум" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Slug</FieldLabel>
                <FieldInput name="slug" value={form.slug} onChange={change} placeholder="tropical-terrarium" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Артикул (SKU)</FieldLabel>
                <FieldInput name="sku" value={form.sku} onChange={change} placeholder="TR-001" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Цена (₸)</FieldLabel>
                <FieldInput name="price" type="number" min="0" value={form.price} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Кол-во в наличии</FieldLabel>
                <FieldInput name="quantity" type="number" min="0" value={form.quantity} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Категория</FieldLabel>
                <FieldSelect name="category" value={form.category} onChange={change}>
                  <option value="">— Не выбрана —</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </FieldSelect>
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Тег</FieldLabel>
                <FieldSelect name="tag" value={form.tag} onChange={change}>
                  <option value="">— Нет —</option>
                  {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </FieldSelect>
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Материал</FieldLabel>
                <FieldInput name="material" value={form.material} onChange={change} placeholder="Стекло, алюминий" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Длина (см)</FieldLabel>
                <FieldInput name="length_cm" type="number" min="0" value={form.length_cm} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Ширина (см)</FieldLabel>
                <FieldInput name="width_cm" type="number" min="0" value={form.width_cm} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Высота (см)</FieldLabel>
                <FieldInput name="height_cm" type="number" min="0" value={form.height_cm} onChange={change} required />
              </FieldWrap>
              <FieldWrap style={{ justifyContent: 'flex-end' }}>
                <CheckLabel>
                  <input type="checkbox" name="is_active" checked={form.is_active} onChange={change} />
                  Отображать на сайте
                </CheckLabel>
              </FieldWrap>
              <FieldWrap className="full">
                <FieldLabel>Описание</FieldLabel>
                <FieldTextarea name="description" value={form.description} onChange={change} placeholder="Описание террариума..." required />
              </FieldWrap>
            </FormGrid>
          </form>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn type="submit" form="terrarium-form" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminTerrariums() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const PAGE_SIZE = 15;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (activeFilter !== '') params.set('is_active', activeFilter);
    params.set('page', page);
    params.set('page_size', PAGE_SIZE);
    try {
      const res = await api.adminGetTerrariums(`?${params}`);
      const data = await api.parse(res);
      if (res.ok) { setItems(data.results ?? data); setCount(data.count ?? (data.results ?? data).length); }
    } catch {}
    setLoading(false);
  }, [search, activeFilter, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSaved(it, isNew) {
    if (isNew) setItems(prev => [it, ...prev]);
    else setItems(prev => prev.map(x => x.id === it.id ? it : x));
  }

  async function handleDelete(id) {
    try {
      await api.adminDeleteTerrarium(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch { setError('Ошибка при удалении'); }
    setDeleteId(null);
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Террариумы</SectionTitle>
        <Btn onClick={() => setModal('new')}>+ Добавить террариум</Btn>
      </SectionHeader>

      {error && <Notice $error style={{ marginBottom: 16 }}>{error}</Notice>}

      <TableWrap>
        <TableControls>
          <SearchInput placeholder="Поиск по названию или SKU..." value={search} onChange={e => setSearch(e.target.value)} />
          <FilterSelect value={activeFilter} onChange={e => setActiveFilter(e.target.value)}>
            <option value="">Все</option>
            <option value="true">Активные</option>
            <option value="false">Скрытые</option>
          </FilterSelect>
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>ID</Th><Th>Название</Th><Th>SKU</Th><Th>Размер (см)</Th><Th>Цена</Th><Th>Кол-во</Th><Th>Статус</Th><Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={8}>Загрузка...</Td></EmptyRow>
            ) : items.length === 0 ? (
              <EmptyRow><Td colSpan={8}>Террариумов не найдено</Td></EmptyRow>
            ) : items.map(t => (
              <Tr key={t.id}>
                <Td>{t.id}</Td>
                <Td style={{ fontWeight: 700 }}>{t.name}</Td>
                <Td>{t.sku}</Td>
                <Td>{t.length_cm}×{t.width_cm}×{t.height_cm}</Td>
                <Td>{Number(t.price).toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ₸'}</Td>
                <Td>{t.quantity}</Td>
                <Td><StatusBadge $status={t.is_active ? 'active' : 'inactive'}>{t.is_active ? 'Активен' : 'Скрыт'}</StatusBadge></Td>
                <Td style={{ display: 'flex', gap: 6 }}>
                  <Btn $sm $secondary onClick={() => setModal(t)}>Изменить</Btn>
                  {deleteId === t.id ? (
                    <>
                      <Btn $sm $danger onClick={() => handleDelete(t.id)}>Подтвердить</Btn>
                      <Btn $sm $secondary onClick={() => setDeleteId(null)}>Отмена</Btn>
                    </>
                  ) : (
                    <Btn $sm $danger onClick={() => setDeleteId(t.id)}>Удалить</Btn>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table></TableScroll>

        {totalPages > 1 && (
          <Pagination>
            <span>Всего: {count}</span>
            <PageBtns>
              <PageBtn disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</PageBtn>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                <PageBtn key={p} $active={p === page} onClick={() => setPage(p)}>{p}</PageBtn>
              ))}
              <PageBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>→</PageBtn>
            </PageBtns>
          </Pagination>
        )}
      </TableWrap>

      {modal && (
        <TerrariumModal
          item={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export default AdminTerrariums;
