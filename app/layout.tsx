import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import AdminSidebar from "@/components/AdminSidebar"
config.autoAddCss = false

const noto = Noto_Sans({ subsets: ["latin"], variable: "--font-noto" })

export const metadata: Metadata = {
    title: "DinoPark",
    description: "DinoPark App",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className={`${noto.className} flex flex-col lg:flex-row`}>
                    <AdminSidebar />
                    <div className="lg:ml-[300px]">{children}</div>
                </div>
            </body>
        </html>
    )
}
