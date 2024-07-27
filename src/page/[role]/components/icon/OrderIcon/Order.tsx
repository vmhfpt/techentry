import { Image } from "antd";

export default function OrderAnimationIcon({width, height} : any){
    return <Image src="/icon/order/order.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}