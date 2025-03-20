import { Dispatch, SetStateAction, useRef } from "react"

interface PopupProps {
    popupOn: boolean
    setPopupOn: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

export default function Popup({ popupOn, setPopupOn, children }: PopupProps) {
    if (popupOn)
        return (
            <div className={`z-20 px-sideSpace py-6 fixed top-0 left-0 w-full h-screen flex justify-center items-center ${popupOn ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                <div
                    className="bg-black/30 w-full fixed top-0 left-0 h-screen"
                    onClick={() => {
                        setPopupOn(false)
                    }}
                ></div>
                {children}
            </div>
        )
    else return ""
}
