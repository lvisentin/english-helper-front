import { ChangeEvent, FocusEvent, ReactNode } from 'react';

interface TrailingIconProps {
  type: 'default' | 'toggle';
  initialIcon?: ReactNode;
  secondIcon?: ReactNode;
}

export interface TextFieldProps {
  label?: string;
  helperText?: string;
  placeholder: string;
  leadingIcon?: ReactNode;
  trailingIcon?: TrailingIconProps;
  className?: string;
  onChange?: (e: ChangeEvent<any>) => any;
  onBlur?: (e: FocusEvent<any, Element>) => any;
  value?: any;
  name: string;
  disabled?: boolean;
  errors?: any;
}
