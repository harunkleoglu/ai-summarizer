"use client"

export default function Button({
    children = "Button",
    onClick = () => {},
    className,
    type = 'button',
    ...props
}) {
    return (
        <a
            type={type}
            className={`flex items-center justify-center bg-green-500 hover:bg-green-600 transition-all cursor-pointer text-white px-4 py-2 rounded-lg ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </a>
    )
}
