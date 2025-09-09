import { formatNumber } from "./utils";

function Pagination(pageSize = 10, pageSizeOptions = ['10', '20', '50', '100']) {
    return {
        defaultCurrent: 1,
        defaultPageSize: pageSize,
        hideOnSinglePage: false,
        current: 1,
        pageSize: pageSize,
        pageSizeOptions: pageSizeOptions,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,
        showTotal: ((total) => {
            return `共计${formatNumber(total)}条`;
        }),
        //size: "small",
        //position: ['none', 'bottomRight'],
    };
};

function PaginationSE(){
    return {
        defaultCurrent: 1,
        defaultPageSize: 10,
        hideOnSinglePage: true,
        current: 1,
        pageSize: 10,
        showSizeChanger: false,
        showQuickJumper: false,
        total: 0,
        //size: 'small',
    };
}

interface PaginationType {
    current: number,
    pageSize: number,
    total: number,
}

export { Pagination, PaginationSE };
export type { PaginationType };
