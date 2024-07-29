import { Image } from "antd";

export default function FreeShipAnimationIcon({width, height} : any){
    return <Image preview={false} src="/icon/voucher/free-ship.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}