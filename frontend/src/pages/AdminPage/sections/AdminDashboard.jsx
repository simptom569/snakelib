import React, { useState, useEffect } from 'react';
import api from '../../../api/client';
import {
  SectionHeader, SectionTitle,
  StatsGrid, StatCard, StatIcon, StatValue, StatLabel,
  Notice,
} from '../Admin.styles';

function formatPrice(n) {
  return Number(n).toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₸';
}

const STATS_CONFIG = [
  { key: 'total_orders',   icon: '📦', label: 'Всего заказов',     format: n => n },
  { key: 'orders_today',   icon: '🕐', label: 'Заказов сегодня',   format: n => n },
  { key: 'pending_orders', icon: '⏳', label: 'Ожидают обработки', format: n => n },
  { key: 'revenue_total',  icon: '💰', label: 'Выручка',           format: formatPrice },
  { key: 'total_users',    icon: '👥', label: 'Пользователей',     format: n => n },
  { key: 'active_promos',  icon: '🎟️', label: 'Активных промо',   format: n => n },
];

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.adminStats()
      .then(res => api.parse(res).then(data => {
        if (res.ok) setStats(data);
        else setError('Не удалось загрузить статистику');
      }))
      .catch(() => setError('Ошибка соединения'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SectionHeader>
        <SectionTitle>Дашборд</SectionTitle>
      </SectionHeader>

      {error && <Notice $error style={{ marginBottom: 20 }}>{error}</Notice>}

      <StatsGrid>
        {STATS_CONFIG.map(cfg => (
          <StatCard key={cfg.key}>
            <StatIcon>{cfg.icon}</StatIcon>
            <StatValue>
              {loading ? '—' : stats ? cfg.format(stats[cfg.key]) : '—'}
            </StatValue>
            <StatLabel>{cfg.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
    </>
  );
}

export default AdminDashboard;
