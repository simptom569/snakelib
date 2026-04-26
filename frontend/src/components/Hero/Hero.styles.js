import styled from 'styled-components';

const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1200px',
};

export const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 40px 0;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 120px 20px 0;
  }
`;

/* Основной flex-ряд */
export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 715px;
  position: relative;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    height: 580px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    height: auto;
    gap: 0;
  }
`;

/* Левая колонка */
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  width: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding-bottom: 40px;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Eyebrow = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.1em;
  color: #0d1910;
  margin: 0;
`;

export const Heading = styled.h1`
  font-size: 72px;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.03em;
  color: #0d1910;
  margin: 0;

  em {
    font-style: normal;
    color: #068d27;
  }

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 54px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 42px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 32px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #0d1910;
  margin: 0;
  max-width: 500px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    max-width: 100%;
  }
`;

export const CatalogButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  background: #068d27;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  border-radius: 37px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: #057020;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: ${BREAKPOINTS.laptop}) {
    align-self: center;
  }
`;

/* Правая часть — контейнер для абсолютно позиционированных слоёв */
export const ImageWrap = styled.div`
  position: relative;
  flex: 1;
  align-self: stretch;
  pointer-events: none;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    display: none;
  }
`;

export const ContainerImg = styled.img`
  position: absolute;
  right: 0;
  top: 55px;
  width: 550px;
  height: 700px;
  object-fit: fill;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    width: 88%;
    height: 86%;
    top: 40px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 80%;
    height: 100%;
    top: 0;
  }
`;

/* Фото змеи — выходит за левый край зелёного блока */
export const SnakeImg = styled.img`
  position: absolute;
  right: 0;
  top: 40px;
  width: 640px;
  height: 687px;
  object-fit: contain;
  object-position: center bottom;
  z-index: 2;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    width: 95%;
    height: 90%;
    top: 20px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 100%;
    top: 0;
  }
`;

export const ScrollHint = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0 0;

  svg {
    opacity: 0.35;
  }

  circle {
    animation: scrollDot 1.8s ease-in-out infinite;
  }

  @keyframes scrollDot {
    0%, 100% { cy: 11px; opacity: 1; }
    50%       { cy: 22px; opacity: 0.2; }
  }
`;
