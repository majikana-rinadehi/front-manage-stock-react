import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import type { Stock as StockType } from "@/features/stock"
import { getMMDD } from "@/utils/format"
import classNames from "classnames"

type DisplayType = 'percent' | 'calendar'

type Props = StockType & {
    displayType: DisplayType
}

export const Stock = (props: Props) => {

    const BadgeElement = () => {
        return (
            props.isExpired ?
                (
                    <div className="absolute top-0 right-0 z-10 -translate-x-2/4 translate-y-0.5">
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
                    <div className="z-10 h-3 pt-1 flex items-center font-semibold text-slate-500">
                        <div className="mr-[2px] text-xs">
                            {props.amount}
                        </div>
                        <div className="text-xs">
                            %
                        </div>

                    </div>
                )
            case "calendar":
                return (
                    <div className={classNames("h-3 flex text-xs font-semibold text-slate-500", {
                        "text-red-400": props.isExpired,
                    })}>
                        <div className="mr-1">
                            <FontAwesomeIcon icon={faClock} size="1x" />
                        </div>
                        <div>
                            {props.expireDate ? getMMDD(props.expireDate) : "-"}
                        </div>
                    </div>)
            default:
                return null
        }
    }

    const boxWaveHeightStyle = {
        height: `${props.amount}%`,
    }

    return (
        <div className="z-10 mb-5 relative flex justify-center items-center overflow-hidden
                        h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow">
            <BadgeElement />
            <div className="flex relative flex-col justify-center items-center mx-auto my-auto overflow-hidden
                            h-[4.9rem] w-[4.9rem] bg-white rounded-xl">
                <div 
                    className={`absolute bottom-0 left-0 w-full bg-[#54aea4] opacity-50`}
                    style={boxWaveHeightStyle}></div>
                <div className="z-10 mt-4 text-lg font-semibold text-black">
                    {props.name}
                </div>
                <AmountElement />
            </div>
        </div>
    )
}