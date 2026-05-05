import React from 'react';
import {
  PageWrapper,
  BlobLeft,
  BlobRight,
  Page,
  PageHeader,
  Badge,
  PageTitle,
  PageSubtitle,
  MissionBlock,
  MissionText,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  MissionVisual,
  MissionCard,
  MissionCardEmoji,
  MissionCardText,
  MissionCardTitle,
  MissionCardLabel,
  StatsRow,
  StatCard,
  StatNumber,
  StatLabel,
  ValuesSection,
  ValuesSectionHeader,
  ValuesGrid,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDesc,
  TeamSection,
  TeamHeader,
  TeamGrid,
  TeamCard,
  TeamAvatar,
  TeamName,
  TeamRole,
  TeamDesc,
  CtaBlock,
  CtaTitle,
  CtaDesc,
  CtaButton,
} from './AboutPage.styles';

const stats = [
  { number: '1000+', label: 'Счастливых владельцев', dark: false },
  { number: '5+', label: 'Лет на рынке экзотических животных', dark: true },
  { number: '50+', label: 'Видов змей в каталоге', dark: false },
  { number: '100%', label: 'Здоровые питомцы с гарантией', dark: true },
];

const values = [
  {
    icon: '🐍',
    iconBg: '#F9FCFA',
    bg: '#068D27',
    title: 'Осознанное содержание',
    desc: 'Мы убеждаемся, что каждый покупатель готов к ответственному уходу. Змея — не игрушка, а живое существо.',
    color: '#ffffff',
    descColor: 'rgba(255,255,255,0.9)',
  },
  {
    icon: '🏥',
    iconBg: '#068D27',
    bg: 'rgba(242, 242, 242, 0.8)',
    title: 'Здоровье прежде всего',
    desc: 'Каждое животное проходит ветеринарный осмотр перед продажей. Никаких компромиссов со здоровьем.',
    color: '#0d1910',
    descColor: '#3a3a3a',
  },
  {
    icon: '🤝',
    iconBg: '#F9FCFA',
    bg: '#068D27',
    title: 'Поддержка навсегда',
    desc: 'Мы не исчезаем после продажи. Наши эксперты всегда готовы ответить на вопросы по уходу и содержанию.',
    color: '#ffffff',
    descColor: 'rgba(255,255,255,0.9)',
  },
  {
    icon: '🌿',
    iconBg: '#068D27',
    bg: 'rgba(242, 242, 242, 0.8)',
    title: 'Этичное разведение',
    desc: 'Сотрудничаем только с заводчиками, которые разделяют наши ценности и соблюдают стандарты содержания.',
    color: '#0d1910',
    descColor: '#3a3a3a',
  },
  {
    icon: '📦',
    iconBg: '#F9FCFA',
    bg: '#068D27',
    title: 'Безопасная доставка',
    desc: 'Специализированная упаковка с контролем температуры. Змея добирается до вас в комфорте и безопасности.',
    color: '#ffffff',
    descColor: 'rgba(255,255,255,0.9)',
  },
  {
    icon: '📚',
    iconBg: '#068D27',
    bg: 'rgba(242, 242, 242, 0.8)',
    title: 'Образование',
    desc: 'Делимся знаниями бесплатно: статьи, гайды, консультации — чтобы каждый мог стать отличным хозяином.',
    color: '#0d1910',
    descColor: '#3a3a3a',
  },
];

const team = [
  {
    emoji: '👨‍🔬',
    bg: 'rgba(6,141,39,0.15)',
    name: 'Руслан Бухлов',
    role: 'Основатель',
    desc: 'Герпетолог с 12-летним стажем. Влюблён в королевских питонов.',
  },
  {
    emoji: '👩‍⚕️',
    bg: 'rgba(6,141,39,0.15)',
    name: 'Диана Орлова',
    role: 'Ветеринар',
    desc: 'Специализируется на экзотических рептилиях. Следит за здоровьем каждого питомца.',
  },
  {
    emoji: '👨‍💼',
    bg: 'rgba(6,141,39,0.15)',
    name: 'Михаил Тихонов',
    role: 'Логистика',
    desc: 'Разработал нашу систему безопасной доставки. Ни одной потери за 5 лет.',
  },
  {
    emoji: '👩‍🎓',
    bg: 'rgba(6,141,39,0.15)',
    name: 'Екатерина Волк',
    role: 'Консультант',
    desc: 'Помогает новичкам найти идеального первого питомца и не растеряться.',
  },
];

