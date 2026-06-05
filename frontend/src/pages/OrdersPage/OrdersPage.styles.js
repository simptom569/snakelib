import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const BP = { mobile: '560px', tablet: '900px' };

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 48px 20px 80px;
  animation: ${fadeUp} 0.4s ease both;
`;

export const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 900;
  color: #0d1910;
  margin-bottom: 6px;
`;

export const PageSub = styled.p`
  font-size: 14px;
  color: #6b7c6e;
  margin-bottom: 36px;
`;

export const OrderCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.07);
  overflow: hidden;
  margin-bottom: 16px;
`;

export const OrderHeader = styled.div`
  padding: 20px 28px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
  &:hover { background: #fafcfa; }

  @media (max-width: ${BP.mobile}) {
    padding: 16px 20px;
  }
`;

export const OrderHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderNumber = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #0d1910;
`;

export const OrderDate = styled.div`
  font-size: 13px;
  color: #6b7c6e;
`;

export const OrderHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;

  ${({ $status }) => {
    switch ($status) {
      case 'pending':    return 'background: #fff8e1; color: #f59e0b;';
      case 'confirmed':  return 'background: #e8f5e9; color: #2e7d32;';
      case 'paid':       return 'background: #e3f2fd; color: #1565c0;';
      case 'shipped':    return 'background: #f3e5f5; color: #6a1b9a;';
      case 'delivered':  return 'background: #f0fbf3; color: #068D27;';
      case 'cancelled':  return 'background: #fff5f5; color: #e53935;';
      default:           return 'background: #f0f0f0; color: #6b7c6e;';
    }
  }}
`;

export const ChevronIcon = styled.div`
  font-size: 12px;
  color: #b0bdb2;
  transform: rotate(${({ $open }) => $open ? '180deg' : '0deg'});
  transition: transform 0.2s ease;
`;

export const OrderBody = styled.div`
  padding: 20px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${BP.mobile}) {
    padding: 16px 20px 20px;
  }
`;

export const SectionTitle = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 10px;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: #f7f9f7;
  border-radius: 12px;
`;

export const ItemImage = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  flex-shrink: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-color: #e4ede6;
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0d1910;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const ItemMeta = styled.div`
  font-size: 12px;
  color: #6b7c6e;
  margin-top: 2px;
`;

export const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #0d1910;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBlock = styled.div`
  background: #f7f9f7;
  border-radius: 12px;
  padding: 14px 16px;
`;

export const InfoLabel = styled.div`
  font-size: 11px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  line-height: 1.5;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f7f9f7;
  border-radius: 12px;
  gap: 8px;
`;

export const TotalLabel = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: #0d1910;
`;

export const TotalValue = styled.span`
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  line-height: 1;
`;

export const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  color: #6b7c6e;
  margin: 0;
  max-width: 320px;
`;

export const EmptyBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  border-radius: 100px;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.15s, transform 0.1s;
  &:hover { background: #057020; }
  &:active { transform: scale(0.97); }
`;

export const Notice = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  background: ${p => p.$error ? '#fff5f5' : '#f0fbf3'};
  color: ${p => p.$error ? '#e53e3e' : '#068D27'};
  border: 1.5px solid ${p => p.$error ? '#fcc' : '#b2f0c2'};
`;

export const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
`;
