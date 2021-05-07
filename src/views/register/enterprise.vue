<template>
    <div class="enterprise-container">
        <div class="top-box">
            <h3>旅投供应商业务管理系统</h3>
            <div class="register-login">已有账号，<span @click="handlBack">立即登录</span></div>
        </div>
        <div class="breadcrumb">
            <span>1.注册账号</span>
            <span class="fuhao">>></span>
            <span>2.填写企业资料</span>
        </div>
        <div class="enterprise-tip">尊敬的供应商，欢迎您注册旅投供应商业务管理系统，请填写您的注册信息。</div>
        <el-form ref="enterpriseForm" :model="enterpriseForm" :rules="enterpriseRules" class="enterprise-form"
            auto-complete="off" label-width="172px">
            <!-- <div class="title-container">
                <h3 class="title">管理员登录</h3>
            </div> -->

            <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="top-step">
                <el-breadcrumb-item>注册账号</el-breadcrumb-item>
                <el-breadcrumb-item>填写企业资料</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="back" @click="handlBack">返回登录</div> -->
            <!-- <el-form-item prop="username">
                <span class="svg-container svg-container_enterprise">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="enterpriseForm.username" name="username" type="text" auto-complete="on"
                    placeholder="username" />
            </el-form-item> -->
            <div class="enterprise-box" style="margin-bottom:30px">
                <div>
                    <h5 class="enterprise-title">企业审核资料填写</h5>
                    <el-form-item prop="gsmc" label="公司名称：">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.gsmc" name="gsmc" type="text" auto-complete="off"
                                placeholder="请输入手公司名称" autocomplete="off"/>
                        </div>
                    </el-form-item>

                    <el-form-item prop="tyshxydm" label="统一社会信用代码：">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.tyshxydm" name="tyshxydm" type="text" auto-complete="off"
                                placeholder="请输入统一社会信用代码" autocomplete="off"/>
                        </div>
                    </el-form-item>

                    <el-form-item prop="fddbr" label="法定代表人：">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.fddbr" name="fddbr" type="text" auto-complete="off"
                                placeholder="请输入法定代表人" autocomplete="off"/>
                        </div>
                    </el-form-item>

                    <el-form-item prop="fddbrsfz" label="法定代表人身份证：">
                        <div class="enterprise-item">
                            <!-- //部署加/wxmall -->
                            <el-upload class="upload-demo" action="/wxmall/admin/storage/create"
                                :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove1"
                                :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed"
                                :file-list="enterpriseForm.fddbrsfz1" list-type="picture" :on-success="handleSuccess1">
                                <el-button size="small" class="enterprise-upload">本地上传</el-button>
                                <!-- <div slot="tip" class="el-upload__tip" style="color:#999">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                            <img src="@/assets/register_images/s1.png" style="position:absolute;right:-320px;top:-20px">
                        </div>
                        <div class="enterprise-item" style="margin-top:30px;">
                            <!-- //部署加/wxmall -->
                            <el-upload class="upload-demo" action="/wxmall/admin/storage/create"
                                :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove2"
                                :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed"
                                :file-list="enterpriseForm.fddbrsfz2" list-type="picture" :on-success="handleSuccess2">
                                <el-button size="small" class="enterprise-upload">本地上传</el-button>
                                <div slot="tip" class="el-upload__tip" style="color:#A6A6A6">
                                    上传jpg、png格式的图片，文件大小在1.5M内，需看清名称等信息，可参考右图示例图</div>
                            </el-upload>
                            <img src="@/assets/register_images/s2.png" style="position:absolute;right:-320px;top:30px">
                        </div>
                    </el-form-item>
                </div>
            </div>

            <div class="enterprise-box">
                <div>
                    <h5 class="enterprise-title" style="margin-bottom:10px">上传营业执照</h5>
                        <p style="line-height:47px;color:#A6A6A6;font-size:14px;margin-bottom:40px">
                            证件请上传彩色电子文件，且为正本，文件格式支持jpg、gif、png格式，且不能大于3M
                        </p>
                        <!-- label="上传统一社会信用代码：" -->
                    <el-form-item prop="sctyshxydm" style="margin-left:-172px">
                        <div class="enterprise-item">
                            <!-- //部署加/wxmall -->
                            <el-upload class="upload-demo" action="/wxmall/admin/storage/create"
                                :on-preview="handlePreview" :before-upload="handleBefore" :on-remove="handleRemove3"
                                :before-remove="beforeRemove" :multiple="false" :limit="1" :on-exceed="handleExceed"
                                :file-list="enterpriseForm.sctyshxydm" list-type="picture" :on-success="handleSuccess3">
                                <el-button size="small" class="enterprise-upload">本地上传</el-button>
                                <div slot="tip" class="el-upload__tip" style="color:#A6A6A6">
                                    上传jpg、png格式的图片，文件大小在1.5M内，需看清名称等信息，可参考右图示例图</div>
                            </el-upload>
                            <img src="@/assets/register_images/q1.png" style="position:absolute;right:-440px;top:-20px">
                        </div>
                    </el-form-item>

                    <el-form-item prop="szqy" label="所在区域：" style="margin-left:-86px">
                        <div class="enterprise-item" style="display: flex;justify-content: space-between;">
                            <!-- <el-cascader v-model="enterpriseForm.szqy" :options="options" @change="handleChange"
                        placeholder="请选择所在区域"></el-cascader> -->
                            <el-select v-model="select1" placeholder="请选择省份" style="width:31%">
                                <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                            <!-- 
                     -->
                            <el-select v-model="select2" placeholder="请选择城市" style="width:31%">
                                <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                            <!-- 
                    -->
                            <el-select v-model="select3" placeholder="请选择区/县" style="width:31%">
                                <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>

                    <el-form-item prop="xxdz" label="详细地址：" style="margin-left:-86px">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.xxdz" name="xxdz" type="text" auto-complete="off"
                                placeholder="请输入详细地址" autocomplete="off"/>
                        </div>
                    </el-form-item>

                    <el-form-item prop="lxr" label="联系人：" style="margin-left:-86px">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.xxdz" name="xxdz" type="text" auto-complete="off"
                                placeholder="请输入联系人" autocomplete="off"/>
                        </div>
                    </el-form-item>

                    <el-form-item prop="lxdh" label="联系电话：" style="margin-left:-86px">
                        <div class="enterprise-item">
                            <el-input v-model="enterpriseForm.xxdz" name="xxdz" type="text" auto-complete="off"
                                placeholder="请输入联系电话" autocomplete="off"/>
                        </div>
                    </el-form-item>

                </div>
            </div>
            <div style="text-align: center;">
                <el-button :loading="loading" type="primary" class="enterprise-submit"
                    @click.native.prevent="handleenterprise">提交信息</el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    import {
        enterpriseSubmit,
        getRegion
    } from '@/api/enterprise';

    export default {
        name: 'Enterprise',
        data() {
            //公司名称
            const validateGsmc = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入公司名称'));
                } else {
                    callback();
                }
            };
            const validateTyshxydm = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入统一社会信用代码'));
                } else {
                    callback();
                }
            };
            const validateFddbr = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入法定代表人'));
                } else {
                    callback();
                }
            };
            const validateSzqy = (rule, value, callback) => {
                // console.log(value);
                if (value == []) {
                    callback(new Error('请选择所在区域'));
                } else {
                    callback();
                }
            };
            const validateXxdz = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入详细地址'));
                } else {
                    callback();
                }
            };
            const validateLxr = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入联系人'));
                } else {
                    callback();
                }
            };
            const validateLxdh = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入联系电话'));
                } else {
                    callback();
                }
            };
            return {
                enterpriseForm: {
                    gsmc: '', //公司名称
                    tyshxydm: '', //统一社会信用代码
                    fddbr: '', //法定代表人
                    fddbrsfz: '',
                    fddbrsfz1: [], //法定代表人身份证
                    fddbrsfz2: [], //法定代表人身份证
                    sctyshxydm: [], //上传统一社会信用代码
                    szqy: [], //所在区域
                    xxdz: '', //详细地址,
                    lxr: '',
                    lxdh: ''
                },
                select1: '',
                options1: [],
                select2: '',
                options2: [],
                select3: '',
                options3: [],
                options: [{
                    value: 'beijing',
                    label: '北京',
                    children: [{
                        value: 'shixiaqu',
                        label: '市辖区',
                        children: [{
                            value: 'dongchengqu',
                            label: '东城区',
                        }, {
                            value: 'xichengqu',
                            label: '西城区',
                        }]
                    }]
                }],
                enterpriseRules: {
                    gsmc: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateGsmc
                    }],
                    tyshxydm: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateTyshxydm
                    }],
                    fddbr: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateFddbr
                    }],
                    szqy: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateSzqy
                    }],
                    xxdz: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateXxdz
                    }],
                    lxr: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateLxr
                    }],
                    lxdh: [{
                        // required: true,
                        trigger: 'blur',
                        validator: validateLxdh
                    }],
                },
                loading: false,
                pic1: '',
                pic2: '',
                pic3: ''
            };
        },
        watch: {
            // $route: {
            //     handler: function (route) {
            //         this.redirect = route.query && route.query.redirect;
            //     },
            //     immediate: true,
            // },
            select1: function (val, oldVal) {
                this.select2 = '';
                this.options2 = [];
                this.select3 = '';
                this.options3 = [];
                // console.log('new: %s, old: %s', val, oldVal);
                const params = {
                    'id': val
                };
                getRegion(params).then(res => {
                        // console.log(res);
                        const data = res.data.data;
                        // for (let i = 0; i < data.length; i++) {
                        //     const element = data[i];
                        //     console.log(element);
                        // }
                        this.options2 = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            select2: function (val, oldVal) {
                this.select3 = '';
                this.options3 = [];
                // console.log('new: %s, old: %s', val, oldVal);
                const params = {
                    'id': val
                };
                getRegion(params).then(res => {
                        // console.log(res);
                        const data = res.data.data;
                        // for (let i = 0; i < data.length; i++) {
                        //     const element = data[i];
                        //     console.log(element);
                        // }
                        this.options3 = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        created() {
            // window.addEventListener('hashchange', this.afterQRScan)
            // this.getAllRegion('0');
            //获取省列表
            const params = {
                'id': '0'
            };
            getRegion(params).then(res => {
                    // console.log(res);
                    const data = res.data.data;
                    // for (let i = 0; i < data.length; i++) {
                    //     const element = data[i];
                    //     console.log(element);
                    // }
                    this.options1 = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan)
        },
        methods: {
            getAllRegion(id) {
                const params = {
                    'id': id
                };
                getRegion(params).then(res => {
                        console.log(res);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            handlBack() {
                // this.$router.push('login');
                // this.$store.dispatch('FedLogOut').then(() => {
                //     // Message.error(err || 'Verification failed, please login again');
                //     // next({
                //     //     path: '/login'
                //     // });
                //     this.$router.push('login');
                // });
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push('login');
                    // location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
                });
            },
            handleBefore(file) {
                const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 1.5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 1.5MB!');
                }
                return isJPG && isLt2M;
            },
            handleSuccess1(response, file, fileList) {
                console.log(1111111111111);
                console.log(response);
                if (response.errno == 0) {
                    this.pic1 = response.data.url;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '网络错误'
                    });
                }
                console.log(this.pic1);
                // console.log(file);
                // console.log(fileList);
            },
            handleSuccess2(response, file, fileList) {
                console.log(22222222222222);
                console.log(response);
                if (response.errno == 0) {
                    this.pic2 = response.data.url;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '网络错误'
                    });
                }
                console.log(this.pic2);
                // console.log(file);
                // console.log(fileList);
            },
            handleSuccess3(response, file, fileList) {
                console.log(3333333333333);
                console.log(response);
                if (response.errno == 0) {
                    this.pic3 = response.data.url;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '网络错误'
                    });
                }
                console.log(this.pic3);
                // console.log(file);
                // console.log(fileList);
            },
            handleChange(value) {
                console.log(value);
            },
            handleRemove1(file, fileList) {
                console.log(file, fileList);
                this.pic1 = '';
            },
            handleRemove2(file, fileList) {
                console.log(file, fileList);
                this.pic2 = '';
            },
            handleRemove3(file, fileList) {
                console.log(file, fileList);
                this.pic3 = '';
            },
            handlePreview(file) {
                console.log('aaaaaaa');
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleenterprise() {
                //提交


                this.$refs.enterpriseForm.validate((valid) => {
                    if (valid) {
                        if (this.pic1 == '') {
                            this.$notify.info({
                                title: '提示',
                                message: '请上传法定代表人身份证正面'
                            });
                            return;
                        }
                        if (this.pic2 == '') {
                            this.$notify.info({
                                title: '提示',
                                message: '请上传法定代表人身份证反面'
                            });
                            return;
                        }
                        if (this.pic3 == '') {
                            this.$notify.info({
                                title: '提示',
                                message: '请上传上传统一社会信用代码'
                            });
                            return;
                        }
                        if (this.select3 == '') {
                            this.$notify.info({
                                title: '提示',
                                message: '请选择所在区域'
                            });
                            return;
                        }
                        const params = {
                            'supplierName': this.enterpriseForm.gsmc, //公司名称
                            'creditCode': this.enterpriseForm.tyshxydm, //统一社会信用代码
                            'legalUser': this.enterpriseForm.fddbr, //法定代表人
                            'identityCardUp': this.pic1, //身份证正面
                            'identityCardDown': this.pic2, //身份证反面
                            'creditBook': this.pic3, //社会统一信用证书
                            // 'address': this.select3, //传区县级id即可
                            'addressDetail': this.enterpriseForm.xxdz, //详细地址
                            'provinceId': this.select1,
                            'cityId': this.select2,
                            'areaId': this.select3,
                            'contacts': this.enterpriseForm.lxr,
                            'contactsPhone': this.enterpriseForm.lxdh,
                        };
                        console.log(params);
                        enterpriseSubmit(params).then(res => {
                                this.$notify.success({
                                    title: '提示',
                                    message: '提交成功',
                                });
                                this.$router.push('login');
                            })
                            .catch((e) => {
                                // this.$notify.error({
                                //     title: '失败',
                                //     message: e.data.errmsg,
                                // });
                            });
                        // this.$notify.success({
                        //     title: '提示',
                        //     message: '提交成功',
                        // });
                    }
                });

                // this.$router.push('login');


                // this.$refs.enterpriseForm.validate((valid) => {
                //     if (valid && !this.loading) {
                //         this.loading = true;
                //         this.$store
                //             .dispatch('enterpriseByUsername', this.enterpriseForm)
                //             .then(() => {
                //                 this.loading = false;
                //                 this.$router.push({
                //                     path: this.redirect || '/'
                //                 });
                //             })
                //             .catch((response) => {
                //                 this.$notify.error({
                //                     title: '失败',
                //                     message: response.data.errmsg,
                //                 });
                //                 this.loading = false;
                //             });
                //     } else {
                //         return false;
                //     }
                // });
            },
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .enterprise-container {
        .top-box {
            height: 80px;
            background-color: #f8f8f8;

            h3 {
                margin: 0;
                line-height: 80px;
                font-size: 24px;
                padding-left: 96px;
                display: inline-block;
                color: #000000;
            }

            .register-login {
                float: right;
                line-height: 80px;
                font-size: 16px;
                padding-right: 96px;
                color: #8b8b8b;

                span {
                    color: #409EFF;
                    cursor: pointer;
                }
            }
        }

        .breadcrumb {
            position: absolute;
            top: 140px;
            left: 96px;

            span {
                font-size: 24px;
                line-height: 46px;
                color: #409EFF;

                &:first-child {
                    // color: #409EFF;
                    padding-right: 58px;
                }

                &:last-child {
                    // color: #8b8b8b;
                    padding-left: 18px;
                    font-weight: bold;
                }
            }

            // .fuhao {
            //     color: #409EFF;
            // }
        }

        .el-cascader {
            width: 100%;

            .el-cascader__label {
                color: $light_gray;
                line-height: 32px;
            }
        }

        .enterprise-upload {
            background: #ECECEC;
            border: 1px solid #A6A6A6;
            border-radius: 4px;
        }

        .el-input {
            // display: inline-block;
            height: 32px;
            // width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 0 5px 0 15px;
                color: #454545;
                height: 32px;
                vertical-align: top;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px #fff inset !important;
                    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
                    -webkit-text-fill-color: #454545 !important;
                }
            }
        }

        .el-form-item .enterprise-item {
            position: relative;
            // height: 32px;

            .el-input {
                // border: 1px solid rgba(255, 255, 255, 0.1);
                // background: rgba(0, 0, 0, 0.1);
                background: #FFFFFF;
                border: 1px solid #CACACA;
                border-radius: 4px;
                color: #454545;
            }
        }

        // .el-form-item__content {
        //     height: 32px;
        // }

        .el-form-item__label {
            line-height: 32px;
            color: #424242;
            font-size: 14px;
            // text-align: left;
            font-weight: normal;
            padding-left: 0px;
            padding-right: 16px;
        }

        .enterprise-submit {
            width: 427px;
            margin-top: 30px;
            font-size: 20px;
            padding: 13px 20px;
        }

        .top-step {
            margin-bottom: 40px;

            // .el-breadcrumb__item:first-child {
            //     .el-breadcrumb__inner {
            //         color: #409EFF;
            //     }
            // }

            .el-breadcrumb__inner,
            i,
            .el-breadcrumb__inner:hover {
                font-size: 20px;
                color: #409EFF;
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .enterprise-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #fff;
        overflow-y: auto;

        .enterprise-box {
            background: #FAFBFC;
            border: 1px solid #E3E4E5;
            padding-top: 56px;
            padding-left: 56px;
            padding-bottom: 70px;
            min-width: 1140px;

            &>div {
                max-width: 555px;
            }
        }

        .enterprise-title {
            font-size: 24px;
            color: #000000;
            margin: 0;
            margin-bottom: 40px;
        }

        .enterprise-tip {
            position: absolute;
            left: 96px;
            top: 196px;
            font-size: 16px;
            color: #424242;
            line-height: 31px;
        }

        .enterprise-form {
            position: absolute;
            left: 96px;
            right: 96px;
            // width: 1248px;
            padding: 80px 0 0 0;
            margin: 120px auto;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                font-weight: 400;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .back {
            position: absolute;
            top: 35px;
            right: 35px;
            color: $light_gray;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                color: #409EFF;
            }
        }
    }
</style>