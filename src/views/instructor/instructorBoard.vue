<template>
   <div>
    <div id="header">
        <div id="button-group">
          <el-button type="text" @click="hrefReturnBackToInstructor">返回</el-button> |<el-button type="text" @click="hrefApplyBoard">发布公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登陆</el-button>
        </div>
    </div>
    <el-card id="main-only" shadow="always">
        <h2>公示公告</h2>
        <hr>
        <el-main id="Content-only" shadow="never">
          <div v-html="numberValidateForm[index].content"></div> 
        </el-main>
        <el-main id="title-only" shadow="never">
          <div id="title-title">
            <center>
            <span id="board-last">最近公告</span>
            </center>
          </div>
          <div id="title-content">

          </div>
          <el-button v-for="(item, i) in numberValidateForm" :key="item" @click="changeBoard(i)" type="text">
            {{ item.title }}
          </el-button>
        </el-main>
        <el-main id="bottom-only" shadow="never">
          <div id="title-file">
            <center>
            <span id="board-last-fujian">附件</span>
            </center>
          </div>
          <div id="title-content">
          
          </div>
          <el-button v-for="item in numberValidateForm[index].file" :key="item" type="text">
            {{ item.fileUrl }}
          </el-button>
        </el-main>
    </el-card>
   </div>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数

export default {
    data() {
      return {
        numberValidateForm: [],
        index: 0,
      }
    },
    methods:{
      changeBoard(i){
        this.index = i;
      },
      hrefReturnBackToInstructor()
      {
          this.$router.push({path: './instructor'});
      },
      hrefExit()
      {
          this.$router.push({path: './'});
      },
      hrefApplyBoard()
      {
          this.$router.push({path: './instructorBoardApply'});
      },
    },
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "/notification?disqualify=false",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true)
              console.log(data);
              that.numberValidateForm = data.notification;
              this.is_get = true;
          })
          .catch(error => {
            reject(error);
          });
      });  
    }
}
</script>

<style scoped>
#board-last-fujian {
  position: absolute;
  top: 10px;
  left: 50px;
}

#title-content {
  height: 50px;
}

#board-last {
  position: absolute;
  top: 10px;
  left: 35px;
}

#title-title {
  position: absolute;
  border-radius: 0px;
  border: 1px rgb(202, 202, 202) solid;
  width: 130px;
  height: 40px;
  left: auto;
  right: auto;
}

#title-file {
  position: absolute;
  border-radius: 0px;
  border: 1px rgb(202, 202, 202) solid;
  width: 130px;
  height: 40px;
  left: auto;
  right: auto;
}

#bottom-only {
  position: absolute;
  top: 610px;
  left: 2.5%;
  right: 2.5%;
  bottom: 2.5%;
  border-radius: 0px;
  
}

#main-only {
  position: absolute;
  top: 130px;
  left:5%;
  right: 5%;
  height: 820px;
  border-radius: 0px;
  
}

#Content-only {
  position: absolute;
  left: 2.5%;
  right: 36%;
  height: 500px;
  border-radius: 0px;
  
}

#title-only {
  position: absolute;
  left: 65%;
  right: 2.5%;
  height: 500px;
  border-radius: 0px;
  
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

#button-group {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>