function AboutPage() {
  return (
    <PageWrapper>
      <BlobLeft />
      <BlobRight />
    <Page>
      <PageHeader>
        <Badge>О нас</Badge>
        <PageTitle>Мы любим <em>змей</em></PageTitle>
        <PageSubtitle>
          SnakeLab — это команда единомышленников, которые объединились ради одной цели: сделать мир экзотических питомцев безопасным, честным и доступным
        </PageSubtitle>
      </PageHeader>

      <MissionBlock>
        <MissionText>
          <SectionLabel>Наша миссия</SectionLabel>
          <SectionTitle>Экзотика без рисков и тайн</SectionTitle>
          <SectionDesc>
            Мы основали SnakeLab в 2019 году, потому что устали видеть, как люди покупают больных животных у непроверенных продавцов. Наша цель — стать стандартом честного и ответственного рынка экзотических рептилий в Казахстане.
          </SectionDesc>
          <SectionDesc>
            Каждая змея в нашем каталоге выращена в правильных условиях, осмотрена ветеринаром и готова к переезду к любящему хозяину. Мы не просто продаём — мы сопровождаем на каждом этапе.
          </SectionDesc>
        </MissionText>
        <MissionVisual>
          <MissionCard $dark>
            <MissionCardEmoji>🐍</MissionCardEmoji>
            <MissionCardText>
              <MissionCardTitle $dark>2019</MissionCardTitle>
              <MissionCardLabel $dark>Год основания в Алматы</MissionCardLabel>
            </MissionCardText>
          </MissionCard>
          <MissionCard>
            <MissionCardEmoji>🏥</MissionCardEmoji>
            <MissionCardText>
              <MissionCardTitle>100%</MissionCardTitle>
              <MissionCardLabel>Ветеринарный осмотр перед продажей</MissionCardLabel>
            </MissionCardText>
          </MissionCard>
          <MissionCard $dark>
            <MissionCardEmoji>📦</MissionCardEmoji>
            <MissionCardText>
              <MissionCardTitle $dark>0 потерь</MissionCardTitle>
              <MissionCardLabel $dark>При доставке за всё время работы</MissionCardLabel>
            </MissionCardText>
          </MissionCard>
        </MissionVisual>
      </MissionBlock>

      <StatsRow>
        {stats.map(({ number, label, dark }) => (
          <StatCard key={label} $dark={dark}>
            <StatNumber $dark={dark}>{number}</StatNumber>
            <StatLabel $dark={dark}>{label}</StatLabel>
          </StatCard>
        ))}
      </StatsRow>

      <ValuesSection>
        <ValuesSectionHeader>
          <Badge>Ценности</Badge>
          <SectionTitle>Что нами движет</SectionTitle>
          <PageSubtitle>Принципы, которые определяют каждое наше решение</PageSubtitle>
        </ValuesSectionHeader>
        <ValuesGrid>
          {values.map(({ icon, iconBg, bg, title, desc, color, descColor }) => (
            <ValueCard key={title} $bg={bg}>
              <ValueIcon $iconBg={iconBg}>{icon}</ValueIcon>
              <ValueTitle $color={color}>{title}</ValueTitle>
              <ValueDesc $color={descColor}>{desc}</ValueDesc>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>

      <TeamSection>
        <TeamHeader>
          <Badge>Команда</Badge>
          <SectionTitle>Люди за SnakeLab</SectionTitle>
          <PageSubtitle>Небольшая, но очень увлечённая команда профессионалов</PageSubtitle>
        </TeamHeader>
        <TeamGrid>
          {team.map(({ emoji, bg, name, role, desc }) => (
            <TeamCard key={name}>
              <TeamAvatar $bg={bg}>{emoji}</TeamAvatar>
              <TeamName>{name}</TeamName>
              <TeamRole>{role}</TeamRole>
              <TeamDesc>{desc}</TeamDesc>
            </TeamCard>
          ))}
        </TeamGrid>
      </TeamSection>

      <CtaBlock>
        <CtaTitle>Готовы найти своего питомца?</CtaTitle>
        <CtaDesc>
          Загляните в каталог или напишите нам — поможем подобрать идеальную змею под ваш опыт и условия содержания
        </CtaDesc>
        <CtaButton href="/catalog">Перейти в каталог</CtaButton>
      </CtaBlock>
    </Page>
    </PageWrapper>
  );
}

export default AboutPage;
