import Link from "next/link";

export default function SidebarMenuItem({ href, className, children, onClick, active, icon: Icon, ...props }) {
    let isButton = false;
    if (onClick) {
        isButton = true;
    }


    if (isButton) {
        return (
            <button
                className={`flex text-sm items-center p-2 text-gray-600 font-semibold border ${active ? "text-white border-green-500 scale-105 bg-green-500" : "border-green-600 hover:bg-green-600"} hover:text-white transition-all rounded-md group} ${className}`}
                onClick={onClick}
                {...props}>
                {Icon && <Icon className="mr-2 w-5 h-5" />}
                {children}
            </button>
        );
    }

    return (
        <Link
            href={href}
            className={`flex text-sm items-center p-2 text-gray-600 font-semibold border ${active ? "text-white border-green-500 shadow-lg scale-105 bg-green-500" : "border-green-600 hover:bg-green-600"} hover:text-white transition-all duration-200 rounded-md group} ${className}`}
            {...props}>
            {Icon && <Icon className="mr-2 w-5 h-5" />}
            {children}
        </Link>
    );
}