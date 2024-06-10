export interface IColor {
    id: number,
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IColorEdit {
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IColorCreate {
    code: string,
    name: string,
    discount_amount: number,
    start_date: string,
    end_date: string,
    usage_limit: number
}

export interface IColorReq {
    name?: string;
    limit?: number;
    page?: number;
}