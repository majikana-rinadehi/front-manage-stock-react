export type Props = {
    /** 例： `name`, `amount`, */
    itemName: string
    placeHolder: string
    /** tailwindcssのクラス名の上書き用 */
    classNameAdd?: string
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>, ) => void
}

export const FormItem = (props: Props) => {
    return (
        <>
            <div className={"mt-2 mx-6 flex flex-col justify-center items-center" 
                            + " " + props.classNameAdd} >
                <div className="self-start text-base font-bold" >{props.itemName}</div>
                <input
                    onChange={(e) => props.onChange(e)}
                    value={props.value}
                    type="text"
                    placeholder={props.placeHolder}
                    className="mt-2 flex h-12 w-full p-4 rounded-md border border-solid border-teal-600 bg-[#F5F5F5] focus:outline-none" />
            </div>
        </>

    )
}