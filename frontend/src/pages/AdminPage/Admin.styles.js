import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const BP = { mobile: '560px', tablet: '900px' };

// Layout
export const AdminLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6f4;
  font-family: 'Nunito', sans-serif;
`;

export const AdminHeader = styled.header`
  background: #fff;
  border-bottom: 1px solid #e8ede9;
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: ${BP.tablet}) {
    padding: 0 16px;
    height: 56px;
  }
`;

export const AdminLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 900;
  color: #0d1910;
  text-decoration: none;

  @media (max-width: ${BP.mobile}) {
    font-size: 15px;
    gap: 7px;
  }
`;

export const AdminLogoTag = styled.span`
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  background: #068d27;
  color: #fff;
  letter-spacing: 0.04em;
`;

export const AdminHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${BP.mobile}) {
    gap: 10px;
  }
`;

export const AdminHeaderUser = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #6b7c6e;

  @media (max-width: ${BP.mobile}) {
    display: none;
  }
`;

export const AdminBackLink = styled.a`
  font-size: 13px;
  font-weight: 700;
  color: #068d27;
  text-decoration: none;
  white-space: nowrap;
  &:hover { text-decoration: underline; }
`;

export const AdminBody = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: ${BP.tablet}) {
    padding-bottom: 72px;
  }
`;

export const AdminSidebar = styled.nav`
  width: 220px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e8ede9;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;

export const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 24px;
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.$active ? '#068d27' : '#2e3d30'};
  background: ${p => p.$active ? '#f0fbf3' : 'transparent'};
  border-right: 3px solid ${p => p.$active ? '#068d27' : 'transparent'};
  text-decoration: none;
  cursor: pointer;
  transition: background 0.13s, color 0.13s;

  &:hover {
    background: ${p => p.$active ? '#f0fbf3' : '#f7f9f7'};
    color: ${p => p.$active ? '#068d27' : '#0d1910'};
  }
`;

export const SidebarIcon = styled.span`
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
`;

export const AdminContent = styled.main`
  flex: 1;
  padding: 32px;
  min-width: 0;
  animation: ${fadeUp} 0.3s ease both;

  @media (max-width: ${BP.tablet}) {
    padding: 20px 16px;
  }

  @media (max-width: ${BP.mobile}) {
    padding: 16px 12px;
  }
`;

/* ---------- Mobile bottom tab bar ---------- */

export const MobileTabBar = styled.nav`
  display: none;

  @media (max-width: ${BP.tablet}) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 72px;
    background: #fff;
    border-top: 1px solid #e8ede9;
    z-index: 100;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 4px;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const MobileTabItem = styled.button`
  flex: 0 0 auto;
  min-width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 8px;
  color: ${p => p.$active ? '#068d27' : '#9ab09e'};
  transition: color 0.13s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 2px;
    border-radius: 0 0 3px 3px;
    background: ${p => p.$active ? '#068d27' : 'transparent'};
    transition: background 0.13s;
  }
`;

export const MobileTabIcon = styled.span`
  font-size: 22px;
  line-height: 1;
`;

export const MobileTabLabel = styled.span`
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.01em;
  white-space: nowrap;
  max-width: 68px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Section header
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SectionTitle = styled.h1`
  font-size: 22px;
  font-weight: 900;
  color: #0d1910;
  margin: 0;
`;

// Stats
export const StatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid #e8ede9;
  flex: 1 1 180px;
`;


export const StatIcon = styled.div`
  font-size: 24px;
  line-height: 1;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: #0d1910;
  line-height: 1;
  white-space: nowrap;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

// Table
export const TableWrap = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e8ede9;
  overflow: hidden;

  @media (max-width: ${BP.mobile}) {
    border-radius: 12px;
  }
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const TableControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 180px;
  padding: 10px 16px;
  border: 1.5px solid #e0e8e1;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  outline: none;
  transition: border-color 0.15s;
  &::placeholder { color: #b0bdb2; }
  &:focus { border-color: #068d27; }
`;

export const FilterSelect = styled.select`
  padding: 10px 14px;
  border: 1.5px solid #e0e8e1;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  background: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  &:focus { border-color: #068d27; }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #fafcfa;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #2e3d30;
  border-bottom: 1px solid #f7f7f7;
  vertical-align: middle;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  transition: background 0.1s;
  &:hover { background: #fafcfa; }
  &:last-child td { border-bottom: none; }
`;

