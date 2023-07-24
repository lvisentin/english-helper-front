'use client';

import { TextFieldProps } from '@/components/TextField/TextField.types';
import { useState } from 'react';

export default function TextField({
  label,
  trailingIcon,
  leadingIcon,
  helperText,
  placeholder,
  className,
  onChange,
  onBlur,
  value,
  name,
  errors,
  disabled,
}: TextFieldProps) {
  const [toggleState, setToggleState] = useState(true);

  function toggleTrailingIcon() {
    setToggleState((prev) => !prev);
  }

  function renderTrailingIcon() {
    switch (trailingIcon?.type) {
      case 'default': {
        return <span>{trailingIcon.initialIcon} </span>;
      }
      case 'toggle': {
        return (
          <span>
            <label className={'swap'}>
              <input type={'checkbox'} onClick={toggleTrailingIcon} />
              {trailingIcon.initialIcon}
              {trailingIcon.secondIcon}
            </label>
          </span>
        );
      }
    }
  }

  return (
    <>
      <div className={`p-1 form-control ${className}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        {leadingIcon || trailingIcon ? (
          <label className="not-prose input-group">
            {leadingIcon && <span>{leadingIcon}</span>}
            <input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
              type={toggleState && trailingIcon ? 'password' : 'text'}
              placeholder={placeholder}
              disabled={disabled}
              className={`input input-bordered flex-grow w-[inherit]`}
            />
            {renderTrailingIcon()}
          </label>
        ) : (
          <input
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            type={'text'}
            disabled={disabled}
            placeholder={placeholder}
            className={`input input-bordered flex-grow w-[inherit]`}
          />
        )}
        {helperText && (
          <label className={'label-text'}>
            <span className={`label-text-alt`}>{helperText}</span>
          </label>
        )}
        {errors && (
          <label className={'label-text'}>
            <span className={`label-text-alt error text-error`}>{errors}</span>
          </label>
        )}
      </div>
    </>
  );
}
