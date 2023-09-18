type Props = {
    title: string
}

export const Head = (props: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-16 
                            flex flex-col justify-center text-center bg-[#3E998E]">
            <div className="text-4xl font-[Rubik] italic font-black text-shadow">
                {props.title}
            </div>
        </div>
    )
}