import { Image } from "antd";

export default function CartEmptyAnimationIcon({width, height} : any){
    return <Image preview={false} src="/icon/cart/cart-empty.gif" width={width} height={height} className={`w-[${String(width)}px] h-[${String(height)}px]`} />
}