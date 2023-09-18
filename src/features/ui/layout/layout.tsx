import { UserIcon } from "@/features/auth/login/components/user-icon"
import { Head, Toolbar } from "@/features/ui"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-[#ffffff]">
            <Head title="Manage Stock" />
            <UserIcon/>
            <Toolbar buttons={["買い物メモを作成", "買い物を頼む", "レシピ"]} />
            <div className="pt-28 flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    )
}