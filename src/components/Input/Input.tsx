import React, { useState, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Input type */
  type?: 'text' | 'password' | 'number' | 'email';
  /** Show clear button */
  clearable?: boolean;
  /** Label for the input */
  label?: string;
  /** Error message */
  error?: string;
  /** Full width input */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      label,
      error,
      fullWidth = false,
      value,
      onChange,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState('');

    // Generate a unique ID
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;
    const showClearButton = clearable && currentValue && !disabled;
    const showPasswordToggle = type === 'password' && !disabled;

    return (
      <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div
          className={`input-container ${error ? 'input-container--error' : ''} ${disabled ? 'input-container--disabled' : ''}`}
        >
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={`input-field ${className}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <div className="input-actions">
            {showClearButton && (
              <button
                type="button"
                className="input-action-btn input-clear-btn"
                onClick={handleClear}
                aria-label="Clear input"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            {showPasswordToggle && (
              <button
                type="button"
                className="input-action-btn input-password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        {error && (
          <span id={`${inputId}-error`} className="input-error">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
