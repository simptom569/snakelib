import React from 'react';
import icon1 from '../../assets/images/icon1.svg';
import icon2 from '../../assets/images/icon2.svg';
import icon3 from '../../assets/images/icon3.svg';
import icon4 from '../../assets/images/icon4.svg';
import icon5 from '../../assets/images/icon5.svg';
import icon6 from '../../assets/images/icon6.svg';
import {
  Wrapper,
  Glow,
  Section,
  Header,
  Badge,
  Title,
  Subtitle,
  Grid,
  Row,
  Card,
  IconWrap,
  CardTitle,
  CardDesc,
} from './Features.styles';

const WHITE = '#ffffff';
const DARK = '#0d1910';

const rows = [
  [
    {
      icon: icon1,
      iconBg: '#F9FCFA',
      bg: '#068D27',
      title: 'Здоровые питомцы',
      desc: 'Каждая змея выращена в комфортных условиях и проходит обязательный осмотр перед продажей.',
      textColor: WHITE,
    },
    {
      icon: icon2,
      iconBg: '#068D27',
      bg: 'rgba(242, 242, 242, 0.8)',
      title: 'Проверенные заводчики',
      desc: 'Мы работаем только с ответственными заводчиками и не поддерживаем сомнительное разведение.',
      textColor: DARK,
    },
    {
      icon: icon3,
      iconBg: '#F9FCFA',
      bg: 'rgba(6, 141, 39, 0.8)',
      title: 'Безопасная доставка',
      desc: 'Надёжная упаковка, контроль температуры и аккуратная доставка до вашего города.',
      textColor: WHITE,
    },
  ],
  [
    {
      icon: icon4,
      iconBg: '#068D27',
      bg: 'rgba(242, 242, 242, 0.8)',
      title: 'Помощь на каждом этапе',
      desc: 'Консультируем при выборе, подсказываем по уходу и остаёмся на связи после покупки.',
      textColor: DARK,
    },
    {
      icon: icon5,
      iconBg: '#F9FCFA',
      bg: 'rgba(6, 141, 39, 0.8)',
      title: 'Подходит для новичков',
      desc: 'Помогаем подобрать вид, который подойдёт именно под ваш опыт и условия содержания.',
      textColor: WHITE,
    },
    {
      icon: icon6,
      iconBg: '#068D27',
      bg: 'rgba(242, 242, 242, 0.8)',
      title: 'Ответственный подход',
      desc: 'Мы за осознанное содержание и заботу о каждом питомце, а не за быстрые продажи.',
      textColor: DARK,
    },
  ],
];

function Features() {
  return (
    <Wrapper>
      <Glow />
      <Section>
        <Header>
          <Badge>Преимущества</Badge>
          <Title>Почему выбирают нас</Title>
          <Subtitle>Каждая змея выращена с заботой, а мы сопровождаем вас от выбора до доставки</Subtitle>
        </Header>
        <Grid>
          {rows.map((row, ri) => (
            <Row key={ri}>
              {row.map(({ icon, iconBg, bg, title, desc, textColor }) => (
                <Card key={title} $bg={bg}>
                  <IconWrap $bg={iconBg}>
                    <img src={icon} alt={title} />
                  </IconWrap>
                  <CardTitle $color={textColor}>{title}</CardTitle>
                  <CardDesc $color={textColor}>{desc}</CardDesc>
                </Card>
              ))}
            </Row>
          ))}
        </Grid>
      </Section>
    </Wrapper>
  );
}

export default Features;
