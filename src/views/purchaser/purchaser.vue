<template>
    <div class="app-container">
        <!-- 查询和其他操作 -->
        <div class="filter-container">
            <!-- <el-input
                v-model="listQuery.id"
                clearable
                class="filter-item"
                style="width: 200px;"
                placeholder="请输入类目ID"
            />
            <el-input
                v-model="listQuery.name"
                clearable
                class="filter-item"
                style="width: 200px;"
                placeholder="请输入类目名称"
            /> -->
            <el-input v-model="listQuery.buyerName" clearable class="filter-item" style="width: 200px;"
                placeholder="请输入采购商名称" />
            <el-input v-model="listQuery.buyerPhone" clearable class="filter-item" style="width: 200px;"
                placeholder="请输入手机号码" />
            <!-- <el-cascader v-model="addressSelect" :options="options" @change="handleChange" placeholder="请选择所在区域"
                class="filter-item"> -->
            <!-- </el-cascader> -->
            <el-select v-model="listQuery.provinceId" placeholder="请选择省份" class="filter-item">
                <el-option v-for="item in search1" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <!-- 
                     -->
            <el-select v-model="listQuery.cityId" placeholder="请选择城市" class="filter-item">
                <el-option v-for="item in search2" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <!-- 
                    -->
            <el-select v-model="listQuery.areaId" placeholder="请选择区/县" class="filter-item">
                <el-option v-for="item in search3" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
            <el-button class="filter-item" type="primary"
                icon="el-icon-search" @click="handleFilter">查找</el-button>
            <!--  style="float:right" -->
            <el-button class="filter-item" type="primary"
                icon="el-icon-plus" @click="handleCreate">添加</el-button>
            <!-- <el-button
                v-permission="['POST /admin/category/create']"
                class="filter-item"
                type="primary"
                icon="el-icon-edit"
                @click="handleCreate"
                >添加</el-button
            >
            <el-button
                :loading="downloadLoading"
                class="filter-item"
                type="primary"
                icon="el-icon-download"
                @click="handleDownload"
                >导出</el-button
            > -->
        </div>

        <!-- 查询结果 -->
        <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit
            highlight-current-row>
            <el-table-column align="center" label="ID" prop="id" />

            <el-table-column align="center" label="采购商名称" prop="buyerName" />

            <!-- <el-table-column align="center" property="iconUrl" label="类目图标">
                <template slot-scope="scope">
                    <img v-if="scope.row.iconUrl" :src="scope.row.iconUrl" width="40" />
                </template>
            </el-table-column>

            <el-table-column align="center" property="picUrl" label="类目图片">
                <template slot-scope="scope">
                    <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="80" />
                </template>
            </el-table-column>

            <el-table-column align="center" label="关键字" prop="keywords" /> -->

            <el-table-column align="center" min-width="100" label="所在地区" prop="address" />
            <el-table-column align="center" min-width="100" label="手机号" prop="buyerPhone" />
            <el-table-column align="center" min-width="100" label="入驻时间" prop="addTime" />

            <!-- <el-table-column :filters="[{ text: '一级类目', value: 'L1' }, { text: '二级类目', value: 'L2' }]"
                :filter-method="filterLevel" align="center" label="级别" prop="level">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.level === 'L1' ? 'primary' : 'info'">{{
                        scope.row.level === 'L1' ? '一级类目' : '二级类目'
                    }}</el-tag>
                </template>
            </el-table-column> -->

            <!-- <el-table-column align="center" label="父类目ID" prop="pid" /> -->

            <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button v-permission="['POST /admin/category/update']" type="primary" size="mini"
                        @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button v-permission="['POST /admin/category/delete']" type="danger" size="mini"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="getList" />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left"
                label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="采购商名称" prop="buyerName">
                    <el-input v-model="dataForm.buyerName" />
                </el-form-item>
                <el-form-item label="手机号码" prop="buyerPhone">
                    <el-input v-model="dataForm.buyerPhone" />
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="dataForm.userName" />
                </el-form-item>
                <el-form-item label="新密码" prop="passWord">
                    <el-input v-model="dataForm.passWord" />
                </el-form-item>
                <el-form-item prop="areaId" label="所在区域">
                    <div class="enterprise-item">
                        <!-- <el-cascader v-model="enterpriseForm.szqy" :options="options" @change="handleChange"
                        placeholder="请选择所在区域"></el-cascader> -->
                        <el-select v-model="dataForm.provinceId" placeholder="请选择省份" style="width:33.3333%">
                            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select><!-- 
                     --><el-select v-model="dataForm.cityId" placeholder="请选择城市" style="width:33.3333%">
                            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select><!-- 
                    --><el-select v-model="dataForm.areaId" placeholder="请选择区/县" style="width:33.3333%">
                            <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="详细地址" prop="addressDetail">
                    <el-input v-model="dataForm.addressDetail" />
                </el-form-item>
                <!-- <el-form-item label="类目名称" prop="name">
                    <el-input v-model="dataForm.name" />
                </el-form-item>
                <el-form-item label="关键字" prop="keywords">
                    <el-input v-model="dataForm.keywords" />
                </el-form-item>
                <el-form-item label="级别" prop="level">
                    <el-select v-model="dataForm.level" @change="onLevelChange">
                        <el-option label="一级类目" value="L1" />
                        <el-option label="二级类目" value="L2" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="dataForm.level === 'L2'" label="父类目" prop="pid">
                    <el-select v-model="dataForm.pid">
                        <el-option v-for="item in catL1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="类目图标" prop="iconUrl">
                    <el-upload :headers="headers" :action="uploadPath" :show-file-list="false"
                        :on-success="uploadIconUrl" class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
                        <img v-if="dataForm.iconUrl" :src="dataForm.iconUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                </el-form-item>
                <el-form-item label="类目图片" prop="picUrl">
                    <el-upload :headers="headers" :action="uploadPath" :show-file-list="false"
                        :on-success="uploadPicUrl" class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
                        <img v-if="dataForm.picUrl" :src="dataForm.picUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                </el-form-item>
                <el-form-item label="类目简介" prop="desc">
                    <el-input v-model="dataForm.desc" />
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">确定</el-button>
                <el-button v-else type="primary" @click="updateData" :loading="submitLoading">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 145px;
        height: 145px;
        display: block;
    }
