import React, { useState, useRef, useEffect } from 'react';
import api from '../../api/client';
import {
  HeaderWrapper,
  Inner,
  Logo,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownInner,
  DropdownItem,
  Actions,
  CartButton,
  LoginButton,
  HeaderLoginWrap,
  BurgerButton,
  MobileMenu,
  MobileNavLink,
  MobileNavDivider,
  MobileActions,
  UserMenuWrap,
  UserAvatar,
  UserDropdown,
  UserDropdownItem,
  UserDropdownDivider,
} from './Header.styles';

const BASE_NAV = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог змей', href: '/catalog',    dropdownKey: 'snakes' },
  { label: 'Террариумы',   href: '/terrariums', dropdownKey: 'terrariums' },
  { label: 'Корма',        href: '/food',        dropdownKey: 'foods' },
  { label: 'Доставка и оплата', href: '/delivery' },
  { label: 'О нас', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

const ChevronIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SnakeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#2d6a2d" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="20">🐍</text>
  </svg>
);

function getInitials(user) {
  if (!user) return '?';
  const first = (user.first_name || '').trim()[0] || '';
  const last = (user.last_name || '').trim()[0] || '';
  return (first + last).toUpperCase() || (user.email || '?')[0].toUpperCase();
}

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function handleLogout() {
    try { await api.logout(); } catch {}
    onLogout();
    window.location.href = '/';
  }

  return (
    <UserMenuWrap ref={ref}>
      <UserAvatar onClick={() => setOpen(v => !v)} $open={open} title={user.email}>
        {getInitials(user)}
      </UserAvatar>
      <UserDropdown $open={open}>
        <div style={{ padding: '12px 16px 8px' }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: '#0d1910' }}>
            {user.first_name} {user.last_name}
          </div>
          <div style={{ fontSize: 12, color: '#6b7c6e', marginTop: 2 }}>{user.email}</div>
        </div>
        <UserDropdownDivider />
        <UserDropdownItem href="/profile">Мой профиль</UserDropdownItem>
        <UserDropdownItem href="/orders">Мои заказы</UserDropdownItem>
        {user.role === 'admin' && (
          <>
            <UserDropdownDivider />
            <UserDropdownItem href="/admin-panel" $admin target="_blank" rel="noreferrer">Админ-панель ↗</UserDropdownItem>
          </>
        )}
        <UserDropdownDivider />
        <UserDropdownItem as="button" onClick={handleLogout} $danger>
          Выйти
        </UserDropdownItem>
      </UserDropdown>
    </UserMenuWrap>
  );
}

function Header({ cartCount = 0, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [snakeCategories, setSnakeCategories] = useState([]);
  const [terrariumCategories, setTerrariumCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    fetch('/api/v1/categories/?page_size=50').then(r => r.json())
      .then(d => setSnakeCategories(d.results ?? d)).catch(() => {});
    fetch('/api/v1/terrarium-categories/?page_size=50').then(r => r.json())
      .then(d => setTerrariumCategories(d.results ?? d)).catch(() => {});
    fetch('/api/v1/food-categories/?page_size=50').then(r => r.json())
      .then(d => setFoodCategories(d.results ?? d)).catch(() => {});
  }, []);

  const navItems = BASE_NAV.map(item => {
    if (item.dropdownKey === 'snakes') {
      return {
        ...item,
        dropdown: [
          { label: 'Все змеи', href: '/catalog' },
          ...snakeCategories.map(c => ({ label: c.name, href: `/catalog/category/${c.slug}` })),
        ],
      };
    }
    if (item.dropdownKey === 'terrariums') {
      return {
        ...item,
        dropdown: [
          { label: 'Все террариумы', href: '/terrariums' },
          ...terrariumCategories.map(c => ({ label: c.name, href: `/terrariums/category/${c.slug}` })),
        ],
      };
    }
    if (item.dropdownKey === 'foods') {
      return {
        ...item,
        dropdown: [
          { label: 'Все корма', href: '/food' },
          ...foodCategories.map(c => ({ label: c.name, href: `/food/category/${c.slug}` })),
        ],
      };
    }
    return item;
  });

  return (
    <HeaderWrapper>
      <Inner>
        <Logo href="/">
          <SnakeIcon />
          <span>SnakeLab</span>
        </Logo>

        <Nav>
          {navItems.map((item) => (
            <NavItem key={item.href}>
              <NavLink href={item.href}>
                {item.label}
                {item.dropdown && <ChevronIcon />}
              </NavLink>
              {item.dropdown && (
                <Dropdown>
                  <DropdownInner>
                    {item.dropdown.map((sub) => (
                      <DropdownItem key={sub.href}>
                        <a href={sub.href}>{sub.label}</a>
                      </DropdownItem>
                    ))}
                  </DropdownInner>
                </Dropdown>
              )}
            </NavItem>
          ))}
        </Nav>

        <Actions>
          <CartButton as="a" href="/cart">Корзина ({cartCount})</CartButton>
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <HeaderLoginWrap>
              <LoginButton href="/login">Войти</LoginButton>
            </HeaderLoginWrap>
          )}
          <BurgerButton
            aria-label="Меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </BurgerButton>
        </Actions>
      </Inner>

      <MobileMenu $open={menuOpen}>
        {navItems.map((item) => (
          <MobileNavLink key={item.href} href={item.href}>
            {item.label}
          </MobileNavLink>
        ))}

        {user && (
          <>
            <MobileNavDivider />
            <MobileNavLink href="/profile">Мой профиль</MobileNavLink>
            <MobileNavLink href="/orders">Мои заказы</MobileNavLink>
            {user.role === 'admin' && (
              <MobileNavLink href="/admin-panel" target="_blank" rel="noreferrer" $admin>
                Админ-панель ↗
              </MobileNavLink>
            )}
            <MobileNavDivider />
            <MobileNavLink as="button" onClick={async () => { try { await api.logout(); } catch {} onLogout(); window.location.href = '/'; }} $danger>
              Выйти
            </MobileNavLink>
          </>
        )}

        <MobileActions>
          <CartButton as="a" href="/cart" style={{ flex: 1, justifyContent: 'center' }}>
            Корзина ({cartCount})
          </CartButton>
          {user ? (
            <LoginButton href="/profile" style={{ flex: 1, justifyContent: 'center' }}>
              {getInitials(user)} Профиль
            </LoginButton>
          ) : (
            <LoginButton href="/login" style={{ flex: 1, justifyContent: 'center' }}>
              Войти
            </LoginButton>
          )}
        </MobileActions>
      </MobileMenu>
    </HeaderWrapper>
  );
}

export default Header;
