<template>
   <div>
    <div id="header">
        <div id="button-group">
          <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefApplyBoard">发布公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登录</el-button>
        </div>
    </div>
    <el-card id="main-only" shadow="always">
        <el-page-header @back="hrefReturn" content="公告公示">
        </el-page-header>

        <el-container>
          <div class="mainbox pull-left">
            <h1 class="text-center">
              {{ numberValidateForm[index].title}}
            </h1>
            <div v-html="numberValidateForm[index].content"></div>

            <div class="accessory">
              <b>附件:</b>
              <ul>
                <li v-for="item in numberValidateForm[index].file" :key="item">
                  <i class="el-icon-download"></i>
                  <a target="_blank" :href="item.fileUrl" :download="item.fileName">
                    <span>{{item.fileName}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="sidebox">
            <h3>最近公告</h3>
            <hr>
            <ul id="list-recent">
              <li v-for="(item, i) in numberValidateForm" :key="item">
                <div>
                  <el-link @click="changeBoard(i)">
                    <i class="el-icon-news"></i>
                    {{ item.title }}
                  </el-link>
                </div>
              </li>
            </ul>
          </div>
        </el-container>
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
      hrefReturn()
      {
          this.$router.push({path: './admin'});
      },
      hrefExit()
      {
          this.$router.push({path: './'});
      },
      hrefApplyBoard()
      {
          this.$router.push({path: './adminBoardApply'});
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
.mainbox {
  width: 60%;
  margin: 30px;
  margin-right: 80px;
}

.sidebox {
  width: 30%;
  overFlow-x: hidden;
  word-break: break-all;
}

.text-center {
    text-align: center;
}

.accessory {
    margin: 10px auto;
    margin-top: 30px;
}

.accessory ul {
    padding: 10px;
    border: 1px solid #ccc;
    background: #fcfcfc;
    list-style: none;
}

.accessory ul li a {
    color: #00f;
    padding: 10px 10px;
    font-size: 15pt;
    margin-bottom: 10px;
}

#list-recent {
  padding-left: 0;
  list-style: none;
  font-size: 15pt;
}

#list-recent li {
  border-bottom: 1px dashed #e9eaeb;
  padding: 10px;
}


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
  border: 1px rgb(202, 202, 202) solid;
  width: 130px;
  height: 40px;
  left: auto;
  right: auto;
}

#title-file {
  position: absolute;
  border: 1px rgb(202, 202, 202) solid;
  width: 130px;
  height: 40px;
  left: auto;
  right: auto;
}

#bottom-only {
  position: absolute;
  /* top: 610px; */
  left: 2.5%;
  right: 2.5%;
  bottom: 2.5%;
}

#main-only {
  position: absolute;
  top: 130px;
  left:5%;
  right: 5%;
  /* height: ; */
}

/* #content {
  position: absolute;
  left: 2.5%;
  right: 36%;
  height: 500px;
  border-radius: 0px;
  
} */



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