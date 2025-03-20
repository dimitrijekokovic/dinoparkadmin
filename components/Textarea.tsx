import { Dispatch, SetStateAction } from "react"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    setValue: Dispatch<SetStateAction<string>>
}

export default function TextArea({ setValue, ...props }: TextAreaProps) {
    return (
        <textarea
            {...props}
            onChange={(e) => {
                setValue(e.target.value)
            }}
        />
    )
}
