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

export const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.07);
  overflow: hidden;
  margin-bottom: 24px;
`;

export const CardHeader = styled.div`
  padding: 24px 28px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${BP.mobile}) {
    padding: 20px;
  }
`;

export const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #068D27 0%, #04a82e 100%);
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardHeaderText = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #0d1910;
`;

export const UserEmail = styled.div`
  font-size: 13px;
  color: #6b7c6e;
  margin-top: 2px;
`;

export const CardBody = styled.div`
  padding: 28px;

  @media (max-width: ${BP.mobile}) {
    padding: 20px;
  }
`;

export const SectionTitle = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #2e3d30;
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full { grid-column: 1 / -1; }
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #2e3d30;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid ${p => p.$error ? '#e53935' : '#dce8de'};
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: #0d1910;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &::placeholder { color: #b0bdb2; }

  &:focus {
    border-color: #068D27;
    box-shadow: 0 0 0 3px rgba(6,141,39,0.12);
  }

  &:disabled {
    background: #f7f9f7;
    color: #9ab09e;
    cursor: not-allowed;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;

  @media (max-width: ${BP.mobile}) {
    flex-direction: column-reverse;
  }
`;

export const SaveBtn = styled.button`
  padding: 13px 32px;
  background: linear-gradient(135deg, #068D27 0%, #04a82e 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;

  &:hover { opacity: 0.9; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  @media (max-width: ${BP.mobile}) {
    width: 100%;
  }
`;

export const CancelBtn = styled.button`
  padding: 13px 24px;
  background: transparent;
  color: #6b7c6e;
  border: 1.5px solid #dce8de;
  border-radius: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover { border-color: #1a1a1a; color: #1a1a1a; }

  @media (max-width: ${BP.mobile}) {
    width: 100%;
  }
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

export const PassDivider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 28px 0;
`;

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const AddressCard = styled.div`
  border: 1.5px solid ${p => p.$default ? '#068D27' : '#dce8de'};
  border-radius: 14px;
  padding: 16px 20px;
  background: ${p => p.$default ? '#f0fbf3' : '#fafafa'};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AddressLine = styled.div`
  font-size: 14px;
  color: #2e3d30;
  font-weight: 600;
`;

export const AddressSub = styled.div`
  font-size: 13px;
  color: #6b7c6e;
`;

export const AddressCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const AddressDefaultBadge = styled.span`
  flex-shrink: 0;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 800;
  color: #068D27;
  background: #d4f7df;
  border-radius: 20px;
  padding: 4px 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const AddressActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const AddrBtn = styled.button`
  padding: 7px 16px;
  border-radius: 9px;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid ${p => p.$danger ? '#fcc' : '#dce8de'};
  background: ${p => p.$danger ? '#fff5f5' : '#fff'};
  color: ${p => p.$danger ? '#e53935' : '#2e3d30'};
  transition: opacity 0.15s;
  &:hover { opacity: 0.75; }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const AddressForm = styled.div`
  border: 1.5px dashed #b2d9bc;
  border-radius: 14px;
  padding: 20px;
  background: #f9fdf9;
`;

export const AddressFormTitle = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #2e3d30;
  margin-bottom: 14px;
`;

export const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #2e3d30;
  cursor: pointer;
  margin-top: 4px;
`;

export const AddAddrBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 20px;
  border: 1.5px dashed #b2d9bc;
  border-radius: 12px;
  background: transparent;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #068D27;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #f0fbf3; }
`;
