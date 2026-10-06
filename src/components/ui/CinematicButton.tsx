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
    sm: { padding: '0.5rem 1.25rem', fontSize: '0.6875rem' },
    md: { padding: '0.875rem 2rem', fontSize: '0.8125rem' },
    lg: { padding: '1rem 2.5rem', fontSize: '0.875rem' },
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
