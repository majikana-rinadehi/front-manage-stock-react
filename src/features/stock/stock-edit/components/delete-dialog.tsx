export type Props = {
    additionalClass?: string
    onClickDelete: () => void
    onClickCancel: () => void
}

export const DeleteDialog = (props: Props) => {
    return (
        <>
            {/* オーバーレイ */}
            <div
                onClick={props.onClickCancel}
                className="fixed z-30 top-0 left-0 bottom-0 right-0">
            </div>
            <div className="fixed z-30 -translate-y-[5rem] translate-x-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 191 88" fill="none">
                        <path d="M19.1 0H171.9C176.966 0 181.824 0.92714 185.406 2.57746C188.988 4.22778 191 6.46609 191 8.8V88L152.8 70.4H19.1C14.0344 70.4 9.17619 69.4729 5.59425 67.8225C2.01231 66.1722 0 63.9339 0 61.6V8.8C0 3.916 8.59499 0 19.1 0Z" fill="#474747" />
                    </svg>
                    <div className="relative -translate-y-[5.75rem] translate-x-4">
                        <div className="text-base text-red-600 font-bold">
                            この品を削除しますか？
                        </div>
                        <div className="mt-1 flex gap-2">
                            <div
                                onClick={props.onClickCancel}
                                className="flex flex-col justify-center items-center py-1 px-3 rounded-md bg-[#3E998E] font-bold">
                                キャンセル
                            </div>
                            <div
                                onClick={props.onClickDelete}
                                className="flex flex-col justify-center items-center py-1 px-3 rounded-md bg-[#E22A2A] font-bold">
                                削除
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}