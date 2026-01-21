import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email'],
    },
    clearable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name...',
    label: 'Name',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
    label: 'Password',
  },
};

export const PasswordWithValue: Story = {
  args: {
    type: 'password',
    label: 'Password',
    value: 'mysecretpassword',
  },
  name: 'Password (with value)',
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
    label: 'Age',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
    label: 'Email',
  },
};

export const Clearable: Story = {
  args: {
    type: 'text',
    placeholder: 'Type something...',
    label: 'Clearable Input',
    clearable: true,
    value: 'Some text to clear',
  },
};

export const ClearableEmpty: Story = {
  args: {
    type: 'text',
    placeholder: 'Type something...',
    label: 'Clearable Input (empty)',
    clearable: true,
  },
  name: 'Clearable (empty)',
};

export const WithError: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
    label: 'Email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'This input is disabled',
    label: 'Disabled Input',
    disabled: true,
  },
};

export const PasswordClearable: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password with Clear',
    clearable: true,
    value: 'mysecretpass',
  },
  name: 'Password + Clearable',
};
