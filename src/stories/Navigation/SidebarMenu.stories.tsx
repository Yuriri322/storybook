import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SidebarMenu } from '../../components/SidebarMenu';
import type { MenuItem } from '../../components/SidebarMenu';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Navigation/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for the menu items
const HomeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UsersIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const FolderIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const simpleMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const nestedMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  {
    id: 'users',
    label: 'Users',
    icon: UsersIcon,
    children: [
      { id: 'all-users', label: 'All Users' },
      { id: 'add-user', label: 'Add User' },
      { id: 'user-groups', label: 'User Groups' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderIcon,
    children: [
      { id: 'active', label: 'Active Projects' },
      { id: 'archived', label: 'Archived Projects' },
    ],
  },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const deepNestedMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  {
    id: 'users',
    label: 'Users',
    icon: UsersIcon,
    children: [
      { id: 'all-users', label: 'All Users' },
      {
        id: 'user-management',
        label: 'User Management',
        children: [
          { id: 'roles', label: 'Roles' },
          { id: 'permissions', label: 'Permissions' },
          { id: 'access-logs', label: 'Access Logs' },
        ],
      },
      { id: 'user-groups', label: 'User Groups' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    children: [
      { id: 'general', label: 'General' },
      { id: 'security', label: 'Security' },
      {
        id: 'advanced',
        label: 'Advanced',
        children: [
          { id: 'api', label: 'API Settings' },
          { id: 'webhooks', label: 'Webhooks' },
        ],
      },
    ],
  },
];

// Interactive wrapper component
const SidebarWrapper = ({
  items,
  title,
  defaultOpen = true,
}: {
  items: MenuItem[];
  title?: string;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ minHeight: '400px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          background: '#fff',
          margin: '20px',
        }}
      >
        Open Menu
      </button>
      <SidebarMenu items={items} isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} />
    </div>
  );
};

export const SimpleMenu: Story = {
  render: () => <SidebarWrapper items={simpleMenuItems} title="Simple Menu" />,
  name: 'Simple (1 level)',
};

export const NestedMenu: Story = {
  render: () => <SidebarWrapper items={nestedMenuItems} title="Nested Menu" />,
  name: 'Nested (2 levels)',
};

export const DeepNestedMenu: Story = {
  render: () => <SidebarWrapper items={deepNestedMenuItems} title="Deep Menu" />,
  name: 'Deep Nested (3 levels)',
};

export const ClosedState: Story = {
  render: () => <SidebarWrapper items={nestedMenuItems} title="Menu" defaultOpen={false} />,
  name: 'Closed State',
};

export const OpenState: Story = {
  render: () => <SidebarWrapper items={nestedMenuItems} title="Navigation" defaultOpen={true} />,
  name: 'Open State',
};
