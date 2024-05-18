import { ComponentType } from "react";

export interface LocationStates {
  "/"?: object;
  "/home2"?: object;
  "/home3"?: object;
  "/product-detail"?: object;
  "/product-detail-2"?: object;
  "/page-collection"?: object;
  "/page-collection-2"?: object;
  "/page-search"?: object;
  "/home-header-2"?: object;
  "/account"?: object;
  "/account-savelists"?: object;
  "/account-change-password"?: object;
  "/account-billing"?: object;
  "/account-my-order"?: object;
  "/cart"?: object;
  "/checkout"?: object;
  "/blog"?: object;
  "/blog-single"?: object;
  "/about"?: object;
  "/contact"?: object;
  "/login"?: object;
  "/signup"?: object;
  "/forgot-pass"?: object;
  "/page404"?: object;
  "/subscription"?: object;
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  component: ComponentType<unknown>;
}
