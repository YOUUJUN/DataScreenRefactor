<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        :show-close="false"
        :append-to-body="true"
        custom-class="lucency-dlg"
    >
        <template slot="title">
            <div class="lucency-dlg-title">
                <div class="title-left">
                    <i class="custom-icon custom-icon-youshuangjiantou"></i>
                    <span>安全告警</span>
                </div>
                <img
                    @click="handleClose()"
                    class="card-head-inner-more"
                    src="~@/static/Cut-diagram/guanbi.png"
                />
            </div>
        </template>

        <el-table
            class="lucency-table"
            :data="tableData"
            :stripe="true"
            style="width: 100%"
        >
            <el-table-column
                prop="create_date"
                label="告警时间"
                width="150"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="alarm_style"
                label="告警类型"
                width="280"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="device_address"
                label="设备地址"
                width="auto"
                :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        class="lucency-btn"
                        @click="handleDeal(scope)"
                        >立即处理</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="lucency-page"
            layout="prev, pager, next"
            :page-count="totalPage"
            :current-page.sync="currentPage"
            @current-change="getData"
        >
        </el-pagination>
    </el-dialog>
</template>

<script>
import {
    resolveAlarmById,
    fetchSafetyAlarmListByPage,
} from "../../../api/dataSource.js";

import { mapActions } from "vuex";

export default {
    props: {
        visible: {
            type: String,
            default: false,
        },
    },

    data() {
        return {
            tableData: [],
            totalPage: 0,
            currentPage: 1,
        };
    },

    watch: {
        visible: {
            immediate: true,
            handler(newValue) {
                if (newValue === true) {
                    this.getData(1);
                }
            },
        },
    },

    methods: {
        ...mapActions("data", ["deleteSafetyAlarm"]),

        handleClose() {
            this.$emit("update:visible", false);
        },

        getData(currentPage) {
            fetchSafetyAlarmListByPage(currentPage)
                .then((res) => {
                    console.log("res-->", res);
                    if (res.status === 200) {
                        this.tableData = res.data.warning_list;
                        let totalPage = Math.ceil(res.data.search_count / 11);
                        console.log("totalPage", totalPage);
                        this.totalPage = totalPage;
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },

        //立即处理
        handleDeal(scope) {
            console.log("scope", scope.row);
            let { id } = scope.row;
            resolveAlarmById(id)
                .then((res) => {
                    if (res.status === 200) {
                        this.getData(this.currentPage);
                        this.deleteSafetyAlarm({id})
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
    },
};
</script>

<style scoped>
.lucency-dlg-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 0.375rem 0 0.375rem;
}

.title-left {
    color: #2ad9e4;
    font-weight: 600;
}

.title-left > i {
    font-size: 0.28rem;
}

.title-left > span {
    font-size: 0.25rem;
}

.card-head-inner-more {
    cursor: pointer;
}
</style>