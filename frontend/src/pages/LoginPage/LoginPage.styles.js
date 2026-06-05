import styled, { keyframes } from 'styled-components';

const BP = {
  mobile: '560px',
  tablet: '900px',
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  background: #F9FCFA;
`;

export const Left = styled.div`
  position: relative;
  flex: 0 0 48%;
  background: linear-gradient(160deg, #0d3d1a 0%, #068D27 55%, #52bc6c 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;

export const LeftBlob = styled.div`
  position: absolute;
  top: -80px;
  left: -80px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  pointer-events: none;
`;

export const LeftBlob2 = styled.div`
  position: absolute;
  bottom: 120px;
  right: -60px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  pointer-events: none;
`;

export const SnakeImage = styled.img`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 78%;
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
`;

export const LeftCaption = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  padding: 0 40px;
  z-index: 2;
  color: #fff;
`;

export const LeftTag = styled.span`
  display: inline-block;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;

export const LeftTitle = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 900;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 10px;

  em {
    font-style: normal;
    color: #b9f5c8;
  }
`;

export const LeftSub = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.75);
  line-height: 1.55;
  max-width: 320px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  animation: ${fadeUp} 0.4s ease both;

  @media (max-width: ${BP.mobile}) {
    padding: 32px 20px;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
`;

export const CardTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 900;
  color: #0d1910;
  margin-bottom: 6px;

  em {
    font-style: normal;
    color: #068D27;
  }
`;

export const CardSub = styled.p`
  font-size: 14px;
  color: #6b7c6e;
  line-height: 1.55;
  margin-bottom: 32px;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0;
  background: #eef5f0;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 28px;
`;

export const TabBtn = styled.button`
  flex: 1;
  padding: 9px 0;
  border: none;
  border-radius: 9px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;

  background: ${p => p.$active ? '#ffffff' : 'transparent'};
  color: ${p => p.$active ? '#068D27' : '#6b7c6e'};
  box-shadow: ${p => p.$active ? '0 1px 6px rgba(0,0,0,0.10)' : 'none'};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #2e3d30;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: ${p => p.$hasIcon ? '44px' : '16px'};
  border: 1.5px solid ${p => p.$error ? '#e53935' : '#dce8de'};
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  color: #0d1910;
  background: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #b0bdb2;
  }

  &:focus {
    border-color: #068D27;
    box-shadow: 0 0 0 3px rgba(6,141,39,0.12);
  }
`;

export const EyeBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7a9e80;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover { color: #068D27; }
`;

export const ForgotLink = styled.a`
  font-size: 12px;
  color: #068D27;
  text-decoration: none;
  text-align: right;
  font-weight: 700;

  &:hover { text-decoration: underline; }
`;

export const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #068D27 0%, #04a82e 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.2s, transform 0.15s;

  &:hover { opacity: 0.92; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b0bdb2;
  font-size: 12px;
  margin: 4px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e4ede6;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 0;
  border: 1.5px solid #dce8de;
  border-radius: 10px;
  background: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #2e3d30;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: #068D27;
    background: #f4fbf5;
  }
`;

export const BottomText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #6b7c6e;
  margin-top: 20px;

  a {
    color: #068D27;
    font-weight: 800;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export const Privacy = styled.p`
  font-size: 11px;
  color: #b0bdb2;
  text-align: center;
  line-height: 1.5;

  a {
    color: #068D27;
    text-decoration: underline;
  }
`;
