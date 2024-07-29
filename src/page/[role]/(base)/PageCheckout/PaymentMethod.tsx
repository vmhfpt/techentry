import Label from "../components/Label/Label";
import { FC, useState } from "react";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import Input from "../shared/Input/Input";
import Radio from "../shared/Radio/Radio";

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const PaymentMethod: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
}) => {
  const [mothodActive, setMethodActive] = useState<
    "Credit-Card" | "Internet-banking" | "Wallet"
  >("Credit-Card");

  const renderDebitCredit = () => {
    const active = mothodActive === "Credit-Card";
    return (
      <div className="flex items-start space-x-4 sm:space-x-6">
        <Radio
          className="pt-3.5"
          name="payment-method"
          id="Credit-Card"
          defaultChecked={active}
          onChange={(e) => setMethodActive(e as any)}
        />
        <div className="flex-1">
          <label
            htmlFor="Credit-Card"
            className="flex items-center space-x-4 sm:space-x-6"
          >
            <div
              className={`p-2.5 rounded-xl border-2 ${
                active
                  ? "border-slate-600 dark:border-slate-300"
                  : "border-gray-200 dark:border-slate-600"
              }`}
            >
               <img className="w-[40px] h-[40px]" src="https://icons.veryicon.com/png/o/business/online-payment/payment-platform-stripe.png" alt="" />
            </div>
            <p className="font-medium">Stripe</p>
          </label>

          <div
            className={`mt-6 mb-4 space-y-3 sm:space-y-5 ${
              active ? "block" : "hidden"
            }`}
          >
            <div className="max-w-lg">
              <Label className="text-sm">Card number</Label>
              <Input className="mt-1.5" type={"text"} />
            </div>
            <div className="max-w-lg">
              <Label className="text-sm">Name on Card</Label>
              <Input className="mt-1.5" />
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="sm:w-2/3">
                <Label className="text-sm">Expiration date (MM/YY)</Label>
                <Input className="mt-1.5" placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <Label className="text-sm">CVC</Label>
                <Input className="mt-1.5" placeholder="CVC" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInterNetBanking = () => {
    const active = mothodActive === "Internet-banking";
    return (
      <div className="flex items-start space-x-4 sm:space-x-6">
        <Radio
          className="pt-3.5"
          name="payment-method"
          id="Internet-banking"
          defaultChecked={active}
          onChange={(e) => setMethodActive(e as any)}
        />
        <div className="flex-1">
          <label
            htmlFor="Internet-banking"
            className="flex items-center space-x-4 sm:space-x-6"
          >
            <div
              className={`p-2.5 rounded-xl border-2 ${
                active
                  ? "border-slate-600 dark:border-slate-300"
                  : "border-gray-200 dark:border-slate-600"
              }`}
            >
               <img className="w-[40px] h-[40px]" src="https://developers.momo.vn/v3/assets/images/brand-d8cdb07bcd21d30e67592a1cd6f8c6c6.png" alt="" />
            </div>
            <p className="font-medium">Momo</p>
          </label>
          {/* <div className={`mt-6 mb-4 ${active ? "block" : "hidden"}`}>
            <p className="text-sm dark:text-slate-300">
              Your order will be delivered to you after you transfer to:
            </p>
            <ul className="mt-3.5 text-sm text-slate-500 dark:text-slate-400 space-y-2">
              <li>
                <h3 className="text-base text-slate-800 dark:text-slate-200 font-semibold mb-1">
                  ChisNghiax
                </h3>
              </li>
              <li>
                {" "}
                Bank name:{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">
                  Example Bank Name
                </span>
              </li>
              <li>
                {" "}
                Account number:{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">
                  555 888 777
                </span>
              </li>
              <li>
                {" "}
                Sort code:{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">
                  999
                </span>
              </li>
              <li>
                {" "}
                IBAN:{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">
                  IBAN
                </span>
              </li>
              <li>
                {" "}
                BIC:{" "}
                <span className="text-slate-900 dark:text-slate-200 font-medium">
                  BIC/Swift
                </span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    );
  };

  const renderWallet = () => {
    const active = mothodActive === "Wallet";
    return (
      <div className="flex items-start space-x-4 sm:space-x-6">
        <Radio
          className="pt-3.5"
          name="payment-method"
          id="Wallet"
          defaultChecked={active}
          onChange={(e) => setMethodActive(e as any)}
        />
        <div className="flex-1">
          <label
            htmlFor="Wallet"
            className="flex items-center space-x-4 sm:space-x-6 "
          >
            <div
              className={`p-2.5 rounded-xl border-2 ${
                active
                  ? "border-slate-600 dark:border-slate-300"
                  : "border-gray-200 dark:border-slate-600"
              }`}
            >
               <img className="w-[40px] h-[40px]" src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="" />
            </div>
            <p className="font-medium">VN Pay</p>
          </label>
          {/* <div className={`mt-6 mb-4 space-y-6 ${active ? "block" : "hidden"}`}>
            <div className="text-sm prose dark:prose-invert">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                dolore quod quas fugit perspiciatis architecto, temporibus quos
                ducimus libero explicabo?
              </p>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  const renderPaymentMethod = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.92969 15.8792L15.8797 3.9292"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.1013 18.2791L12.3013 17.0791"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.793 15.5887L16.183 13.1987"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 21.9985H22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-400 flex ">
              <span className="uppercase tracking-tight">Phương thức thanh toán</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            {/* <div className="font-semibold mt-1 text-sm">
              <span className="">Google / Apple Wallet</span>
              <span className="ml-3">xxx-xxx-xx55</span>
            </div> */}
          </div>
          <ButtonSecondary
            sizeClass="py-2 px-4 "
            fontSize="text-sm font-medium"
            className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
            onClick={onOpenActive}
          >
            Change
          </ButtonSecondary>
        </div>

        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          {/* ==================== */}
          <div>{renderDebitCredit()}</div>

          {/* ==================== */}
          <div>{renderInterNetBanking()}</div>

          {/* ==================== */}
          <div>{renderWallet()}</div>

          <div className="flex pt-6">
            <ButtonPrimary
              className="w-full max-w-[240px]"
              onClick={onCloseActive}
            >
              Confirm order
            </ButtonPrimary>
            <ButtonSecondary className="ml-3" onClick={onCloseActive}>
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return renderPaymentMethod();
};

export default PaymentMethod;
