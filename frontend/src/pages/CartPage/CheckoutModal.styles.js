import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(32px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const BP = { mobile: '560px', xs: '420px' };

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease both;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 28px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.25s ease both;
  scrollbar-width: thin;
  scrollbar-color: #d0d0d0 transparent;

  @media (max-width: ${BP.mobile}) {
    border-radius: 20px;
    max-height: 95vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 28px 20px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
  border-radius: 28px 28px 0 0;

  @media (max-width: ${BP.mobile}) {
    padding: 20px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;

  @media (max-width: ${BP.xs}) { font-size: 18px; }
`;

export const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border: 1.5px solid #e0e0e0;
  border-radius: 50%;
  background: none;
  font-size: 18px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.13s, color 0.13s;
  &:hover { border-color: #1a1a1a; color: #1a1a1a; }
`;

export const ModalBody = styled.div`
  padding: 24px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${BP.mobile}) {
    padding: 20px;
    gap: 20px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 800;
  color: #6b7c6e;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin: 0;
`;

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AddressCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid ${({ $active }) => $active ? '#068d27' : '#e0e0e0'};
  border-radius: 14px;
  cursor: pointer;
  background: ${({ $active }) => $active ? '#f0fbf3' : '#fff'};
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${({ $active }) => $active ? '#068d27' : '#b0b0b0'};
  }
`;

export const AddressRadio = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => $active ? '#068d27' : '#ccc'};
  background: ${({ $active }) => $active ? '#068d27' : '#fff'};
  flex-shrink: 0;
  margin-top: 2px;
  transition: border-color 0.13s, background 0.13s;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    display: ${({ $active }) => $active ? 'block' : 'none'};
  }
`;

export const AddressInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AddressLine = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0d1910;
  line-height: 1.4;
`;

export const AddressSub = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7c6e;
  margin-top: 2px;
`;

export const DefaultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: rgba(82, 188, 108, 0.25);
  border-radius: 40px;
  font-size: 11px;
  font-weight: 800;
  color: #068d27;
  margin-left: 8px;
`;

export const PaymentList = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: ${BP.xs}) {
    flex-direction: column;
  }
`;

export const PaymentCard = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid ${({ $active }) => $active ? '#068d27' : '#e0e0e0'};
  border-radius: 14px;
  cursor: pointer;
  background: ${({ $active }) => $active ? '#f0fbf3' : '#fff'};
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${({ $active }) => $active ? '#068d27' : '#b0b0b0'};
  }
`;

export const PaymentIcon = styled.div`
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
`;

export const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PaymentName = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #0d1910;
`;

export const PaymentSub = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6b7c6e;
`;

export const OrderSummary = styled.div`
  background: #f7f9f7;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SummaryLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6b7c6e;
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const SummaryValue = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #0d1910;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const SummaryDivider = styled.div`
  height: 1px;
  background: #e8ede9;
  margin: 4px 0;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 14px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  resize: vertical;
  min-height: 80px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
  &::placeholder { color: #b0bdb2; }
  &:focus { border-color: #068d27; }
`;

export const ConfirmBtn = styled.button`
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

export const ErrorNotice = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  background: #fff5f5;
  color: #e53e3e;
  border: 1.5px solid #fcc;
`;

export const EmptyAddresses = styled.div`
  padding: 16px;
  border-radius: 14px;
  border: 1.5px dashed #d0d0d0;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #6b7c6e;
`;

export const AddAddressLink = styled.a`
  font-size: 13px;
  font-weight: 700;
  color: #068d27;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
