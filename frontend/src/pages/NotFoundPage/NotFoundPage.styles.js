import styled from 'styled-components';

const BP = {
  mobile: '560px',
  tablet: '900px',
};

export const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Blob = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(82, 188, 108, 0.22) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${BP.tablet}) {
    width: 400px;
    height: 400px;
  }
`;

export const Page = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  gap: 0;

  @media (max-width: ${BP.mobile}) {
    padding: 40px 20px;
    min-height: calc(100vh - 60px);
  }
`;

export const Code = styled.div`
  font-size: 180px;
  font-weight: 800;
  line-height: 1;
  color: #0d1910;
  letter-spacing: -0.05em;
  user-select: none;

  em {
    font-style: normal;
    color: #068d27;
  }

  @media (max-width: ${BP.tablet}) { font-size: 120px; }
  @media (max-width: ${BP.mobile}) { font-size: 80px; }
`;

export const Snake = styled.div`
  font-size: 80px;
  line-height: 1;
  margin: 8px 0 24px;
  animation: wiggle 2.4s ease-in-out infinite;

  @keyframes wiggle {
    0%, 100% { transform: rotate(-6deg); }
    50%       { transform: rotate(6deg); }
  }

  @media (max-width: ${BP.mobile}) { font-size: 56px; }
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #0d1910;
  margin: 0 0 12px;
  line-height: 110%;

  @media (max-width: ${BP.tablet}) { font-size: 30px; }
  @media (max-width: ${BP.mobile}) { font-size: 24px; }
`;

export const Desc = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
  margin: 0 0 40px;
  max-width: 420px;
  line-height: 155%;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  background: #068d27;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 37px;
  white-space: nowrap;
  transition: background 0.15s, transform 0.1s;

  &:hover { background: #057020; }
  &:active { transform: scale(0.97); }
`;

export const ButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  background: transparent;
  color: #1a1a1a;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 37px;
  border: 2px solid #d0d0d0;
  white-space: nowrap;
  transition: border-color 0.15s, color 0.15s, transform 0.1s;

  &:hover { border-color: #068d27; color: #068d27; }
  &:active { transform: scale(0.97); }
`;
