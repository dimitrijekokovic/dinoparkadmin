import formatBytes from "@/utils/formatBytes"
import { getFile } from "@/utils/getFile"

import { faImage, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction } from "react"

type ImageInputProps = {
    imageFile: File | undefined
    setImageFile: Dispatch<SetStateAction<File | undefined>>
    imageUrl: string
    setImageUrl: Dispatch<SetStateAction<string>>
    imageError?: string
    setImageError?: Dispatch<SetStateAction<string>>
}
export default function ImageInput({ imageFile, setImageFile, imageUrl, setImageUrl, imageError, setImageError }: ImageInputProps) {
    async function handleClick() {
        if (setImageError) setImageError("")
        const file = (await getFile("image/*")) as File
        setImageFile(file)
    }
    function handleRemoveFile() {
        setImageFile(undefined)
    }
    function handleRemoveUrl() {
        setImageUrl("")
    }

    if (imageUrl) {
        return (
            <div className="flex gap-4 items-start flex-col xl:flex-row">
                <div className={`p-4 border-2  rounded-lg w-fit shrink-0`}>
                    <img
                        src={imageUrl}
                        alt=""
                        className="max-w-[200px] w-full"
                    />
                </div>
                <button
                    className="p-3 basis-14 rounded-lg border-2 text-red-500 border-gray-200 bg-white hover:bg-gray-100 transition-all"
                    onClick={handleRemoveUrl}
                    title="Remove image"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        )
    }
    return (
        <div className="flex flex-col xl:flex-row items-start gap-6">
            <div className="flex gap-2 flex-1">
                <div>
                    <div
                        onClick={handleClick}
                        className={`${imageError ? "border-red-500" : "border-gray-200"} px-4 py-2 flex-1 border-2 active:border-primary transition-all rounded-lg flex gap-2 items-center cursor-pointer bg-white hover:bg-gray-100`}
                    >
                        <FontAwesomeIcon icon={faImage} />
                        {imageFile ? `${imageFile.name} (${formatBytes(imageFile.size)})` : "Select product image"}
                    </div>
                    {imageError ? <p className="font-medium text-red-500">{imageError}</p> : ""}
                </div>
                {imageFile ? (
                    <button
                        className="p-3 basis-14 rounded-lg border-2 text-red-500 border-gray-200 bg-white hover:bg-gray-100 transition-all"
                        onClick={handleRemoveFile}
                        title="Remove image"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                ) : (
                    ""
                )}
            </div>
            {imageFile ? (
                <div className="p-4 border-2 border-gray-200 rounded-lg shrink-0">
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt=""
                        className="max-w-[200px]"
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}
