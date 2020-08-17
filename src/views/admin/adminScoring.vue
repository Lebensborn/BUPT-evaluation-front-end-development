<template>
    <div id="adminAllocateScores">
        <div id="header">
            <el-button type="text" @click="hrefReturnBackToAdmin">返回</el-button>
            |
            <el-button type="text" @click="hrefExit">退出</el-button>
            |
            <el-button type="text" @click="hrefBoard">公示公告</el-button>
        </div>
        <div id="body">
            
            <span>自评与互评</span>
            <el-button plain>保存</el-button>
            <el-button type="primary">提交</el-button>
            
          <el-table :data="tableData">
            <el-table-column
              prop="name"
              label="姓名"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="belongClass"
              label="班级"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="beJudgeAdminId"
              label="学号"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="politicBelief"
              label="政治信念(20)"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="moralQuality"
              label="道德品质(15)"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="studyAttitude"
              label="学习态度(10)"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="cultureQuality"
              label="文化素养(10)"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="200px">
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
        hrefReturnBackToAdmin()
        {
            this.$router.push({path: './admin'});
        },

        hrefExit()
        {
            this.$router.push({path: './'});
        },
        hrefBoard()
        {
            this.$router.push({path: './adminBoard'});
        },
        
    },
    created: function() {
      if (this.$store.state.user.is_login == false)
        setTimeout(() => {
          //未登陆的的原因可能是用户一开始就访问了需要登录的网址，还没来得及加载状态，所以一旦检测到没登陆，延时等待看是不是状态还没返回，延时后还未登录就说明真没登陆了
          if (this.$store.state.user.is_login == false) {
            this.$message.error("您还未登录呢，快去登陆吧");
            this.$router.push("/");
          }
        }, 1500);
    },
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "basicQuality/selfJudgment",
          method: "get"
        })
          .then(response => {
            /*let state = response.data.success;
            if (state == true)*/
              console.log(response.data);
              that.tableData = response.data.selfJudgment;
          })
          .catch(error => {
            reject(error);
          });
      });
    }
}

</script>

<style scoped>
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
    top: 94px;
}
</style>

