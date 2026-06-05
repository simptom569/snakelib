import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../../api/client';
import {
  Wrapper, Left, LeftBlob, LeftBlob2, SnakeImage, LeftCaption,
  LeftTag, LeftTitle, LeftSub,
  Right, Card, CardTitle, CardSub,
  Tabs, TabBtn,
  Form, Row, FieldWrap, Label, InputWrap, Input, EyeBtn,
  ForgotLink, SubmitBtn, Divider, SocialRow, SocialBtn,
  BottomText, Privacy,
} from './LoginPage.styles';

const SNAKE_IMG = 'https://allwebs.ru/images/2026/05/05/5ec45e3208222aea137e6dd04ecbe289.png';

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}


function flattenErrors(data) {
  if (!data || typeof data !== 'object') return 'Произошла ошибка';
  const msgs = Object.values(data).flat();
  return msgs.join(' ');
}

function LoginPage() {
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  }

  function switchTab(next) {
    setTab(next);
    setError('');
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      setError('');
      try {
        const res = await api.googleAuth(tokenResponse.access_token);
        if (res.ok) {
          window.location.href = '/';
        } else {
          const data = await api.parse(res);
          setError(data?.detail || 'Ошибка входа через Google');
        }
      } catch {
        setError('Нет связи с сервером. Попробуйте позже.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => setError('Не удалось войти через Google'),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (tab === 'register' && fields.password !== fields.confirm) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      let res;
      if (tab === 'login') {
        res = await api.login(fields.email, fields.password);
      } else {
        res = await api.register({
          email: fields.email,
          password: fields.password,
          first_name: fields.firstName,
          last_name: fields.lastName,
          phone: fields.phone,
        });
      }

      if (res.ok) {
        window.location.href = '/';
      } else {
        const data = await api.parse(res);
        setError(flattenErrors(data));
      }
    } catch {
      setError('Нет связи с сервером. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Left>
        <LeftBlob />
        <LeftBlob2 />
        <LeftCaption>
          <LeftTag>SnakeLab — Казахстан</LeftTag>
          <LeftTitle>
            Твой идеальный<br /><em>питомец ждёт</em>
          </LeftTitle>
          <LeftSub>
            Более 50 видов здоровых змей с доставкой по всему Казахстану. Гарантия здоровья 14 дней.
          </LeftSub>
        </LeftCaption>
        <SnakeImage src={SNAKE_IMG} alt="Змея — питомец SnakeLab" />
      </Left>

      <Right>
        <Card>
          <CardTitle>
            {tab === 'login' ? <>С возвращением! <em>🐍</em></> : <>Добро пожаловать! <em>🐍</em></>}
          </CardTitle>
          <CardSub>
            {tab === 'login'
              ? 'Войдите, чтобы управлять заказами и избранным'
              : 'Создайте аккаунт и найдите своего первого питомца'}
          </CardSub>

          <Tabs>
            <TabBtn $active={tab === 'login'} onClick={() => switchTab('login')} type="button">
              Войти
            </TabBtn>
            <TabBtn $active={tab === 'register'} onClick={() => switchTab('register')} type="button">
              Регистрация
            </TabBtn>
          </Tabs>

          <Form onSubmit={handleSubmit}>
            {tab === 'register' && (
              <Row>
                <FieldWrap>
                  <Label>Имя</Label>
                  <Input
                    name="firstName"
                    value={fields.firstName}
                    onChange={handleChange}
                    placeholder="Руслан"
                    autoComplete="given-name"
                    required
                  />
                </FieldWrap>
                <FieldWrap>
                  <Label>Фамилия</Label>
                  <Input
                    name="lastName"
                    value={fields.lastName}
                    onChange={handleChange}
                    placeholder="Бухлов"
                    autoComplete="family-name"
                    required
                  />
                </FieldWrap>
              </Row>
            )}

            <FieldWrap>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="example@mail.kz"
                autoComplete="email"
                required
              />
            </FieldWrap>

            {tab === 'register' && (
              <FieldWrap>
                <Label>Телефон</Label>
                <Input
                  name="phone"
                  type="tel"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="+7 (701) 000-00-00"
                  autoComplete="tel"
                  required
                />
              </FieldWrap>
            )}

            <FieldWrap>
              <Label>Пароль</Label>
              <InputWrap>
                <Input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={fields.password}
                  onChange={handleChange}
                  placeholder="Минимум 8 символов"
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                  $hasIcon
                  required
                />
                <EyeBtn type="button" onClick={() => setShowPass(v => !v)}>
                  <EyeIcon open={showPass} />
                </EyeBtn>
              </InputWrap>
            </FieldWrap>

            {tab === 'register' && (
              <FieldWrap>
                <Label>Повторите пароль</Label>
                <InputWrap>
                  <Input
                    name="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={fields.confirm}
                    onChange={handleChange}
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                    $hasIcon
                    required
                  />
                  <EyeBtn type="button" onClick={() => setShowConfirm(v => !v)}>
                    <EyeIcon open={showConfirm} />
                  </EyeBtn>
                </InputWrap>
              </FieldWrap>
            )}

            {tab === 'login' && (
              <ForgotLink href="#">Забыли пароль?</ForgotLink>
            )}

            {error && (
              <p style={{ color: '#e53e3e', fontSize: '0.85rem', margin: '0 0 4px' }}>
                {error}
              </p>
            )}

            <SubmitBtn type="submit" disabled={loading}>
              {loading
                ? 'Подождите...'
                : tab === 'login' ? 'Войти в аккаунт' : 'Создать аккаунт'}
            </SubmitBtn>

            {tab === 'register' && (
              <Privacy>
                Регистрируясь, вы соглашаетесь с{' '}
                <a href="#">Условиями сервиса</a> и{' '}
                <a href="#">Политикой конфиденциальности</a>
              </Privacy>
            )}

            <Divider>или продолжить через</Divider>

            <SocialRow>
              <SocialBtn
                type="button"
                disabled={googleLoading}
                onClick={() => loginWithGoogle()}
              >
                <GoogleIcon /> {googleLoading ? 'Подождите...' : 'Войти через Google'}
              </SocialBtn>
            </SocialRow>
          </Form>

          <BottomText>
            {tab === 'login'
              ? <>Нет аккаунта? <a href="#" onClick={e => { e.preventDefault(); switchTab('register'); }}>Зарегистрироваться</a></>
              : <>Уже есть аккаунт? <a href="#" onClick={e => { e.preventDefault(); switchTab('login'); }}>Войти</a></>
            }
          </BottomText>
        </Card>
      </Right>
    </Wrapper>
  );
}

export default LoginPage;
