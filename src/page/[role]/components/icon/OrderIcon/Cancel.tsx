import { Image } from "antd";

export default function CancelAnimationIcon({width, height} : any){
    return <Image src="/icon/order/cancel.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}