import React, { useState } from 'react';
import './SidebarMenu.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface SidebarMenuProps {
  /** Menu items */
  items: MenuItem[];
  /** Whether the sidebar is open */
  isOpen: boolean;
  /** Callback when sidebar should close */
  onClose: () => void;
  /** Sidebar title */
  title?: string;
}

interface MenuItemComponentProps {
  item: MenuItem;
  level: number;
}

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`menu-chevron ${isOpen ? 'menu-chevron--open' : ''}`}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      item.onClick?.();
    }
  };

  const content = (
    <>
      {item.icon && <span className="menu-item-icon">{item.icon}</span>}
      <span className="menu-item-label">{item.label}</span>
      {hasChildren && <ChevronIcon isOpen={isExpanded} />}
    </>
  );

  return (
    <li className="menu-item-wrapper">
      {item.href && !hasChildren ? (
        <a
          href={item.href}
          className={`menu-item menu-item--level-${level}`}
          onClick={item.onClick}
        >
          {content}
        </a>
      ) : (
        <button
          className={`menu-item menu-item--level-${level}`}
          onClick={handleClick}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {content}
        </button>
      )}
      {hasChildren && (
        <ul className={`menu-submenu ${isExpanded ? 'menu-submenu--open' : ''}`}>
          {item.children!.map((child) => (
            <MenuItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isOpen,
  onClose,
  title = 'Menu',
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">{title}</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {items.map((item) => (
              <MenuItemComponent key={item.id} item={item} level={0} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
