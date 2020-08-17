<template>
  <el-container>
    <el-header>
      <div id="header">
        <div class="hrefButton">
          <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefExit">退出</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-card id="body">
        <el-backtop></el-backtop>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="转移审核测评权限" name="first">转移审核测评权限</el-tab-pane>
          <el-tab-pane label="审核状态" name="second">审核状态</el-tab-pane>
          <el-tab-pane label="转移打分权限" name="third">转移打分权限</el-tab-pane>
          <el-tab-pane label="打分状态" name="fourth">
            <div style="margin:0 auto; text-align:center">
              <el-table
                id="stateTable"
                :data="tableData"
                style="width: 100% margin: auto"
                :default-sort = "{prop: 'userId', order: 'ascending'}"
                stripe
                >
                <el-table-column
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="classId"
                  label="班级"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="学号"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="duty"
                  label="职务"
                  sortable
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="activity"
                  label="打分项"
                  sortable
                  width="120"
                  :formatter="formatterActivity"
                  :filters="[{ text: '指定给分', value: '指定给分' }, { text: '班委评分', value: '班委评分' }, { text: '自评互评', value: '自评互评' }]"
                  :filter-method="filterActivity">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="打分状态"
                  sortable
                  width="120"
                  :formatter="formatterState"
                  :filters="[{ text: '完成', value: true }, { text: '尚未完成', value: false }]"
                  :filter-method="filterState">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
    data() {
      return {
        tableData: [],
        submit: [],
        id: null
      }
    },
    methods: {
        filterState(value, row) {
          return row.state == value;
        },

        filterActivity(value, row) {
          return row.activity == value;
        },

        formatterState(row) {
          return (row.state ? "完成" : "尚未完成");
        },

        formatterActivity(row) {
          return row.activity;
        },

        hrefReturn()
        {
            this.$router.push({path: './instructor'});
        },
        hrefExit()
        {
            this.$router.push({path: './'});
        },
        hrefBoard()
        {
            this.$router.push({path: './instructorBoard'});
        },
    },
    created: function() {
      if (this.$store.state.user.is_login == false)
        setTimeout(() => {
          //未登录的的原因可能是用户一开始就访问了需要登录的网址，还没来得及加载状态，所以一旦检测到没登录，延时等待看是不是状态还没返回，延时后还未登录就说明真没登录了
          if (this.$store.state.user.is_login == false) {
            this.$message.error("您还未登录呢，快去登录吧");
            this.$router.push("/");
          }
        }, 1500);
    },
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "/instructor/markState?type=selfJudgment",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true) {
              console.log(data);
              that.tableData = data.state;
            }
          })
          .catch(error => {
            reject(error);
          });
      });

      // new Promise((resolve, reject) => {
      //   request({
      //     url: "/user/info/instructor",
      //     method: "get"
      //   })
      //     .then(response => {
      //       let data = JSON.parse(response.data);
      //       let state = data.success;
      //       if (state == true)
      //       that.id = data.personInfo.userId;
      //     })
      //     .catch(error => {
      //       reject(error);
      //     });
      // });
    }
}

</script>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}

#button-group {
  position: absolute;
  right: 30px;
  top: 20px;
}

#title {
  color: gray;
  font-size: 20px;
}

.hrefButton {
    position: absolute;
    right: 10px;
    bottom: 0px;
}

#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

#body {
    position: absolute;
    top: 130px;
    left: 15%;
    right: 15%;
}
</style>

