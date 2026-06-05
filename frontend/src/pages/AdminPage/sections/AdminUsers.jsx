import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle,
  TableWrap, TableControls, SearchInput,
  TableScroll, Table, Th, Td, Tr, EmptyRow, StatusBadge, Pagination, PageBtns, PageBtn,
  ModalOverlay, ModalBox, ModalHead, ModalTitle, ModalClose, ModalBody, ModalActions,
  FormGrid, FieldWrap, FieldLabel, FieldSelect,
  DetailBlock, DetailLabel, DetailValue, Btn, Notice,
} from '../Admin.styles';

function formatDate(iso) {
  return new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function UserModal({ user, onClose, onSaved }) {
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.is_active);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  async function save() {
    setSaving(true); setError('');
    try {
      const res = await api.adminUpdateUser(user.id, { role, is_active: isActive });
      const data = await api.parse(res);
      if (res.ok) { onSaved(data); onClose(); }
      else setError(data?.detail || 'Ошибка сохранения');
    } catch { setError('Ошибка соединения'); }
    finally { setSaving(false); }
  }

  return createPortal(
    <ModalOverlay onClick={e => e.target === e.currentTarget && onClose()}>
      <ModalBox>
        <ModalHead>
          <ModalTitle>{user.first_name} {user.last_name}</ModalTitle>
          <ModalClose onClick={onClose}>✕</ModalClose>
        </ModalHead>
        <ModalBody>
          <FormGrid>
            <DetailBlock>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{user.email}</DetailValue>
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Телефон</DetailLabel>
              <DetailValue>{user.phone || '—'}</DetailValue>
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Зарегистрирован</DetailLabel>
              <DetailValue>{formatDate(user.created_at)}</DetailValue>
            </DetailBlock>
            <DetailBlock>
              <DetailLabel>Email подтверждён</DetailLabel>
              <DetailValue>{user.is_verified ? '✅ Да' : '❌ Нет'}</DetailValue>
            </DetailBlock>
          </FormGrid>

          <FormGrid>
            <FieldWrap>
              <FieldLabel>Роль</FieldLabel>
              <FieldSelect value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
              </FieldSelect>
            </FieldWrap>
            <FieldWrap>
              <FieldLabel>Статус аккаунта</FieldLabel>
              <FieldSelect value={isActive ? 'true' : 'false'} onChange={e => setIsActive(e.target.value === 'true')}>
                <option value="true">Активен</option>
                <option value="false">Заблокирован</option>
              </FieldSelect>
            </FieldWrap>
          </FormGrid>

          {error && <Notice $error>{error}</Notice>}

          <ModalActions>
            <Btn $secondary onClick={onClose}>Отмена</Btn>
            <Btn onClick={save} disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</Btn>
          </ModalActions>
        </ModalBody>
      </ModalBox>
    </ModalOverlay>,
    document.body
  );
}

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const PAGE_SIZE = 20;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', page);
    params.set('page_size', PAGE_SIZE);
    try {
      const res = await api.adminGetUsers(`?${params}`);
      const data = await api.parse(res);
      if (res.ok) { setUsers(data.results ?? data); setCount(data.count ?? (data.results ?? data).length); }
    } catch {}
    setLoading(false);
  }, [search, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSaved(updated) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  }

  return (
    <>
      <SectionHeader>
        <SectionTitle>Пользователи</SectionTitle>
      </SectionHeader>

      <TableWrap>
        <TableControls>
          <SearchInput placeholder="Поиск по email или имени..." value={search} onChange={e => setSearch(e.target.value)} />
        </TableControls>

        <TableScroll><Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Имя</Th>
              <Th>Email</Th>
              <Th>Роль</Th>
              <Th>Статус</Th>
              <Th>Дата регистрации</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <EmptyRow><Td colSpan={7}>Загрузка...</Td></EmptyRow>
            ) : users.length === 0 ? (
              <EmptyRow><Td colSpan={7}>Пользователей не найдено</Td></EmptyRow>
            ) : users.map(u => (
              <Tr key={u.id}>
                <Td>{u.id}</Td>
                <Td>{u.first_name} {u.last_name}</Td>
                <Td>{u.email}</Td>
                <Td><StatusBadge $status={u.role}>{u.role === 'admin' ? 'Админ' : 'Пользователь'}</StatusBadge></Td>
                <Td><StatusBadge $status={u.is_active ? 'active' : 'inactive'}>{u.is_active ? 'Активен' : 'Заблокирован'}</StatusBadge></Td>
                <Td>{formatDate(u.created_at)}</Td>
                <Td><Btn $sm onClick={() => setSelected(u)}>Изменить</Btn></Td>
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

      {selected && <UserModal user={selected} onClose={() => setSelected(null)} onSaved={handleSaved} />}
    </>
  );
}

export default AdminUsers;
