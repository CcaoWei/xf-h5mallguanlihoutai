<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入优惠券标题" />
      <el-select v-model="listQuery.type" clearable style="width: 200px" class="filter-item" placeholder="请选择优惠券类型">
        <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
      </el-select>
      <el-select v-model="listQuery.status" clearable style="width: 200px" class="filter-item" placeholder="请选择优惠券状态">
        <el-option v-for="type in statusOptions" :key="type.value" :label="type.label" :value="type.value" />
      </el-select>
      <el-button v-permission="['GET /admin/coupon/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-permission="['POST /admin/coupon/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="优惠券ID" prop="id" sortable />

      <el-table-column align="center" label="优惠券名称" prop="name" />

      <el-table-column align="center" label="介绍" prop="desc" />

      <el-table-column align="center" label="标签" prop="tag" />

      <el-table-column align="center" label="最低消费" prop="min">
        <template slot-scope="scope">满{{ scope.row.min }}元可用</template>
      </el-table-column>

      <el-table-column align="center" label="满减金额" prop="discount">
        <template slot-scope="scope">减免{{ scope.row.discount }}元</template>
      </el-table-column>

      <el-table-column align="center" label="每人限领" prop="limit">
        <template slot-scope="scope">{{ scope.row.limit != 0 ? scope.row.limit : '不限' }}</template>
      </el-table-column>

      <el-table-column align="center" label="商品使用范围" prop="goodsType">
        <template slot-scope="scope">{{ scope.row.goodsType | formatGoodsType }}</template>
      </el-table-column>

      <el-table-column align="center" label="优惠券类型" prop="type">
        <template slot-scope="scope">{{ scope.row.type | formatType }}</template>
      </el-table-column>

      <el-table-column align="center" label="优惠券数量" prop="total">
        <template slot-scope="scope">{{ scope.row.total != 0 ? scope.row.total : '不限' }}</template>
      </el-table-column>

      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">{{ scope.row.status | formatStatus }}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['GET /admin/coupon/read']" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button v-permission="['POST /admin/coupon/update']" type="info" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/coupon/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="介绍" prop="desc">
          <el-input v-model="dataForm.desc" />
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="dataForm.tag" />
        </el-form-item>
        <el-form-item label="最低消费" prop="min">
          <el-input v-model="dataForm.min">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="满减金额" prop="discount">
          <el-input @keyup.native="proving1" type="text" v-model="dataForm.discount">
            <template slot="append">元</template>
          </el-input>
          <!-- <input v-positive-int v-model="dataForm.discount" type="text"> -->
        </el-form-item>
        <el-form-item label="每人限领" prop="limit">
          <el-input v-model="dataForm.limit">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="分发类型" prop="type">
          <el-select v-model="dataForm.type">
            <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券数量" prop="total">
          <el-input v-model="dataForm.total">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-radio-group v-model="dataForm.timeType">
            <el-radio-button :label="0">领券相对天数</el-radio-button>
            <el-radio-button :label="1">指定绝对时间</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 0">
          <el-input v-model="dataForm.days">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="dataForm.timeType === 1">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="选择日期" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="商品限制范围">
          <el-radio-group v-model="dataForm.goodsType">
            <el-radio-button :label="0">全场通用</el-radio-button>
            <el-radio-button :label="1">指定分类</el-radio-button>
            <el-radio-button :label="2">指定商品</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="dataForm.goodsType === 1">
          <!-- <el-cascader multiple :options="categoryList" expand-trigger="hover" @change="handleCategoryChange" /> -->
          <div class="block">
            <span class="demonstration">添加商品</span>
            <el-cascader ref="cascader" v-model="value1" :show-all-levels="false" collapse-tags :options="categoryList" :props="props" @change="handleCategoryChange"></el-cascader>
          </div>
          <!-- <el-cascader class="show-box" ref="cascader" v-model="value2" disabled :options="categoryList" :props="props" @change="handleCategoryChange" clearable></el-cascader> -->
          <el-table header-row-class-name="tableRowClassName" :data="couponSelectList" border style="width: 100%">

            <el-table-column prop="name" label="分类名称">
            </el-table-column>
            <el-table-column align="center" label="操作" class="caozuo" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="medium" @click="handleDeleteSelect(scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-form-item>
        <el-form-item v-show="dataForm.goodsType === 2">
          <!-- 指定商品 -->
          <el-button @click="clearSelect" style="margin-bottom:20px;">取消选择</el-button>
          <el-input v-model="goodsListQuery.goodsSn" clearable class="filter-item" style="width: 120px;margin-bottom:20px;" placeholder="商品编号" />
          <el-input v-model="goodsListQuery.name" clearable class="filter-item" style="width: 120px;margin-bottom:20px;" placeholder="商品名称" />
          <el-table ref="singleTable" @current-change="handleCurrentChange" v-loading="listLoading" :data="goodsList" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
            <!-- <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" class="table-expand">
                                    <el-form-item label="宣传画廊">
                                        <img v-for="pic in props.row.gallery" :key="pic" :src="pic" class="gallery" />
                                    </el-form-item>
                                    <el-form-item label="商品介绍">
                                        <span>{{ props.row.brief }}</span>
                                    </el-form-item>
                                    <el-form-item label="商品单位">
                                        <span>{{ props.row.unit }}</span>
                                    </el-form-item>
                                    <el-form-item label="关键字">
                                        <span>{{ props.row.keywords }}</span>
                                    </el-form-item>
                                    <el-form-item label="类目ID">
                                        <span>{{ props.row.categoryId }}</span>
                                    </el-form-item>
                                    <el-form-item label="品牌商ID">
                                        <span>{{ props.row.brandId }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column> -->

            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" property="iconUrl" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40" />
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="100" label="名称" prop="name" />

            <!-- 
                        <el-table-column align="center" property="iconUrl" label="分享图">
                            <template slot-scope="scope">
                                <img :src="scope.row.shareUrl" width="40" />
                            </template>
                        </el-table-column> -->

            <!-- <el-table-column align="center" label="详情" prop="detail">
                            <template slot-scope="scope">
                                <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
                                    <div class="detail-img" v-html="goodsDetail" />
                                </el-dialog>
                                <el-button type="primary" size="mini" @click="showDetail(scope.row.detail)">查看
                                </el-button>
                            </template>
                        </el-table-column> -->

            <!-- <el-table-column align="center" label="专柜价格" prop="counterPrice" />

                        <el-table-column align="center" label="当前价格" prop="retailPrice" />

                        <el-table-column align="center" label="是否新品" prop="isNew">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.isNew ? 'success' : 'error'">{{
                        scope.row.isNew ? '新品' : '非新品'
                    }}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" label="是否热品" prop="isHot">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.isHot ? 'success' : 'error'">{{
                        scope.row.isHot ? '热品' : '非热品'
                    }}</el-tag>
                            </template>
                        </el-table-column> -->

            <!-- <el-table-column align="center" label="是否在售" prop="isOnSale">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.isOnSale ? 'success' : 'error'">{{
                        scope.row.isOnSale ? '在售' : '未售'
                    }}</el-tag>
                            </template>
                        </el-table-column> -->

            <!-- <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column> -->
          </el-table>

          <pagination small :pager-count="3" class="addPage" v-show="goodsTotal > 0" :total="goodsTotal" :page.sync="goodsListQuery.page" :limit.sync="goodsListQuery.limit" @pagination="getGoodsList" />
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

