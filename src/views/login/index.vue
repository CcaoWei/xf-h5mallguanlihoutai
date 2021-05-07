<template>
  <div class="login-container">
    <div class="login-bg">
      <div class="login-color"></div>
      <img src="@/assets/login_images/login-bg.png" style="height:406px;width:auto">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">商城管理平台</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item prop="password" style="margin-bottom:60px;">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登 录
      </el-button>
      <div class="login-register" @click="handleRegister">供应商注册</div>

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
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (validateUsername == null) {
                callback(new Error('请输入正确的管理员用户名'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('管理员密码长度应大于6'));
            } else {
                callback();
            }
        };
        return {
            // screenWidth: document.body.clientWidth, // 屏幕宽
            // screeHeight: document.body.clientHeight, // 屏幕高
            loginForm: {
                username: 'admin123',
                password: 'admin123',
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername,
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword,
                    },
                ],
            },
            passwordType: 'password',
            loading: false,
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                console.log(route);
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    created() {
        // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid && !this.loading) {
                    this.loading = true;
                    this.$store
                        .dispatch('LoginByUsername', this.loginForm)
                        .then(() => {
                            this.loading = false;
                            this.$router.push({
                                path: this.redirect || '/',
                            });
                        })
                        .catch((response) => {
                            this.$notify.error({
                                title: '失败',
                                message: response.data.errmsg,
                            });
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        handleRegister() {
            this.$router.push('register');
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 62px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 62px;
            font-size: 18px;
            color: #424242;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #fff inset !important;
                -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
                -webkit-text-fill-color: #454545 !important;
            }
        }
    }

    .el-form-item {
        // border: 1px solid rgba(255, 255, 255, 0.1);
        // background: rgba(0, 0, 0, 0.1);
        // border-radius: 5px;
        color: #454545;
        background: #ffffff;
        border: 1px solid #cacaca;
        border-radius: 4px;
        margin-bottom: 30px;
    }

    .el-button {
        padding: 20px 20px;
        font-size: 20px;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
// $bg: #2d3a4b;
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    min-width: 520px;

    .login-bg {
        position: absolute;
        left: 0;
        right: 0;
        // width: 100%;
        // top: 0;
        // bottom: 0;
        top: 50%;
        transform: translateY(-48%);

        // height: 380px;
        // background-color: #fff;
        // background-image: url('../../assets/login_images/login-bg.png');
        // background-image: url('./static/login-bg.png');
        // background-repeat: no-repeat;
        // background-size: contain;
        // background-position: center;
        img {
            width: 100%;
            position: relative;
            z-index: 2;
        }

        .login-color {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 29px;
            background-color: #3faffb;
            z-index: 1;
        }
    }

    .login-form {
        position: absolute;
        // left: 0;
        right: 8.3333%;
        width: 450px;
        top: 50%;
        transform: translateY(-50%);
        height: 536px;
        box-shadow: 0 0 30px 0 rgba(139, 139, 139, 0.46);
        border-radius: 6px;
        background-color: #fff;
        padding: 70px 36px 0 36px;
        // margin: 120px auto;
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
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;

        &_login {
            font-size: 20px;
        }
    }

    .title-container {
        position: relative;

        .title {
            font-size: 30px;
            color: #2e2e2e;
            font-weight: normal;
            // color: $light_gray;
            margin: 0px auto 44px auto;
            text-align: center;
            // font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 15px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .login-register {
        text-align: right;
        margin-top: 24px;
        font-size: 14px;
        color: #53a7ff;
        cursor: pointer;
    }
}
</style>