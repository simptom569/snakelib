import styled from 'styled-components';

const BREAKPOINTS = {
  mobile: '560px',
  tablet: '900px',
};

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Glow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 610px;
  background: linear-gradient(180deg, #F9FCFA 0%, rgba(146, 219, 164, 0.6) 100%);
  pointer-events: none;
  z-index: 0;
`;

export const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 40px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 80px 20px 0;
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
  gap: 10px;
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

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  gap: 16px;
  flex: 1;
  align-self: stretch;
  border-radius: 32px;
  border: 1px solid #bebebe;
  background: ${({ $bg }) => $bg};
`;

export const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 80px;
  height: 80px;
  background: ${({ $bg }) => $bg};
  border-radius: 20px;
  flex-shrink: 0;

  img {
    width: 60px;
    height: 60px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  color: ${({ $color }) => $color};
  margin: 0;
`;

export const CardDesc = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ $color }) => $color};
  margin: 0;
  align-self: stretch;
`;
