<template>
    <div class="register-container">
        <div class="top-box">
            <h3>旅投供应商业务管理系统</h3>
            <div class="register-login">已有账号，<span @click="handlBack">立即登录</span></div>
        </div>
        <div class="breadcrumb">
            <span>1.注册账号</span>
            <span class="fuhao">>></span>
            <span>2.填写企业资料</span>
        </div>
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form"
            auto-complete="off" label-position="left">
            <!-- <div class="title-container">
                <h3 class="title">管理员登录</h3>
            </div> -->

            <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="top-step">
                <el-breadcrumb-item>注册账号</el-breadcrumb-item>
                <el-breadcrumb-item>填写企业资料</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="back" @click="handlBack">返回登录</div> -->

            <!-- <el-form-item prop="username">
                <span class="svg-container svg-container_register">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="registerForm.username" name="username" type="text" auto-complete="on"
                    placeholder="username" />
            </el-form-item> -->

            <el-form-item prop="phone">
                <span class="svg-container svg-container_register">
                    <svg-icon icon-class="user" />
                </span>
                <el-input v-model="registerForm.phone" name="phone" type="text" auto-complete="off"
                    placeholder="输入手机号码" />
            </el-form-item>

            <el-form-item prop="code">
                <span class="svg-container svg-container_register">
                    <svg-icon icon-class="edit" />
                </span>
                <el-input v-model="registerForm.code" name="code" type="text" auto-complete="off" placeholder="短信验证码" />
                <div @click="sendCode" class="send-code" v-show="show">发送验证码</div>
                <div class="send-code" v-show="!show">{{count}}秒后重发
                </div>
            </el-form-item>


            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :type="passwordType" v-model="registerForm.password" name="password" auto-complete="off"
                    placeholder="设置6到20位登录密码" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                </span>
            </el-form-item>

            <el-form-item prop="passwordConfirm">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :type="passwordType" v-model="registerForm.passwordConfirm" name="passwordConfirm"
                    auto-complete="off" placeholder="请再次输入登录密码" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                </span>
            </el-form-item>

            <div class="register-agree">
                <el-checkbox v-model="registerForm.agree">已阅读并同意</el-checkbox>
                <!-- 本地../../../static/agreement.html -->
                <!-- <a href="static/agreement.html" target="_blank">《用户服务协议》</a> -->
                <router-link to="/agreement" target="_blank" style="text-decoration: underline;">《用户服务协议》</router-link>
            </div>

            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister"
                class="register-btn">注 册</el-button>

            <!-- <div style="position:relative">
                <div class="tips">
                    <span> 超级管理员用户名: admin123</span>
                    <span> 超级管理员用户名：admin123</span>
                </div>
                <div class="tips">
                    <span> 商城管理员用户名: mall123</span>
                    <span> 商城管理员用户名：mall123</span>
                </div>
                <div class="tips">
                    <span> 推广管理员用户名: promotion123</span>
                    <span> 推广管理员用户名：promotion123</span>
                </div>
            </div> -->
        </el-form>
    </div>
</template>

