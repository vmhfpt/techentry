import { VND } from "@/utils/formatVietNamCurrency";
import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  productVariantDetail : any;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  productVariantDetail,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium w-full",
}) => {
  return (
    <div className={` flex justify-between  w-full gap-[20px]`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none">
          {productVariantDetail && VND(productVariantDetail.price)}
        </span>
      </div>


      <div
        className={`flex items-center border-2 border-red-500 rounded-lg ${contentClass}`}
      >
        <span className="text-red-500 !leading-none line-through">
        {productVariantDetail && VND(productVariantDetail.price_sale)}
        </span>
      </div>

    </div>
  );
};

export default Prices;
