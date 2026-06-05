import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import api from '../../api/client';
import {
  Overlay, Modal, ModalHeader, ModalTitle, CloseBtn,
  ModalBody, Section, SectionTitle,
  AddressList, AddressCard, AddressRadio, AddressInfo, AddressLine, AddressSub, DefaultBadge,
  PaymentList, PaymentCard, PaymentIcon, PaymentInfo, PaymentName, PaymentSub,
  OrderSummary, SummaryRow, SummaryLabel, SummaryValue, SummaryDivider, TotalRow, TotalLabel, TotalValue,
  CommentInput, ConfirmBtn, ErrorNotice, EmptyAddresses, AddAddressLink,
} from './CheckoutModal.styles';

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₸';
}

function getItemName(item) {
  if (item.item_type === 'snake') return item.morph ? `${item.snake.name} (${item.morph.name})` : item.snake.name;
  if (item.item_type === 'terrarium') return item.terrarium.name;
  if (item.item_type === 'food') return item.food.name;
  return '—';
}

function getItemPrice(item) {
  if (item.item_type === 'snake') return item.snake.price + (item.morph?.price_modifier ?? 0);
  if (item.item_type === 'terrarium') return item.terrarium.price;
  if (item.item_type === 'food') return item.food.price;
  return 0;
}

const PAYMENT_OPTIONS = [
  {
    value: 'card',
    icon: '💳',
    name: 'Банковская карта',
    sub: 'Оплата по терминалу при доставке',
  },
  {
    value: 'cash',
    icon: '💵',
    name: 'Наличные',
    sub: 'Оплата курьеру при получении',
  },
];

function CheckoutModal({ items, subtotal, promoData, promoInvalid, computedDiscount, total, onClose, onSuccess }) {
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [payment, setPayment] = useState('card');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadAddresses = useCallback(async () => {
    try {
      const res = await api.getAddresses();
      const data = await api.parse(res);
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      setAddresses(list);
      const def = list.find(a => a.is_default);
      setSelectedAddressId(def ? def.id : list[0]?.id ?? null);
    } catch {
      setAddresses([]);
    } finally {
      setAddressesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleConfirm() {
    if (!selectedAddressId) {
      setError('Выберите адрес доставки');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const payload = {
        address_id: selectedAddressId,
        payment_method: payment,
        comment: comment.trim(),
      };
      if (promoData && !promoInvalid) {
        payload.promo_code = promoData.code;
      }
      const res = await api.createOrder(payload);
      const data = await api.parse(res);
      if (res.ok) {
        onSuccess(data);
      } else {
        setError(data?.detail || 'Не удалось оформить заказ');
      }
    } catch {
      setError('Ошибка соединения, попробуйте ещё раз');
    } finally {
      setSubmitting(false);
    }
  }

  function formatAddress(a) {
    const parts = [a.city, a.street, `д. ${a.house}`];
    if (a.apartment) parts.push(`кв. ${a.apartment}`);
    return parts.join(', ');
  }

  return createPortal(
    <Overlay onClick={e => e.target === e.currentTarget && onClose()}>
      <Modal>
        <ModalHeader>
          <ModalTitle>Оформление заказа</ModalTitle>
          <CloseBtn onClick={onClose} aria-label="Закрыть">✕</CloseBtn>
        </ModalHeader>

        <ModalBody>
          {/* Адрес */}
          <Section>
            <SectionTitle>Адрес доставки</SectionTitle>
            {addressesLoading ? (
              <EmptyAddresses>Загружаем адреса...</EmptyAddresses>
            ) : addresses.length === 0 ? (
              <EmptyAddresses>
                Нет сохранённых адресов.{' '}
                <AddAddressLink href="/profile">Добавить адрес</AddAddressLink>
              </EmptyAddresses>
            ) : (
              <AddressList>
                {addresses.map(addr => (
                  <AddressCard
                    key={addr.id}
                    $active={selectedAddressId === addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                  >
                    <AddressRadio $active={selectedAddressId === addr.id} />
                    <AddressInfo>
                      <AddressLine>
                        {formatAddress(addr)}
                        {addr.is_default && <DefaultBadge>Основной</DefaultBadge>}
                      </AddressLine>
                      <AddressSub>{addr.country}, {addr.postal_code}</AddressSub>
                    </AddressInfo>
                  </AddressCard>
                ))}
              </AddressList>
            )}
          </Section>

          {/* Способ оплаты */}
          <Section>
            <SectionTitle>Способ оплаты</SectionTitle>
            <PaymentList>
              {PAYMENT_OPTIONS.map(opt => (
                <PaymentCard
                  key={opt.value}
                  $active={payment === opt.value}
                  onClick={() => setPayment(opt.value)}
                >
                  <PaymentIcon>{opt.icon}</PaymentIcon>
                  <PaymentInfo>
                    <PaymentName>{opt.name}</PaymentName>
                    <PaymentSub>{opt.sub}</PaymentSub>
                  </PaymentInfo>
                </PaymentCard>
              ))}
            </PaymentList>
          </Section>

          {/* Состав заказа */}
          <Section>
            <SectionTitle>Состав заказа</SectionTitle>
            <OrderSummary>
              {items.map(item => (
                <SummaryRow key={item.id}>
                  <SummaryLabel>{getItemName(item)} × {item.quantity}</SummaryLabel>
                  <SummaryValue>{formatPrice(getItemPrice(item) * item.quantity)}</SummaryValue>
                </SummaryRow>
              ))}

              <SummaryDivider />

              <SummaryRow>
                <SummaryLabel>Подытог</SummaryLabel>
                <SummaryValue>{formatPrice(subtotal)}</SummaryValue>
              </SummaryRow>

              {promoData && !promoInvalid && (
                <SummaryRow>
                  <SummaryLabel style={{ color: '#068D27' }}>
                    Скидка ({promoData.code})
                  </SummaryLabel>
                  <SummaryValue style={{ color: '#068D27' }}>
                    − {formatPrice(computedDiscount)}
                  </SummaryValue>
                </SummaryRow>
              )}

              <SummaryDivider />

              <TotalRow>
                <TotalLabel>К оплате</TotalLabel>
                <TotalValue>{formatPrice(total)}</TotalValue>
              </TotalRow>
            </OrderSummary>
          </Section>

          {/* Комментарий */}
          <Section>
            <SectionTitle>Комментарий к заказу</SectionTitle>
            <CommentInput
              placeholder="Например: позвонить за 30 минут, оставить у двери..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={500}
            />
          </Section>

          {error && <ErrorNotice>{error}</ErrorNotice>}

          <ConfirmBtn
            onClick={handleConfirm}
            disabled={submitting || addresses.length === 0 || !selectedAddressId}
          >
            {submitting ? 'Оформляем...' : 'Подтвердить заказ'}
          </ConfirmBtn>
        </ModalBody>
      </Modal>
    </Overlay>,
    document.body
  );
}

export default CheckoutModal;
