import { Image } from "antd";

export default function DeliveringAnimationIcon({width, height} : any){
    return <Image src="/icon/order/delivering.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}