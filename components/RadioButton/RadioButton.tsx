'use client';
import { RadioButtonProps } from '@/components/RadioButton/RadioButton.types';
import { useState } from 'react';

export default function RadioButton({
  label,
  className,
  onChange,
  onBlur,
  value,
  name,
}: RadioButtonProps) {
  const [radioState, setRadioState] = useState(false);

  function handleToggleRadio() {
    setRadioState((prevState) => !prevState);
  }

  return (
    <>
      <div className={`form-control ${className}`}>
        <label className="label cursor-pointer justify-start gap-4">
          <input
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            type="radio"
            checked={radioState}
            onClick={handleToggleRadio}
            className="radio checked:bg-primary"
          />

          <span className="label-text">{label}</span>
        </label>
      </div>
    </>
  );
}
