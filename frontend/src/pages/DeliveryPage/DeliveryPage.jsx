import React from 'react';
import {
  PageWrapper, BlobLeft, BlobRight, Page,
  PageHeader, Badge, PageTitle, PageSubtitle,
  StepsSection, SectionHeader, SectionTitle, SectionSubtitle,
  StepsGrid, StepCard, StepNumber, StepEmoji, StepTitle, StepDesc,
  ZonesSection, ZonesGrid, ZoneCard, ZoneTop, ZoneEmoji, ZoneName,
  ZoneRows, ZoneRow, ZoneRowLabel, ZoneRowValue, ZonePrice,
  PaySection, PayGrid, PayCard, PayIcon, PayTitle, PayDesc, PayBadge,
  GuaranteesSection, GuaranteesGrid, GuaranteeCard, GuaranteeEmoji,
  GuaranteeTitle, GuaranteeDesc,
  CtaBlock, CtaTitle, CtaDesc, CtaButtons, CtaButtonPrimary, CtaButtonSecondary,
} from './DeliveryPage.styles';

const steps = [
  {
    n: 'Шаг 01', emoji: '🛒', dark: false,
    title: 'Оформите заказ',
    desc: 'Выберите питомца в каталоге и оформите заказ онлайн или по телефону. Менеджер свяжется в течение часа.',
  },
  {
    n: 'Шаг 02', emoji: '💳', dark: true,
    title: 'Оплатите',
    desc: 'Принимаем карты, Kaspi и перевод. Оплата возможна при получении для Алматы и Астаны.',
  },
  {
    n: 'Шаг 03', emoji: '📦', dark: false,
    title: 'Упакуем с заботой',
    desc: 'Специальный термобокс, дышащий мешок, контроль температуры — питомец едет с комфортом.',
  },
  {
    n: 'Шаг 04', emoji: '🤝', dark: true,
    title: 'Получите питомца',
    desc: 'Курьер или транспортная компания доставят змею прямо до вашей двери. Мы на связи весь путь.',
  },
];

const zones = [
  {
    emoji: '🏙️',
    name: 'Алматы и Астана',
    rows: [
      { label: 'Срок',      value: 'День в день / на следующий день' },
      { label: 'Время',     value: '10:00 — 22:00' },
      { label: 'Способ',    value: 'Курьер до двери' },
    ],
    price: 'от 2 000 ₸',
  },
  {
    emoji: '🗺️',
    name: 'Города Казахстана',
    rows: [
      { label: 'Срок',      value: '1–3 дня' },
      { label: 'Время',     value: 'По графику ТК' },
      { label: 'Способ',    value: 'Транспортная компания' },
    ],
    price: 'от 5 000 ₸',
  },
  {
    emoji: '✈️',
    name: 'Отдалённые регионы',
    rows: [
      { label: 'Срок',      value: '3–7 дней' },
      { label: 'Время',     value: 'По графику ТК' },
      { label: 'Способ',    value: 'Авиадоставка / ТК' },
    ],
    price: 'от 10 000 ₸',
  },
];

const payments = [
  {
    icon: '📱', dark: true,
    title: 'Kaspi Pay',
    desc: 'Оплата через Kaspi.kz — быстро и безопасно. Переводим по номеру телефона или QR-коду.',
    badge: 'Рекомендуем',
  },
  {
    icon: '💳', dark: false,
    title: 'Банковской картой',
    desc: 'Visa, Mastercard — оплата на сайте через защищённый шлюз. Данные карты не хранятся на наших серверах.',
    badge: 'Без комиссии',
  },
  {
    icon: '💵', dark: false,
    title: 'Наличными',
    desc: 'Оплата наличными при получении доступна для курьерской доставки по Алматы и Астане.',
    badge: 'Только курьер',
  },
  {
    icon: '🏦', dark: true,
    title: 'Безналичный расчёт',
    desc: 'Для юридических лиц и ИП — выставляем счёт с полным пакетом закрывающих документов.',
    badge: 'Для юр. лиц',
  },
];

const guarantees = [
  {
    emoji: '🌡️',
    title: 'Контроль температуры',
    desc: 'Термобокс поддерживает нужный диапазон на весь путь — летом и зимой.',
  },
  {
    emoji: '🔒',
    title: 'Надёжная упаковка',
    desc: 'Жёсткий контейнер + дышащий мешок. Змея не получит стресс и не сбежит.',
  },
  {
    emoji: '📍',
    title: 'Трекинг отправления',
    desc: 'Вы получите трек-номер и сможете следить за посылкой в реальном времени.',
  },
  {
    emoji: '☎️',
    title: 'На связи весь путь',
    desc: 'Менеджер доступен с момента отправки до вручения — ответим на любой вопрос.',
  },
  {
    emoji: '🔄',
    title: 'Гарантия при потере',
    desc: 'Если доставка сорвётся по нашей вине — компенсируем полную стоимость питомца.',
  },
  {
    emoji: '🛡️',
    title: '14 дней гарантии здоровья',
    desc: 'После получения у вас есть 2 недели — если что-то не так, мы берём расходы на себя.',
  },
];

