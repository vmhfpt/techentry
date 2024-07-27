import { Image } from "antd";

export default function PrepareSuccessAnimationIcon({width, height} : any){
    return <Image src="/icon/order/prepare_success.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}