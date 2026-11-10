import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#0B8F5A] text-white hover:bg-[#087F4E]',
    secondary: 'bg-[#EAF8F1] text-[#0B8F5A] hover:bg-[#DCF4E9]',
    danger: 'bg-[#FFF0F0] text-[#E53935] hover:bg-[#FFE7E7]',
    ghost: 'bg-transparent text-[#17211C] hover:bg-[#F3FBF7]',
  }

  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F5A] focus-visible:ring-offset-2',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
