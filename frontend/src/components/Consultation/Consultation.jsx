import React, { useState } from 'react';
import formLine from '../../assets/images/form_line.svg';
import form1 from '../../assets/images/form1.svg';
import form2 from '../../assets/images/form2.svg';
import form3 from '../../assets/images/form3.svg';
import form4 from '../../assets/images/form4.svg';
import form5 from '../../assets/images/form5.svg';
import {
  Section,
  Header,
  Badge,
  Title,
  Subtitle,
  Card,
  CardPattern,
  CardLeft,
  LeftTop,
  LeftTitle,
  LeftDesc,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureText,
  QuickReply,
  QuickReplyRow,
  QuickReplyTitle,
  QuickReplyText,
  FormCard,
  FormTitle,
  FormRow,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSelect,
  FormFieldFull,
  FieldTextarea,
  CheckboxRow,
  Checkbox,
  CheckboxLabel,
  SubmitBtn,
} from './Consultation.styles';

const features = [
  { icon: form1, text: 'Бесплатная консультация специалиста' },
  { icon: form2, text: 'Помощь в выборе подходящего вида' },
  { icon: form3, text: 'Рекомендации по содержанию и уходу' },
  { icon: form4, text: 'Ответы на все ваши вопросы' },
];

function Consultation() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Section>
      <Header>
        <Badge>Консультация</Badge>
        <Title>Не знаете, с чего начать?</Title>
        <Subtitle>Оставьте заявку — мы поможем подобрать змею под ваш опыт и условия содержания.</Subtitle>
      </Header>

      <Card>
        <CardPattern $src={formLine} />

        <CardLeft>
          <LeftTop>
            <LeftTitle>Запись на консультацию</LeftTitle>
            <LeftDesc>
              Получите профессиональную консультацию по выбору и содержанию змей. Наши эксперты помогут подобрать идеального питомца для вас.
            </LeftDesc>
          </LeftTop>

          <FeatureList>
            {features.map(({ icon, text }) => (
              <FeatureItem key={text}>
                <FeatureIcon><img src={icon} alt="" width={20} height={20} /></FeatureIcon>
                <FeatureText>{text}</FeatureText>
              </FeatureItem>
            ))}
          </FeatureList>

          <QuickReply>
            <QuickReplyRow>
              <img src={form5} alt="" width={20} height={20} />
              <QuickReplyTitle>Быстрый ответ</QuickReplyTitle>
            </QuickReplyRow>
            <QuickReplyText>
              Мы свяжемся с вами в течение 1 часа в рабочее время (с 10:00 до 20:00) и подберём удобное время для консультации.
            </QuickReplyText>
          </QuickReply>
        </CardLeft>

        <FormCard>
          <FormTitle>Оставьте заявку</FormTitle>

          <FormRow>
            <FormField>
              <FieldLabel>Ваше имя *</FieldLabel>
              <FieldInput type="text" placeholder="Ваше имя" />
            </FormField>
            <FormField>
              <FieldLabel>Телефон *</FieldLabel>
              <FieldInput type="tel" placeholder="+7 (999) 123-45-67" />
            </FormField>
          </FormRow>

          <FormRow>
            <FormField>
              <FieldLabel>Email</FieldLabel>
              <FieldInput type="email" placeholder="ivan@example.com" />
            </FormField>
            <FormField>
              <FieldLabel>Вид змеи</FieldLabel>
              <FieldSelect defaultValue="">
                <option value="" disabled>Пока не определился</option>
                <option>Маисовый полоз</option>
                <option>Королевская змея</option>
                <option>Шаровый питон</option>
                <option>Императорский удав</option>
              </FieldSelect>
            </FormField>
          </FormRow>

          <FormFieldFull>
            <FieldLabel>Ваши вопросы или пожелания</FieldLabel>
            <FieldTextarea placeholder="Расскажите, что вас интересует..." />
          </FormFieldFull>

          <CheckboxRow>
            <Checkbox
              type="checkbox"
              id="privacy"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <CheckboxLabel htmlFor="privacy">
              Я согласен с политикой конфиденциальности и даю согласие на обработку персональных данных
            </CheckboxLabel>
          </CheckboxRow>

          <SubmitBtn type="button" disabled={!agreed}>
            Записаться на консультацию
          </SubmitBtn>
        </FormCard>
      </Card>
    </Section>
  );
}

export default Consultation;
