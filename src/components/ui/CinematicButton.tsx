import { type ReactNode } from 'react'

interface CinematicButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  ariaLabel?: string
  className?: string
  download?: boolean | string
  target?: string
}

/**
 * Unified cinematic button / link component.
 * Renders as <a> when href is provided, <button> otherwise.
 */
export function CinematicButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ariaLabel,
  className = '',
  download,
  target,
}: CinematicButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '0.625rem 1.25rem', fontSize: '0.875rem', minHeight: '42px' }, // 14px
    md: { padding: '0.75rem 1.75rem', fontSize: '0.9375rem', minHeight: '48px' }, // 15px
    lg: { padding: '0.875rem 2.25rem', fontSize: '1rem', minHeight: '52px' }, // 16px
  }

  const variantClass: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-secondary',
  }

  const sharedStyle: React.CSSProperties = {
    ...sizeStyles[size],
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={`${variantClass[variant]} ${className}`}
        style={sharedStyle}
        aria-label={ariaLabel}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass[variant]} ${className}`}
      style={sharedStyle}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