<script>
    import {
        register,
        sendCode
    } from '@/api/register';

    export default {
        name: 'Register',
        data() {
            // const validateUsername = (rule, value, callback) => {
            //     if (validateUsername == null) {
            //         callback(new Error('请输入正确的管理员用户名'));
            //     } else {
            //         callback();
            //     }
            // };
            //电话号验证
            const validatePhone = (rule, value, callback) => {
                // console.log(value);
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            //验证码
            const validateCode = (rule, value, callback) => {
                // console.log(value);
                if (value == '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            //密码验证
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码长度应大于6'));
                } else if (value.length > 20) {
                    callback(new Error('密码长度应小于20'));
                } else {
                    callback();
                }
            };
            //密码确认验证
            const validatePasswordConfirm = (rule, value, callback) => {
                if (this.registerForm.password != value) {
                    callback(new Error('两次密码输入不一致'));
                } else {
                    callback();
                }
            };

            return {
                registerForm: {
                    // username: 'admin123',
                    phone: '',
                    code: '',
                    password: '',
                    passwordConfirm: '',
                    agree: true
                },
                registerRules: {
                    // username: [{
                    //     required: true,
                    //     trigger: 'blur',
                    //     validator: validateUsername
                    // }],
                    phone: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePhone
                    }],
                    code: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateCode
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }],
                    passwordConfirm: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePasswordConfirm
                    }],
                },
                passwordType: 'password',
                loading: false,
                uuid: '',
                show: true,
                count: '',
                timer: null,
            };
        },
        watch: {
            // $route: {
            //     handler: function (route) {
            //         this.redirect = route.query && route.query.redirect;
            //     },
            //     immediate: true,
            // },
        },
        created() {
            // window.addEventListener('hashchange', this.afterQRScan)
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan)
        },
        methods: {
            handlBack() {
                // this.$router.push('login');
                // this.$store.dispatch('FedLogOut').then(() => {
                //     // Message.error(err || 'Verification failed, please login again');
                //     // next({
                //     //     path: '/login'
                //     // });
                //     this.$router.push('login');
                // });
                this.$store.dispatch('FedLogOut').then(() => {
                    this.$router.push('login');
                    // location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
                });
            },
            showPwd() {
                //显示隐藏密码
                if (this.passwordType === 'password') {
                    this.passwordType = '';
                } else {
                    this.passwordType = 'password';
                }
            },
            sendCode() {
                //发送验证码
                if (!(/^1[3456789]\d{9}$/.test(this.registerForm.phone))) {
                    this.$notify.error({
                        title: '失败',
                        message: '请输入正确的手机号码',
                    });
                    return;
                }
                if (this.show) {
                    console.log(this.registerForm.phone);
                    var params = {
                        'phone': this.registerForm.phone
                    };
                    sendCode(params).then(res => {
                            console.log(res);
                            this.uuid = res.data.data.uuid;
                            console.log(this.uuid);

                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }

            },
            handleRegister() {
                //注册
                if (!this.registerForm.agree) {
                    this.$notify.error({
                        title: '失败',
                        message: '请阅读并同意用户服务协议',
                    });
                    return;
                }
                console.log(this.uuid);
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        var params = {
                            'userName': this.registerForm.phone,
                            'passWord': this.registerForm.password,
                            'appKey': '100003',
                            'code': this.registerForm.code,
                            'uuid': this.uuid
                        };
                        console.log(params);
                        register(params).then(res => {
                                // console.log(res);
                                this.$router.push('enterprise');
                            })
                            .catch((e) => {
                                console.log(e);
                                this.$notify.error({
                                    title: '失败',
                                    message: e.data.errmsg,
                                });
                            });

                    }
                });
                // this.$router.push('enterprise');

                // this.$refs.registerForm.validate((valid) => {
                //     if (valid && !this.loading) {
                //         this.loading = true;
                //         this.$store
                //             .dispatch('registerByUsername', this.registerForm)
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
    .register-container {

        .register-agree {
            margin-bottom: 27px;
            padding-top: 6px;
            position: relative;
            font-size: 14px;

            .el-checkbox__input.is-checked+.el-checkbox__label,
            .el-checkbox__label,
            a {
                color: #9b9b9b;
            }

            a {
                font-size: 14px;

                &:hover {
                    color: #409EFF;
                }
            }
        }

        .el-input {
            display: inline-block;
            height: 42px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 13px 5px 13px 15px;
                color: $light_gray;
                height: 42px;
                color: #454545;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px #fff inset !important;
                    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
                    -webkit-text-fill-color: #454545 !important;
                }
            }
        }

        .el-form-item {
            // border: 1px solid rgba(255, 255, 255, 0.1);
            border: 1px solid #CACACA;
            background: #fff;
            border-radius: 4px;
            color: #454545;
            margin-bottom: 18px;
        }

        .top-step {
            margin-bottom: 40px;

            .el-breadcrumb__item:first-child {
                .el-breadcrumb__inner {
                    color: #409EFF;
                }
            }

            .el-breadcrumb__inner,
            i,
            .el-breadcrumb__inner:hover {
                font-size: 20px;
                color: #eee;
            }
        }

        .register-btn {
            padding: 13px 20px;
            font-size: 14px;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .register-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #fff;

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

                &:first-child {
                    color: #409EFF;
                    padding-right: 58px;
                    font-weight: bold;
                }

                &:last-child {
                    color: #8b8b8b;
                    padding-left: 18px;
                }
            }

            .fuhao {
                color: #409EFF;
            }
        }

        .register-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 302px;
            padding: 80px 0 0 0;
            margin: 120px auto;
        }

        .send-code {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #409EFF;
            cursor: pointer;
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

        .svg-container {
            padding: 3px 5px 3px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;

            &_register {
                font-size: 18px;
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

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
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