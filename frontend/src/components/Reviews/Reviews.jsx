import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import icon1 from '../../assets/images/icon1.svg';
import {
  Wrapper,
  Glow,
  Section,
  Header,
  Badge,
  Title,
  Subtitle,
  EmblaArea,
  ArrowsOverlay,
  ArrowsRow,
  ArrowBtn,
  Embla,
  EmblaContainer,
  EmblaSlide,
  Card,
  CardTop,
  CardHeader,
  AuthorRow,
  Avatar,
  AuthorInfo,
  AuthorName,
  AuthorDate,
  Stars,
  ReviewText,
  PetTag,
  Dots,
  Dot,
} from './Reviews.styles';

const reviews = [
  {
    name: 'Алексей Петров',
    date: '2 дня назад',
    stars: 5,
    text: 'Купили щенка хаски. Всё прошло отлично! Щенок здоровый, игривый, со всеми документами. Консультанты очень помогли с выбором и дали кучу полезных советов по уходу.',
    pet: 'Королевский питон',
  },
  {
    name: 'Мария Соколова',
    date: '5 дней назад',
    stars: 5,
    text: 'Очень довольна покупкой! Змея пришла здоровой, в отличном состоянии. Упаковка была надёжной, температурный режим соблюдён. Буду рекомендовать друзьям.',
    pet: 'Маисовый полоз',
  },
  {
    name: 'Дмитрий Иванов',
    date: '1 неделю назад',
    stars: 5,
    text: 'Отличный магазин! Помогли подобрать первую змею для новичка. Подробно рассказали об уходе и содержании. Питон уже освоился и активно кушает.',
    pet: 'Шаровый питон',
  },
  {
    name: 'Елена Краснова',
    date: '2 недели назад',
    stars: 5,
    text: 'Заказывала императорского удава. Доставка быстрая, животное в прекрасном состоянии. Менеджеры всегда на связи, отвечают на любые вопросы.',
    pet: 'Императорский удав',
  },
  {
    name: 'Сергей Волков',
    date: '3 недели назад',
    stars: 5,
    text: 'Брал маисового полоза для дочки. Очень дружелюбная змея, быстро привыкла к рукам. Магазин дал подробную инструкцию по уходу и всегда отвечает на вопросы.',
    pet: 'Маисовый полоз',
  },
  {
    name: 'Анна Белова',
    date: '1 месяц назад',
    stars: 5,
    text: 'Давно мечтала о королевской змее. Всё прошло идеально — животное здоровое, активное, упаковка отличная. Огромное спасибо за профессионализм!',
    pet: 'Королевская змея',
  },
  {
    name: 'Игорь Морозов',
    date: '1 месяц назад',
    stars: 5,
    text: 'Заказывал шарового питона. Доставили быстро и аккуратно, питон сразу начал есть. Консультанты помогли с выбором террариума и оборудования.',
    pet: 'Шаровый питон',
  },
  {
    name: 'Татьяна Орлова',
    date: '2 месяца назад',
    stars: 5,
    text: 'Покупала удава для себя — давняя мечта. Магазин очень понравился: честные консультации, здоровое животное и поддержка после покупки. Рекомендую всем!',
    pet: 'Императорский удав',
  },
];

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Reviews() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  return (
    <Wrapper>
      <Glow />
      <Section>
        <Header>
          <Badge>Отзывы</Badge>
          <Title>Что говорят наши клиенты</Title>
          <Subtitle>Более 1000 счастливых владельцев уже нашли своих питомцев у нас</Subtitle>
        </Header>
      </Section>

      <EmblaArea>
        <ArrowsOverlay>
          <ArrowBtn onClick={scrollPrev} aria-label="Назад"><ArrowLeft /></ArrowBtn>
          <ArrowBtn onClick={scrollNext} aria-label="Вперёд"><ArrowRight /></ArrowBtn>
        </ArrowsOverlay>

        <Embla ref={emblaRef}>
          <EmblaContainer>
            {reviews.map(({ name, date, stars, text, pet }) => (
              <EmblaSlide key={name + date}>
                <Card>
                  <CardTop>
                    <CardHeader>
                      <AuthorRow>
                        <Avatar>🧑</Avatar>
                        <AuthorInfo>
                          <AuthorName>{name}</AuthorName>
                          <AuthorDate>{date}</AuthorDate>
                        </AuthorInfo>
                      </AuthorRow>
                      <Stars>{'⭐'.repeat(stars)}</Stars>
                    </CardHeader>
                    <ReviewText>{text}</ReviewText>
                  </CardTop>
                  <PetTag>
                    <img src={icon1} alt="snake" />
                    <span>{pet}</span>
                  </PetTag>
                </Card>
              </EmblaSlide>
            ))}
          </EmblaContainer>
        </Embla>

        <ArrowsRow>
          <ArrowBtn onClick={scrollPrev} aria-label="Назад"><ArrowLeft /></ArrowBtn>
          <ArrowBtn onClick={scrollNext} aria-label="Вперёд"><ArrowRight /></ArrowBtn>
        </ArrowsRow>

        <Dots>
          {reviews.map((_, i) => (
            <Dot key={i} $active={i === selectedIndex} onClick={() => scrollTo(i)} />
          ))}
        </Dots>
      </EmblaArea>
    </Wrapper>
  );
}

export default Reviews;
