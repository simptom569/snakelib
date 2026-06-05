import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const BP = { mobile: '560px', tablet: '900px', laptop: '1200px' };

export const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  animation: ${fadeUp} 0.35s ease both;
  @media (max-width: ${BP.laptop}) { padding: 36px 20px 60px; }
  @media (max-width: ${BP.mobile}) { padding: 24px 16px 48px; }
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 32px;
  font-size: 13px;
  font-weight: 600;
  color: #888;
  flex-wrap: wrap;
`;

export const BreadcrumbLink = styled.a`
  color: #888;
  text-decoration: none;
  transition: color 0.13s;
  &:hover { color: #068d27; }
`;

export const BreadcrumbSep = styled.span`
  color: #ccc;
`;

export const BreadcrumbCurrent = styled.span`
  color: #1a1a1a;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: flex-start;
  @media (max-width: ${BP.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

/* ─── Gallery ─── */

export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 88px;
  @media (max-width: ${BP.tablet}) { position: static; }
`;

export const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 28px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-color: #e8e8e8;
  position: relative;
  overflow: hidden;
  transition: background-image 0.25s ease;
`;

export const AvailBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 700;
  background: ${({ $avail }) => ($avail ? 'rgba(6,141,39,0.88)' : 'rgba(40,40,40,0.75)')};
  color: #fff;
  backdrop-filter: blur(4px);
  &::before {
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $avail }) => ($avail ? '#7dffaa' : '#bbb')};
    flex-shrink: 0;
  }
`;

export const TagBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid ${({ $border }) => $border};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  backdrop-filter: blur(4px);
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Thumb = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 14px;
  border: 2.5px solid ${({ $active }) => ($active ? '#068d27' : 'transparent')};
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s, transform 0.12s;
  &:hover { border-color: #068d27; transform: scale(1.05); }
`;

/* ─── Info panel ─── */

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const CategoryLabel = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(82, 188, 108, 0.4);
  border-radius: 40px;
  font-size: 13px;
  font-weight: 700;
  color: #006e1b;
`;

export const SkuLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #aaa;
`;

export const SnakeName = styled.h1`
  font-size: 42px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
  line-height: 110%;
  @media (max-width: ${BP.laptop}) { font-size: 34px; }
  @media (max-width: ${BP.mobile}) { font-size: 28px; }
`;

export const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StatPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border: 1px solid #d0d0d0;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 600;
  color: #3a3a3a;
  background: #fff;
  white-space: nowrap;
`;

export const SkillPill = styled(StatPill)`
  border-color: ${({ $level }) =>
    $level === 1 ? '#b2e8bc' : $level === 2 ? '#f5d6a0' : '#d9b0f0'};
  background: ${({ $level }) =>
    $level === 1 ? '#f0fbf3' : $level === 2 ? '#fdf5e6' : '#f8f0fd'};
  color: ${({ $level }) =>
    $level === 1 ? '#068d27' : $level === 2 ? '#c56300' : '#9b30c5'};
`;

export const Desc = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 160%;
  color: #3a3a3a;
  margin: 0;
`;

/* ─── Morphs ─── */

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  margin: 0;
`;

export const MorphGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const MorphChip = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 40px;
  border: 2px solid ${({ $active }) => ($active ? '#068d27' : '#d0d0d0')};
  background: ${({ $active }) => ($active ? '#068d27' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#1a1a1a')};
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.13s, border-color 0.13s, color 0.13s;
  &:hover {
    border-color: #068d27;
    background: ${({ $active }) => ($active ? '#057020' : 'rgba(6,141,39,0.07)')};
    color: ${({ $active }) => ($active ? '#fff' : '#068d27')};
  }
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const MorphDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.1);
`;

export const MorphDesc = styled.div`
  padding: 14px 18px;
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  color: #3a3a3a;
  line-height: 150%;
`;

/* ─── Price & buy ─── */

export const PriceBlock = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 24px;
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
`;

export const PriceLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PriceLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
`;

export const Price = styled.span`
  font-size: 38px;
  font-weight: 800;
  line-height: 100%;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const PriceModNote = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $positive }) => ($positive ? '#068d27' : '#c56300')};
`;

export const BuyBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  border: none;
  border-radius: 100px;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;
  &:hover { background: #057020; }
  &:active { transform: scale(0.97); }
  &:disabled { background: #d0d0d0; cursor: not-allowed; }
`;

/* ─── Characteristics ─── */

export const CharGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: ${BP.mobile}) { grid-template-columns: 1fr; }
`;

export const CharCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
`;

export const CharLabel = styled.span`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #aaa;
`;

export const CharValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0d1910;
`;

/* ─── Divider ─── */

export const Divider = styled.div`
  height: 1px;
  background: #ebebeb;
`;

/* ─── Loading / Error ─── */

export const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 100px 20px;
  text-align: center;
`;

export const CenterIcon = styled.div`
  font-size: 64px;
  line-height: 1;
`;

export const CenterTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0d1910;
  margin: 0;
`;

export const CenterText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #6b7c6e;
  margin: 0;
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  border-radius: 100px;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.15s;
  &:hover { background: #057020; }
`;

export const AddedNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #f0fbf3;
  border: 1.5px solid #b2f0c2;
  font-size: 14px;
  font-weight: 700;
  color: #068d27;
`;
