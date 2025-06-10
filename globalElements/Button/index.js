"use client"
import React from "react"

export default function Button({
    children = "Button",
    icon = null,
    onClick = () => { },
    className = "",
    type = 'button',
    as = 'button', // 'button' veya 'a' olabilir
    disabled = false,
    href = '', // <a> için
    ...props
}) {
    const isLink = as === 'a';
    const commonProps = {
        className: `flex justify-center items-center cursor-pointer rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-600 px-4 py-2 text-white shadow-lg hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] ${className}`,
        onClick: disabled ? undefined : onClick,
        ...props
    };
    if (isLink) {
        return (
            <a
                href={href}
                role="button"
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                {...commonProps}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </a>
        );
    }
    return (
        <button
            type={type}
            disabled={disabled}
            {...commonProps}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
}
