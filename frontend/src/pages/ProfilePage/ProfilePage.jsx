import React, { useState, useEffect, useCallback } from 'react';
import api from '../../api/client';
import {
  Wrapper, Inner, PageTitle, PageSub,
  Card, CardHeader, CardHeaderText, Avatar, UserName, UserEmail,
  CardBody, SectionTitle, Grid, FieldWrap, Label, Input,
  Actions, SaveBtn, CancelBtn, Notice, PassDivider,
  AddressList, AddressCard, AddressCardTop, AddressLine, AddressSub, AddressDefaultBadge,
  AddressActions, AddrBtn, AddressForm, AddressFormTitle,
  CheckRow, AddAddrBtn,
} from './ProfilePage.styles';

function getInitials(user) {
  if (!user) return '?';
  const first = (user.first_name || '').trim()[0] || '';
  const last = (user.last_name || '').trim()[0] || '';
  return (first + last).toUpperCase() || (user.email || '?')[0].toUpperCase();
}

function ProfilePage({ user, onUserUpdate }) {
  const [fields, setFields] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [passFields, setPassFields] = useState({
    old_password: '',
    new_password: '',
    confirm: '',
  });
  const [infoMsg, setInfoMsg] = useState(null);
  const [passMsg, setPassMsg] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [addrMsg, setAddrMsg] = useState(null);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [addrLoading, setAddrLoading] = useState(false);
  const emptyAddrForm = { country: '', city: '', street: '', house: '', apartment: '', postal_code: '', is_default: false };
  const [addrForm, setAddrForm] = useState(emptyAddrForm);

  useEffect(() => {
    if (user) {
      setFields({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const loadAddresses = useCallback(async () => {
    try {
      const res = await api.getAddresses();
      const data = await api.parse(res);
      if (res.ok) setAddresses(Array.isArray(data) ? data : (data?.results ?? []));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) loadAddresses();
  }, [user, loadAddresses]);

  function openNewAddrForm() {
    setEditingAddr(null);
    setAddrForm(emptyAddrForm);
    setAddrMsg(null);
    setShowAddrForm(true);
  }

  function openEditAddrForm(addr) {
    setEditingAddr(addr.id);
    setAddrForm({
      country: addr.country,
      city: addr.city,
      street: addr.street,
      house: addr.house,
      apartment: addr.apartment || '',
      postal_code: addr.postal_code,
      is_default: addr.is_default,
    });
    setAddrMsg(null);
    setShowAddrForm(true);
  }

  function cancelAddrForm() {
    setShowAddrForm(false);
    setEditingAddr(null);
    setAddrForm(emptyAddrForm);
    setAddrMsg(null);
  }

  function handleAddrFormChange(e) {
    const { name, type, checked, value } = e.target;
    setAddrForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleAddrSubmit(e) {
    e.preventDefault();
    setAddrLoading(true);
    setAddrMsg(null);
    try {
      const payload = {
        country: addrForm.country,
        city: addrForm.city,
        street: addrForm.street,
        house: addrForm.house,
        apartment: addrForm.apartment || null,
        postal_code: addrForm.postal_code,
        is_default: addrForm.is_default,
      };
      const res = editingAddr
        ? await api.updateAddress(editingAddr, payload)
        : await api.createAddress(payload);
      const data = await api.parse(res);
      if (res.ok) {
        await loadAddresses();
        cancelAddrForm();
      } else {
        const msg = typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Ошибка';
        setAddrMsg({ text: msg, error: true });
      }
    } catch {
      setAddrMsg({ text: 'Нет связи с сервером.', error: true });
    } finally {
      setAddrLoading(false);
    }
  }

  async function handleAddrDelete(id) {
    setAddrLoading(true);
    try {
      await api.deleteAddress(id);
      await loadAddresses();
    } catch {
      setAddrMsg({ text: 'Ошибка при удалении.', error: true });
    } finally {
      setAddrLoading(false);
    }
  }

  async function handleSetDefault(addr) {
    setAddrLoading(true);
    try {
      await api.updateAddress(addr.id, { is_default: true });
      await loadAddresses();
    } catch {
      setAddrMsg({ text: 'Ошибка.', error: true });
    } finally {
      setAddrLoading(false);
    }
  }

  if (!user) {
    return (
      <Wrapper>
        <Inner>
          <Notice $error>Войдите в аккаунт, чтобы просмотреть профиль.</Notice>
        </Inner>
      </Wrapper>
    );
  }

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
    setInfoMsg(null);
  }

  function handlePassChange(e) {
    setPassFields(f => ({ ...f, [e.target.name]: e.target.value }));
    setPassMsg(null);
  }

  function resetInfo() {
    setFields({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      phone: user.phone || '',
    });
    setInfoMsg(null);
  }

  async function handleInfoSubmit(e) {
    e.preventDefault();
    setInfoLoading(true);
    setInfoMsg(null);
    try {
      const res = await api.patch('/profile/', {
        first_name: fields.first_name,
        last_name: fields.last_name,
        phone: fields.phone,
      });
      const data = await api.parse(res);
      if (res.ok) {
        onUserUpdate(data);
        setInfoMsg({ text: 'Данные успешно обновлены!', error: false });
      } else {
        const msg = typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Ошибка при сохранении';
        setInfoMsg({ text: msg, error: true });
      }
    } catch {
      setInfoMsg({ text: 'Нет связи с сервером.', error: true });
    } finally {
      setInfoLoading(false);
    }
  }

  async function handlePassSubmit(e) {
    e.preventDefault();
    if (passFields.new_password !== passFields.confirm) {
      setPassMsg({ text: 'Новые пароли не совпадают', error: true });
      return;
    }
    if (passFields.new_password.length < 8) {
      setPassMsg({ text: 'Пароль должен содержать минимум 8 символов', error: true });
      return;
    }
    setPassLoading(true);
    setPassMsg(null);
    try {
      const res = await api.post('/profile/change-password/', {
        old_password: passFields.old_password,
        new_password: passFields.new_password,
      });
      const data = await api.parse(res);
      if (res.ok) {
        setPassMsg({ text: 'Пароль успешно изменён!', error: false });
        setPassFields({ old_password: '', new_password: '', confirm: '' });
      } else {
        const msg = typeof data === 'object'
          ? Object.values(data).flat().join(' ')
          : 'Ошибка при смене пароля';
        setPassMsg({ text: msg, error: true });
      }
    } catch {
      setPassMsg({ text: 'Нет связи с сервером.', error: true });
    } finally {
      setPassLoading(false);
    }
  }

  return (
    <Wrapper>
      <Inner>
        <PageTitle>Мой профиль</PageTitle>
        <PageSub>Управляйте своими данными и настройками аккаунта</PageSub>

        <Card>
          <CardHeader>
            <Avatar>{getInitials(user)}</Avatar>
            <CardHeaderText>
              <UserName>{user.first_name} {user.last_name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </CardHeaderText>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleInfoSubmit}>
              <SectionTitle>Личные данные</SectionTitle>
              <Grid>
                <FieldWrap>
                  <Label>Имя</Label>
                  <Input
                    name="first_name"
                    value={fields.first_name}
                    onChange={handleChange}
                    placeholder="Руслан"
                    autoComplete="given-name"
                  />
                </FieldWrap>
                <FieldWrap>
                  <Label>Фамилия</Label>
                  <Input
                    name="last_name"
                    value={fields.last_name}
                    onChange={handleChange}
                    placeholder="Бухлов"
                    autoComplete="family-name"
                  />
                </FieldWrap>
                <FieldWrap className="full">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={fields.email}
                    disabled
                    title="Email изменить нельзя"
                  />
                </FieldWrap>
                <FieldWrap className="full">
                  <Label>Телефон</Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    placeholder="+7 (701) 000-00-00"
                    autoComplete="tel"
                  />
                </FieldWrap>
              </Grid>

              {infoMsg && (
                <Notice $error={infoMsg.error} style={{ marginTop: 16 }}>
                  {infoMsg.text}
                </Notice>
              )}

              <Actions>
                <CancelBtn type="button" onClick={resetInfo}>Отмена</CancelBtn>
                <SaveBtn type="submit" disabled={infoLoading}>
                  {infoLoading ? 'Сохранение...' : 'Сохранить изменения'}
                </SaveBtn>
              </Actions>
            </form>

            <PassDivider />

            <form onSubmit={handlePassSubmit}>
              <SectionTitle>Изменить пароль</SectionTitle>
              <Grid>
                <FieldWrap className="full">
                  <Label>Текущий пароль</Label>
                  <Input
                    name="old_password"
                    type="password"
                    value={passFields.old_password}
                    onChange={handlePassChange}
                    placeholder="Введите текущий пароль"
                    autoComplete="current-password"
                    required
                  />
                </FieldWrap>
                <FieldWrap>
                  <Label>Новый пароль</Label>
                  <Input
                    name="new_password"
                    type="password"
                    value={passFields.new_password}
                    onChange={handlePassChange}
                    placeholder="Минимум 8 символов"
                    autoComplete="new-password"
                    required
                  />
                </FieldWrap>
                <FieldWrap>
                  <Label>Повторите пароль</Label>
                  <Input
                    name="confirm"
                    type="password"
                    value={passFields.confirm}
                    onChange={handlePassChange}
                    placeholder="Повторите новый пароль"
                    autoComplete="new-password"
                    required
                  />
                </FieldWrap>
              </Grid>

              {passMsg && (
                <Notice $error={passMsg.error} style={{ marginTop: 16 }}>
                  {passMsg.text}
                </Notice>
              )}

              <Actions>
                <span />
                <SaveBtn type="submit" disabled={passLoading}>
                  {passLoading ? 'Сохранение...' : 'Изменить пароль'}
                </SaveBtn>
              </Actions>
            </form>


            <PassDivider />

            <SectionTitle>Мои адреса</SectionTitle>

            {addresses.length > 0 && (
              <AddressList>
                {addresses.map(addr => (
                  <AddressCard key={addr.id} $default={addr.is_default}>
                    <AddressCardTop>
                      <div>
                        <AddressLine>{addr.street}, д. {addr.house}{addr.apartment ? `, кв. ${addr.apartment}` : ''}</AddressLine>
                        <AddressSub>{addr.postal_code}, {addr.city}, {addr.country}</AddressSub>
                      </div>
                      {addr.is_default && <AddressDefaultBadge>Основной</AddressDefaultBadge>}
                    </AddressCardTop>
                    <AddressActions>
                      <AddrBtn type="button" onClick={() => openEditAddrForm(addr)} disabled={addrLoading}>Изменить</AddrBtn>
                      {!addr.is_default && (
                        <AddrBtn type="button" onClick={() => handleSetDefault(addr)} disabled={addrLoading}>Сделать основным</AddrBtn>
                      )}
                      <AddrBtn type="button" $danger onClick={() => handleAddrDelete(addr.id)} disabled={addrLoading}>Удалить</AddrBtn>
                    </AddressActions>
                  </AddressCard>
                ))}
              </AddressList>
            )}

            {addrMsg && !showAddrForm && (
              <Notice $error={addrMsg.error} style={{ marginBottom: 16 }}>{addrMsg.text}</Notice>
            )}

            {showAddrForm ? (
              <AddressForm>
                <AddressFormTitle>{editingAddr ? 'Редактировать адрес' : 'Новый адрес'}</AddressFormTitle>
                <form onSubmit={handleAddrSubmit}>
                  <Grid>
                    <FieldWrap>
                      <Label>Страна</Label>
                      <Input name="country" value={addrForm.country} onChange={handleAddrFormChange} placeholder="Россия" required />
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Город</Label>
                      <Input name="city" value={addrForm.city} onChange={handleAddrFormChange} placeholder="Москва" required />
                    </FieldWrap>
                    <FieldWrap className="full">
                      <Label>Улица</Label>
                      <Input name="street" value={addrForm.street} onChange={handleAddrFormChange} placeholder="ул. Ленина" required />
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Дом</Label>
                      <Input name="house" value={addrForm.house} onChange={handleAddrFormChange} placeholder="12А" required />
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Квартира</Label>
                      <Input name="apartment" value={addrForm.apartment} onChange={handleAddrFormChange} placeholder="42 (необязательно)" />
                    </FieldWrap>
                    <FieldWrap>
                      <Label>Почтовый индекс</Label>
                      <Input name="postal_code" value={addrForm.postal_code} onChange={handleAddrFormChange} placeholder="101000" required />
                    </FieldWrap>
                    <FieldWrap style={{ justifyContent: 'flex-end', paddingBottom: 4 }}>
                      <CheckRow>
                        <input
                          type="checkbox"
                          name="is_default"
                          checked={addrForm.is_default}
                          onChange={handleAddrFormChange}
                        />
                        Сделать основным
                      </CheckRow>
                    </FieldWrap>
                  </Grid>

                  {addrMsg && (
                    <Notice $error={addrMsg.error} style={{ marginTop: 12 }}>{addrMsg.text}</Notice>
                  )}

                  <Actions style={{ marginTop: 16 }}>
                    <CancelBtn type="button" onClick={cancelAddrForm}>Отмена</CancelBtn>
                    <SaveBtn type="submit" disabled={addrLoading}>
                      {addrLoading ? 'Сохранение...' : editingAddr ? 'Сохранить' : 'Добавить адрес'}
                    </SaveBtn>
                  </Actions>
                </form>
              </AddressForm>
            ) : (
              <AddAddrBtn type="button" onClick={openNewAddrForm}>
                + Добавить адрес
              </AddAddrBtn>
            )}

          </CardBody>
        </Card>
      </Inner>
    </Wrapper>
  );
}

export default ProfilePage;
