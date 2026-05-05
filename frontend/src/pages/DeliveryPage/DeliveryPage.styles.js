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
  top: 500px;
  left: -180px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(82, 188, 108, 0.25) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  @media (max-width: ${BP.tablet}) { display: none; }
`;
export const BlobRight = styled.div`
  position: absolute;
  top: 1800px;
  right: -150px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(6, 141, 39, 0.16) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  @media (max-width: ${BP.tablet}) { display: none; }
`;
export const Page = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 40px 0;
  @media (max-width: ${BP.laptop}) { padding: 40px 20px 0; }
  @media (max-width: ${BP.mobile}) { padding: 32px 16px 0; }
`;
export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 64px;
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
export const StepsSection = styled.div`
  margin-bottom: 80px;
`;
export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  text-align: center;
`;
export const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  line-height: 110%;
  color: #0d1910;
  margin: 0;
  @media (max-width: ${BP.tablet}) { font-size: 32px; }
  @media (max-width: ${BP.mobile}) { font-size: 26px; }
`;
export const SectionSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
  margin: 0;
  max-width: 480px;
  text-align: center;
  line-height: 150%;
`;
export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: ${BP.laptop}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${BP.mobile}) { grid-template-columns: 1fr; }
`;
export const StepCard = styled.div`
  background: ${({ $dark }) => ($dark ? '#068d27' : '#f2f2f2')};
  border: 1px solid ${({ $dark }) => ($dark ? 'transparent' : '#bebebe')};
  border-radius: 32px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const StepNumber = styled.span`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.6)' : '#aaa')};
`;
export const StepEmoji = styled.span`
  font-size: 36px;
  line-height: 1;
`;
export const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? '#ffffff' : '#0d1910')};
  margin: 0;
  line-height: 130%;
`;
export const StepDesc = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.8)' : '#3a3a3a')};
  margin: 0;
  line-height: 150%;
`;
export const ZonesSection = styled.div`
  margin-bottom: 80px;
`;
export const ZonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: ${BP.tablet}) { grid-template-columns: 1fr; }
`;
export const ZoneCard = styled.div`
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 32px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const ZoneTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ZoneEmoji = styled.span`
  font-size: 40px;
  line-height: 1;
`;
export const ZoneName = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0d1910;
  margin: 0;
`;
export const ZoneRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ZoneRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
`;
export const ZoneRowLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #888;
`;
export const ZoneRowValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0d1910;
  text-align: right;
`;
export const ZonePrice = styled.span`
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
export const PaySection = styled.div`
  margin-bottom: 80px;
`;
export const PayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: ${BP.tablet}) { grid-template-columns: 1fr; }
`;
export const PayCard = styled.div`
  background: ${({ $dark }) => ($dark ? '#068d27' : '#f2f2f2')};
  border: 1px solid ${({ $dark }) => ($dark ? 'transparent' : '#bebebe')};
  border-radius: 32px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const PayIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.15)' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
`;
export const PayTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ $dark }) => ($dark ? '#ffffff' : '#0d1910')};
  margin: 0;
`;
export const PayDesc = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 160%;
  color: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.85)' : '#3a3a3a')};
  margin: 0;
`;
export const PayBadge = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.2)' : 'rgba(6,141,39,0.1)')};
  color: ${({ $dark }) => ($dark ? '#ffffff' : '#068d27')};
`;
export const GuaranteesSection = styled.div`
  margin-bottom: 80px;
`;
export const GuaranteesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: ${BP.tablet}) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: ${BP.mobile}) { grid-template-columns: 1fr; }
`;
export const GuaranteeCard = styled.div`
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 24px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const GuaranteeEmoji = styled.span`
  font-size: 32px;
  line-height: 1;
`;
export const GuaranteeTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #0d1910;
  margin: 0;
`;
export const GuaranteeDesc = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #3a3a3a;
  margin: 0;
  line-height: 150%;
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
