import { message } from "antd";

const avatarColors = [
  "#ffdd00",
  "#fbb034",
  "#ff4c4c",
  "#c1d82f",
  "#f48924",
  "#7ac143",
  "#30c39e",
  "#06BCAE",
  "#0695BC",
  "#037ef3",
  "#146eb4",
  "#8e43e7",
  "#ea1d5d",
  "#fc636b",
  "#ff6319",
  "#e01f3d",
  "#a0ac48",
  "#00d1b2",
  "#472f92",
  "#388ed1",
  "#a6192e",
  "#4a8594",
  "#7B9FAB",
  "#1393BD",
  "#5E13BD",
  "#E208A7",
];

export { avatarColors };

export enum PAGINATE_DEFAULT {
  PAGE = 1,
  LIMIT = 10,
  LIMIT_CHART = 5
}

export const showLoading = (content: string): void => {
  message.loading({
    content: content,
    key: 'helper'
  });
};

export const showAlertSuccess = (content: string): void => {
  message.success({
    content: content,
    key: 'helper'
  });
};

export const showAlertError = (content: string): void => {
  message.error({
    content: content,
    key: 'helper'
  });
};

export const showAlertWarning = (content: string): void => {
  message.warning({
    content: content,
    key: 'helper'
  });
};

export interface ConfirmModalParams {
  visible: boolean;
  title: string;
  content: string;
  type?: ConfirmModalType;
  name?: string;
}

export const DefaultConfirmModalParams: ConfirmModalParams = {
  visible: false,
  title: '',
  content: '',
  type: undefined
};

export enum ConfirmModalType {
  DELETE = 'DELETE',
  CHANGE_STATUS = 'CHANGE_STATUS',
  BLOCK = 'BLOCK',
  UNLOCK = 'UNLOCK',
  SHOW = 'SHOW',
  HIDE = 'HIDE'
}
