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
  size_min_cm: '', size_max_cm: '', temp_min_c: '', temp_max_c: '',
  category: '', difficulty_level: '', tag: '', is_active: true, sku: '',
};

function SnakeModal({ snake, onClose, onSaved }) {
  const [form, setForm] = useState(snake ? {
    name: snake.name, slug: snake.slug, description: snake.description,
    price: String(snake.price), quantity: String(snake.quantity),
    size_min_cm: String(snake.size_min_cm), size_max_cm: String(snake.size_max_cm),
    temp_min_c: String(snake.temp_min_c), temp_max_c: String(snake.temp_max_c),
    category: snake.category?.id ?? '',
    difficulty_level: snake.difficulty_level ?? '',
    tag: snake.tag?.id ?? '',
    is_active: snake.is_active, sku: snake.sku,
  } : { ...emptyForm });
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
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
      fetch('/api/v1/categories/?page_size=100').then(r => r.json()),
      fetch('/api/v1/difficulty-levels/?page_size=20').then(r => r.json()),
      fetch('/api/v1/tags/?page_size=50').then(r => r.json()),
    ]).then(([cats, diffs, tgs]) => {
      setCategories(cats.results ?? cats);
      setDifficulties(diffs.results ?? diffs);
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
      size_min_cm: Number(form.size_min_cm), size_max_cm: Number(form.size_max_cm),
      temp_min_c: Number(form.temp_min_c), temp_max_c: Number(form.temp_max_c),
      category: form.category || null,
      difficulty_level: form.difficulty_level || null,
      tag: form.tag || null,
      is_active: form.is_active, sku: form.sku,
    };
    try {
      const res = snake
        ? await api.adminUpdateSnake(snake.id, payload)
        : await api.adminCreateSnake(payload);
      const data = await api.parse(res);
      if (res.ok) { onSaved(data, !snake); onClose(); }
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
          <ModalTitle>{snake ? 'Редактировать змею' : 'Добавить змею'}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <form onSubmit={save} id="snake-form">
            <FormGrid>
              <FieldWrap>
                <FieldLabel>Название</FieldLabel>
                <FieldInput name="name" value={form.name} onChange={change} placeholder="Королевский питон" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Slug</FieldLabel>
                <FieldInput name="slug" value={form.slug} onChange={change} placeholder="royal-python" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Артикул (SKU)</FieldLabel>
                <FieldInput name="sku" value={form.sku} onChange={change} placeholder="SN-001" required />
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
                <FieldLabel>Уровень сложности</FieldLabel>
                <FieldSelect name="difficulty_level" value={form.difficulty_level} onChange={change}>
                  <option value="">— Не выбран —</option>
                  {difficulties.map(d => <option key={d.id} value={d.id}>{d.name} ({d.stars}★)</option>)}
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
                <FieldLabel>Размер мин. (см)</FieldLabel>
                <FieldInput name="size_min_cm" type="number" min="0" value={form.size_min_cm} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Размер макс. (см)</FieldLabel>
                <FieldInput name="size_max_cm" type="number" min="0" value={form.size_max_cm} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Темп. мин. (°C)</FieldLabel>
                <FieldInput name="temp_min_c" type="number" value={form.temp_min_c} onChange={change} required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Темп. макс. (°C)</FieldLabel>
                <FieldInput name="temp_max_c" type="number" value={form.temp_max_c} onChange={change} required />
              </FieldWrap>
              <FieldWrap className="full">
                <FieldLabel>Описание</FieldLabel>
                <FieldTextarea name="description" value={form.description} onChange={change} placeholder="Описание змеи..." required />
              </FieldWrap>
              <FieldWrap style={{ justifyContent: 'flex-end' }}>
                <CheckLabel>
                  <input type="checkbox" name="is_active" checked={form.is_active} onChange={change} />
                  Отображать на сайте
                </CheckLabel>
              </FieldWrap>
            </FormGrid>
          </form>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn type="submit" form="snake-form" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminSnakes() {
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
      const res = await api.adminGetSnakes(`?${params}`);
      const data = await api.parse(res);
      if (res.ok) { setItems(data.results ?? data); setCount(data.count ?? (data.results ?? data).length); }
    } catch {}
    setLoading(false);
  }, [search, activeFilter, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, activeFilter]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSaved(item, isNew) {
    if (isNew) setItems(prev => [item, ...prev]);
    else setItems(prev => prev.map(s => s.id === item.id ? item : s));
  }

  async function handleDelete(id) {
    try {
      await api.adminDeleteSnake(id);
      setItems(prev => prev.filter(s => s.id !== id));
    } catch { setError('Ошибка при удалении'); }
    setDeleteId(null);
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Змеи</SectionTitle>
        <Btn onClick={() => setModal('new')}>+ Добавить змею</Btn>
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
              <Th>ID</Th>
              <Th>Название</Th>
              <Th>SKU</Th>
              <Th>Цена</Th>
              <Th>Кол-во</Th>
              <Th>Статус</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={7}>Загрузка...</Td></EmptyRow>
            ) : items.length === 0 ? (
              <EmptyRow><Td colSpan={7}>Змей не найдено</Td></EmptyRow>
            ) : items.map(s => (
              <Tr key={s.id}>
                <Td>{s.id}</Td>
                <Td style={{ fontWeight: 700 }}>{s.name}</Td>
                <Td>{s.sku}</Td>
                <Td>{Number(s.price).toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ₸'}</Td>
                <Td>{s.quantity}</Td>
                <Td><StatusBadge $status={s.is_active ? 'active' : 'inactive'}>{s.is_active ? 'Активна' : 'Скрыта'}</StatusBadge></Td>
                <Td style={{ display: 'flex', gap: 6 }}>
                  <Btn $sm $secondary onClick={() => setModal(s)}>Изменить</Btn>
                  {deleteId === s.id ? (
                    <>
                      <Btn $sm $danger onClick={() => handleDelete(s.id)}>Подтвердить</Btn>
                      <Btn $sm $secondary onClick={() => setDeleteId(null)}>Отмена</Btn>
                    </>
                  ) : (
                    <Btn $sm $danger onClick={() => setDeleteId(s.id)}>Удалить</Btn>
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
        <SnakeModal
          snake={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export default AdminSnakes;
