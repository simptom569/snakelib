import React, { useState } from 'react';
import {
  AdminLayout, AdminHeader, AdminLogo, AdminLogoTag,
  AdminHeaderRight, AdminHeaderUser, AdminBackLink,
  AdminBody, AdminSidebar, SidebarItem, SidebarIcon,
  AdminContent,
  MobileTabBar, MobileTabItem, MobileTabIcon, MobileTabLabel,
} from './Admin.styles';
import AdminDashboard from './sections/AdminDashboard';
import AdminOrders from './sections/AdminOrders';
import AdminUsers from './sections/AdminUsers';
import AdminSnakes from './sections/AdminSnakes';
import AdminTerrariums from './sections/AdminTerrariums';
import AdminFoods from './sections/AdminFoods';
import AdminPromos from './sections/AdminPromos';
import { AdminSnakeCategories, AdminTerrariumCategories, AdminFoodCategories } from './sections/AdminCategories';

const NAV = [
  { key: 'dashboard',            icon: '📊', label: 'Дашборд' },
  { key: 'orders',               icon: '📦', label: 'Заказы' },
  { key: 'users',                icon: '👥', label: 'Пользователи' },
  { key: 'divider1' },
  { key: 'snakes',               icon: '🐍', label: 'Змеи' },
  { key: 'snake-categories',     icon: '📁', label: 'Категории змей' },
  { key: 'divider2' },
  { key: 'terrariums',           icon: '🏠', label: 'Террариумы' },
  { key: 'terrarium-categories', icon: '📁', label: 'Категории террар.' },
  { key: 'divider3' },
  { key: 'foods',                icon: '🐭', label: 'Корма' },
  { key: 'food-categories',      icon: '📁', label: 'Категории кормов' },
  { key: 'divider4' },
  { key: 'promos',               icon: '🎟️', label: 'Промокоды' },
];

const SECTIONS = {
  dashboard:            AdminDashboard,
  orders:               AdminOrders,
  users:                AdminUsers,
  snakes:               AdminSnakes,
  'snake-categories':   AdminSnakeCategories,
  terrariums:           AdminTerrariums,
  'terrarium-categories': AdminTerrariumCategories,
  foods:                AdminFoods,
  'food-categories':    AdminFoodCategories,
  promos:               AdminPromos,
};

function AdminPage({ user }) {
  const [section, setSection] = useState('dashboard');

  if (!user || user.role !== 'admin') {
    return (
      <AdminLayout>
        <AdminHeader>
          <AdminLogo href="/">SnakeLab <AdminLogoTag>ADMIN</AdminLogoTag></AdminLogo>
        </AdminHeader>
        <AdminContent style={{ textAlign: 'center', paddingTop: 80 }}>
          <div style={{ fontSize: 48 }}>🚫</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 16, color: '#0d1910' }}>Нет доступа</div>
          <div style={{ fontSize: 14, color: '#6b7c6e', marginTop: 8 }}>Только для администраторов</div>
        </AdminContent>
      </AdminLayout>
    );
  }

  const Section = SECTIONS[section];

  return (
    <AdminLayout>
      <AdminHeader>
        <AdminLogo href="/admin-panel">
          SnakeLab <AdminLogoTag>ADMIN</AdminLogoTag>
        </AdminLogo>
        <AdminHeaderRight>
          <AdminHeaderUser>{user.first_name} {user.last_name}</AdminHeaderUser>
          <AdminBackLink href="/" target="_blank" rel="noreferrer">← На сайт</AdminBackLink>
        </AdminHeaderRight>
      </AdminHeader>

      <AdminBody>
        <AdminSidebar>
          {NAV.map(item =>
            item.key.startsWith('divider') ? (
              <div key={item.key} style={{ height: 1, background: '#f0f0f0', margin: '6px 16px' }} />
            ) : (
              <SidebarItem
                key={item.key}
                $active={section === item.key}
                onClick={e => { e.preventDefault(); setSection(item.key); }}
                href="#"
              >
                <SidebarIcon>{item.icon}</SidebarIcon>
                {item.label}
              </SidebarItem>
            )
          )}
        </AdminSidebar>

        <AdminContent>
          <Section />
        </AdminContent>
      </AdminBody>

      <MobileTabBar>
        {NAV.filter(item => !item.key.startsWith('divider')).map(item => (
          <MobileTabItem
            key={item.key}
            $active={section === item.key}
            onClick={() => setSection(item.key)}
          >
            <MobileTabIcon>{item.icon}</MobileTabIcon>
            <MobileTabLabel>{item.label}</MobileTabLabel>
          </MobileTabItem>
        ))}
      </MobileTabBar>
    </AdminLayout>
  );
}

export default AdminPage;
