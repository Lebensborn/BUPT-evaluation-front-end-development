<template>
  <div id="adminBoardApply">
    <!--头部logo-->
    <div id="header">
        <div class="hrefButton">
            <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登录</el-button>
        </div>
    </div>

    <!--主体部分-->
    <div id="body">
        <el-card id="main">
        <h3>发起活动类型</h3>
        <el-row>
          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" >
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>指定给分</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefAdminCement">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" >
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>自评与互评</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" >
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 14px;">
                <span>班委评分</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row> 
      </el-card>
    </div>
    <!--页脚部分留白--> 
    <div id="footer">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  created: function() {
        if(this.$cookies.get("uuid") == null){
        this.$message.error("您还未登陆呢，快去登陆吧");
        this.$router.push("/");
        }
    },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    hrefExit()
    {
      this.$router.push({path:'./'});
    },

    hrefReturn()
    {
        this.$router.push({path: './admin'});
    },

    hrefAdminBoardApply()
    {
      this.$router.push({path:'./adminBoardApply'});
    },

    hrefAdminCement()
    {
      this.$router.push({path:'./adminCement'});
    },
  }
};
</script>
 
<style scoped>
#title {
    margin-top: 30px;
}

#upload {
    margin-top: 100px;
}

#main, #body {
    position: absolute;
    top: 50px;
    left: 5%;
    right: 5%;
}
.hrefButton {
    position: absolute;
    right: 10px;
    bottom: 0px;
}

#body {
    position: absolute;
    top: 94px; 
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
</style>