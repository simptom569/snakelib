import React from 'react';
import {
  FooterWrapper,
  TopBar,
  Brand,
  Logo,
  LogoText,
  BrandDesc,
  SocialRow,
  SocialBtn,
  LinksGrid,
  LinkCol,
  ColTitle,
  ColLink,
  ContactCol,
  ContactItem,
  ContactLabel,
  ContactValue,
  Divider,
  BottomBar,
  Copyright,
  BottomLinks,
  BottomLink,
  Badge,
  BadgeDot,
} from './Footer.styles';

const SnakeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#1f993d" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="20">🐍</text>
  </svg>
);

const VkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.6-.19 1.37 1.26 2.186 1.815.617.416 1.087.325 1.087.325l2.183-.03s1.141-.071.6-.968c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.183-1.060.462-3.246.999-1.332 1.398-2.146 1.273-2.494-.12-.332-.855-.244-.855-.244l-2.455.015s-.182-.025-.317.056c-.133.079-.218.264-.218.264s-.386 1.031-.902 1.907c-1.086 1.847-1.52 1.945-1.698 1.831-.413-.267-.31-1.075-.31-1.648 0-1.793.272-2.54-.529-2.733-.265-.064-.46-.107-1.138-.114-.871-.009-1.607.003-2.024.207-.277.136-.491.44-.361.457.161.022.527.099.721.364.25.343.241 1.114.241 1.114s.144 2.112-.335 2.372c-.329.179-.78-.186-1.748-1.854-.497-.859-.872-1.810-.872-1.810s-.072-.179-.203-.275c-.158-.115-.379-.151-.379-.151l-2.332.015s-.350.010-.479.162c-.114.136-.009.417-.009.417s1.826 4.271 3.893 6.422c1.896 1.973 4.049 1.843 4.049 1.843h.975z"/>
  </svg>
);

const TgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.076 13.44l-2.95-.924c-.64-.203-.653-.64.136-.954l11.57-4.461c.537-.194 1.006.131.834.945l.228-.825z"/>
  </svg>
);

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function Footer() {
  return (
    <FooterWrapper>
      <TopBar>
        <Brand>
          <Logo href="/">
            <SnakeIcon />
            <LogoText>SnakeLab</LogoText>
          </Logo>
          <BrandDesc>
            Магазин здоровых змей с заботой о каждом питомце. Помогаем найти идеального компаньона и сопровождаем от выбора до доставки.
          </BrandDesc>
          <Badge>
            <BadgeDot />
            Работаем с 10:00 до 20:00
          </Badge>
          <SocialRow>
            <SocialBtn href="#" aria-label="ВКонтакте"><VkIcon /></SocialBtn>
            <SocialBtn href="#" aria-label="Telegram"><TgIcon /></SocialBtn>
            <SocialBtn href="#" aria-label="WhatsApp"><WaIcon /></SocialBtn>
          </SocialRow>
        </Brand>

        <LinksGrid>
          <LinkCol>
            <ColTitle>Каталог</ColTitle>
            <ColLink href="#">Все змеи</ColLink>
            <ColLink href="#">Королевские питоны</ColLink>
            <ColLink href="#">Маисовые полозы</ColLink>
            <ColLink href="#">Молочные змеи</ColLink>
            <ColLink href="#">Императорские удавы</ColLink>
          </LinkCol>

          <LinkCol>
            <ColTitle>Компания</ColTitle>
            <ColLink href="#">О нас</ColLink>
            <ColLink href="#">Доставка и оплата</ColLink>
            <ColLink href="#">Гарантии</ColLink>
            <ColLink href="#">FAQ</ColLink>
            <ColLink href="#">Отзывы</ColLink>
          </LinkCol>

          <ContactCol>
            <ColTitle>Контакты</ColTitle>
            <ContactItem>
              <ContactLabel>Телефон</ContactLabel>
              <ContactValue href="tel:+77012345678">+7 (701) 234-56-78</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="mailto:Nyaha@gmail.com">Nyaha@gmail.com</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>Адрес</ContactLabel>
              <ContactValue as="span">Алматы, ул. Абая, 1</ContactValue>
            </ContactItem>
          </ContactCol>
        </LinksGrid>
      </TopBar>

      <Divider />

      <BottomBar>
        <Copyright>© 2025 SnakeLab. Все права защищены.</Copyright>
        <BottomLinks>
          <BottomLink href="#">Политика конфиденциальности</BottomLink>
          <BottomLink href="#">Пользовательское соглашение</BottomLink>
        </BottomLinks>
      </BottomBar>
    </FooterWrapper>
  );
}

export default Footer;
