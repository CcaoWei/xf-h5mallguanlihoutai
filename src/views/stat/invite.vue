<template>
    <div class="app-container">
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">用户数量</div>
                        <count-to :start-val="0" :end-val="userTotal" :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('messages')">
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon icon-class="message" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">商品数量</div>
                        <count-to :start-val="0" :end-val="goodsTotal" :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('purchases')">
                    <div class="card-panel-icon-wrapper icon-money">
                        <svg-icon icon-class="message" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">货品数量</div>
                        <count-to :start-val="0" :end-val="productTotal" :duration="3200" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('shoppings')">
                    <div class="card-panel-icon-wrapper icon-shoppingCard">
                        <svg-icon icon-class="money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">订单数量</div>
                        <count-to :start-val="0" :end-val="orderTotal" :duration="3600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 查询和其他操作 -->
        <div class="filter-container">
            <el-input
                v-model="listQuery.username"
                clearable
                class="filter-item"
                style="width: 200px;"
                placeholder="请输入用户名"
            />
            <el-input
                v-model="listQuery.mobile"
                clearable
                class="filter-item"
                style="width: 200px;"
                placeholder="请输入手机号"
            />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
            <el-button
                :loading="downloadLoading"
                class="filter-item"
                type="primary"
                icon="el-icon-download"
                @click="handleDownload"
                >导出</el-button
            >
        </div>

        <!-- 查询结果 -->
        <el-table
            v-loading="listLoading"
            :data="list"
            size="small"
            element-loading-text="正在查询中。。。"
            border
            fit
            highlight-current-row
        >
            <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable />

            <el-table-column align="center" label="用户名" prop="username" />

            <el-table-column align="center" label="手机号码" prop="mobile" />

            <el-table-column align="center" label="性别" prop="gender">
                <template slot-scope="scope">
                    <el-tag>{{ genderDic[scope.row.gender] }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="生日" prop="birthday" />

            <el-table-column align="center" label="用户等级" prop="userLevel">
                <template slot-scope="scope">
                    <el-tag>{{ levelDic[scope.row.userLevel] }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag>{{ statusDic[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="dataForm"
                status-icon
                label-position="left"
                label-width="100px"
                style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="dataForm.username" />
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="dataForm.mobile" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="dataForm.password" type="password" auto-complete="off" />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="dataForm.gender">
                        <el-option :value="0" label="未知" />
                        <el-option :value="1" label="男" />
                        <el-option :value="2" label="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="dataForm.birthday" type="date" value-format="yyyy-MM-dd" />
                </el-form-item>
                <el-form-item label="用户等级" prop="userLevel">
                    <el-select v-model="dataForm.userLevel">
                        <el-option :value="0" label="普通用户" />
                        <el-option :value="1" label="VIP用户" />
                        <el-option :value="2" label="高级VIP用户" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="dataForm.status">
                        <el-option :value="0" label="可用" />
                        <el-option :value="1" label="禁用" />
                        <el-option :value="2" label="注销" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">确定</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { info } from '@/api/dashboard';
import { fetchList, createUser, updateUser } from '@/api/user';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import CountTo from 'vue-count-to';
export default {
    name: 'User',
    components: { Pagination, CountTo },
    data() {
        return {
            userTotal: 0,
            goodsTotal: 0,
            productTotal: 0,
            orderTotal: 0,

            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                username: undefined,
                mobile: undefined,
                sort: 'add_time',
                order: 'desc',
            },
            dataForm: {
                id: undefined,
                username: '',
                mobile: '',
                password: undefined,
                gender: 0,
                userLevel: 0,
                birthday: undefined,
                status: 0,
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '编辑',
                create: '创建',
            },
            rules: {
                username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                mobile: [{ required: true, message: '手机号码不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
            },
            downloadLoading: false,
            genderDic: ['未知', '男', '女'],
            levelDic: ['普通用户', 'VIP用户', '高级VIP用户'],
            statusDic: ['可用', '禁用', '注销'],
        };
    },
    created() {
        info().then((response) => {
            this.userTotal = response.data.data.userTotal;
            this.goodsTotal = response.data.data.goodsTotal;
            this.productTotal = response.data.data.productTotal;
            this.orderTotal = response.data.data.orderTotal;
        });
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery)
                .then((response) => {
                    this.list = response.data.data.items;
                    this.total = response.data.data.total;
                    this.listLoading = false;
                })
                .catch(() => {
                    this.list = [];
                    this.total = 0;
                    this.listLoading = false;
                });
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        resetForm() {
            this.dataForm = {
                id: undefined,
                username: '',
                mobile: '',
                pass: undefined,
                checkPass: undefined,
                gender: 0,
                userLevel: 0,
                birthday: undefined,
                status: 0,
            };
        },
        handleCreate() {
            this.resetForm();
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate();
            });
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    createUser(this.dataForm)
                        .then((response) => {
                            this.list.unshift(response.data.data);
                            this.dialogFormVisible = false;
                            this.$notify.success({
                                title: '成功',
                                message: '添加用户成功',
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
        handleUpdate(row) {
            this.dataForm = Object.assign({}, row);
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate();
            });
        },
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    updateUser(this.dataForm)
                        .then(() => {
                            for (const v of this.list) {
                                if (v.id === this.dataForm.id) {
                                    const index = this.list.indexOf(v);
                                    this.list.splice(index, 1, this.dataForm);
                                    break;
                                }
                            }
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
            this.$notify.error({
                title: '警告',
                message: '用户删除操作不支持！',
            });
        },
        handleDownload() {
            this.downloadLoading = true;
            import('@/vendor/Export2Excel').then((excel) => {
                const tHeader = ['用户名', '手机号码', '性别', '生日', '状态'];
                const filterVal = ['username', 'mobile', 'gender', 'birthday', 'status'];
                excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息');
                this.downloadLoading = false;
            });
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}

.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }
    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }
            .icon-people {
                background: #40c9c6;
            }
            .icon-message {
                background: #36a3f7;
            }
            .icon-money {
                background: #f4516c;
            }
            .icon-shoppingCard {
                background: #34bfa3;
            }
        }
        .icon-people {
            color: #40c9c6;
        }
        .icon-message {
            color: #36a3f7;
        }
        .icon-money {
            color: #f4516c;
        }
        .icon-shoppingCard {
            color: #34bfa3;
        }
        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }
        .card-panel-icon {
            float: left;
            font-size: 48px;
        }
        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;
            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }
            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}
</style>
