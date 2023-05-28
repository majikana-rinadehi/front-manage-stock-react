import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

type StockType = {
    name: string
    amount: number
    // TODO: refactor variable name
    isExpired: boolean
}

export const Stock = (props: StockType) => {

    const badge = props.isExpired ?
        (
            <div className="absolute top-0 right-0 -translate-x-2/4 translate-y-0.5">
                <FontAwesomeIcon icon={faCircleExclamation} size="1x" color="red" />
            </div>
        )
        : null

    return (
        <div className="mb-5 relative flex justify-center items-center 
                                h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow">
            {badge}
            <div className="flex flex-col justify-center items-center mx-auto my-auto 
                                    h-[4.9rem] w-[4.9rem] bg-white rounded-xl">
                <div className="mt-4 text-lg font-semibold text-black">
                    {props.name}
                </div>
                <div className="text-sm font-semibold text-black">
                    {props.amount + "%"}
                </div>
            </div>
        </div>
    )
}