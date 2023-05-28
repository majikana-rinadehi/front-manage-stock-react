import { ToolbarButton } from "@/features/ui"

type Props = {
    buttons: string[]
}

export const Toolbar = (props: Props) => {
    return (
        <div className="fixed mt-16 h-10 w-full flex box-shadow py-2 pl-2 bg-[#F0E3E0]">
            {
                props.buttons.map((v, _) => <ToolbarButton title={v}/>)
            }
        </div>
    )
}