</style>

<script>
    let oldUserName = '';
    import {
        listCategory,
        listCatL1,
        createCategory,
        updateCategory,
        deleteCategory
    } from '@/api/category';
    import {
        uploadPath
    } from '@/api/storage';
    import {
        getToken
    } from '@/utils/auth';
    import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
    //省市接口
    import {
        getRegion
    } from '@/api/enterprise';
    //添加列表编辑删除接口
    import {
        addPurchaser,
        getPurchaserList,
        deletePurchaser,
        findById
    } from '@/api/purchaser';

    export default {
        name: 'Supplier',
        components: {
            Pagination
        },
        data() {
            const validateRegion = (rule, value, callback) => {
                console.log(value);
                if (value == '' || value == undefined || value == 'undefined') {
                    callback(new Error('所在区域不能为空'));
                } else {
                    callback();
                }
            };
            //电话号验证
            const validatePhone = (rule, value, callback) => {
                // console.log(value);
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码'));
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
            //用户名验证
            const validateUserName = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('用户名长度应大于6'));
                } else {
                    callback();
                }
            };
            return {
                submitLoading: false,
                select1: '',
                select2: '',
                select3: '',
                search1: [],
                search2: [],
                search3: [],
                options1: [],
                options2: [],
                options3: [],
                addressSelect: [],
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
                uploadPath,
                list: undefined,
                total: 0,
                listLoading: true,
                listQuery: {
                    // page: 1,
                    // limit: 20,
                    // id: undefined,
                    // name: undefined,
                    // sort: 'add_time',
                    // order: 'desc',
                    'buyerName': '', //采购商名称
                    'buyerPhone': '', //手机号
                    'provinceId': '', //省级Id
                    'cityId': '', //市级Id
                    'areaId': '', //县区Id
                    'page': 1,
                    'limit': 20
                },
                catL1: {},
                dataForm: {
                    id: undefined,
                    buyerName: '',
                    userName: '',
                    passWord: '',
                    buyerPhone: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    addressDetail: '',
                    region: ''
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '添加',
                },
                rules: {
                    buyerName: [{
                        required: true,
                        message: '采购商名称不能为空',
                        trigger: 'blur'
                    }],
                    userName: [{
                        required: true,
                        // message: '用户名不能为空',
                        trigger: 'blur',
                        validator: validateUserName
                    }],
                    passWord: [{
                        required: true,
                        message: '新密码不能为空',
                        trigger: 'blur'
                    }],
                    buyerPhone: [{
                        required: true,
                        // message: '手机号码不能为空',
                        trigger: 'blur',
                        validator: validatePhone
                    }],
                    areaId: [{
                        required: true,
                        message: '所在区域不能为空',
                        // trigger: 'blur',
                        // validator: validateRegion
                    }],
                    addressDetail: [{
                        required: true,
                        message: '详细地址不能为空',
                        trigger: 'blur'
                    }],
                },
                downloadLoading: false,
            };
        },
        computed: {
            headers() {
                return {
                    'X-Litemall-Admin-Token': getToken(),
                };
            },
        },
        watch: {
            // $route: {
            //     handler: function (route) {
            //         this.redirect = route.query && route.query.redirect;
            //     },
            //     immediate: true,
            // },
            'dataForm.provinceId': function (val, oldVal) {
                if (val) {
                    this.dataForm.cityId = '';
                    this.options2 = [];
                    this.dataForm.areaId = '';
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
                }
            },
            'dataForm.cityId': function (val, oldVal) {
                if (val) {
                    this.dataForm.areaId = '';
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
            'listQuery.provinceId': function (val, oldVal) {
                this.listQuery.cityId = '';
                this.search2 = [];
                this.listQuery.areaId = '';
                this.search3 = [];
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
                        this.search2 = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            'listQuery.cityId': function (val, oldVal) {
                this.listQuery.areaId = '';
                this.search3 = [];
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
                        this.search3 = res.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        created() {
            this.getList();
            // this.getCatL1();
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
                    this.search1 = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            handleChangeAdd(value) {
                // this.dataForm.region = String(value);
                console.log(value);
            },
            getList() {
                this.listLoading = true;
                // const params = {
                //     'buyerName': '', //采购商名称
                //     'buyerPhone': '', //手机号
                //     'provinceId': '', //省级Id
                //     'cityId': '', //市级Id
                //     'areaId': '', //县区Id
                //     'page': 1,
                //     'size': 20
                // };
                getPurchaserList(this.listQuery).then((response) => {
                        console.log(response)
                        this.list = response.data.data.items;
                        this.total = response.data.data.total;
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.list = [];
                        this.total = 0;
                        this.listLoading = false;
                    });

                // listCategory(this.listQuery)
                //     .then((response) => {
                //         this.list = response.data.data.items;
                //         this.total = response.data.data.total;
                //         this.listLoading = false;
                //     })
                //     .catch(() => {
                //         this.list = [];
                //         this.total = 0;
                //         this.listLoading = false;
                //     });
            },
            getCatL1() {
                listCatL1().then((response) => {
                    this.catL1 = response.data.data;
                });
            },
            handleReset() {
                this.listQuery = {
                    'buyerName': '', //采购商名称
                    'buyerPhone': '', //手机号
                    'provinceId': '', //省级Id
                    'cityId': '', //市级Id
                    'areaId': '', //县区Id
                    'page': 1,
                    'limit': 20
                };
                this.getList();
            },
            handleFilter() {
                this.listQuery.page = 1;
                this.getList();
            },
            resetForm() {
                this.dataForm = {
                    // id: undefined,
                    // name: '',
                    // keywords: '',
                    // level: 'L2',
                    // pid: undefined,
                    // desc: '',
                    // iconUrl: undefined,
                    // picUrl: undefined,
                    id: undefined,
                    buyerName: '',
                    userName: '',
                    passWord: '',
                    buyerPhone: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    addressDetail: '',
                    region: ''
                };
            },
            filterLevel: function (value, row) {
                return row.level === value;
            },
            onLevelChange: function (value) {
                if (value === 'L1') {
                    this.pid = undefined;
                }
            },
            handleCreate() {
                this.resetForm();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.rules.passWord[0].required = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate();
                });
            },
            uploadIconUrl: function (response) {
                this.dataForm.iconUrl = response.data.url;
            },
            uploadPicUrl: function (response) {
                this.dataForm.picUrl = response.data.url;
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const params = {
                            'buyerName': this.dataForm.buyerName, //采购商名称	
                            'userName': this.dataForm.userName, //用户名账号
                            'passWord': this.dataForm.passWord, //密码
                            'buyerPhone': this.dataForm.buyerPhone, //手机号
                            'provinceId': this.dataForm.provinceId, //省级Id
                            'cityId': this.dataForm.cityId, //市级Id
                            'areaId': this.dataForm.areaId, //县区Id
                            'addressDetail': this.dataForm.addressDetail, //详细地址
                        };
                        console.log(params);
                        addPurchaser(params)
                            .then((response) => {
                                console.log(response);
                                // this.list.unshift(response.data.data);
                                // 更新L1目录
                                // this.getCatL1();
                                this.handleReset();
                                this.dialogFormVisible = false;
                                this.$notify.success({
                                    title: '成功',
                                    message: '创建成功',
                                });
                            })
                            .catch((response) => {
                                this.$notify.error({
                                    title: '失败',
                                    message: response.data.errmsg,
                                });
                            });
                        // createCategory(this.dataForm)
                        //     .then((response) => {
                        //         this.list.unshift(response.data.data);
                        //         // 更新L1目录
                        //         this.getCatL1();
                        //         this.dialogFormVisible = false;
                        //         this.$notify.success({
                        //             title: '成功',
                        //             message: '创建成功',
                        //         });
                        //     })
                        //     .catch((response) => {
                        //         this.$notify.error({
                        //             title: '失败',
                        //             message: response.data.errmsg,
                        //         });
                        //     });
                    }
                });
            },
            handleUpdate(row) {
                // this.resetForm();
                // console.log(row);
                this.submitLoading = true;
                this.dataForm = {
                    // id: undefined,
                    // name: '',
                    // keywords: '',
                    // level: 'L2',
                    // pid: undefined,
                    // desc: '',
                    // iconUrl: undefined,
                    // picUrl: undefined,
                    id: row.id,
                    buyerName: row.buyerName,
                    userName: row.userName,
                    passWord: '',
                    buyerPhone: row.buyerPhone,
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    addressDetail: row.addressDetail,
                    region: ''
                };
                this.rules.passWord[0].required = false;
                oldUserName = JSON.parse(JSON.stringify(row.userName));
                findById({
                        'id': row.id
                    })
                    .then((response) => {
                        console.log(response);
                        this.dataForm.provinceId = response.data.data.provinceId;
                        getRegion({
                                'id': this.dataForm.provinceId
                            }).then(res => {
                                // console.log(res);
                                // const data = res.data.data;
                                // for (let i = 0; i < data.length; i++) {
                                //     const element = data[i];
                                //     console.log(element);
                                // }
                                this.options2 = res.data.data;
                                this.dataForm.cityId = response.data.data.cityId;
                                getRegion({
                                        'id': this.dataForm.cityId
                                    }).then(val => {
                                        // console.log(res);
                                        // const data = val.data.data;
                                        // for (let i = 0; i < data.length; i++) {
                                        //     const element = data[i];
                                        //     console.log(element);
                                        // }
                                        this.options3 = val.data.data;
                                        this.dataForm.areaId = response.data.data.areaId;
                                        this.submitLoading = false;
                                    })
                                    .catch((e) => {
                                        console.log(e);
                                        this.submitLoading = false;
                                    });
                            })
                            .catch((e) => {
                                console.log(e);
                                this.submitLoading = false;
                            });
                    })
                    .catch((e) => {
                        console.log(e);
                        this.submitLoading = false;
                    });
                // this.dataForm = Object.assign({}, row);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                console.log(this.dataForm);
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate();
                });
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const id = this.dataForm.id;
                        // const oldUserName = JSON.parse(JSON.stringify(this.dataForm.userName));
                        const params = {
                            'buyerName': this.dataForm.buyerName, //采购商名称	
                            'userName': this.dataForm.userName, //用户名账号
                            'passWord': this.dataForm.passWord, //密码
                            'buyerPhone': this.dataForm.buyerPhone, //手机号
                            'provinceId': this.dataForm.provinceId, //省级Id
                            'cityId': this.dataForm.cityId, //市级Id
                            'areaId': this.dataForm.areaId, //县区Id
                            'addressDetail': this.dataForm.addressDetail, //详细地址
                            'id': id,
                            'oldUserName': oldUserName
                        };
                        console.log(oldUserName);
                        console.log(params);
                        addPurchaser(params)
                            .then(() => {
                                // for (const v of this.list) {
                                //     if (v.id === this.dataForm.id) {
                                //         const index = this.list.indexOf(v);
                                //         this.list.splice(index, 1, this.dataForm);
                                //         break;
                                //     }
                                // }
                                // 更新L1目录
                                // this.getCatL1();
                                this.handleReset();
                                this.dialogFormVisible = false;
                                this.$notify.success({
                                    title: '成功',
                                    message: '更新成功',
                                });
                            })
                            .catch((response) => {
                                this.$notify.error({
                                    title: '失败',
                                    message: response.data.errmsg,
                                });
                            });
                    }
                });
            },
            handleDelete(row) {
                console.log(row);
                this.$confirm('删除此项', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePurchaser({
                            'id': row.id
                        })
                        .then((response) => {
                            // 更新L1目录
                            // this.getCatL1();
                            this.handleReset();
                            this.$notify.success({
                                title: '成功',
                                message: '删除成功',
                            });
                            // const index = this.list.indexOf(row);
                            // this.list.splice(index, 1);
                        })
                        .catch((response) => {
                            this.$notify.error({
                                title: '失败',
                                message: response.data.errmsg,
                            });
                        });
                });
                // deletePurchaser(row.id)
                //     .then((response) => {
                //         // 更新L1目录
                //         // this.getCatL1();
                //         this.handleReset();
                //         this.$notify.success({
                //             title: '成功',
                //             message: '删除成功',
                //         });
                //         const index = this.list.indexOf(row);
                //         this.list.splice(index, 1);
                //     })
                //     .catch((response) => {
                //         this.$notify.error({
                //             title: '失败',
                //             message: response.data.errmsg,
                //         });
                //     });
            },
            handleDownload() {
                this.downloadLoading = true;
                import('@/vendor/Export2Excel').then((excel) => {
                    const tHeader = ['类目ID', '名称', '关键字', '级别', '父类目ID', '类目图标', '类目图片', '简介'];
                    const filterVal = ['id', 'name', 'keywords', 'level', 'pid', 'iconUrl', 'picUrl', 'desc'];
                    excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品类目信息');
                    this.downloadLoading = false;
                });
            },
        },
    };
</script>