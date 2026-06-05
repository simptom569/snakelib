import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const BP = { mobile: '560px', xs: '420px', tablet: '940px', laptop: '1200px' };

export const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 40px 80px;
  animation: ${fadeUp} 0.4s ease both;
  @media (max-width: ${BP.laptop}) { padding: 40px 20px 60px; }
  @media (max-width: ${BP.mobile}) { padding: 32px 16px 48px; }
  @media (max-width: ${BP.xs}) { padding: 24px 12px 40px; }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 48px;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: rgba(82, 188, 108, 0.4);
  border-radius: 40px;
  font-size: 16px;
  font-weight: 700;
  color: #006e1b;
`;

export const PageTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  text-align: center;
  @media (max-width: ${BP.laptop}) { font-size: 48px; }
  @media (max-width: ${BP.tablet}) { font-size: 36px; }
  @media (max-width: ${BP.mobile}) { font-size: 28px; }
  @media (max-width: ${BP.xs}) { font-size: 24px; }
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #0d1910;
  text-align: center;
  margin: 0;
  max-width: 500px;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: ${BP.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CartItem = styled.div`
  display: flex;
  gap: 20px;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 24px;
  padding: 20px;
  transition: box-shadow 0.15s ease;
  &:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
  @media (max-width: ${BP.mobile}) {
    flex-direction: column;
    gap: 14px;
  }
  @media (max-width: ${BP.xs}) {
    padding: 14px;
    border-radius: 18px;
    gap: 10px;
  }
`;

export const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  flex-shrink: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
  @media (max-width: ${BP.mobile}) {
    width: 100%;
    height: 180px;
  }
  @media (max-width: ${BP.xs}) {
    height: 140px;
  }
`;

export const ItemBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const ItemName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0d1910;
  margin: 0;
  overflow-wrap: break-word;
  word-break: break-word;
  @media (max-width: ${BP.xs}) { font-size: 17px; }
`;

export const ItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 600;
  color: #3a3a3a;
  background: #fff;
  white-space: nowrap;
`;

export const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  flex-wrap: wrap;
  @media (max-width: ${BP.xs}) {
    gap: 8px;
  }
`;

export const ItemPrice = styled.span`
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
  @media (max-width: ${BP.xs}) { font-size: 18px; }
`;

export const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  background: #fff;
  border: 1.5px solid #d0d0d0;
  border-radius: 40px;
  overflow: hidden;
`;

export const QtyBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.13s;
  flex-shrink: 0;
  &:hover { background: #f5f5f5; }
  &:active { background: #ebebeb; }
  &:disabled { color: #ccc; cursor: not-allowed; }
`;

export const QtyValue = styled.span`
  min-width: 32px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1.5px solid #d0d0d0;
  border-radius: 40px;
  background: none;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #888;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.13s, color 0.13s;
  &:hover { border-color: #c00; color: #c00; }
`;

export const Summary = styled.div`
  background: #fff;
  border: 1px solid #bebebe;
  border-radius: 24px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 88px;
  @media (max-width: ${BP.tablet}) {
    position: static;
  }
`;

export const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SummaryLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #6b7c6e;
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const SummaryValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0d1910;
  white-space: nowrap;
  text-align: right;
  flex-shrink: 0;
`;

export const PromoApplied = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background: ${({ $invalid }) => $invalid ? '#fff5f5' : '#f0fbf3'};
  border: 1.5px solid ${({ $invalid }) => $invalid ? '#ffb3b3' : '#b2f0c2'};
`;

export const PromoAppliedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PromoAppliedCode = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #068D27;
  letter-spacing: 0.5px;
  opacity: ${({ $invalid }) => $invalid ? 0.6 : 1};
`;

export const PromoAppliedSub = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6b7c6e;
`;

export const PromoRemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: none;
  color: #aaa;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.13s, color 0.13s;
  &:hover { background: #ffeaea; color: #c00; }
`;

export const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: #0d1910;
`;

export const TotalValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const CheckoutBtn = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
  &:hover { background: #057020; }
  &:active { transform: scale(0.98); }
  &:disabled { background: #d0d0d0; cursor: not-allowed; }
`;

export const ContinueBtn = styled.a`
  display: block;
  text-align: center;
  padding: 13px;
  border: 1.5px solid #d0d0d0;
  border-radius: 16px;
  background: none;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #6b7c6e;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.13s, color 0.13s;
  &:hover { border-color: #1a1a1a; color: #1a1a1a; }
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
  font-size: 72px;
  line-height: 1;
`;

export const EmptyTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
`;

export const EmptyText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #6b7c6e;
  margin: 0;
  max-width: 360px;
`;

export const EmptyBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: 100px;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.1s ease;
  &:hover { background: #057020; }
  &:active { transform: scale(0.97); }
`;

export const PromoRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const PromoInput = styled.input`
  flex: 1;
  min-width: 0;
  width: 0;
  padding: 11px 16px;
  border: 1.5px solid ${p => p.$error ? '#e53935' : p.$ok ? '#068d27' : '#d0d0d0'};
  border-radius: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #0d1910;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  &::placeholder { color: #b0bdb2; }
  &:focus { border-color: #068d27; }
`;

export const PromoBtn = styled.button`
  padding: 11px 18px;
  border: none;
  border-radius: 12px;
  background: #1a1a1a;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
  &:hover { background: #333; }
`;

export const PromoNotice = styled.div`
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: ${p => p.$error ? '#fff5f5' : '#f0fbf3'};
  color: ${p => p.$error ? '#e53e3e' : '#068D27'};
  border: 1.5px solid ${p => p.$error ? '#fcc' : '#b2f0c2'};
`;
