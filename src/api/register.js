import request from '@/utils/request';

// export function register(userName, passWord,appKey,code,uuid) {
    export function register(data) {
    // const data = {
    //     userName,
    //     passWord,
    //     appKey,
    //     code,
    //     uuid
    // };
    return request({
        url: '/admin/register',
        method: 'post',
        data,
    });
}

export function sendCode(query) {
    return request({
        url: '/admin/getCodeByPhone',
        method: 'get',
        params: query,
    });
}
