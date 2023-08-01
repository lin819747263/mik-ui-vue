<template>
  <div>
    <MikTable
      :tableData="tableData"
      :header="data.header"
      @edit="getUserById"
      @query="listUserPage"
      @click-new="change"
      @del="delUser"
    />

    <el-dialog v-model="dialogFormVisible" title="编辑用户">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveOrUpdateUser">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="newFormVisible" title="新增用户">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveOrUpdateUser">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import MikTable from "@/components/MikTable.vue";
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();

const dialogFormVisible = ref(false);
const newFormVisible = ref(false);

const change = () => {
  newFormVisible.value = !newFormVisible.value;
};

const varilble = reactive({
  isshow: "true",
});

const form = reactive({
  id: "",
  username: "",
  mobile: "",
  enabled: "",
});

let data = {
  header: [
    {
      label: "用户编号",
      prop: "",
      width: 100,
    },
    {
      label: "用户名称",
      prop: "username",
      width: 100,
    },
    {
      label: "手机号码",
      prop: "mobile",
      width: 100,
    },
    {
      label: "用户状态",
      prop: "enabled",
      width: 100,
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 100,
    },
  ],
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
};

const tableData = reactive({
  total: 0,
  data: [],
});

const listUserPage = async (params) => {
  proxy
    .$axios({
      url: "/user/listUserPage",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    })
    .then((response) => {
      // console.log(response.data.data)
      tableData.data = response.data.data.data;
      tableData.total = response.data.data.total;
    });
};

const saveOrUpdateUser = async () => {
  proxy
    .$axios({
      url: "/user/saveOrUpdateUser",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      params: form,
    })
    .then((response) => {
      if (response.data.code === "200") {
        ElMessage({
          message: "创建成功",
          type: "success",
        });
      } else {
        ElMessage.error("创建失败");
      }
      dialogFormVisible.value = false;
      newFormVisible.value = false;
    });
};

const getUserById = async (item) => {
  dialogFormVisible.value = true;
  proxy
    .$axios({
      url: "/user/getUserById",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      params: { id: item.id },
    })
    .then((response) => {
      console.log(response.data.data);
      let user = response.data.data;
      form.id = user.id;
      form.username = user.username;
      form.mobile = user.mobile;
      form.enabled = user.enabled;
    });
};

const delUser = async (item) => {
  //   dialogFormVisible.value = true;
  proxy
    .$axios({
      url: "/user/deleteUser",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      params: { id: item.id },
    })
    .then((response) => {
      if (response.data.code === "200") {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        init()
      } else {
        ElMessage.error("删除失败");
      }
    });
};

const init = () => {
  listUserPage({
    username: null,
    status: null,
    startTime: null,
    endTime: null,
    pageNum: 1,
    pageSize: 10,
  });
  //   getUserById();
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>