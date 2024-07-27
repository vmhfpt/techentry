import { Image } from "antd";

export default function DeliverAnimationIcon({width, height} : any){
    return <Image src="/icon/order/deliver_success.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}