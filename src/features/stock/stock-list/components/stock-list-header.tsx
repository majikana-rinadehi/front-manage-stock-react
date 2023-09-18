import { StockCategory } from "@/features/stock"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

type Props = {
    stockCategories: StockCategory[]
    selectedId: number
    setSelectedId: (id: number) => void
}

export const StockListHeader = (props: Props) => {

    const badge = (
        <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
            <FontAwesomeIcon icon={faCircleExclamation} size="sm" color="red" />
        </div>
    )

    return (
        <div className="w-3/5 my-5 flex justify-between">
            {
                props.stockCategories.map((v, i) => (
                    <div 
                        key={i}
                        className={classNames("relative", { 
                            "rounded-lg box-shadow p-1 px-2 font-black bg-slate-400 text-white": v.id === props.selectedId,
                            "p-1": v.id !== props.selectedId
                         })} 
                        onClick={() => props.setSelectedId(v.id)}>

                        {v.hasExpiredStock ? badge : null}
                        <div className={classNames("text-xl",
                            {
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