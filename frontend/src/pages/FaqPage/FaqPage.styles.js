import styled from 'styled-components';
const BP = {
  mobile: '560px',
  tablet: '900px',
  laptop: '1200px',
};
export const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
export const BlobLeft = styled.div`
  position: absolute;
  top: 600px;
  left: -180px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(82, 188, 108, 0.25) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;
export const BlobRight = styled.div`
  position: absolute;
  top: 1600px;
  right: -150px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(6, 141, 39, 0.16) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;
export const Page = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 40px 0;
  @media (max-width: ${BP.laptop}) {
    padding: 40px 20px 0;
  }
  @media (max-width: ${BP.mobile}) {
    padding: 32px 16px 0;
  }
`;
export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 56px;
  text-align: center;
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
  em {
    font-style: normal;
    color: #068d27;
  }
  @media (max-width: ${BP.laptop}) { font-size: 48px; }
  @media (max-width: ${BP.tablet}) { font-size: 36px; }
  @media (max-width: ${BP.mobile}) { font-size: 28px; }
`;
export const PageSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #0d1910;
  text-align: center;
  margin: 0;
  max-width: 560px;
  line-height: 150%;
`;
export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 40px;
`;
export const Tab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 40px;
  border: 1.5px solid ${({ $active }) => ($active ? '#068d27' : '#d0d0d0')};
  background: ${({ $active }) => ($active ? '#068d27' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#1a1a1a')};
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
  &:hover {
    border-color: #068d27;
    background: ${({ $active }) => ($active ? '#057020' : 'rgba(6,141,39,0.07)')};
    color: ${({ $active }) => ($active ? '#fff' : '#068d27')};
  }
  &:active { transform: scale(0.97); }
`;
export const TabEmoji = styled.span`
  font-size: 16px;
  line-height: 1;
`;
export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 80px;
`;
export const FaqItem = styled.div`
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 24px;
  overflow: hidden;
  transition: background 0.25s, border-color 0.25s;
  &[data-state='open'] {
    background: #068d27;
    border-color: transparent;
  }
`;
export const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Nunito', sans-serif;
`;
export const QuestionText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #0d1910;
  line-height: 130%;
  transition: color 0.25s;
  ${FaqItem}[data-state='open'] & {
    color: #ffffff;
  }
  @media (max-width: ${BP.mobile}) {
    font-size: 15px;
  }
`;
export const ChevronWrap = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  svg {
    stroke: #1a1a1a;
    transition: stroke 0.25s;
  }
  ${FaqItem}[data-state='open'] & {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(180deg);
    svg { stroke: #ffffff; }
  }
`;
export const FaqAnswer = styled.div`
  overflow: hidden;
  &[data-state='open'] {
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &[data-state='closed'] {
    animation: slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideDown {
    from { height: 0; }
    to   { height: var(--radix-accordion-content-height); }
  }
  @keyframes slideUp {
    from { height: var(--radix-accordion-content-height); }
    to   { height: 0; }
  }
`;
export const AnswerInner = styled.div`
  padding: 0 28px 24px;
`;
export const AnswerText = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 160%;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;
export const CtaBlock = styled.div`
  background: #068d27;
  border-radius: 40px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  @media (max-width: ${BP.mobile}) {
    padding: 40px 24px;
    border-radius: 28px;
  }
`;
export const CtaTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 110%;
  @media (max-width: ${BP.tablet}) { font-size: 32px; }
  @media (max-width: ${BP.mobile}) { font-size: 26px; }
`;
export const CtaDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  max-width: 480px;
  line-height: 150%;
`;
export const CtaButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;
export const CtaButtonPrimary = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 36px;
  background: #ffffff;
  color: #068d27;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 37px;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;
  &:hover { background: #f0fff4; }
  &:active { transform: scale(0.97); }
`;
export const CtaButtonSecondary = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 36px;
  background: transparent;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 37px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease;
  &:hover {
    border-color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
  &:active { transform: scale(0.97); }
`;
