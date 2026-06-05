import styled from 'styled-components';
const BP = {
  mobile: '560px',
  tablet: '900px',
  laptop: '1200px',
};
export const Page = styled.div`
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
`;
export const PageSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #0d1910;
  text-align: center;
  margin: 0;
  max-width: 600px;
`;
export const Layout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  @media (max-width: ${BP.tablet}) {
    flex-direction: column;
  }
`;
export const Sidebar = styled.aside`
  width: 272px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 88px;
  @media (max-width: ${BP.tablet}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    width: 100%;
    position: static;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    padding: 20px;
  }
`;
export const FilterSection = styled.div`
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const FilterTitle = styled.p`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #888;
  margin: 0;
`;
export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
export const Chip = styled.button`
  padding: 7px 14px;
  border-radius: 40px;
  border: 1.5px solid ${({ $active }) => ($active ? '#068d27' : '#d0d0d0')};
  background: ${({ $active }) => ($active ? '#068d27' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#1a1a1a')};
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.13s, color 0.13s, border-color 0.13s;
  &:hover {
    border-color: #068d27;
    background: ${({ $active }) => ($active ? '#057020' : 'rgba(6,141,39,0.07)')};
    color: ${({ $active }) => ($active ? '#fff' : '#068d27')};
  }
  &:active { transform: scale(0.97); }
`;
export const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 10px;
`;
export const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;
export const ToggleTrack = styled.div`
  width: 42px;
  height: 24px;
  border-radius: 40px;
  background: ${({ $on }) => ($on ? '#068d27' : '#d0d0d0')};
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? '21px' : '3px')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.18);
  }
`;
export const RangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const TrackWrap = styled.div`
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
`;
export const TrackBg = styled.div`
  position: absolute;
  left: 0; right: 0;
  height: 4px;
  border-radius: 4px;
  background: #d0d0d0;
  pointer-events: none;
`;
export const TrackFill = styled.div`
  position: absolute;
  height: 4px;
  border-radius: 4px;
  background: #068d27;
  pointer-events: none;
  left: ${({ $left }) => $left}%;
  right: ${({ $right }) => $right}%;
`;
export const RangeInput = styled.input`
  position: absolute;
  width: 100%;
  height: 4px;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  pointer-events: none;
  &::-webkit-slider-thumb {
    appearance: none;
    pointer-events: all;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #068d27;
    border: 2px solid #fff;
    box-shadow: 0 1px 5px rgba(0,0,0,0.22);
    transition: transform 0.1s;
    cursor: grab;
    &:active { transform: scale(1.15); cursor: grabbing; }
  }
  &::-moz-range-thumb {
    pointer-events: all;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #068d27;
    border: 2px solid #fff;
    box-shadow: 0 1px 5px rgba(0,0,0,0.22);
    cursor: grab;
  }
`;
export const RangeInputsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const RangeNumberInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1.5px solid #d0d0d0;
  background: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  outline: none;
  transition: border-color 0.13s;
  &:focus { border-color: #068d27; }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { appearance: none; margin: 0; }
  -moz-appearance: textfield;
`;
export const RangeSep = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #aaa;
  flex-shrink: 0;
`;
export const ResetBtn = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  border: 1.5px solid #d0d0d0;
  background: transparent;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #888;
  cursor: pointer;
  transition: border-color 0.13s, color 0.13s;
  &:hover {
    border-color: #c00;
    color: #c00;
  }
`;
export const MobileFilterBtn = styled.button`
  display: none;
  @media (max-width: ${BP.tablet}) {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 40px;
    border: 1.5px solid #bebebe;
    background: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.13s;
    &:hover { border-color: #068d27; color: #068d27; }
  }
`;
export const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;
export const ResultCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #888;
  strong {
    color: #0d1910;
    font-weight: 800;
  }
`;
export const SortWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;
export const SortSelect = styled.select`
  appearance: none;
  padding: 9px 36px 9px 16px;
  border-radius: 40px;
  border: 1.5px solid #d0d0d0;
  background: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  cursor: pointer;
  outline: none;
  transition: border-color 0.13s;
  &:hover, &:focus { border-color: #068d27; }
`;
export const SortIcon = styled.span`
  position: absolute;
  right: 14px;
  pointer-events: none;
  font-size: 11px;
  color: #888;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: ${BP.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${BP.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${BP.mobile}) {
    grid-template-columns: 1fr;
  }
`;
export const Empty = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  color: #aaa;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;
export const Card = styled.article`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 32px;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;
export const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
`;
export const AvailBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $avail }) => ($avail ? 'rgba(6,141,39,0.88)' : 'rgba(40,40,40,0.75)')};
  color: #fff;
  backdrop-filter: blur(4px);
  &::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $avail }) => ($avail ? '#7dffaa' : '#bbb')};
    flex-shrink: 0;
  }
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  flex: 1;
`;
export const Name = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
`;
export const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
export const StatPill = styled.span`
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
export const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const Stars = styled.span`
  display: inline-flex;
  gap: 1px;
  font-size: 13px;
  color: ${({ $level }) =>
    $level === 1 ? '#068d27' : $level === 2 ? '#c56300' : '#9b30c5'};
`;
export const SkillLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ $level }) =>
    $level === 1 ? '#068d27' : $level === 2 ? '#c56300' : '#9b30c5'};
`;
export const ColorRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 40px;
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  color: #3a3a3a;
  align-self: flex-start;
`;
export const Desc = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 150%;
  color: #4a4a4a;
  margin: 0;
  flex: 1;
`;
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
`;
export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
export const PriceLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
export const Price = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
export const BuyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 40px;
  border: none;
  background: #068d27;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
  transition: background 0.15s ease, transform 0.1s ease;
  white-space: nowrap;
  &:hover:not(:disabled) { background: #057020; }
  &:active:not(:disabled) { transform: scale(0.97); }
`;
export const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 9px;
  border: 1px solid ${({ $border }) => $border};
  border-radius: 40px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;
