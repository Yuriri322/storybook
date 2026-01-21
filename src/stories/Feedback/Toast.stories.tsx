import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer } from '../../components/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px', padding: '20px' }}>
        <ToastContainer>
          <Story />
        </ToastContainer>
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: 'number',
    },
    showCloseButton: {
      control: 'boolean',
    },
    isVisible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully!',
    type: 'success',
    duration: 0,
    isVisible: true,
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
    duration: 0,
    isVisible: true,
  },
};

export const Warning: Story = {
  args: {
    message: 'Your session will expire in 5 minutes.',
    type: 'warning',
    duration: 0,
    isVisible: true,
  },
};

export const Info: Story = {
  args: {
    message: 'A new version is available. Refresh to update.',
    type: 'info',
    duration: 0,
    isVisible: true,
  },
};

export const AutoDismiss: Story = {
  args: {
    message: 'This toast will disappear in 3 seconds...',
    type: 'info',
    duration: 3000,
    isVisible: true,
  },
  name: 'Auto Dismiss (3s)',
};

export const LongDuration: Story = {
  args: {
    message: 'This toast will stay for 10 seconds.',
    type: 'success',
    duration: 10000,
    isVisible: true,
  },
  name: 'Long Duration (10s)',
};

export const WithoutCloseButton: Story = {
  args: {
    message: 'This toast has no close button.',
    type: 'warning',
    duration: 0,
    showCloseButton: false,
    isVisible: true,
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a longer toast message that demonstrates how the component handles multi-line content. It should wrap properly and maintain good readability.',
    type: 'info',
    duration: 0,
    isVisible: true,
  },
};
