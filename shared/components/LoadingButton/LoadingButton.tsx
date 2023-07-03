import React from 'react';

export interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
  type?: 'button' | 'submit';
}

function LoadingButton({
  children,
  loading,
  disabled,
  className,
  type,
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      className={className ? className : 'btn btn-primary border-0'}
      disabled={loading || disabled}
      type={type ? type : 'button'}
      onClick={onClick}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
}

export default LoadingButton;
