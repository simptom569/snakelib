import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle, Btn,
  TableWrap, TableControls, SearchInput,
  TableScroll, Table, Th, Td, Tr, EmptyRow,
  ModalOverlay, ModalBox, ModalHead, ModalTitle, ModalClose, ModalBody, ModalActions,
  FormGrid, FieldWrap, FieldLabel, FieldInput, FieldSelect, FieldTextarea,
  Notice,
} from '../Admin.styles';

const CONFIGS = {
  snakes: {
    title: 'Категории змей',
    singular: 'категорию змей',
    getAll: (p) => api.adminGetSnakeCategories(p),
    create: (d) => api.adminCreateSnakeCategory(d),
    update: (id, d) => api.adminUpdateSnakeCategory(id, d),
    remove: (id) => api.adminDeleteSnakeCategory(id),
  },
  terrariums: {
    title: 'Категории террариумов',
    singular: 'категорию террариумов',
    getAll: (p) => api.adminGetTerrariumCategories(p),
    create: (d) => api.adminCreateTerrariumCategory(d),
    update: (id, d) => api.adminUpdateTerrariumCategory(id, d),
    remove: (id) => api.adminDeleteTerrariumCategory(id),
  },
  foods: {
    title: 'Категории кормов',
    singular: 'категорию кормов',
    getAll: (p) => api.adminGetFoodCategories(p),
    create: (d) => api.adminCreateFoodCategory(d),
    update: (id, d) => api.adminUpdateFoodCategory(id, d),
    remove: (id) => api.adminDeleteFoodCategory(id),
  },
};

const emptyForm = { name: '', slug: '', description: '', tag: '' };

function CategoryModal({ item, config, onClose, onSaved }) {
  const [form, setForm] = useState(item ? {
    name: item.name,
    slug: item.slug,
    description: item.description,
    tag: item.tag?.id ?? item.tag ?? '',
  } : { ...emptyForm });
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    fetch('/api/v1/tags/?page_size=50').then(r => r.json())
      .then(d => setTags(d.results ?? d))
      .catch(() => {});
  }, []);

  function change(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      tag: form.tag || null,
    };
    try {
      const res = item
        ? await config.update(item.id, payload)
        : await config.create(payload);
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
      <ModalBox>
        <ModalHead>
          <ModalTitle>{item ? 'Редактировать' : 'Добавить'} {config.singular}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <form onSubmit={save} id="category-form">
            <FormGrid>
              <FieldWrap>
                <FieldLabel>Название</FieldLabel>
                <FieldInput name="name" value={form.name} onChange={change} placeholder="Питоны" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Slug</FieldLabel>
                <FieldInput name="slug" value={form.slug} onChange={change} placeholder="pythons" required />
              </FieldWrap>
              <FieldWrap>
                <FieldLabel>Тег</FieldLabel>
                <FieldSelect name="tag" value={form.tag} onChange={change}>
                  <option value="">— Нет —</option>
                  {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </FieldSelect>
              </FieldWrap>
              <FieldWrap className="full">
                <FieldLabel>Описание</FieldLabel>
                <FieldTextarea name="description" value={form.description} onChange={change} placeholder="Описание категории..." required />
              </FieldWrap>
            </FormGrid>
          </form>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn type="submit" form="category-form" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminCategoriesSection({ type }) {
  const config = CONFIGS[type];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const params = search ? `?search=${search}` : '';
    try {
      const res = await config.getAll(params);
      const data = await api.parse(res);
      if (res.ok) setItems(data.results ?? data);
    } catch {}
    setLoading(false);
  }, [search, config]);

  useEffect(() => { load(); }, [load]);

  function handleSaved(item, isNew) {
    if (isNew) setItems(prev => [item, ...prev]);
    else setItems(prev => prev.map(x => x.id === item.id ? item : x));
  }

  async function handleDelete(id) {
    try {
      await config.remove(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch { setError('Ошибка при удалении — возможно категория используется'); }
    setDeleteId(null);
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>{config.title}</SectionTitle>
        <Btn onClick={() => setModal('new')}>+ Добавить</Btn>
      </SectionHeader>

      {error && <Notice $error style={{ marginBottom: 16 }}>{error}</Notice>}

      <TableWrap>
        <TableControls>
          <SearchInput placeholder="Поиск по названию или slug..." value={search} onChange={e => setSearch(e.target.value)} />
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Название</Th>
              <Th>Slug</Th>
              <Th>Тег</Th>
              <Th>Описание</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={6}>Загрузка...</Td></EmptyRow>
            ) : items.length === 0 ? (
              <EmptyRow><Td colSpan={6}>Категорий не найдено</Td></EmptyRow>
            ) : items.map(item => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td style={{ fontWeight: 700 }}>{item.name}</Td>
                <Td style={{ color: '#6b7c6e' }}>{item.slug}</Td>
                <Td>{item.tag?.name ?? '—'}</Td>
                <Td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.description || '—'}
                </Td>
                <Td style={{ display: 'flex', gap: 6 }}>
                  <Btn $sm $secondary onClick={() => setModal(item)}>Изменить</Btn>
                  {deleteId === item.id ? (
                    <>
                      <Btn $sm $danger onClick={() => handleDelete(item.id)}>Подтвердить</Btn>
                      <Btn $sm $secondary onClick={() => setDeleteId(null)}>Отмена</Btn>
                    </>
                  ) : (
                    <Btn $sm $danger onClick={() => setDeleteId(item.id)}>Удалить</Btn>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table></TableScroll>
      </TableWrap>

      {modal && (
        <CategoryModal
          item={modal === 'new' ? null : modal}
          config={config}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}

export function AdminSnakeCategories() { return <AdminCategoriesSection type="snakes" />; }
export function AdminTerrariumCategories() { return <AdminCategoriesSection type="terrariums" />; }
export function AdminFoodCategories() { return <AdminCategoriesSection type="foods" />; }
