import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// 把 Toast 設定包裝成物件
const toastConfig = {
  position: 'bottom-right', // 設定位置
  autoClose: 3000, // 自動關閉時間（毫秒）
  hideProgressBar: true, // 是否隱藏進度條
  newestOnTop: false, // 最新的訊息是否顯示在最上方
  closeOnClick: true, // 點擊是否關閉 Toast
  rtl: false, // 是否使用從右到左（RTL）方向
  pauseOnFocusLoss: true, // 當視窗失去焦點時是否暫停倒數
  draggable: true, // 是否允許拖曳移動 Toast
  pauseOnHover: true, // 滑鼠移到 Toast 上時是否暫停關閉計時
  theme: 'dark', // 設定主題
}

// 直接導出函式
export const toastSuccess = (message) => {
  toast.success(message, toastConfig)
}

export const toastInfo = (message) => {
  toast.info(message, toastConfig)
}

export const toastWarning = (message) => {
  toast.warning(message, toastConfig)
}

export const toastError = (message) => {
  toast.error(message, toastConfig)
}

// 這個元件要放在 _app.js 或 Layout 裡，確保 Toast 會被渲染
export function MyToastContainer() {
  return <ToastContainer {...toastConfig} />
}
