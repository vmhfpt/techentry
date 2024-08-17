import { Image } from "antd";

export default function SalePriceAnimationIcon({width, height} : any){
    return <Image preview={false} src="/icon/voucher/sale-price.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}