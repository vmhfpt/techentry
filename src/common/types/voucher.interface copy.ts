export interface IVoucher {
    id: number,
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IVoucherEdit {
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IVoucherCreate {
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IVoucherReq {
    name?: string;
    limit?: number;
    page?: number;
}