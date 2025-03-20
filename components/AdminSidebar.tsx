"use client"

import { faBoxes, faBuilding, faCashRegister, faHome, faInbox, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
export default function AdminSidebar() {
    const pathname = usePathname()
    const links = [
        {
            href: "/products",
            children: (
                <>
                    <FontAwesomeIcon icon={faBoxes} /> Products
                </>
            ),
        },
        {
            href: "/orders",
            children: (
                <>
                    <FontAwesomeIcon icon={faInbox} /> Orders
                </>
            ),
        },
    ]
    return (
        <div className="w-full lg:w-[300px] lg:border-r-2 border-r-2 border-r-gray-200 lg:h-screen lg:fixed top-0 left-0 flex flex-col">
            <div className="p-6">
                <div className="flex items-center justify-center flex-col">
                    <p className="text-primary font-black text-2xl">DinoPark</p>
                    <p className="text-sm text-gray-500">Admin</p>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div className="p-6 space-y-3">
                    {links.map((link) => {
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${pathname == link.href ? "bg-primary text-white" : "bg-gray-50"} flex items-center gap-2 rounded-xl px-4 py-2 hover:brightness-90 transition-all`}
                            >
                                {link.children}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
