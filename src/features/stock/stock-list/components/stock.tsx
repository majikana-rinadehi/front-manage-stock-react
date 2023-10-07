import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import type { Stock as StockType } from "@/features/stock"
import { getFormattedTimeStamp } from "@/utils/format"
import classNames from "classnames"

type DisplayType = 'percent' | 'calendar'

type Props = {
    stock: StockType
    displayType: DisplayType
    onClickStock: (stock: StockType) => void
}

export const Stock = (props: Props) => {

    const BadgeElement = () => {
        return (
            props.stock.isExpired ?
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
                    <div className="h-3 pt-1 flex items-center font-semibold text-slate-500">
                        <div className="mr-[2px] text-xs">
                            {props.stock.amount}
                        </div>
                        <div className="text-xs">
                            %
                        </div>

                    </div>
                )
            case "calendar":
                return (
                    <div className={classNames("h-3 flex text-xs font-semibold text-slate-500", {
                        "text-red-400": props.stock.isExpired,
                    })}>
                        <div className="mr-1">
                            <FontAwesomeIcon icon={faClock} size="1x" />
                        </div>
                        <div>
                            {props.stock.expireDate ? getFormattedTimeStamp(props.stock.expireDate, 'M/d') : "-"}
                        </div>
                    </div>)
            default:
                return null
        }
    }

    const boxWaveHeightStyle = {
        height: `${props.stock.amount}%`,
    }

    return (
        <div className="mb-5 relative flex justify-center items-center overflow-hidden
                        h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow"
            onClick={() => props.onClickStock(props.stock)}>
            <div className="flex relative flex-col justify-center items-center mx-auto my-auto overflow-hidden
                            h-[4.9rem] w-[4.9rem] bg-white rounded-xl">
                <div 
                    className={`absolute bottom-0 left-0 w-full bg-[#54aea4] opacity-50`}
                    style={boxWaveHeightStyle}></div>
                <div className="mt-4 text-lg font-semibold text-black">
                    {props.stock.name}
                </div>
                <AmountElement />
            </div>
            <BadgeElement />
        </div>
    )
}