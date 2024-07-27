import { Image } from "antd";

export default function DoneOrderAnimationIcon({width, height} : any){
    return <Image src="/icon/order/done_order.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}