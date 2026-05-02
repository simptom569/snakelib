import styled from 'styled-components';

const BREAKPOINTS = {
  mobile: '560px',
  tablet: '900px',
};

export const FooterWrapper = styled.footer`
  background: #0d1910;
  margin-top: 120px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    margin-top: 80px;
  }
`;

export const TopBar = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 40px 40px;
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 40px 20px;
    flex-direction: column;
    gap: 40px;
  }
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 0 260px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex: unset;
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

export const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

export const BrandDesc = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

export const SocialRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 4px;
`;

export const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 18px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #068d27;
    color: #fff;
  }
`;

export const LinksGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex: 1;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const ColTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
`;

export const ColLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #52bc6c;
  }
`;

export const ContactCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContactLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ContactValue = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #52bc6c;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 40px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    margin: 0 20px;
  }
`;

export const BottomBar = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 40px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 20px 20px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const Copyright = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
`;

export const BottomLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const BottomLink = styled.a`
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(6, 141, 39, 0.2);
  border: 1px solid rgba(6, 141, 39, 0.3);
  border-radius: 40px;
  font-size: 13px;
  font-weight: 600;
  color: #52bc6c;
  align-self: flex-start;
`;

export const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #52bc6c;
  flex-shrink: 0;
`;