function DeliveryPage() {
  return (
    <PageWrapper>
      <BlobLeft />
      <BlobRight />
      <Page>

        <PageHeader>
          <Badge>Доставка и оплата</Badge>
          <PageTitle>Быстро, безопасно, <em>с заботой</em></PageTitle>
          <PageSubtitle>
            Доставляем живых питомцев по всему Казахстану — с контролем температуры и гарантией здоровья
          </PageSubtitle>
        </PageHeader>

        <StepsSection>
          <SectionHeader>
            <Badge>Как это работает</Badge>
            <SectionTitle>4 шага до питомца</SectionTitle>
            <SectionSubtitle>Всё просто — от заказа до встречи с новым другом</SectionSubtitle>
          </SectionHeader>
          <StepsGrid>
            {steps.map(({ n, emoji, dark, title, desc }) => (
              <StepCard key={n} $dark={dark}>
                <StepNumber $dark={dark}>{n}</StepNumber>
                <StepEmoji>{emoji}</StepEmoji>
                <StepTitle $dark={dark}>{title}</StepTitle>
                <StepDesc $dark={dark}>{desc}</StepDesc>
              </StepCard>
            ))}
          </StepsGrid>
        </StepsSection>

        <ZonesSection>
          <SectionHeader>
            <Badge>Зоны доставки</Badge>
            <SectionTitle>Куда и за сколько</SectionTitle>
            <SectionSubtitle>Точная стоимость рассчитывается при оформлении заказа</SectionSubtitle>
          </SectionHeader>
          <ZonesGrid>
            {zones.map(({ emoji, name, rows, price }) => (
              <ZoneCard key={name}>
                <ZoneTop>
                  <ZoneEmoji>{emoji}</ZoneEmoji>
                  <ZoneName>{name}</ZoneName>
                </ZoneTop>
                <ZoneRows>
                  {rows.map(({ label, value }) => (
                    <ZoneRow key={label}>
                      <ZoneRowLabel>{label}</ZoneRowLabel>
                      <ZoneRowValue>{value}</ZoneRowValue>
                    </ZoneRow>
                  ))}
                </ZoneRows>
                <ZonePrice>{price}</ZonePrice>
              </ZoneCard>
            ))}
          </ZonesGrid>
        </ZonesSection>

        <PaySection>
          <SectionHeader>
            <Badge>Оплата</Badge>
            <SectionTitle>Способы оплаты</SectionTitle>
            <SectionSubtitle>Выбирайте удобный — предоплата или при получении</SectionSubtitle>
          </SectionHeader>
          <PayGrid>
            {payments.map(({ icon, dark, title, desc, badge }) => (
              <PayCard key={title} $dark={dark}>
                <PayIcon $dark={dark}>{icon}</PayIcon>
                <PayTitle $dark={dark}>{title}</PayTitle>
                <PayDesc $dark={dark}>{desc}</PayDesc>
                <PayBadge $dark={dark}>{badge}</PayBadge>
              </PayCard>
            ))}
          </PayGrid>
        </PaySection>

        <GuaranteesSection>
          <SectionHeader>
            <Badge>Гарантии</Badge>
            <SectionTitle>Ваш питомец в безопасности</SectionTitle>
            <SectionSubtitle>Мы несём ответственность от момента упаковки до вручения</SectionSubtitle>
          </SectionHeader>
          <GuaranteesGrid>
            {guarantees.map(({ emoji, title, desc }) => (
              <GuaranteeCard key={title}>
                <GuaranteeEmoji>{emoji}</GuaranteeEmoji>
                <GuaranteeTitle>{title}</GuaranteeTitle>
                <GuaranteeDesc>{desc}</GuaranteeDesc>
              </GuaranteeCard>
            ))}
          </GuaranteesGrid>
        </GuaranteesSection>

        <CtaBlock>
          <CtaTitle>Готовы сделать заказ?</CtaTitle>
          <CtaDesc>Выберите питомца в каталоге или позвоните нам — поможем оформить всё быстро</CtaDesc>
          <CtaButtons>
            <CtaButtonPrimary href="/catalog">Перейти в каталог</CtaButtonPrimary>
            <CtaButtonSecondary href="tel:+79991234567">Позвонить нам</CtaButtonSecondary>
          </CtaButtons>
        </CtaBlock>

      </Page>
    </PageWrapper>
  );
}

export default DeliveryPage;
