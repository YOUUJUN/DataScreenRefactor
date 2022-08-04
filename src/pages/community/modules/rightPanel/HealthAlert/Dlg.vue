<template>
    <el-dialog
        :visible.sync="visible"
        :before-close="handleClose"
        :modal="false"
        :show-close="false"
        custom-class="lucency-dlg"
    >
        <template slot="title">
            <div class="lucency-dlg-title">
                <div class="title-left">
                    <i class="custom-icon custom-icon-youshuangjiantou"></i>
                    <span>设备预警</span>
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
            <el-table-column prop="date" label="告警时间" width="100">
            </el-table-column>
            <el-table-column prop="name" label="告警类型" width="100">
            </el-table-column>
            <el-table-column prop="address" label="设备名称" width="auto">
            </el-table-column>
            <el-table-column prop="address" label="设备地址" width="auto">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        class="lucency-btn"
                        @click=""
                        >立即处理</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            class="lucency-page"
            layout="prev, pager, next"
            :total="50"
            @current-change="getData"
        >
        </el-pagination>
    </el-dialog>
</template>

<script>
import { postAction } from "@/api/manage";

export default {
    props: {
        visible: {
            type: String,
            default: false,
        },
    },

    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
        };
    },

    created() {
        this.getData(1);
    },

    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },

        getData(currentPage) {
            request({
                url: `/datav/fm.warning/11/${currentPage}`,
                method: "post",
                data: {
                    alarm_type: "hea_alarm",
                },
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
                .then((res) => {
                    console.log("res", res);
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

.card-head-inner-more{
    cursor:pointer;
}
</style>