<template>
  <div>
    <el-container direction="vertical">
      <el-header id="header" height="100px">
        <div id="exit">
          <el-button type="text" @click="hrefExit">退出登录</el-button>
        </div>
      </el-header>

      <el-aside id="aside-left" width="150px">
        <router-link to="./instructorPersonalInformation">
          <div id="information">
          辅导员姓名<br/>
          账号<br/>
          专业<br/>
          邮箱<br/>
          </div>
        </router-link>
      </el-aside>

      <el-main id="body">
        功能权限
        <el-row>
          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3157318169,94160677&fm=26&gp=0.jpg" class="image">
              <div style="padding: 14px;">
                <span>测评信息审核</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorEvaluationExamination">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597218103407&di=3da659362ff0a041f3f8f6dafe11590e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F51%2F03573d02a6116e6.jpg" class="image">
              <div style="padding: 14px;">
                <span>转移下放权限</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorTransferDelegateAuthority">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597218155302&di=98b569f407b98faa949341e0cf3572f6&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F51%2F69%2F415745c99f14518.jpg" class="image">
              <div style="padding: 14px;">
                <span>发布公告公示</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorBoardApply">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597218252315&di=af7f858f65fdfa3b4e67e37fefcd185d&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F47%2F295743ef47b56e7.jpg" class="image">
              <div style="padding: 14px;">
                <span>公告申请审核</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorBoardExamination">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        基本素质评价
        <el-row>
          <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597218296219&di=92c6bc78f34da58c18867107e4003c63&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F78%2F581091538f7a5_610.jpg" class="image">
              <div style="padding: 14px;">
                <span>指定给分</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorScoring">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

           <el-col :span="8" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2962166990,353693425&fm=26&gp=0.jpg" class="image">
              <div style="padding: 14px;">
                <span>班委评分</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button" @click="hrefInstructorClassCommitteeScoring">点击跳转</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer id="footer" height="150px">

      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
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

    hrefInstructorEvaluationExamination()
    {
      this.$router.push({path:'./instructorEvaluationExamination'});
    },

    hrefInstructorBoardApply()
    {
      this.$router.push({path:'./instructorBoardApply'});
    },

    hrefInstructorTransferDelegateAuthority()
    {
      this.$router.push({path:'./instructorTransferDelegateAuthority'});
    },

    hrefInstructorBoardExamination()
    {
      this.$router.push({path:'./instructorBoardExamination'});
    },

    hrefInstructorScoring()
    {
      this.$router.push({path:'./instructorScoring'});
    },

    hrefInstructorClassCommitteeScoring()
    {
      this.$router.push({path:'./instructorClassCommitteeScoring'});
    },
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
    text-align: center;
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

#hrefInstructorBoardApply {
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
  background: url("../assets/北邮logo.png") no-repeat;
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