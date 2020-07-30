const Pagination = () => {
    return {
        defaultCurrent: 1,
        defaultPageSize: 10,
        hideOnSinglePage: false,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        showTotal: function (total, range) {
            return `共${total}条`;
        },
        total: 0
    };
};

export default Pagination;