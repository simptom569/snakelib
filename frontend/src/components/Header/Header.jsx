import React, { useState } from 'react';
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
  MobileActions,
} from './Header.styles';

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  {
    label: 'Каталог змей',
    href: '/catalog',
    dropdown: [
      { label: 'Все змеи', href: '/catalog' },
      { label: 'Королевские питоны', href: '/catalog/royal-python' },
      { label: 'Кукурузные змеи', href: '/catalog/corn-snake' },
      { label: 'Молочные змеи', href: '/catalog/milk-snake' },
    ],
  },
  {
    label: 'Террариумы',
    href: '/terrariums',
    dropdown: [
      { label: 'Все террариумы', href: '/terrariums' },
      { label: 'Стеклянные', href: '/terrariums/glass' },
      { label: 'Пластиковые', href: '/terrariums/plastic' },
    ],
  },
  {
    label: 'Корма',
    href: '/food',
    dropdown: [
      { label: 'Все корма', href: '/food' },
      { label: 'Замороженные', href: '/food/frozen' },
      { label: 'Живые', href: '/food/live' },
    ],
  },
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

function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Inner>
        <Logo href="/">
          <SnakeIcon />
          <span>SnakeLab</span>
        </Logo>

        <Nav>
          {NAV_ITEMS.map((item) => (
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
          <CartButton>Корзина ({cartCount})</CartButton>
          <HeaderLoginWrap><LoginButton>Войти</LoginButton></HeaderLoginWrap>
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
        {NAV_ITEMS.map((item) => (
          <MobileNavLink key={item.href} href={item.href}>
            {item.label}
          </MobileNavLink>
        ))}
        <MobileActions>
          <CartButton style={{ flex: 1, justifyContent: 'center' }}>
            Корзина ({cartCount})
          </CartButton>
          <LoginButton style={{ flex: 1, justifyContent: 'center' }}>
            Войти
          </LoginButton>
        </MobileActions>
      </MobileMenu>
    </HeaderWrapper>
  );
}

export default Header;
