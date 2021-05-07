'use strict';
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../config');
const archiver = require('archiver');

const assetsLocalRoot = config.assetsLocalRoot;
const assetsCDNRoot = config.assetsCDNRoot;

const spinner = ora('packaging for production...');
spinner.start();

const archive = archiver('zip', { forceLocalTime: true });

archive.on('error', function(err) {
    spinner.stop();
    console.log(chalk.red(err.message));
});
archive.on('end', function() {
    spinner.stop();
    console.log(chalk.cyan('success ziped!'));
});
//set the archive name
const output = fs.createWriteStream(path.join(assetsLocalRoot, '../dist.zip'));
//this is the streaming magic
archive.pipe(output);
const serverDir = path.join(assetsLocalRoot, '../server');
if (fs.existsSync(serverDir)) {
    archive.directory(serverDir, 'server');
}
//---------打包CDN版本
if (fs.existsSync(assetsCDNRoot)) {
    fs.readdirSync(assetsCDNRoot)
        .filter((f) => f != 'dlls' && f != config.build.assetsSubDirectory && f != 'workbox' && f != 'cesium')
        .forEach((f) => {
            const filePath = path.join(assetsCDNRoot, `${f}`);
            if (fs.statSync(filePath).isDirectory()) {
                archive.directory(filePath, `cdn/${f}`);
            } else {
                archive.file(filePath, { name: `cdn/${f}` });
            }
        });
}
//---------打包CDN版本

//---------打包本地版本
archive.directory(assetsLocalRoot, 'local');
//---------打包本地版本

const packageFile = path.join(assetsLocalRoot, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
packageJson.scripts = {
    start: `pm2 start ./server/app.js -n ${packageJson.name} --max-memory-restart 100M`,
    stop: `pm2 stop ${packageJson.name}`,
};
delete packageJson.devDependencies;
archive.append(JSON.stringify(packageJson), {
    name: 'package.json',
});
archive.finalize();
