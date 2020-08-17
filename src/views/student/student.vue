<template>
  <div>
    <el-container direction="vertical">
      <el-header id="header" height="100px">
        <div id="exit">
          <el-button type="text" @click="herfExit">退出登录</el-button>
        </div>
      </el-header>

      <el-aside id="aside-left" width="170px">
        <router-link to="./studentPersonalInformation">
          <div id="information">
            <center>
            <h1>学生姓名</h1>
            <span v-show="is_get">{{ numberValidateForm.name }}</span><br>
            <h3>学号</h3>
            <span v-show="is_get">{{ numberValidateForm.userId }}</span><br>
            <h3>职务</h3>
            <span v-show="is_get">{{ numberValidateForm.duty }}</span><br>
            <h3>邮箱</h3>
            <span v-show="is_get">{{ numberValidateForm.email }}</span><br>
            </center>
          </div>
        </router-link>
      </el-aside>

      <el-main id="body">
        <h3 class="title-board">基本素质评价</h3>
        <el-row>
          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="option-card">
              <img src="../../assets/自评与互评.png" class="image">
              <div style="padding: 14px;">
                <span>自评与互评</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="hrefStudentCement">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <!--
          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="option-card">
              <img src="../../assets/指定打分.png" class="image">
              <div style="padding: 14px;">
                <span>指定给分</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="hrefAssignCement">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="option-card">
              <img src="../../assets/班委评分.png" class="image">
              <div style="padding: 14px;">
                <span>班委给分</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="hrefClassCommitteeCement">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <h3 class="title-board">发展评价</h3>
        <el-row>
          <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="option-card">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <h3 class="title-board">特殊功能权限</h3>
        <el-row>
          <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="option-card">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>测评信息审核</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          -->
        </el-row>
      </el-main>

      <el-aside id="aside-right" width="300px">
        <router-link to="./studentBoard" id="board-router">
          <el-card id="board" shadow="never">
            <div v-html="item.title" v-for="item in board" :key=item id="board-title"></div>
          </el-card>
        </router-link>
        <el-button @click="hrefStudentBoardApply" id="hrefStudentBoardApply">申请公告公示</el-button>
        <p id="email">举报邮箱：123456789@asd.com</p>
      </el-aside>

      <el-footer id="footer" height="150px">

      </el-footer>
    </el-container>
  </div>
</template>
<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
  data() {
    return {
      currentDate: new Date(),
      is_get: false,
      numberValidateForm: {
        name: null,
        userId: null,
        email: null
      },
      board: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    herfExit()
    {
      this.$router.push({path:'./'});
    },

    hrefStudentBoardApply()
    {
      this.$router.push({path:'./studentBoardApply'});
    },

    hrefStudentCement()
    {
      this.$router.push({path:'./studentCement'});
    },
    hrefAssignCement(){
      this.$router.push({path:'./assignCement'});
    },
    hrefClassCommitteeCement(){
      this.$router.push({path:'./classCommitteeCement'});
    }
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
        url: "/user/info/student",
        method: "get"
      })
        .then(response => {
          let data = JSON.parse(response.data);
          let state = data.success;
          if (state == true)
            console.log(data);
            that.numberValidateForm = data.personInfo;
            this.is_get = true;
        })
        .catch(error => {
          reject(error);
        });
    });

    //var that = this;
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
            that.board = data.notification;
            this.is_get = true;
        })
        .catch(error => {
          reject(error);
        });
    });  
  }
};
</script>

<style scoped>
#board-title {
  color: gray;
}

.option-card {
  height: 300px;
  width: 230px;
}

.title-board {
  color: gray;
}

#email {
  position: absolute;
  right: 25px;
  top: 500px;
  color: gray;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

#information {
  position: absolute;
  top: 40px;
  color: gray;
  left: 10%;
  right: 10%;
}

#exit {
  position: absolute;
  right: 5px;
  bottom: 0px;
}

#board {
  position: absolute;
  right: 0px;
  top: 0px;
  left: 0px;
  height: 400px;
  border: 1px solid #000000;
  text-decoration:none;
  border-radius: 0px;
  font-size: 18px;
}

#board-router {
  position: absolute;
  right: 0px;
  top: 0px;
  left: 0px;
  height: 400px;
  text-decoration:none;
}

#hrefStudentBoardApply {
  position: absolute;
  right: 80px;
  top: 450px;  
}

#header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

#body {
  position: absolute;
  left: 170px;
  right: 300px;
  top: 100px;
  bottom: 150px; 
  background-color: #f2f2f2;
}

#aside-left {
  position: absolute;
  left: 0px;
  top: 100px;
  bottom: 150px;
  border: 1px solid;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
}

#aside-right {
  position: absolute;
  right: 0px;
  top: 100px;
  bottom: 150px;
}

#footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>