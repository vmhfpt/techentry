import { Image } from "antd";

export default function OrderCancelAnimationIcon({width, height} : any){
    return <Image src="/icon/order/order_cancel.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}