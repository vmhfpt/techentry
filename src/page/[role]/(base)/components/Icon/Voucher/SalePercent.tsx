import { Image } from "antd";

export default function SalePercentAnimationIcon({width, height} : any){
    return <Image preview={false} src="/icon/voucher/sale-percent.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}