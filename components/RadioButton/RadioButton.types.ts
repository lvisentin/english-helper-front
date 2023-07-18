import { ChangeEvent, FocusEvent, ReactNode } from 'react';

export interface RadioButtonProps {
  label: ReactNode;
  className?: string;
  name: string;
  onChange?: (e: ChangeEvent<any>) => any;
  onBlur?: (e: FocusEvent<any, Element>) => any;
  value: any;
}
