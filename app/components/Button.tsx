'use client'

import { IconType } from "react-icons"

interface ButtonProps {
    label: string
    onClick: (element: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon:Icon,
}:ButtonProps) => {

    const baseClasses = `
    relative
    rounded-lg
    hover:opacity-80
    transition
    w-full
`;

const disabledButtonClasses = `
    opacity-70
    cursor-not-allowed
`;

const outlineButtonClasses = `
    bg-white
    border-black
    text-black
`;

const filledButtonClasses = `
    bg-rose-500
    border-2
    text-white
`;

const smallButtonClasses = `
    py-3
    text-md
    font-semibold
    border-2
`;

const smallOutlineButtonClasses = `
    py-1
    text-sm
    font-light
    border-1
`;

const finalClasses = `
    ${baseClasses}
    ${outline ? outlineButtonClasses : filledButtonClasses}
    ${small ? smallOutlineButtonClasses : smallButtonClasses}
    ${disabled ? disabledButtonClasses : ''}
`.trim();

    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={finalClasses}
                >
                    {Icon && <Icon className="absolute left-4 top-3"/>}
                    {label}
        </button>
    )
}

export default Button