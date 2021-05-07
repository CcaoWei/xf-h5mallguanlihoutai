import request from '@/utils/request';

export function addPurchaser(data) {
    return request({
        url: '/buyer/saveBuyer',
        method: 'post',
        data,
    });
}

export function getPurchaserList(query) {
    return request({
        url: '/buyer/findBuyerList',
        method: 'get',
        params: query,
    });
}

export function deletePurchaser(data) {
    return request({
        url: '/buyer/deleteBuyer',
        method: 'post',
        data,
    });
}

export function findById(query) {
    return request({
        url: '/buyer/findById',
        method: 'get',
        params: query,
    });
}