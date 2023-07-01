'use client';
import { useState } from 'react';
import { RadioButtonProps } from '@/components/RadioButton/RadioButton.types';

export default function RadioButton({ label, className }: RadioButtonProps) {
  const [radioState, setRadioState] = useState(false);

  function handleToggleRadio() {
    setRadioState((prevState) => !prevState);
    console.log(radioState);
  }

  return (
    <>
      <div className={`form-control ${className}`}>
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="radio"
            name="radio-10"
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
