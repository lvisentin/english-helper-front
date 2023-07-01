'use client';

import { useState } from 'react';
import { TextFieldProps } from '@/components/TextField/TextField.types';

export default function TextField({
  label,
  trailingIcon,
  leadingIcon,
  helperText,
  placeholder,
  className,
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
      <div className={`form-control ${className}`}>
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <label className="not-prose input-group">
          {leadingIcon && <span>{leadingIcon}</span>}
          <input
            type={toggleState && trailingIcon ? 'password' : 'text'}
            placeholder={placeholder}
            className={`input input-bordered flex-grow w-[inherit]`}
          />
          {renderTrailingIcon()}
        </label>
        {helperText && (
          <label className={'label-text'}>
            <span className={'label-text-alt'}>{helperText}</span>
          </label>
        )}
      </div>
    </>
  );
}
