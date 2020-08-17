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
        <span id="title"><strong>打分情况处理</strong></span>
        <div id="button-group">
          <el-button @click="output" type="primary">导出</el-button>
        </div>
        <div>
          <el-table
            id="stateTable"
            :data="tableData"
            style="width: 100% margin: auto"
            :default-sort = "{prop: 'studentId', order: 'ascending'}"
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
              width="100"
              :filters="[{ text: '2019211301', value: '2019211301' },
                        { text: '2019211302', value: '2019211302' }, 
                        { text: '2019211303', value: '2019211303' }, 
                        { text: '2019211304', value: '2019211304' }, 
                        { text: '2019211305', value: '2019211305' }, 
                        { text: '2019211306', value: '2019211306' },
                        { text: '2019211307', value: '2019211307' }, 
                        { text: '2019211308', value: '2019211308' }, 
                        { text: '2019211309', value: '2019211309' }, 
                        { text: '2019211310', value: '2019211310' }, 
                        { text: '2019211311', value: '2019211311' }, 
                        { text: '2019211312', value: '2019211312' }, 
                        { text: '2019211313', value: '2019211313' },
                        { text: '2019211314', value: '2019211314' },
                        { text: '2019211315', value: '2019211315' },
                        { text: '2019211316', value: '2019211316' },
                        { text: '2019211317', value: '2019211317' },
                        { text: '2019211318', value: '2019211318' },
                        { text: '2019211319', value: '2019211319' }]"
              :filter-method="filterClassId">
            </el-table-column>
            <el-table-column
              prop="studentId"
              label="学号"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="80">
            </el-table-column>
            <el-table-column
              prop="politicBelief"
              label="政治信念"
              sortable
              width="110"
              :formatter="formatterPoliticBelief">
            </el-table-column>
            <el-table-column
              prop="moralQuality"
              label="道德素养"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="studyAttitude"
              label="学习态度"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="cultureQuality"
              label="文化素养"
              sortable
              width="110">
            </el-table-column>
            <el-table-column
              prop="collectiveConception"
              label="集体观念"
              sortable
              width="110">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
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
      filterClassId(value, row) {
        return row.classId == value;
      },
      formatterPoliticBelief(row) {
        return row.politicBelief;
      },
      formatterState(row) {
        return (row.state ? "完成" : "尚未完成");
      },
      formatterActivity(row) {
        return row.activity;
      },
      hrefReturn() {
          this.$router.push({path: './admin'});
      },
      hrefExit() {
          this.$router.push({path: './'});
      },
      hrefBoard() {
          this.$router.push({path: './adminBoard'});
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
            "scoringStatus.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
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
          url: "/admin/selfJudgment",
          method: "get",
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true) {
              console.log(data);
              that.tableData = data.selfJudgment;
            }
          })
          .catch(error => {
            reject(error);
          });
      });

      // new Promise((resolve, reject) => {
      //   request({
      //     url: "/user/info/admin",
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
  /* position: absolute; */
  /* right: 30px; */
  margin-top: 20px;
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

