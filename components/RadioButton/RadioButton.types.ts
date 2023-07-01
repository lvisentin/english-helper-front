import { ReactNode } from 'react';

/**
 * Propriedades do RadioButton.
 */
export interface RadioButtonProps {
  /**
   * O conteúdo a ser exibido ao lado do botão de opção.
   */
  label: ReactNode;

  /**
   * Classe CSS personalizada a ser aplicada ao componente RadioButton.
   */
  className?: string;
}
