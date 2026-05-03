import React from 'react';
import {
  PageWrapper, Blob, Page,
  Code, Snake, Title, Desc,
  Buttons, ButtonPrimary, ButtonSecondary,
} from './NotFoundPage.styles';

function NotFoundPage() {
  return (
    <PageWrapper>
      <Blob />
      <Page>
        <Code>4<em>0</em>4</Code>
        <Snake>🐍</Snake>
        <Title>Змея утащила эту страницу</Title>
        <Desc>Кажется, такой страницы не существует — или она уползла куда-то в тёмный угол террариума</Desc>
        <Buttons>
          <ButtonPrimary href="/">На главную</ButtonPrimary>
          <ButtonSecondary href="/catalog">Смотреть каталог</ButtonSecondary>
        </Buttons>
      </Page>
    </PageWrapper>
  );
}

export default NotFoundPage;
