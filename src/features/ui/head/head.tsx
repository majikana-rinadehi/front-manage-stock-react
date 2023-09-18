type Props = {
    title: string
}

export const Head = (props: Props) => {

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-16 
                            flex justify-center text-center bg-[#3E998E]">
                <div className="self-center text-4xl font-[Rubik] italic font-black text-shadow">
                    {props.title}
                </div>
            </div>
        </>
    )
}