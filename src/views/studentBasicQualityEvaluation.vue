<template>
  <div>
    <el-container direction="vertical">
      <el-header id="header" height="100px">
        <div id="information">
          <span>学生姓名：</span>
          <span>学号：</span>
        </div>
        <div id="exit">
          <el-button type="text" @click="herfExit">退出登录</el-button>
        </div>
      </el-header>

      <el-aside id="aside-left" width="150px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" router=true>
          <el-menu-item index="./studentBasicQualityEvaluation" >
            <!--
            <i class="el-icon-menu"></i>
            -->
            <span slot="title">基本素质评价</span>
          </el-menu-item>
          <el-menu-item index="./studentDevelopmentEvaluation">
            <!--
            <i class="el-icon-document"></i>
            -->
            <span slot="title">发展评价</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main id="body">
        <el-row>
          <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>自评与互评</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="herfStudentCement">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-aside id="aside-right" width="300px">
        <router-link to="./studentBoard" id="board">
          
        </router-link>
        <el-button @click="hrefStudentBoardApply" id="hrefStudentBoardApply">申请公告公示</el-button>
      </el-aside>

      <el-footer id="footer" height="150px">

      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      this.$router.push({path:'./login'});
    },

    hrefStudentBoardApply()
    {
      this.$router.push({path:'./studentBoardApply'});
    },

    herfStudentCement()
    {
      this.$router.push({path:'./studentCement'});
    }
  }
};
</script>

<style>
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
  right: 100px;
  top: 40px;
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
}

#hrefStudentBoardApply {
  position: absolute;
  right: 80px;
  top: 450px;  
}
</style>

<style scope>
#header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

#body {
  position: absolute;
  left: 150px;
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