// Status badges
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;

  ${({ $status }) => {
    switch ($status) {
      case 'pending':    return 'background:#fff8e1; color:#f59e0b;';
      case 'confirmed':  return 'background:#e8f5e9; color:#2e7d32;';
      case 'paid':       return 'background:#e3f2fd; color:#1565c0;';
      case 'shipped':    return 'background:#f3e5f5; color:#6a1b9a;';
      case 'delivered':  return 'background:#f0fbf3; color:#068D27;';
      case 'cancelled':  return 'background:#fff5f5; color:#e53935;';
      case 'active':     return 'background:#f0fbf3; color:#068D27;';
      case 'inactive':   return 'background:#fff5f5; color:#e53935;';
      case 'admin':      return 'background:#e3f2fd; color:#1565c0;';
      default:           return 'background:#f0f0f0; color:#6b7c6e;';
    }
  }}
`;

// Buttons
export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${p => p.$sm ? '7px 14px' : '11px 20px'};
  border-radius: ${p => p.$sm ? '9px' : '12px'};
  font-family: 'Nunito', sans-serif;
  font-size: ${p => p.$sm ? '13px' : '14px'};
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
  white-space: nowrap;
  border: none;

  background: ${p =>
    p.$danger ? '#e53935' :
    p.$secondary ? '#fff' :
    p.$warning ? '#f59e0b' :
    '#068d27'};
  color: ${p => p.$secondary ? '#2e3d30' : '#fff'};
  border: ${p => p.$secondary ? '1.5px solid #dce8de' : 'none'};

  &:hover { opacity: 0.88; }
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
`;

// Modal / Drawer
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(3px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: ${BP.mobile}) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const ModalBox = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: ${p => p.$wide ? '720px' : '520px'};
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${BP.mobile}) {
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
  }
`;

export const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 18px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
`;

export const ModalClose = styled.button`
  width: 32px;
  height: 32px;
  border: 1.5px solid #e0e0e0;
  border-radius: 50%;
  background: none;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { border-color: #1a1a1a; color: #1a1a1a; }
`;

export const ModalBody = styled.div`
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Form fields
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$cols === 1 ? '1fr' : '1fr 1fr'};
  gap: 14px;

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  &.full { grid-column: 1 / -1; }
`;

export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const FieldInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #dce8de;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  background: #fff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
  &::placeholder { color: #b0bdb2; }
  &:focus { border-color: #068d27; box-shadow: 0 0 0 3px rgba(6,141,39,0.1); }
  &:disabled { background: #f7f9f7; color: #9ab09e; cursor: not-allowed; }
`;

export const FieldSelect = styled.select`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #dce8de;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  background: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
  &:focus { border-color: #068d27; }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #dce8de;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  background: #fff;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.15s;
  &::placeholder { color: #b0bdb2; }
  &:focus { border-color: #068d27; }
`;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #2e3d30;
  cursor: pointer;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 4px;
`;

// Misc
export const Notice = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: ${p => p.$error ? '#fff5f5' : '#f0fbf3'};
  color: ${p => p.$error ? '#e53e3e' : '#068D27'};
  border: 1.5px solid ${p => p.$error ? '#fcc' : '#b2f0c2'};
`;

export const EmptyRow = styled.tr`
  td {
    text-align: center;
    padding: 48px;
    color: #b0bdb2;
    font-size: 14px;
    font-weight: 700;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  font-weight: 700;
  color: #6b7c6e;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PageBtns = styled.div`
  display: flex;
  gap: 6px;
`;

export const PageBtn = styled.button`
  padding: 6px 12px;
  border: 1.5px solid ${p => p.$active ? '#068d27' : '#e0e8e1'};
  border-radius: 8px;
  background: ${p => p.$active ? '#068d27' : '#fff'};
  color: ${p => p.$active ? '#fff' : '#2e3d30'};
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.13s;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
  &:not(:disabled):hover { border-color: #068d27; }
`;

export const DetailBlock = styled.div`
  background: #f7f9f7;
  border-radius: 12px;
  padding: 14px 16px;
`;

export const DetailLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
`;

export const DetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  line-height: 1.5;
`;
