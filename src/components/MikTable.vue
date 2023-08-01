<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input
            v-model="formInline.username"
            placeholder="输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.enable"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="禁用" value="1" />
            <el-option label="启用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :size="size"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="props.tableData.data"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        v-for="(i, index) in props.header"
        :key="index"
        :prop="i.prop"
        :label="i.label"
      />
      <el-table-column fixed="right" label="操作" fit="true">
        <template #default="scope">
          <el-button
            v-for="(i, index) in data.action"
            :key="index"
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row, i.label)"
            >{{ i.label }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <div class="bottom">
        <el-pagination
          v-model:current-page="formInline.pageNum"
          v-model:page-size="formInline.pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next, jumper, total"
          :total="tableData.total"
          @size-change="queryPage"
          @current-change="queryPage"
        />
        <el-button type="primary" class="new-button" @click="handleNew"
          >新增</el-button
        >
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { reactive, defineEmits, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const emit = defineEmits(["edit", "query", "clickNew"]);

const handleClick = (item, label) => {
  if ("编辑" === label) {
    emit("edit", item);
  }

  if ("删除" === label) {
    emit("del", item);
  }

};

const handleDel = (item) => {
  console.log(item);
  emit("del", item);
};

const handleNew = (item) => {
  emit("clickNew", item);
};

const props = defineProps({
  header: Object,
  tableData: Object,
});

const data = reactive({
  header: [],
  action: [
    {
      label: "详情",
      prop: "createTime",
    },
    {
      label: "编辑",
      prop: "createTime",
    },
    {
      label: "删除",
      prop: "createTime",
    },
  ],
});

const onSubmit = () => {
  queryPage();
};

const queryPage = () => {
  emit("query", {
    username: formInline.username,
    status: formInline.status,
    startTime: proxy.$moment(formInline.date[0]).format("YYYY-MM-DD HH:mm:ss"),
    endTime: proxy.$moment(formInline.date[1]).format("YYYY-MM-DD HH:mm:ss"),
    pageNum: formInline.pageNum,
    pageSize: formInline.pageSize,
  });
};

// const init = () => {
//   data.header = props.header;
//   tableData.data = props.tableData;
// };

// onMounted(() => {
//   init();
// });

const form = reactive({
  userName: "",
  status: "",
  startTime: "",
  endTime: "",
});

const formInline = reactive({
  username: "",
  enable: "",
  date: "",
  startTime: "",
  endTime: "",
  pageNum: 1,
  pageSize: 10,
});
</script>
  
  <style lang="less" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.bottom {
  display: flex;
  margin-top: 10px;
}

.new-button {
  margin-left: 600px;
}
</style>