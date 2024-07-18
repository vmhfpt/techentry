import Label from "../components/Label/Label";
import NcInputNumber from "../components/NcInputNumber";
import Prices from "../components/Prices";
import { Product, PRODUCTS } from "../../../../data/data";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Input from "../shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ICart } from "@/common/types/cart.interface";
import { VND } from "@/utils/formatVietNamCurrency";
import { getTotalPriceCart } from "@/utils/handleCart";
import { Form } from "antd";
import { useGetCartsQuery } from "@/services/CartEndPoinst";
const CheckoutPage = () => {
  const {data: carts} = useGetCartsQuery({});
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProduct = (item: ICart, index: number) => {
    const { image, price, name, price_sale, quantity, variant, id} = item;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link to="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                  

                    <span>{ item.variants[0].name} {item.variants[1] && `| ${item.variants[1].name}`} </span>
                  </div>
                  
                </div>

                
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                
              <div className="hidden flex-1 sm:flex justify-end">
              <div className='mt-0.5'>
                <div className={` flex flex-col justify-between  w-full gap-[10px]`}>
                  <div className={`flex items-center border-2 border-green-500 rounded-lg px-2 py-2`}>
                    <span className='text-green-500 !leading-none'>
                       {VND(price_sale)}
                    </span>
                  </div>

                  <div className={` flex items-center border-2 border-gray-300 rounded-lg`}>
                    <span className='text-gray-300 !text-[14px] !leading-none line-through px-2 py-2'>
                    {VND(price)}
                    </span>
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
               &times; {quantity}
            </div>
            <div className="hidden sm:block text-center relative">
               {VND(quantity * price_sale)}
            </div>

           
          </div>
        </div>
      </div>
    );
  };

 
  const [form] = Form.useForm()

  const handleOrder = () => {
    form.submit();
  }
  console.log(carts)
  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>Checkout || Ciseco Ecommerce Template</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/#"} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">




          <div className="flex-1">



  <div className="space-y-8">
        {/* <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div> */}

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            form={form}
          />
        </div>

        {/* <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div> */}
      </div>




          </div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
            {carts?.data.map(renderProduct)} 
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between py-2.5">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {carts && VND(getTotalPriceCart(carts.data))}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  0đ
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                0đ
                </span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>{carts && VND(getTotalPriceCart(carts.data))}</span>
              </div>
            </div>
            <ButtonPrimary onClick={() => handleOrder()}  className="mt-8 w-full">
               Confirm order
            </ButtonPrimary>
            <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
