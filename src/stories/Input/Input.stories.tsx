import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

// Interactive demo for password with value
const PasswordWithValueDemo = () => {
  const [value, setValue] = useState('mysecretpassword');
  
  return (
    <Input
      type="password"
      label="Password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const PasswordWithValue: Story = {
  render: () => <PasswordWithValueDemo />,
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

// Interactive demo for clearable input
const ClearableDemo = () => {
  const [value, setValue] = useState('Some text to clear');
  
  return (
    <Input
      type="text"
      placeholder="Type something..."
      label="Clearable Input"
      clearable
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Clearable: Story = {
  render: () => <ClearableDemo />,
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

// Interactive demo for input with error validation
const WithErrorDemo = () => {
  const [value, setValue] = useState('invalid-email');
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  const errorMessage = value && !isValid ? 'Please enter a valid email address' : undefined;
  
  return (
    <Input
      type="email"
      placeholder="Enter your email..."
      label="Email"
      error={errorMessage}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithError: Story = {
  render: () => <WithErrorDemo />,
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'This input is disabled',
    label: 'Disabled Input',
    disabled: true,
  },
};

// Interactive demo for password with clearable
const PasswordClearableDemo = () => {
  const [value, setValue] = useState('mysecretpass');
  
  return (
    <Input
      type="password"
      placeholder="Enter password..."
      label="Password with Clear"
      clearable
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const PasswordClearable: Story = {
  render: () => <PasswordClearableDemo />,
  name: 'Password + Clearable',
};
