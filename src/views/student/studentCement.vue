<template>
  <div id="studentCement">
    <div id="header">
      <div class="hrefButton">
        <el-button type="text" @click="hrefReturnBackToStudent">返回</el-button>
        |<el-button type="text" @click="hrefExit">退出</el-button> |<el-button
          type="text"
          @click="hrefBoard"
          >公示公告</el-button
        >
      </div>
    </div>
    <el-card id="body">

      <div id="card-head">
        <span id="title"><strong>自评与互评</strong></span>
        <div id="button-group">
          <el-button plain @click="saveCement" id="save">保存</el-button>

          <el-popconfirm
            confirmButtonText="我确认无误"
            cancelButtonText="我再确认一下"
            icon="el-icon-info"
            iconColor="red"
            title="评分提交即无法更改，请确认无误后再提交"
            @onConfirm="submitForm"
          >
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </div>
      <el-form
        :model="tableData"
        ref="tableData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-table :data="tableData">
          <el-table-column prop="name" label="姓名" width="120px">
          </el-table-column>
          <el-table-column prop="belongClass" label="班级" width="120px">
          </el-table-column>
          <el-table-column prop="beJudgeStudentId" label="学号" width="120px">
          </el-table-column>
          <el-table-column
            prop="politicBelief"
            label="政治信念(20)"
            width="120px"
          >
            <template scope="scope">
              <el-input
                size="small"
                v-model.number="scope.row.politicBelief"
                placeholder="请打分"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="moralQuality"
            label="道德品质(15)"
            width="120px"
          >
            <template scope="scope">
              <el-input
                size="small"
                v-model.number="scope.row.moralQuality"
                placeholder="请打分"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="studyAttitude"
            label="学习态度(10)"
            width="120px"
          >
            <template scope="scope">
              <el-input
                size="small"
                v-model.number="scope.row.studyAttitude"
                placeholder="请打分"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="cultureQuality"
            label="文化素养(10)"
            width="120px"
          >
            <template scope="scope">
              <el-input
                size="small"
                v-model.number="scope.row.cultureQuality"
                placeholder="请打分"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="collectiveConception"
            label="集体观念(10)"
            width="120px"
          >
            <template scope="scope">
              <el-input
                size="small"
                v-model.number="scope.row.collectiveConception"
                placeholder="请打分"
              ></el-input>
            </template>
          </el-table-column>
         
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
  data() {
    return {
      tableData: [],
      submit: [],
      id: null,
    };
  },
  methods: {
    hrefReturnBackToStudent() {
      this.$router.push({ path: "./student" });
    },

    hrefExit() {
      this.$cookies.remove('uuid');
      this.$router.push({ path: "./" });
    },
    hrefBoard() {
      this.$router.push({ path: "./studentBoard" });
    },
    saveCement() {
      var table_valid = true; ///////////////////////////////////////////////////自评互评表的有效性
      if (this.loading == true) return false; //防止重复点击
      this.$refs.tableData.validate((valid) => {
        if (valid) {
          this.tableData.map((item) => {
            if (!table_valid) return; /////////////////////////////////只提示第一个错误的人，一排提示不好看
            if (
              item.politicBelief +
                item.moralQuality +
                item.studyAttitude +
                item.cultureQuality +
                item.collectiveConception >=
                55 &&
              item.politicBelief <= 20 &&
              item.moralQuality <= 15 &&
              item.studyAttitude <= 10 &&
              item.cultureQuality <= 10 &&
              item.collectiveConception <= 10 &&
              item.politicBelief >= 0 &&
              item.moralQuality >= 0 &&
              item.studyAttitude >= 0 &&
              item.cultureQuality >= 0 &&
              item.collectiveConception >= 0
            ) {
              this.submit.push(
                Object.assign(
                  {},
                  {
                    judgeStudentId: this.id,
                    beJudgeStudentId: item.beJudgeStudentId,
                    belongClass: item.belongClass,
                    politicBelief: item.politicBelief,
                    moralQuality: item.moralQuality,
                    studyAttitude: item.studyAttitude,
                    cultureQuality: item.cultureQuality,
                    collectiveConception: item.collectiveConception,
                  }
                )
              );
            } else {
              this.$message.error(
                "打分不合理，请检查" + item.name + "的打分情况"
              );
              table_valid = false; //设置该打分检查有误
              return false;
            }
          });
          if (!table_valid) return; /////////////////////////////////////////检查出表有错直接返回
          this.loading = true;
          this.$store
            .dispatch("saveCement", this.submit) //调用reset后返回了一个promise对象，后面的then是promise的方法
            .then((response) => {
              this.loading = false;
              let data = JSON.parse(response.data);
              let state = data.success;
              if (state == true) {
                //this.$store.commit("LoginInfoLogin", response.data.info);
                //this.$router.push("/student");
                this.$message.success("保存成功！");
                var arr = document.cookie.split("=");
                this.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/");
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数不合法！");
          return false;
        }
      });
      this.submit = [];/////////////////////////////////////////////////////////清空原来上交的数据
    },
    submitForm() {
      var table_valid = true; ///////////////////////////////////////////////////自评互评表的有效性
      if (this.loading == true) return false; //防止重复点击
      this.$refs.tableData.validate((valid) => {
        if (valid) {
          this.tableData.map((item) => {
            if (!table_valid) return; /////////////////////////////////只提示第一个错误的人，一排提示不好看
            if (
              item.politicBelief +
                item.moralQuality +
                item.studyAttitude +
                item.cultureQuality +
                item.collectiveConception >=
                55 &&
              item.politicBelief <= 20 &&
              item.moralQuality <= 15 &&
              item.studyAttitude <= 10 &&
              item.cultureQuality <= 10 &&
              item.collectiveConception <= 10 &&
              item.politicBelief >= 0 &&
              item.moralQuality >= 0 &&
              item.studyAttitude >= 0 &&
              item.cultureQuality >= 0 &&
              item.collectiveConception >= 0
            ) {
              this.submit.push(
                Object.assign(
                  {},
                  {
                    judgeStudentId: this.id,
                    beJudgeStudentId: item.beJudgeStudentId,
                    belongClass: item.belongClass,
                    politicBelief: item.politicBelief,
                    moralQuality: item.moralQuality,
                    studyAttitude: item.studyAttitude,
                    cultureQuality: item.cultureQuality,
                    collectiveConception: item.collectiveConception,
                  }
                )
              );
            } else {
              this.$message.error(
                "打分不合理，请检查" + item.name + "的打分情况"
              );
              table_valid = false; //设置该打分检查有误
              return false;
            }
          });
          if (!table_valid) return; /////////////////////////////////////////检查出表有错直接返回
          this.loading = true;
          this.$store
            .dispatch("Submit", this.submit) //调用reset后返回了一个promise对象，后面的then是promise的方法
            .then((response) => {
              this.loading = false;
              let data = JSON.parse(response.data);
              let state = data.success;
              if (state == true) {
                //this.$store.commit("LoginInfoLogin", response.data.info);
                //this.$router.push("/student");
                this.$message.success("提交成功！");
                var arr = document.cookie.split("=");
                this.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/");
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数不合法！");
          return false;
        }
      });
      this.submit = [];/////////////////////////////////////////////////////////清空原来上交的数据
    },
  },
  created: function() {
    if(this.$cookies.get("uuid") == null){
      this.$message.error("您还未登陆呢，快去登陆吧");
      this.$router.push("/");
    }
  },
  mounted: function() {
    var that = this;
    new Promise((resolve, reject) => {
      request({
        url: "/basicQuality/selfJudgment",
        method: "get",
      })
        .then((response) => {
          let data = JSON.parse(response.data);
          let state = data.success;
          if (state == true) console.log(data);
          that.tableData = data.selfJudgment.table;
        })
        .catch((error) => {
          reject(error);
        });
    });

    new Promise((resolve, reject) => {
      request({
        url: "/user/info/student",
        method: "get",
      })
        .then((response) => {
          let data = JSON.parse(response.data);
          let state = data.success;
          if (state == true) that.id = data.personInfo.userId;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
</script>

<style scoped>
#save {
  margin-right: 20px;
}
.demo-ruleForm {
  margin-top: 30px;
}

#button-group {
  margin-left: 770px;
  display: inline-block;
}

#title {
  color: gray;
  font-size: 20px;
  display: inline-block;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#body {
  margin-top: 130px;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
