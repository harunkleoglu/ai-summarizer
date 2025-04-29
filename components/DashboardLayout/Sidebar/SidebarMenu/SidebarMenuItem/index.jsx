import Link from "next/link";

export default function SidebarMenuItem({ href, className, children, onClick, active, icon: Icon, ...props }) {
    let isButton = false;
    if (onClick) {
        isButton = true;
    }
    console.log(children, active);
    

    if (isButton) {
        return (
            <button
                className={`flex items-center p-2 font-mono text-gray-900 font-semibold ${active ? "bg-green-600":"border border-green-500 hover:bg-green-500"} hover:text-white hover:translate-x-1 transition-all rounded-sm cursor-pointer group} ${className}`}
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
            className={`flex items-center p-2 font-mono text-gray-900 font-semibold border ${active ? "text-white border-green-600 bg-green-600":"border-green-500 hover:bg-green-500"} hover:text-white hover:translate-x-1 transition-all rounded-sm group} ${className}`}
            {...props}>
            {Icon && <Icon className="mr-2 w-5 h-5" />}
            {children}
        </Link>
    );
}