type Props = {
    title: string
}

export const ToolbarButton = (props: Props) => {
    return (
        <div className="mr-4 py-1 px-3 text-center box-shadow 
                                    flex align-middle rounded-3xl bg-[#D9D9D9]">
            <div className="align-middle text-black leading-4 font-medium text-[12px]">
                {"# " + props.title}
            </div>
        </div>
    )
}