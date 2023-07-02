import React from 'react';

export interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
}

function LoadingButton({
  children,
  loading,
  disabled,
  className,
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      className={className ? className : 'btn btn-primary'}
      disabled={loading || disabled}
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
