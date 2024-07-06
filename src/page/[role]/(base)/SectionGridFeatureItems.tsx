import React, { FC } from "react";
import HeaderFilterSection from "./components/HeaderFilterSection";
import ProductCard from "./components/ProductCard";
import ButtonPrimary from "./shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "../../../data/data";
import { useFilterProductQuery } from "../(manager)/products/ProductsEndpoints";

//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = PRODUCTS,
}) => {
  const [filter, setFilter] = React.useState('is_hot_deal');
  const {data : dataItem, isLoading } = useFilterProductQuery(filter);
  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection handleFilter={setFilter}/>
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {dataItem?.data?.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;
