import styled from 'styled-components';
const BREAKPOINTS = {
  mobile: '900px',
  tablet: '900px',
};
export const Wrapper = styled.div`
  position: relative;
`;
export const Glow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgba(146, 219, 164, 0.6) 0%, #F9FCFA 100%);
  pointer-events: none;
  z-index: 0;
`;
export const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 80px 20px 40px;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
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
  line-height: 100%;
  color: #006e1b;
`;
export const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  text-align: center;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 48px;
  }
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 32px;
  }
`;
export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  color: #0d1910;
  text-align: center;
  margin: 0;
  align-self: stretch;
`;
export const EmblaArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const ArrowsOverlay = styled.div`
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1280px;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;
export const ArrowsRow = styled.div`
  display: none;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
  }
`;
export const ArrowBtn = styled.button`
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #bebebe;
  background: #f2f2f2;
  color: #0d1910;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
  &:hover {
    background: #068d27;
    border-color: #068d27;
    color: #fff;
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.96);
  }
`;
export const Embla = styled.div`
  overflow: hidden;
  width: 100%;
`;
export const EmblaContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const EmblaSlide = styled.div`
  flex: 0 0 480px;
  min-width: 0;
  padding: 0 10px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex: 0 0 360px;
  }
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex: 0 0 calc(100vw - 40px);
  }
`;
export const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
  width: 100%;
  min-height: 260px;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 32px;
`;
export const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;
export const AuthorRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1;
`;
export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #068d27;
  border-radius: 30px;
  flex-shrink: 0;
  font-size: 18px;
`;
export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const AuthorName = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
`;
export const AuthorDate = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  color: #0d1910;
`;
export const Stars = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 20px;
`;
export const ReviewText = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  align-self: stretch;
`;
export const PetTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  gap: 8px;
  align-self: stretch;
  background: #e2e2e2;
  border-radius: 12px;
  img {
    width: 20px;
    height: 20px;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    line-height: 100%;
    color: #0d1910;
  }
`;
export const Dots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 13px;
  background: ${({ $active }) => ($active ? '#068D27' : '#F2F2F2')};
  border: 1px solid ${({ $active }) => ($active ? '#068D27' : '#BEBEBE')};
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
`;
