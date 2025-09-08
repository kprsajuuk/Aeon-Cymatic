export interface IPage {
    pageIndex?: number,
    pageSize?: number,
    sortName?: string,
    sortBy?: string,
    [propName: string]: any,
};

export interface MyResponseType<T = any> {
    code: number;
    message: string;
    data: T;
}

export interface TableType<T = any> {
    list: T;
    total: number;
    [propName: string]: any,
}