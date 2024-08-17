import React, { FC } from "react";
import NcImage from "../../shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import { CATS_DISCOVER } from "../DiscoverMoreSlider";
import { Statistic } from 'antd';
import dayjs from 'dayjs';
import SalePercentAnimationIcon from "../Icon/Voucher/SalePercent";
import FreeShipAnimationIcon from "../Icon/Voucher/FreeShip";
import SalePriceAnimationIcon from "../Icon/Voucher/SalePrice";

const { Countdown } = Statistic;

export interface CardCategory3Props {
  item: any
}

const CardCategory3: FC<CardCategory3Props> = ({
  item
}) => {
  const endDateTimestamp = dayjs(item.end_date).valueOf();

  return (
    <div className="h-[290px]">
    <div className="h-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
        <div className="w-20 mx-auto mb-4 rounded-lg bg-white">
           {item.type === 'percent' && <SalePercentAnimationIcon width={60} height={60} />}
           {item.type === 'free_ship' && <FreeShipAnimationIcon width={60} height={60} />}
           {item.type === 'number' && <SalePriceAnimationIcon width={60} height={60} />}
        </div>
        <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
        <p className="text-sm">Còn: <span className="text-red-500"> {item.quantity - item.used_count} </span> phiếu</p>
        <p className="text-sm my-1">Ngày hết hạn: {item.end_date}</p>
        <Countdown format="D Ngày - H Giờ - m Phút - s Giây"  valueStyle={{color: 'white'}} title={false} value={endDateTimestamp} />
<div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
<div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

    </div>
</div>
  );
};

export default CardCategory3;
