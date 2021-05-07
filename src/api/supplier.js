import request from '@/utils/request';

export function getSupplierList(query) {
    return request({
        url: '/supplier/findSupplierList',
        method: 'get',
        params: query,
    });
}

export function getSupplierDetail(query) {
    return request({
        url: '/supplier/findSupplierDetail',
        method: 'get',
        params: query,
    });
}

export function supplierAudit(data) {
    return request({
        url: '/supplier/audit',
        method: 'post',
        data,
    });
}