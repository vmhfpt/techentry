import { Image } from "antd";

export default function PickupAnimationIcon({width, height} : any){
    return <Image src="/icon/order/pickup.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}