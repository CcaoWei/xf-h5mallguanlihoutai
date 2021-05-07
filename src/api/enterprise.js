import request from '@/utils/request';

export function enterpriseSubmit(data) {
    return request({
        url: '/supplier/saveSupplier',
        method: 'post',
        data,
    });
}

export function getRegion(query) {
    return request({
        url: '/region/clist',
        method: 'get',
        params: query,
    });
}