<style lang="scss" scoped>
.block {
    margin-bottom: 20px;
}
/deep/ .el-table .tableRowClassName {
    background: #f9fafc;
}
/deep/ .tableRowClassName th {
    background: #f9fafc;
}

.addPage .el-pagination {
    white-space: normal;
    margin-left: -120px;
}
/deep/ .pagination-container {
    margin-left: -120px;
}
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
    width: 120px;
    height: 120px;
    display: block;
}
</style>

<script>
//商品列表接口
import { listGoods } from '@/api/goods';
import { listCoupon, createCoupon, updateCoupon, deleteCoupon, findCategory } from '@/api/coupon';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import { listCatAndBrand } from '@/api/goods';

import { parseTime } from '@/utils/index'; //时间格式转换

const defaultTypeOptions = [
    {
        label: '通用领券',
        value: 0,
    },
    {
        label: '注册赠券',
        value: 1,
    },
    {
        label: '兑换码',
        value: 2,
    },
];

const defaultStatusOptions = [
    {
        label: '正常',
        value: 0,
    },
    {
        label: '已过期',
        value: 1,
    },
    {
        label: '已下架',
        value: 2,
    },
];

export default {
    name: 'Coupon',
    components: {
        Pagination,
    },
    filters: {
        formatType(type) {
            for (let i = 0; i < defaultTypeOptions.length; i++) {
                if (type === defaultTypeOptions[i].value) {
                    return defaultTypeOptions[i].label;
                }
            }
            return '';
        },
        formatGoodsType(goodsType) {
            if (goodsType === 0) {
                return '全场通用';
            } else if (goodsType === 1) {
                return '指定分类';
            } else {
                return '指定商品';
            }
        },
        formatStatus(status) {
            if (status === 0) {
                return '正常';
            } else if (status === 1) {
                return '已过期';
            } else {
                return '已下架';
            }
        },
    },
    data() {
        return {
            couponSelectList: [],
            value1: [],
            value2: [],
            props: { multiple: true },
            categoryList: [],

            typeOptions: Object.assign({}, defaultTypeOptions),
            statusOptions: Object.assign({}, defaultStatusOptions),
            list: undefined,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                name: undefined,
                type: undefined,
                status: undefined,
                sort: 'add_time',
                order: 'desc',
            },
            goodsListQuery: {
                page: 1,
                limit: 10,
                name: undefined,
                type: undefined,
                status: undefined,
                sort: 'add_time',
                order: 'desc',
            },
            dataForm: {
                id: undefined,
                name: undefined,
                desc: undefined,
                tag: undefined,
                total: 0,
                discount: 0,
                min: 0,
                limit: 1,
                type: 0,
                status: 0,
                goodsType: 0,
                goodsValue: [],
                timeType: 0,
                days: 0,
                startTime: null,
                endTime: null,
            },
            dialogFormVisible: false,
            dialogStatus: '',
            textMap: {
                update: '编辑',
                create: '创建',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '优惠券标题不能为空',
                        trigger: 'blur',
                    },
                ],
            },
            downloadLoading: false,
            goodsList: undefined,
            goodsTotal: 0,
            singleData: [],
            currentRow: null,
            currentData: null,
            currentUpdate: null,
        };
    },
    created() {
        this.getList();
        this.init();
    },
    directives: {
        positiveInt: {
            bind: function (el) {
                el.handler = function () {
                    el.value = Number(el.value.replace(/\D+/, ''));
                };

                el.addEventListener('input', el.handler);
            },

            unbind: function (el) {
                el.removeEventListener('input', el.handler);
            },
        },
    },

    methods: {
        proving1() {
            this.dataForm.discount = this.dataForm.discount.replace(/[^\.\d]/g, '');
            this.dataForm.discount = this.dataForm.discount.replace('.', '');
        },
        handleDeleteSelect(row) {
            let newValue1 = this.value1.filter((item, idx, arr) => {
                return idx != row.index;
            });
            this.value1 = newValue1;
            this.handleCategoryChange(this.value1);
        },
        getInfo(id, list) {
            for (const first of list) {
                if (first.value == id) {
                    let result = {
                        name: first.label,
                        child: first.children,
                    };
                    return result;
                }
            }
        },
        handleCategoryChange(value) {
            console.log(value);
            this.value1 = value;
            let strArr = [];
            value.forEach((item, index) => {
                let str = {
                    name: `${this.getInfo(item[0], this.categoryList).name}>${
                        this.getInfo(item[1], this.getInfo(item[0], this.categoryList).child).name
                    }`,
                    index: index,
                };
                strArr.push(str);
            });
            this.couponSelectList = strArr;
            this.value2 = value;
        },
        init() {
            listCatAndBrand().then((response) => {
                this.categoryList = response.data.data.categoryList;
                this.brandList = response.data.data.brandList;
            });
        },
        getList() {
            //优惠劵列表
            this.listLoading = true;
            listCoupon(this.listQuery)
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
        getGoodsList() {
            //商品列表
            this.listLoading = true;
            listGoods(this.goodsListQuery)
                .then((response) => {
                    this.goodsList = response.data.data.items;
                    this.goodsTotal = response.data.data.total;
                    this.listLoading = false;
                    // console.log(this.goodsList)

                    this.$nextTick(function () {
                        // console.log(this.currentUpdate)
                        // console.log(this.currentData)
                        //换页后依旧选中
                        if (this.currentData) {
                            for (let i = 0; i < this.goodsList.length; i++) {
                                const element = this.goodsList[i];
                                if (element.id == this.currentData.id) {
                                    // console.log(111111111);
                                    this.setCurrent(this.goodsList[i]);
                                    break;
                                }
                            }
                        }
                        // console.log(this.dialogStatus)
                        if (this.dialogStatus == 'update' && this.currentUpdate && !this.currentData) {
                            for (let i = 0; i < this.goodsList.length; i++) {
                                const element = this.goodsList[i];
                                if (element.id == this.currentUpdate.goodsValue[0]) {
                                    // console.log(111111111);
                                    this.setCurrent(this.goodsList[i]);
                                    break;
                                }
                            }
                        }
                    });
                })
                .catch(() => {
                    this.goodsList = [];
                    this.goodsTotal = 0;
                    this.listLoading = false;
                    this.currentRow = null;
                });
        },
        setCurrent(row) {
            console.log(row);
            this.$refs.singleTable.setCurrentRow(row);
        },
        clearSelect() {
            // this.$nextTick(function () {
            this.currentData = null;
            this.setCurrent();
            // })
        },
        handleCurrentChange(val) {
            console.log(1);
            this.currentRow = val;
            if (val) {
                this.dataForm.goodsValue = [val.id];
            } else if (!val && !this.currentData) {
                this.dataForm.goodsValue = [];
            }
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        resetForm() {
            this.dataForm = {
                id: undefined,
                name: undefined,
                desc: undefined,
                tag: undefined,
                total: 0,
                discount: 0,
                min: 0,
                limit: 1,
                type: 0,
                status: 0,
                goodsType: 0,
                goodsValue: [],
                timeType: 0,
                days: 0,
                startTime: null,
                endTime: null,
            };
            this.goodsListQuery.name = undefined;
            this.goodsListQuery.goodsSn = undefined;
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
            //创建提交
            if (this.dataForm.startTime) {
                this.dataForm.startTime = parseTime(this.dataForm.startTime);
            }
            if (this.dataForm.endTime) {
                this.dataForm.endTime = parseTime(this.dataForm.endTime);
            }
            if (this.dataForm.goodsType == 1) {
                this.value1.forEach((item) => {
                    this.dataForm.goodsValue.push(item[1]);
                });
            }
            console.log(this.dataForm);
            // return;
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    createCoupon(this.dataForm)
                        .then((response) => {
                            this.list.unshift(response.data.data);
                            this.dialogFormVisible = false;
                            this.$notify.success({
                                title: '成功',
                                message: '创建优惠券成功',
                            });
                            this.dataForm.goodsValue = [];
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
            console.log(row);
            this.currentUpdate = row;
            this.dataForm = Object.assign({}, row);
            findCategory(row.id).then((response) => {
                console.log(response.data.data);
                this.handleCategoryChange(response.data.data);
                // this.
            });
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                if (this.dataForm.days === 0) {
                    this.dataForm.daysType = 1;
                } else {
                    this.dataForm.daysType = 0;
                }
                this.$refs['dataForm'].clearValidate();
            });
        },
        updateData() {
            if (this.dataForm.startTime) {
                this.dataForm.startTime = parseTime(this.dataForm.startTime);
            }
            if (this.dataForm.endTime) {
                this.dataForm.endTime = parseTime(this.dataForm.endTime);
            }
            if (this.dataForm.goodsType == 1) {
                this.value1.forEach((item) => {
                    this.dataForm.goodsValue.push(item[1]);
                });
            }

            console.log(this.dataForm);
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    updateCoupon(this.dataForm)
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
                                message: '更新优惠券成功',
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
            deleteCoupon(row)
                .then((response) => {
                    this.$notify.success({
                        title: '成功',
                        message: '删除优惠券成功',
                    });
                    const index = this.list.indexOf(row);
                    this.list.splice(index, 1);
                })
                .catch((response) => {
                    this.$notify.error({
                        title: '失败',
                        message: response.data.errmsg,
                    });
                });
        },
        handleDetail(row) {
            this.$router.push({
                path: '/promotion/couponDetail',
                query: {
                    id: row.id,
                },
            });
        },
        handleDownload() {
            this.downloadLoading = true;
            import('@/vendor/Export2Excel').then((excel) => {
                const tHeader = ['优惠券ID', '名称', '内容', '标签', '最低消费', '减免金额', '每人限领', '优惠券数量'];
                const filterVal = ['id', 'name', 'desc', 'tag', 'min', 'discount', 'limit', 'total'];
                excel.export_json_to_excel2(tHeader, this.list, filterVal, '优惠券信息');
                this.downloadLoading = false;
            });
        },
    },
    watch: {
        // 'dataForm.discount': function (nv, ov) {
        //     console.log(nv);
        //     console.log(ov);
        //     console.log(this.dataForm.discount);
        //     this.dataForm.discount = Number(this.dataForm.discounts.toString().replace(/\D+/, ''));
        // },
        'dataForm.goodsType': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal)
            if (val == 2) {
                // this.listLoading = true;
                this.getGoodsList();
            }
        },
        'goodsListQuery.name': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal)
            const self = this;
            setTimeout(function () {
                self.goodsListQuery.page = 1;
                self.getGoodsList();
            }, 200);
        },
        'goodsListQuery.goodsSn': function (val, oldVal) {
            // console.log('new: %s, old: %s', val, oldVal)
            const self = this;
            setTimeout(function () {
                self.goodsListQuery.page = 1;
                self.getGoodsList();
            }, 200);
        },
        currentRow: {
            handler: function (val, oldVal) {
                /* ... */
                if (val) {
                    const self = this;
                    setTimeout(function () {
                        self.currentData = JSON.parse(JSON.stringify(val));

                        self.dataForm.goodsValue = [self.currentData.id];
                    }, 0);

                    // console.log(this.currentData)
                }
            },
            deep: true,
        },
    },
};
</script>