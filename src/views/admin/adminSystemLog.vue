<template>
    <div id="adminClassCommitteeScoring">
        <div id="header">
            <div class="hrefButton">
              <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefExit">退出</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button>
            </div>
        </div>

        <el-card id="body">
          <el-button @click="output" type="primary">下载日志</el-button>
          <el-input v-model="userId" placeholder="请输入要查找用户的用户名"></el-input>
          <el-button @click="checkInfo">查询</el-button>
            <el-table :data="tableData" id="stateTable">
            <el-table-column prop="id" label="数据库里记录的id（可忽略）" width="120px">
            </el-table-column>
            <el-table-column prop="userId" label="操作发起者的用户名" width="120px">
            </el-table-column>
            <el-table-column prop="ipAddress" label="操作发起者的ip地址" width="120px">
            </el-table-column>
            <el-table-column
              prop="method"
              label="用户发起该操作使用的http方法"
              width="120px"
            >
            </el-table-column>
            <el-table-column
              prop="url"
              label="用户发起该操作请求的url"
              width="120px"
            >
            </el-table-column>
            <el-table-column
              prop="time"
              label="用户进行该操作的时间"
              width="120px"
            >
            </el-table-column>         
          </el-table>
        </el-card>
    </div>
</template>

<script>

import request from "@/utils/request"; //打了大括号后显示找不到request函数
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
    data() {
      return {
        tableData: [],
        submit: [],
        userId: null,
      }
    },
    created: function() {
        if(this.$cookies.get("uuid") == null){
        this.$message.error("您还未登陆呢，快去登陆吧");
        this.$router.push("/");
        }
    },
    methods: {
        checkInfo(){
          var that = this;
          console.log("/log?user="+this.userId)
          new Promise((resolve, reject) => {
            request({
              url: "/log?user="+this.userId,
              method: "get"
            })
              .then(response => {
                let data = JSON.parse(response.data);
                let state = data.success;
                if (state == true)
                console.log(data);
                that.tableData = data.record;
              })
              .catch(error => {
                reject(error);
              });
          });
        },
        output() {
          var wb = XLSX.utils.table_to_book(document.querySelector("#stateTable"));//mytable为表格的id名
          /* get binary string as output */
          var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array"
          });
          try {
            FileSaver.saveAs(
              new Blob([wbout], { type: "application/octet-stream" }),
              "systemLog.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        },
        hrefReturn()
        {
            this.$router.push({path: './admin'});
        },
        hrefExit()
        {
          this.$cookies.remove('uuid');
            this.$router.push({path: './'});
        },
        hrefBoard()
        {
            this.$router.push({path: './adminBoard'});
        },
        submitForm()
        {
          if (this.loading == true) return false; //防止重复点击
          this.$refs.tableData.validate(valid => {
              if (valid) {
              this.tableData.map(((item)=> {
                if(item.politicBelief + item.moralQuality + item.studyAttitude + item.cultureQuality + item.collectiveConception >= 55 && item.politicBelief <= 20 && item.moralQuality <= 15 && item.studyAttitude <= 10 && item.cultureQuality <= 10 && item.collectiveConception <= 10 && item.politicBelief >= 0 && item.moralQuality >= 0 && item.studyAttitude >= 0 && item.cultureQuality >= 0 && item.collectiveConception >= 0){
                    this.submit.push(Object.assign({},{judgeStudentId: this.id, 
                                                      beJudgeStudentId: item.beJudgeStudentId, 
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
                      //this.$router.push("/admin");
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

