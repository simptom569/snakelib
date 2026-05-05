import styled from 'styled-components';
const BREAKPOINTS = {
  mobile: '560px',
  tablet: '1200px',
  laptop: '1200px',
};
export const Section = styled.section`
  max-width: 1280px;
  margin: 120px auto 0;
  padding: 0 40px;
  @media (max-width: ${BREAKPOINTS.laptop}) {
    margin-top: 80px;
    padding: 0 20px;
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    margin-top: 60px;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
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
export const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 48px;
  }
  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 36px;
  }
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 28px;
  }
`;
export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  color: #0d1910;
  text-align: center;
  margin: 0;
`;
export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: stretch;
  min-height: 720px;
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    min-height: unset;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 1;
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
  }
`;
export const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 32px;
  overflow: hidden;
  flex: 1;
`;
export const CardImage = styled.div`
  width: 100%;
  flex: 1;
  min-height: 153px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex: none;
    height: 200px;
  }
`;
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || '20px'};
  padding: ${({ $paddingTop }) => $paddingTop || '20px'} 20px 20px;
  align-self: stretch;
`;
export const CardName = styled.h3`
  font-size: ${({ $size }) => $size || '28px'};
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 24px;
  }
`;
export const CardDesc = styled.p`
  font-size: ${({ $size }) => $size || '16px'};
  font-weight: 400;
  line-height: 150%;
  color: #0d1910;
  margin: 0;
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 12px;
  }
`;
export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;
export const Price = styled.span`
  font-size: ${({ $size }) => $size || '26px'};
  font-weight: 700;
  line-height: 100%;
  background: linear-gradient(90deg, #195728 0%, #00c530 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 22px;
  }
`;
export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $padding }) => $padding || '8px 10px'};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 40px;
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  font-weight: 700;
  line-height: 100%;
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;
