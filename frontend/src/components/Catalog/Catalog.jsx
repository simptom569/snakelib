import React from 'react';
import img1 from '../../assets/images/1.png';
import img2 from '../../assets/images/2.png';
import img3 from '../../assets/images/3.png';
import img4 from '../../assets/images/4.png';
import {
  Section,
  Header,
  Badge,
  Title,
  Subtitle,
  Grid,
  Column,
  Row,
  Card,
  CardImage,
  CardBody,
  CardName,
  CardDesc,
  CardFooter,
  Price,
  Tag,
} from './Catalog.styles';

function Catalog() {
  return (
    <Section>
      <Header>
        <Badge>Наши питомцы</Badge>
        <Title>Выбери нового друга</Title>
        <Subtitle>
          От спокойных маисовых полозов до редких экзотических видов — у нас вы найдёте змею, которая подойдёт именно вам
        </Subtitle>
      </Header>

      <Grid>
        {/* Левая колонка — одна большая карточка на всю высоту */}
        <Column>
          <Card>
            <CardImage $src={img1} />
            <CardBody $paddingTop="20px">
              <CardName>Маисовый полоз</CardName>
              <CardDesc>
                Одна из самых популярных и спокойных домашних змей. Легко привыкает к рукам, неприхотлива в уходе, подходит для начинающих. Большой выбор окрасов.
              </CardDesc>
              <CardFooter>
                <Price>от 7 900 ₽</Price>
                <Tag $bg="rgba(180, 255, 199, 0.4)" $border="#00c530" $color="#00c530">
                  Хит продаж
                </Tag>
              </CardFooter>
            </CardBody>
          </Card>
        </Column>

        {/* Правая колонка — два маленьких сверху + одна широкая снизу */}
        <Column>
          <Row>
            <Card>
              <CardImage $src={img2} />
              <CardBody $gap="12px" $paddingTop="10px">
                <CardName $size="24px">Королевская змея</CardName>
                <CardDesc $size="12px">
                  Контрастный окрас и активный характер. Отлично адаптируется к содержанию в террариуме, выносливая и любознательная. Хороший выбор для тех, кто хочет что-то эффектнее.
                </CardDesc>
                <CardFooter>
                  <Price $size="22px">от 12 500 ₽</Price>
                  <Tag
                    $bg="rgba(180, 255, 240, 0.4)"
                    $border="#00c58d"
                    $color="#00c597"
                    $padding="6px 8px"
                    $fontSize="12px"
                  >
                    Новинки
                  </Tag>
                </CardFooter>
              </CardBody>
            </Card>

            <Card>
              <CardImage $src={img3} />
              <CardBody $gap="12px" $paddingTop="10px">
                <CardName $size="24px">Императорский удав</CardName>
                <CardDesc $size="12px">
                  Крупная, мощная и спокойная змея с выразительным рисунком. Подходит опытным владельцам. При правильном уходе живёт десятилетиями.
                </CardDesc>
                <CardFooter>
                  <Price $size="22px">от 24 000 ₽</Price>
                </CardFooter>
              </CardBody>
            </Card>
          </Row>

          <Card>
            <CardImage $src={img4} />
            <CardBody $gap="12px" $paddingTop="10px">
              <CardName>Шаровый питон</CardName>
              <CardDesc>
                Невысокая активность, компактные размеры и множество морф. Известен своим спокойным темпераментом и "шаровой" позой при стрессе.
              </CardDesc>
              <CardFooter>
                <Price>от 18 900 ₽</Price>
                <Tag
                  $bg="rgba(255, 220, 180, 0.4)"
                  $border="#c56300"
                  $color="#c56300"
                >
                  Ограниченное количество
                </Tag>
              </CardFooter>
            </CardBody>
          </Card>
        </Column>
      </Grid>
    </Section>
  );
}

export default Catalog;
