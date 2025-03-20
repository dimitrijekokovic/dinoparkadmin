export function getFile(types = "", multiple = false) {
    let input = document.createElement("input")
    input.type = "file"
    input.accept = types
    input.multiple = multiple
    input.click()
    return new Promise((res, rej) => {
        input.onchange = (_this) => {
            if (!input.files) return
            if (multiple) return res(input.files as FileList)
            else return res(input.files[0] as File)
        }
    })
}
