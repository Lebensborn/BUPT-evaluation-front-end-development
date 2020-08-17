<template>
    <div id="instructorCement">
        <div id="header">
            <div class="hrefButton">
              <el-button type="text" @click="hrefReturnBackToInstructor">返回</el-button> |<el-button type="text" @click="hrefExit">退出</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button>
            </div>
        </div>
        <el-card id="body">
              <span id="title"><strong>指定打分</strong></span>
              <div id="button-group">
                <el-popconfirm
                  confirmButtonText='我确认无误'
                  cancelButtonText='我再确认一下'
                  icon="el-icon-info"
                  iconColor="red"
                  title="评分提交即无法更改，请确认无误后再提交"
                  @onConfirm = "submitForm"
                >
                  <el-button type="primary" slot="reference" disabled='is_able'>提交</el-button>
                </el-popconfirm>
              </div>
          <el-form :model="tableData" ref="tableData" label-width="100px" class="demo-ruleForm">
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
              prop="beJudgeInstructorId"
              label="学号"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="politicBelief"
              label="政治信念(20)"
              width="120px">
                <template scope="scope">
                  <el-input size="small" v-model.number="scope.row.politicBelief" placeholder="请打分"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="moralQuality"
              label="道德品质(15)"
              width="120px">
                <template scope="scope">
                  <el-input size="small" v-model.number="scope.row.moralQuality" placeholder="请打分"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="studyAttitude"
              label="学习态度(10)"
              width="120px">
                <template scope="scope">
                  <el-input size="small" v-model.number="scope.row.studyAttitude" placeholder="请打分"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="cultureQuality"
              label="文化素养(10)"
              width="120px">
                <template scope="scope">
                  <el-input size="small" v-model.number="scope.row.cultureQuality" placeholder="请打分"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="collectiveConception"
              label="集体观念(10)"
              width="120px">
                <template scope="scope">
                  <el-input size="small" v-model.number="scope.row.collectiveConception" placeholder="请打分"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="200px">
               <template scope="scope">
                  <el-input size="small" v-model="scope.row.remarks" placeholder="请输入内容"></el-input>
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
        is_able: false
      }
    },
    methods: {
        hrefReturnBackToInstructor()
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
        submitForm()
        {
          if (this.loading == true) return false; //防止重复点击
          this.$refs.tableData.validate(valid => {
              if (valid) {
              this.tableData.map(((item)=> {
                if(item.politicBelief + item.moralQuality + item.studyAttitude + item.cultureQuality + item.collectiveConception >= 55 && item.politicBelief <= 20 && item.moralQuality <= 15 && item.studyAttitude <= 10 && item.cultureQuality <= 10 && item.collectiveConception <= 10 && item.politicBelief >= 0 && item.moralQuality >= 0 && item.studyAttitude >= 0 && item.cultureQuality >= 0 && item.collectiveConception >= 0){
                    this.submit.push(Object.assign({},{judgeInstructorId: this.id, 
                                                      beJudgeInstructorId: item.beJudgeInstructorId, 
                                                      belongClass: item.belongClass, 
                                                      politicBelief: item.politicBelief, 
                                                      moralQuality: item.moralQuality, 
                                                      studyAttitude: item.studyAttitude, 
                                                      cultureQuality: item.cultureQuality,
                                                      collectiveConception: item.collectiveConception
                                                      }))                                     
                }
                else{
                  this.$message.error("打分不合理，请检查" + item.name + "的打分情况");
                  return false;
                }
              }))
              this.loading = true;
              this.$store
                  .dispatch("Submit", this.submit) //调用reset后返回了一个promise对象，后面的then是promise的方法
                  .then(response => {
                  this.loading = false;
                  let data = JSON.parse(response.data);
                  let state = data.success;
                  if (state == true) {
                      //this.$store.commit("LoginInfoLogin", response.data.info);
                      //this.$router.push("/instructor");
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
        }
    },
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "/basicQuality/assignJudgment",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true)
            console.log(data);
            that.tableData = data.assignJudgment;
            if(that.tableData == null){
              console.log("hhh")
              this.is_able = true;
            }
          })
          .catch(error => {
            reject(error);
          });
      });

      new Promise((resolve, reject) => {
        request({
          url: "/user/info/instructor",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true)
            that.id = data.personInfo.userId;
          })
          .catch(error => {
            reject(error);
          });
      });
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

