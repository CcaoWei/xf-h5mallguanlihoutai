const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const proxy = require('http-proxy-middleware');

const { etcdHandler } = require('json-graphql-generator');
const { APP_NAME: appName, APP_TITLE: appTitle, CATEGORY_INDEX: categoryIndex } = require('./config');
const enableEtcdRegister = !!process.env.ENABLE_ETCD_REGISTER;
const API_SERVER_URL = process.env.API_SERVER_URL || 'http://192.168.10.133:18086';
// const API_SERVER_URL = process.env.API_SERVER_URL || 'http://47.105.179.129:18086';

const port = parseInt(process.env.SERVICE_PORT || '8090'); //端口号

// Initialize the app
const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../local')));

var options = {
    target: API_SERVER_URL, // target host
    onProxyReq: (proxyReq, req, _res) => {
        let qyToken = req.cookies['qy-token'];
        if (qyToken) {
            proxyReq.setHeader('cookie', `JSESSIONID=${qyToken};`);
        }
    },
};

app.use('/admin', proxy(options));

let cancel = null;
// Start the server
app.listen(port, () => {
    /* eslint-disable */
    console.log(`Go to http://localhost:${port} to run queries!`);
    if (enableEtcdRegister) {
        cancel = etcdHandler(appName, appTitle, port, categoryIndex);
    }
}).once('close', () => {
    cancel && cancel();
});
