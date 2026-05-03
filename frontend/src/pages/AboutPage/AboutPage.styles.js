import styled from 'styled-components';

const BP = {
  mobile: '560px',
  tablet: '900px',
  laptop: '1200px',
};

/* ─── Outer wrapper (clips decorations) ─────────────────── */

export const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

/* большое размытое пятно слева у секции ценностей */
export const BlobLeft = styled.div`
  position: absolute;
  top: 1200px;
  left: -160px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(82, 188, 108, 0.28) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;

/* пятно справа у секции команды */
export const BlobRight = styled.div`
  position: absolute;
  top: 2100px;
  right: -140px;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(6, 141, 39, 0.18) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${BP.tablet}) {
    display: none;
  }
`;

/* ─── Page shell ────────────────────────────────────────── */

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

/* ─── Page header ───────────────────────────────────────── */

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 72px;
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
  max-width: 600px;
  line-height: 150%;
`;

/* ─── Mission block ─────────────────────────────────────── */

export const MissionBlock = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: ${BP.tablet}) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const MissionText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionLabel = styled.p`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #068d27;
  margin: 0;
  text-transform: uppercase;
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

export const SectionDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;
  color: #3a3a3a;
  margin: 0;
`;

export const MissionVisual = styled.div`
  flex-shrink: 0;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: ${BP.laptop}) {
    width: 320px;
  }

  @media (max-width: ${BP.tablet}) {
    width: 100%;
  }
`;

export const MissionCard = styled.div`
  background: ${({ $dark }) => ($dark ? '#068d27' : '#f2f2f2')};
  border: 1px solid ${({ $dark }) => ($dark ? 'transparent' : '#bebebe')};
  border-radius: 24px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const MissionCardEmoji = styled.span`
  font-size: 36px;
  line-height: 1;
  flex-shrink: 0;
`;

export const MissionCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MissionCardTitle = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: ${({ $dark }) => ($dark ? '#ffffff' : '#0d1910')};
  line-height: 1;
`;

export const MissionCardLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.75)' : '#888')};
  line-height: 1.3;
`;

/* ─── Stats row ─────────────────────────────────────────── */

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 80px;

  @media (max-width: ${BP.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${({ $dark }) => ($dark ? '#068d27' : '#f2f2f2')};
  border: 1px solid ${({ $dark }) => ($dark ? 'transparent' : '#bebebe')};
  border-radius: 32px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;

  @media (max-width: ${BP.mobile}) {
    padding: 24px 18px;
    border-radius: 24px;
  }
`;

export const StatNumber = styled.span`
  font-size: 48px;
  font-weight: 800;
  line-height: 100%;
  color: ${({ $dark }) => ($dark ? '#ffffff' : '#0d1910')};

  @media (max-width: ${BP.mobile}) {
    font-size: 36px;
  }
`;

export const StatLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $dark }) => ($dark ? 'rgba(255,255,255,0.8)' : '#888')};
  line-height: 130%;
`;

/* ─── Values grid ───────────────────────────────────────── */

export const ValuesSection = styled.div`
  margin-bottom: 80px;
`;

export const ValuesSectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  text-align: center;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${BP.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ValueCard = styled.div`
  background: ${({ $bg }) => $bg || '#f2f2f2'};
  border: 1px solid #bebebe;
  border-radius: 32px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ValueIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${({ $iconBg }) => $iconBg || '#ffffff'};
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  flex-shrink: 0;
`;

export const ValueTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ $color }) => $color || '#0d1910'};
  margin: 0;
`;

export const ValueDesc = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 150%;
  color: ${({ $color }) => $color || '#3a3a3a'};
  margin: 0;
`;

/* ─── Team section ──────────────────────────────────────── */

export const TeamSection = styled.div`
  margin-bottom: 80px;
`;

export const TeamHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  text-align: center;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${BP.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${BP.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const TeamCard = styled.div`
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 32px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

export const TeamAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || '#068d27'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
`;

export const TeamName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0d1910;
  margin: 0;
`;

export const TeamRole = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #068d27;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TeamDesc = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #888;
  margin: 0;
  line-height: 140%;
`;

/* ─── CTA block ─────────────────────────────────────────── */

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
  max-width: 520px;
  line-height: 150%;
`;

export const CtaButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  background: #ffffff;
  color: #068d27;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 37px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: #f0fff4;
  }

  &:active {
    transform: scale(0.97);
  }
`;
