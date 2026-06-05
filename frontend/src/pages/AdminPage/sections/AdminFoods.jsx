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

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL'];

const emptyForm = {
  name: '', slug: '', description: '', price: '', quantity: '',
  weight_g: '', animal_type: '', size: 'M', is_frozen: true,
  category: '', tag: '', is_active: true, sku: '',
};

function FoodModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState(item ? {
    name: item.name, slug: item.slug, description: item.description,
    price: String(item.price), quantity: String(item.quantity),
    weight_g: String(item.weight_g), animal_type: item.animal_type,
    size: item.size, is_frozen: item.is_frozen,
    category: item.category?.id ?? '',
    tag: item.tag?.id ?? '',
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
      fetch('/api/v1/food-categories/?page_size=100').then(r => r.json()),
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
      weight_g: Number(form.weight_g), animal_type: form.animal_type,
      size: form.size, is_frozen: form.is_frozen,
      category: form.category || null,
      tag: form.tag || null,
      is_active: form.is_active, sku: form.sku,
    };
    try {
      const res = item
        ? await api.adminUpdateFood(item.id, payload)
        : await api.adminCreateFood(payload);
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
          <ModalTitle>{item ? 'Редактировать корм' : 'Добавить корм'}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <form onSubmit={save} id="food-form">
            <FormGrid>
              <FieldWrap>
                <FieldLabel>Название</FieldLabel>
                <FieldInput name="name" value={form.name} onChange={change} placeholder="Мышь белая замороженная" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Slug</FieldLabel>
                <FieldInput name="slug" value={form.slug} onChange={change} placeholder="white-mouse-frozen" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Артикул (SKU)</FieldLabel>
                <FieldInput name="sku" value={form.sku} onChange={change} placeholder="FD-001" required />
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
                <FieldLabel>Вес (г)</FieldLabel>
                <FieldInput name="weight_g" type="number" min="1" value={form.weight_g} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Тип животного</FieldLabel>
                <FieldInput name="animal_type" value={form.animal_type} onChange={change} placeholder="мышь, крыса, саранча..." required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Размер</FieldLabel>
                <FieldSelect name="size" value={form.size} onChange={change}>
                  {SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </FieldSelect>
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
              <FieldWrap style={{ justifyContent: 'flex-end' }}>
                <CheckLabel>
                  <input type="checkbox" name="is_frozen" checked={form.is_frozen} onChange={change} />
                  Замороженный
                </CheckLabel>
              </FieldWrap>
              <FieldWrap style={{ justifyContent: 'flex-end' }}>
                <CheckLabel>
                  <input type="checkbox" name="is_active" checked={form.is_active} onChange={change} />
                  Отображать на сайте
                </CheckLabel>
              </FieldWrap>
              <FieldWrap className="full">
                <FieldLabel>Описание</FieldLabel>
                <FieldTextarea name="description" value={form.description} onChange={change} placeholder="Описание корма..." required />
              </FieldWrap>
            </FormGrid>
          </form>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn type="submit" form="food-form" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminFoods() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [frozenFilter, setFrozenFilter] = useState('');
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
    if (frozenFilter !== '') params.set('is_frozen', frozenFilter);
    params.set('page', page);
    params.set('page_size', PAGE_SIZE);
    try {
      const res = await api.adminGetFoods(`?${params}`);
      const data = await api.parse(res);
      if (res.ok) { setItems(data.results ?? data); setCount(data.count ?? (data.results ?? data).length); }
    } catch {}
    setLoading(false);
  }, [search, activeFilter, frozenFilter, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, activeFilter, frozenFilter]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSaved(it, isNew) {
    if (isNew) setItems(prev => [it, ...prev]);
    else setItems(prev => prev.map(x => x.id === it.id ? it : x));
  }

  async function handleDelete(id) {
    try {
      await api.adminDeleteFood(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch { setError('Ошибка при удалении'); }
    setDeleteId(null);
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Корма</SectionTitle>
        <Btn onClick={() => setModal('new')}>+ Добавить корм</Btn>
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
          <FilterSelect value={frozenFilter} onChange={e => setFrozenFilter(e.target.value)}>
            <option value="">Все типы</option>
            <option value="true">Заморозка</option>
            <option value="false">Живые</option>
          </FilterSelect>
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>ID</Th><Th>Название</Th><Th>SKU</Th><Th>Тип</Th><Th>Размер</Th><Th>Цена</Th><Th>Кол-во</Th><Th>Статус</Th><Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={9}>Загрузка...</Td></EmptyRow>
            ) : items.length === 0 ? (
              <EmptyRow><Td colSpan={9}>Кормов не найдено</Td></EmptyRow>
            ) : items.map(f => (
              <Tr key={f.id}>
                <Td>{f.id}</Td>
                <Td style={{ fontWeight: 700 }}>{f.name}</Td>
                <Td>{f.sku}</Td>
                <Td>{f.is_frozen ? '❄️' : '🐾'} {f.animal_type}</Td>
                <Td>{f.size}</Td>
                <Td>{Number(f.price).toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ₸'}</Td>
                <Td>{f.quantity}</Td>
                <Td><StatusBadge $status={f.is_active ? 'active' : 'inactive'}>{f.is_active ? 'Активен' : 'Скрыт'}</StatusBadge></Td>
                <Td style={{ display: 'flex', gap: 6 }}>
                  <Btn $sm $secondary onClick={() => setModal(f)}>Изменить</Btn>
                  {deleteId === f.id ? (
                    <>
                      <Btn $sm $danger onClick={() => handleDelete(f.id)}>Подтвердить</Btn>
                      <Btn $sm $secondary onClick={() => setDeleteId(null)}>Отмена</Btn>
                    </>
                  ) : (
                    <Btn $sm $danger onClick={() => setDeleteId(f.id)}>Удалить</Btn>
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
        <FoodModal
          item={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export default AdminFoods;
