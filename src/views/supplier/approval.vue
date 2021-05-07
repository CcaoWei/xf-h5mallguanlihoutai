<template>
    <div class="app-container">
        <div class="approval-container">
            <el-form ref="enterpriseForm" :model="enterpriseForm" class="enterprise-form" auto-complete="off"
                label-width="172px">
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
                        <h5 class="enterprise-title">店铺注册资料</h5>
                        <el-form-item prop="supplierName" label="公司名称：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.supplierName" name="supplierName" type="text"
                                    placeholder="无" disabled />
                            </div>
                        </el-form-item>

                        <el-form-item prop="creditCode" label="统一社会信用代码：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.creditCode" name="creditCode" type="text"
                                    placeholder="无" disabled />
                            </div>
                        </el-form-item>

                        <el-form-item prop="legalUser" label="法定代表人：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.legalUser" name="legalUser" type="text"
                                    placeholder="无" disabled />
                            </div>
                        </el-form-item>

                        <el-form-item prop="fddbrsfz" label="法定代表人身份证：">
                            <div class="enterprise-item">
                                <img :src="enterpriseForm.identityCardUp" style="width:260px;height:auto;">
                            </div>
                            <div class="enterprise-item">
                                <img :src="enterpriseForm.identityCardDown" style="width:260px;height:auto;">
                            </div>
                        </el-form-item>

                        <el-form-item prop="sctyshxydm" label="统一社会信用代码：">
                            <div class="enterprise-item">
                                <img :src="enterpriseForm.creditBook" style="width:440px;height:auto;">
                            </div>
                        </el-form-item>


                        <el-form-item label="所在区域：">
                            <div class="enterprise-item">
                                <div class="enterprise-text">
                                    {{enterpriseForm.provinceNme+enterpriseForm.cityNme+enterpriseForm.areaName||'无'}}
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item prop="addressDetail" label="详细地址：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.addressDetail" name="addressDetail" type="text"
                                    placeholder="无" disabled />
                            </div>
                        </el-form-item>

                        <el-form-item prop="contacts" label="联系人：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.contacts" name="contacts" type="text" placeholder="无"
                                    disabled />
                            </div>
                        </el-form-item>

                        <el-form-item prop="contactsPhone" label="联系电话：">
                            <div class="enterprise-item">
                                <el-input v-model="enterpriseForm.contactsPhone" name="contactsPhone" type="text"
                                    placeholder="无" disabled />
                            </div>
                        </el-form-item>
                    </div>
                </div>

                <div class="enterprise-box">
                    <div style="max-width: 100%;">
                        <h5 class="enterprise-title">付款方转账基本信息</h5>
                        <div style="height:1px;background-color:#CACACA;"></div>
                        <div class="table-box">
                            <div class="table-title">
                                汇款银行
                            </div>
                            <div class="table-detail">{{enterpriseForm.bank}}</div>
                        </div>
                        <div class="table-box">
                            <div class="table-title">
                                汇款金额
                            </div>
                            <div class="table-detail">{{'¥'+enterpriseForm.money}}</div>
                        </div>
                        <div class="table-box">
                            <div class="table-title">
                                交易流水号
                            </div>
                            <div class="table-detail">{{enterpriseForm.transactionSerialNumber}}</div>
                        </div>
                        <div class="table-box">
                            <div class="table-title">
                                备注
                            </div>
                            <div class="table-detail">{{enterpriseForm.remark}}</div>
                        </div>
                        <h5 class="enterprise-title" style="margin-top:56px">转账电子回单</h5>
                        <div style="text-align: center;">
                            <img :src="enterpriseForm.electronicReceipt" style="width:882px;height:auto">
                        </div>
                    </div>
                </div>
                <div style="text-align: center;" v-if="enterpriseForm.auditStatus!=1">
                    <el-button type="info" class="enterprise-submit" @click.native.prevent="handleNo">不通过</el-button>
                    <el-button type="primary" class="enterprise-submit" @click.native.prevent="handleAgree">通过
                    </el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import {
        getToken
    } from '@/utils/auth';
    //详情接口
    import {
        getSupplierDetail,
        supplierAudit
    } from '@/api/supplier';

    export default {
        name: 'Approval',
        data() {
            return {
                enterpriseForm: {
                    supplierName: '',
                    creditCode: '',
                    legalUser: '',
                    addressDetail: '',
                    contacts: '',
                    contactsPhone: '',
                    identityCardUp: '',
                    identityCardDown: '',
                    creditBook: '',
                    bank: '',
                    money: '',
                    transactionSerialNumber: '',
                    remark: '',
                    auditStatus: '',
                }
            };
        },
        computed: {
            headers() {
                return {
                    'X-Litemall-Admin-Token': getToken(),
                };
            },
        },
        watch: {},
        created() {
            if (this.$route.query.id) {
                const id = this.$route.query.id;
                console.log(id);
                getSupplierDetail({
                        'creditCode': id
                    }).then(res => {
                        this.enterpriseForm = res.data.data;
                        console.log(this.enterpriseForm);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                this.$router.push('login');
            }
        },
        methods: {
            handleAgree() {
                this.$confirm('确定审核通过吗？', '审核提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    supplierAudit({
                            'id': this.enterpriseForm.id.toString(),
                            'auditStatus': '1'
                        }).then(res => {
                            this.$notify.success({
                                title: '成功',
                                message: '审核通过',
                            });
                            this.$router.go(-1);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }).catch(() => {});
            },
            handleNo() {}
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .approval-container {


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
            &.is-disabled .el-input__inner {
                background-color: transparent;
                // border-color: #e4e7ed;
                color: #A6A6A6;
                cursor: auto;
            }

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

            .el-input,
            .enterprise-text {
                // border: 1px solid rgba(255, 255, 255, 0.1);
                // background: rgba(0, 0, 0, 0.1);
                background: #FFFFFF;
                border: 1px solid #CACACA;
                border-radius: 4px;
                color: #454545;
            }

            .enterprise-text {
                color: #A6A6A6;
                padding: 0 5px 0 15px;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
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
            width: 300px;
            // margin-top: 70px;
            margin: 70px 28px 0 28px;
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

    .approval-container {
        // position: fixed;
        height: 100%;
        width: 100%;
        background-color: #fff;
        // overflow-y: auto;

        .enterprise-box {
            background: #FAFBFC;
            border: 1px solid #E3E4E5;
            padding-top: 56px;
            padding-left: 56px;
            padding-right: 56px;
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
            // padding: 80px 0 0 0;
            margin: 60px auto 160px auto;
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

        .table-box {

            border-left: 1px solid #CACACA;
            border-bottom: 1px solid #CACACA;
            border-right: 1px solid #CACACA;

            .table-title {
                width: 160px;
                height: 56px;
                line-height: 56px;
                background-color: #F7F7FA;
                border-right: 1px solid #CACACA;
                text-align: right;
                padding-right: 24px;
                float: left;
                font-size: 14px;
                color: #424242;
            }

            .table-detail {
                margin-left: 160px;
                padding-left: 24px;
                height: 56px;
                line-height: 56px;
                font-size: 14px;
                color: #616164;
            }
        }

    }
</style>