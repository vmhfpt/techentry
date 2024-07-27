import { Image } from "antd";

export default function SuccessAnimationIcon({width, height} : any){
    return <Image src="/icon/order/success.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}