import { Image } from "antd";

export default function PrepareAnimationIcon({width, height} : any){
    return <Image src="/icon/order/prepare.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}