// 伺服器端元件
import { redirect } from "next/navigation"

export default function ProductPage() {
    //導向到list列表頁
    redirect('/product/list')
    return <></>
}