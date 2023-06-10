import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import type { Stock as StockType } from "@/features/stock"

type DisplayType = 'percent' | 'calendar'

type Props = StockType & {
    displayType: DisplayType
}

export const Stock = (props: Props) => {

    const BadgeElement = () => {
        return (
            props.isExpired ?
                (
                    <div className="absolute top-0 right-0 -translate-x-2/4 translate-y-0.5">
                        <FontAwesomeIcon icon={faCircleExclamation} size="1x" color="red" />
                    </div>
                )
                : null
        )
    }

    const AmountElement = () => {
        switch (props.displayType) {
            case "percent":
                return (
                    <div className="h-3 text-sm font-semibold text-black">
                        {props.amount + "%"}
                    </div>)
            case "calendar":
                return (
                    <div className="h-3 text-xs font-semibold text-black">
                        {props.expireDate ? props.expireDate : "-"}
                    </div>)
            default:
                return null
        }
    }

    return (
        <div className="mb-5 relative flex justify-center items-center 
                                h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow">
            <BadgeElement />
            <div className="flex flex-col justify-center items-center mx-auto my-auto 
                                    h-[4.9rem] w-[4.9rem] bg-white rounded-xl">
                <div className="mt-4 text-lg font-semibold text-black">
                    {props.name}
                </div>
                <AmountElement />
            </div>
        </div>
    )
}