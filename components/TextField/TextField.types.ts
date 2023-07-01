import { ReactNode } from 'react';

/**
 * Propriedades do ícone à direita do campo de texto.
 */
interface TrailingIconProps {
  /**
   * Define o tipo de ícone à direita.
   * - 'default': Ícone inicial é exibido quando o campo de texto está vazio ou não está em foco.
   * - 'toggle': Segundo ícone é exibido quando o campo de texto está preenchido ou em foco. Os ícones devem conter as classes 'swap-on' e 'swap-off' para funcionarem
   */
  type: 'default' | 'toggle';

  /**
   * Ícone inicial a ser exibido quando o campo de texto está vazio ou não está em foco.
   */
  initialIcon?: ReactNode;

  /**
   * Segundo ícone a ser exibido quando o campo de texto está preenchido ou em foco.
   * Apenas aplicável quando `type` é definido como 'toggle'.
   */
  secondIcon?: ReactNode;
}

/**
 * Propriedades do TextField.
 */
export interface TextFieldProps {
  /**
   * Texto que descreve o campo de texto.
   */
  label?: string;

  /**
   * Texto com alguma orientação.
   */
  helperText?: string;

  /**
   * Texto de exemplo exibido dentro do campo de texto quando não há valor definido.
   */
  placeholder: string;

  /**
   * Ícone exibido à esquerda do campo de texto.
   */
  leadingIcon?: ReactNode;

  /**
   * Ícone exibido à direita do campo de texto.
   */
  trailingIcon?: TrailingIconProps;

  /**
   * Classe CSS personalizada a ser aplicada ao componente TextField.
   */
  className?: string;
}
