import styled from 'styled-components';
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '1150px',
  desktop: '1280px',
};
export const HeaderWrapper = styled.header`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;
export const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 0 20px;
    height: 60px;
  }
`;
export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
  span {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #1a1a1a;
    text-transform: uppercase;
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    span {
      font-size: 16px;
    }
  }
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
  @media (max-width: ${BREAKPOINTS.desktop}) {
    gap: 2px;
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;
export const NavItem = styled.div`
  position: relative;
  &:hover > ul {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
  }
`;
export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 8px;
  transition: background 0.15s ease, color 0.15s ease;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  ${NavItem}:hover & svg {
    transform: rotate(180deg);
  }
  @media (max-width: ${BREAKPOINTS.desktop}) {
    padding: 8px 8px;
    font-size: 14px;
  }
`;
export const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  list-style: none;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 10;
  &::before {
    content: '';
    display: block;
    height: 8px;
  }
`;
export const DropdownInner = styled.div`
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10);
  padding: 6px;
`;
export const DropdownItem = styled.li`
  a {
    display: block;
    padding: 9px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.12s ease;
    &:hover {
      background: #f5f5f5;
    }
  }
`;
export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    gap: 8px;
  }
`;
export const CartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1a1a1a;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;
  &:hover {
    background: #333333;
  }
  &:active {
    transform: scale(0.97);
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 14px;
    padding: 9px 16px;
  }
`;
export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: transparent;
  color: #1a1a1a;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  border: 2px solid #1a1a1a;
  border-radius: 100px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
  &:hover {
    background: #1a1a1a;
    color: #ffffff;
  }
  &:active {
    transform: scale(0.97);
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 14px;
    padding: 9px 16px;
  }
`;
export const HeaderLoginWrap = styled.div`
  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
`;
export const BurgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.15s;
  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #1a1a1a;
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  &[aria-expanded='true'] span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  &[aria-expanded='true'] span:nth-child(2) {
    opacity: 0;
  }
  &[aria-expanded='true'] span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: flex;
  }
`;
export const MobileMenu = styled.div`
  display: none;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    padding: 12px 20px 20px;
    border-top: 1px solid #f0f0f0;
    gap: 2px;
  }
`;
export const MobileNavLink = styled.a`
  display: block;
  padding: 11px 12px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: #f5f5f5;
  }
`;
export const MobileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;
