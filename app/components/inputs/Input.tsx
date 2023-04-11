'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors,
}: InputProps) => {

    const baseInputClasses = `
    peer
    w-full
    p-4
    pt-6
    font-light
    bg-white
    border-2
    rounded-md
    outline-none
    transition
`;

const disabledInputClasses = `
    opacity-70
    cursor-not-allowed
`;

const formatPriceInputClasses = `
    pl-9
`;

const errorInputClasses = `
    border-rose-500
    focus:border-rose-500
`;

const baseLabelClasses = `
    absolute
    text-md
    duration-150
    transform
    -translate-y-3
    top-5
    z-10
    origin-[0]
    ${formatPrice ? 'left-8' : 'left-4'}
    peer-placeholder-shown:scale-100
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-4
`;

const errorLabelClasses = `
    text-rose-500
`;

const defaultLabelClasses = `
    text-zinc-400
`;

const finalInputClasses = `
    ${baseInputClasses}
    ${disabled ? disabledInputClasses : ''}
    ${formatPrice ? formatPriceInputClasses : 'pl-4'}
    ${errors[id] ? errorInputClasses : 'border-neutral-300 focus:border-black'}
`.trim();

const finalLabelClasses = `
    ${baseLabelClasses}
    ${errors[id] ? errorLabelClasses : defaultLabelClasses}
`.trim();

    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar 
                    size={24}
                    className="
                        text-neutral-700
                        absolute
                        top-5
                        left-2"
                />
            )}
            <input 
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                placeholder=" "
                type={type}
                className={finalInputClasses}
                />
            <label 
                className={finalLabelClasses}
            >
                {label}
            </label>
        </div>
    )
    

}

export default Input