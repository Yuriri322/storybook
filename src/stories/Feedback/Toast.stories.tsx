import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastContainer } from '../../components/Toast';
import type { ToastType } from '../../components/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component that manages visibility
const ToastDemo = ({
  message,
  type,
  duration,
  showCloseButton = true,
}: {
  message: string;
  type: ToastType;
  duration: number;
  showCloseButton?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = () => {
    setIsVisible(true);
  };

  return (
    <div style={{ minHeight: '300px', padding: '20px' }}>
      <button
        onClick={handleShow}
        style={{
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          background: '#fff',
          marginBottom: '20px',
        }}
      >
        Show Toast
      </button>
      <ToastContainer>
        <Toast
          message={message}
          type={type}
          duration={duration}
          showCloseButton={showCloseButton}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </ToastContainer>
    </div>
  );
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      message="Your changes have been saved successfully!"
      type="success"
      duration={3000}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastDemo message="Something went wrong. Please try again." type="error" duration={3000} />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo message="Your session will expire in 5 minutes." type="warning" duration={3000} />
  ),
};

export const Info: Story = {
  render: () => (
    <ToastDemo
      message="A new version is available. Refresh to update."
      type="info"
      duration={3000}
    />
  ),
};

export const AutoDismiss3s: Story = {
  render: () => (
    <ToastDemo message="This toast will disappear in 3 seconds..." type="info" duration={3000} />
  ),
  name: 'Auto Dismiss (3s)',
};

export const LongDuration: Story = {
  render: () => (
    <ToastDemo message="This toast will stay for 10 seconds." type="success" duration={10000} />
  ),
  name: 'Long Duration (10s)',
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ToastDemo
      message="This toast has no close button and auto-dismisses in 3s."
      type="warning"
      duration={3000}
      showCloseButton={false}
    />
  ),
  name: 'Without Close Button',
};

export const NoDismiss: Story = {
  render: () => (
    <ToastDemo
      message="This toast will not auto-dismiss (duration = 0)."
      type="info"
      duration={0}
    />
  ),
  name: 'No Auto-Dismiss',
};

export const LongMessage: Story = {
  render: () => (
    <ToastDemo
      message="This is a longer toast message that demonstrates how the component handles multi-line content. It should wrap properly and maintain good readability."
      type="info"
      duration={5000}
    />
  ),
  name: 'Long Message',
};
