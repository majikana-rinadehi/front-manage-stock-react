import { FormItem } from "@/features/ui/form/form_item";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCategory, fetchCategory } from "@/features/stock";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSelector } from "@/features/auth/login/state/slice";

type Props = {
    onCloseModal: () => void
}

export const CategoryCreate = (props: Props) => {

    const user = useAppSelector(userSelector);

    const [editItem, setEditItem] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEditItem(e.target.value);
    };

    const onClickCreate = async () => {
        await dispatch(addCategory({
            category: {
                name: editItem!,
                userId: (user?.id)!
            }
        }));
        await dispatch(fetchCategory(user?.id!));
        props.onCloseModal();
    };

    return (
        <>
            <div className="h-min w-72 pb-4 z-20 bg-[#F5F5F5] rounded-[20px] text-black">
                <div className="m-4 flex">
                    <div className="text-2xl font-bold">作成</div>
                    <div className="ml-auto"
                        onClick={() => onClickCreate()}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" color="#0FAEA5" />
                    </div>
                </div>
                {/* item */}
                <FormItem onChange={(e) => onInputChange(e)} value={editItem} itemName="カテゴリ名" placeHolder="例: 食材" />
            </div>
        </>
    );
};
