import { Dispatch, SetStateAction } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setValue: Dispatch<SetStateAction<string>>
    label?: string
    labelClass?: string
    error?: string
    setError?: Dispatch<SetStateAction<string>>
}

export default function Input({ setValue, error, setError, label, labelClass, ...props }: InputProps) {
    return (
        <>
            {label ? (
                <label
                    htmlFor={props.id}
                    className={`${error ? "text-red-500" : ""} ${labelClass || ""}`}
                >
                    {error ? (
                        error
                    ) : (
                        <div>
                            {label}
                            {props.required ? <span className="text-red-500">*</span> : ""}
                        </div>
                    )}
                </label>
            ) : (
                ""
            )}
            <input
                value={props.value}
                onChange={(e) => {
                    setValue(e.target.value)
                    if (setError) setError("")
                }}
                onFocus={() => {
                    if (setError) setError("")
                }}
                className={`${props.className} ${error ? "!border-red-500 placeholder:text-red-500" : ""}`}
                placeholder={props.placeholder}
                id={props.id}
                type={props.type}
                disabled={props.disabled}
                autoComplete={props.autoComplete}
                onKeyUp={props.onKeyUp}
            />
        </>
    )
}
