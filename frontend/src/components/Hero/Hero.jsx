import React from 'react';
import snakeImg from '../../assets/images/main_snake.png';
import containerImg from '../../assets/images/main_container.png';
import {
  Section,
  Inner,
  Content,
  TextGroup,
  Eyebrow,
  Heading,
  Description,
  CatalogButton,
  ImageWrap,
  ContainerImg,
  SnakeImg,
  ScrollHint,
} from './Hero.styles';

function Hero() {
  return (
    <Section>
      <Inner>
        <Content>
          <TextGroup>
            <Eyebrow>Экзотические питомцы с ответственным подходом</Eyebrow>
            <Heading><em>Змеи</em>, которых выбирают осознанно</Heading>
          </TextGroup>
          <Description>
            Проверенные заводчики, безопасная доставка и всё необходимое для комфортной жизни вашего питомца
          </Description>
          <CatalogButton href="/catalog">Выбрать питомца</CatalogButton>
        </Content>

        <ImageWrap>
          <ContainerImg src={containerImg} alt="" aria-hidden="true" />
          <SnakeImg src={snakeImg} alt="Змея" />
        </ImageWrap>
      </Inner>

      <ScrollHint>
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="26" height="42" rx="13" stroke="#1a1a1a" strokeWidth="2" />
          <circle cx="14" cy="11" r="3" fill="#1a1a1a" />
        </svg>
      </ScrollHint>
    </Section>
  );
}

export default Hero;
