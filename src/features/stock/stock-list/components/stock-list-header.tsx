import { StockCategory } from "@/features/stock"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

type Props = {
    stockCategories: StockCategory[]
    selectedId: number
}

export const StockListHeader = (props: Props) => {

    const badge = (
        <div className="absolute top-0 right-0 translate-x-3 -translate-y-3">
            <FontAwesomeIcon icon={faCircleExclamation} size="sm" color="red" />
        </div>
    )

    return (
        <div className="w-3/5 my-5 flex justify-between">
            {
                props.stockCategories.map((v, _) => (
                    <div className="relative">
                        {v.hasExpiredStock ? badge : null}
                        <div className={classNames("text-xl",
                            {
                                'text-black': v.id === props.selectedId,
                                'text-gray-500': v.id !== props.selectedId
                            }
                        )}>
                            {v.name}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}