import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  PageWrapper,
  BlobLeft,
  BlobRight,
  Page,
  PageHeader,
  Badge,
  PageTitle,
  PageSubtitle,
  Tabs,
  Tab,
  TabEmoji,
  FaqList,
  FaqItem,
  FaqQuestion,
  QuestionText,
  ChevronWrap,
  FaqAnswer,
  AnswerInner,
  AnswerText,
  CtaBlock,
  CtaTitle,
  CtaDesc,
  CtaButtons,
  CtaButtonPrimary,
  CtaButtonSecondary,
} from './FaqPage.styles';

const CATEGORIES = [
  { key: 'all',      label: 'Все вопросы',   emoji: '📋' },
  { key: 'buy',      label: 'Покупка',        emoji: '🛒' },
  { key: 'care',     label: 'Уход',           emoji: '🌿' },
  { key: 'delivery', label: 'Доставка',       emoji: '📦' },
  { key: 'health',   label: 'Здоровье',       emoji: '🏥' },
];

const FAQ = [
  {
    category: 'buy',
    q: 'Как выбрать змею, если я новичок?',
    a: 'Для начинающих лучше всего подходят маисовые полозы и шаровые питоны — они спокойны, неприхотливы в уходе и редко кусаются. Напишите нам в WhatsApp или позвоните, и мы подберём питомца под ваши условия и опыт.',
  },
  {
    category: 'buy',
    q: 'Можно ли приехать и выбрать змею лично?',
    a: 'Да, мы принимаем гостей по предварительной записи в Алматы. Вы сможете познакомиться с питомцем, задать все вопросы нашему специалисту и убедиться в его здоровье лично. Запись через телефон или форму обратной связи.',
  },
  {
    category: 'buy',
    q: 'Какие документы идут вместе со змеёй?',
    a: 'Каждая змея продаётся с ветеринарным свидетельством установленного образца РК. По запросу предоставляем документы о происхождении от заводчика и рекомендации по уходу и питанию в письменном виде.',
  },
  {
    category: 'buy',
    q: 'Есть ли гарантия на питомца?',
    a: 'Мы даём гарантию здоровья на 14 дней с момента покупки. Если в этот период у питомца обнаружится скрытое заболевание, мы возьмём расходы на лечение на себя или сделаем замену.',
  },
  {
    category: 'buy',
    q: 'Как оплатить через Kaspi?',
    a: 'Принимаем оплату через Kaspi Pay, Kaspi перевод по номеру телефона и QR-коду. Также доступна оплата банковской картой или наличными при самовывозе и курьерской доставке по Алматы и Астане.',
  },
  {
    category: 'care',
    q: 'Что нужно для содержания змеи?',
    a: 'Минимальный набор: террариум подходящего размера, термоковрик или лампа для обогрева, термометр, укрытие и миска для воды. Конкретные параметры зависят от вида — мы всегда консультируем по оборудованию при покупке.',
  },
  {
    category: 'care',
    q: 'Как часто нужно кормить змею?',
    a: 'Молодых змей кормят раз в 5–7 дней, взрослых — раз в 1–2 недели. Размер корма не должен превышать самую широкую часть тела змеи. Большинство видов охотно едят замороженных мышей или крыс после разморозки.',
  },
  {
    category: 'care',
    q: 'Нужно ли делать прививки змее?',
    a: 'Змеям прививки не делают — для рептилий вакцинация не применяется. Однако рекомендуем проходить профилактический осмотр у герпетолога раз в год и следить за линькой, аппетитом и поведением питомца.',
  },
  {
    category: 'delivery',
    q: 'В какие города вы доставляете?',
    a: 'Доставляем по всему Казахстану. Алматы и Астана — курьером в день заказа или на следующий день. В другие города — через транспортные компании, работающие с живыми животными, обычно 1–3 дня.',
  },
  {
    category: 'delivery',
    q: 'Как обеспечивается безопасность при доставке?',
    a: 'Используем специальные термобоксы с гелевыми хладо- или теплоэлементами в зависимости от сезона. Змея упакована в дышащий мешок внутри жёсткого контейнера. За 5 лет работы — ни одного случая потери при транспортировке.',
  },
  {
    category: 'delivery',
    q: 'Можно ли перенести дату доставки?',
    a: 'Да, дату можно перенести не менее чем за 24 часа до запланированной доставки. Свяжитесь с нами по телефону или в WhatsApp — всё решим быстро.',
  },
  {
    category: 'health',
    q: 'Как понять, что змея заболела?',
    a: 'Тревожные признаки: отказ от еды более 3 недель (не в период линьки), хрипы при дыхании, слизь из пасти или ноздрей, необычная вялость, проблемы с линькой (остатки старой кожи), опухоли или раны. При любом из этих симптомов обратитесь к ветеринару-герпетологу.',
  },
  {
    category: 'health',
    q: 'Что делать, если змея не ест?',
    a: 'Сначала убедитесь, что параметры содержания в норме: температура, влажность, наличие укрытия. Змеи часто отказываются от еды перед линькой или при стрессе после переезда. Если отказ длится более месяца без видимых причин — проконсультируйтесь с нами или герпетологом.',
  },
  {
    category: 'health',
    q: 'Проходят ли ваши змеи ветеринарный осмотр?',
    a: 'Да, каждая змея осматривается нашим ветеринаром перед продажей и получает ветеринарное свидетельство установленного образца РК. Мы проверяем вес, состояние кожи, глаз, пасти и общую активность питомца.',
  },
];

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? FAQ
    : FAQ.filter(f => f.category === activeCategory);

  return (
    <PageWrapper>
      <BlobLeft />
      <BlobRight />
      <Page>
        <PageHeader>
          <Badge>FAQ</Badge>
          <PageTitle>Частые <em>вопросы</em></PageTitle>
          <PageSubtitle>Собрали ответы на самые популярные вопросы о покупке, уходе и доставке</PageSubtitle>
        </PageHeader>

        <Tabs>
          {CATEGORIES.map(({ key, label, emoji }) => (
            <Tab
              key={key}
              $active={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            >
              <TabEmoji>{emoji}</TabEmoji>
              {label}
            </Tab>
          ))}
        </Tabs>

        <Accordion.Root asChild type="single" collapsible>
          <FaqList>
            {filtered.map(({ q, a }) => (
              <Accordion.Item key={q} value={q} asChild>
                <FaqItem>
                  <Accordion.Header asChild>
                    <Accordion.Trigger asChild>
                      <FaqQuestion>
                        <QuestionText>{q}</QuestionText>
                        <ChevronWrap>
                          <ChevronIcon />
                        </ChevronWrap>
                      </FaqQuestion>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content asChild>
                    <FaqAnswer>
                      <AnswerInner>
                        <AnswerText>{a}</AnswerText>
                      </AnswerInner>
                    </FaqAnswer>
                  </Accordion.Content>
                </FaqItem>
              </Accordion.Item>
            ))}
          </FaqList>
        </Accordion.Root>

        <CtaBlock>
          <CtaTitle>Не нашли ответ?</CtaTitle>
          <CtaDesc>Напишите нам — ответим в течение часа в рабочее время</CtaDesc>
          <CtaButtons>
            <CtaButtonPrimary href="/catalog">Перейти в каталог</CtaButtonPrimary>
            <CtaButtonSecondary href="tel:+79991234567">Позвонить нам</CtaButtonSecondary>
          </CtaButtons>
        </CtaBlock>
      </Page>
    </PageWrapper>
  );
}

export default FaqPage;
