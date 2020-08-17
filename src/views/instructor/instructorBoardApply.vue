<template>
  <div id="instructorBoardApply">
    <!--头部logo-->
    <div id="header">
        <div class="hrefButton">
            <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登陆</el-button>
        </div>
    </div>

    <!--主体部分-->
    <div id="body">
        <el-card id="main">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题" id="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="公告类型">
                    <el-select v-model="form.class" placeholder="请选择公告类型">
                    <el-option label="通知" value="通知"></el-option>
                    <el-option label="公示" value="公示"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="顶置">
                    <el-switch v-model="form.top"></el-switch>
                </el-form-item>

                <el-form-item label="发布范围">
                    <el-select v-model="form.range" placeholder="请选择发布范围">
                    <el-option label="计算机学院19级" value="计算机学院19级"></el-option>
                    <el-option label="一大班" value="一大班"></el-option>
                    <el-option label="二大班" value="二大班"></el-option>
                    <el-option label="三大班" value="三大班"></el-option>
                    <el-option label="2019211301" value="2019211301"></el-option>
                    <el-option label="2019211302" value="2019211302"></el-option>
                    <el-option label="2019211303" value="2019211303"></el-option>
                    <el-option label="2019211304" value="2019211304"></el-option>
                    <el-option label="2019211305" value="2019211305"></el-option>
                    <el-option label="2019211306" value="2019211306"></el-option>
                    <el-option label="2019211307" value="2019211307"></el-option>
                    <el-option label="2019211308" value="2019211308"></el-option>
                    <el-option label="2019211309" value="2019211309"></el-option>
                    <el-option label="2019211310" value="2019211310"></el-option>
                    <el-option label="2019211311" value="2019211311"></el-option>
                    <el-option label="2019211312" value="2019211312"></el-option>
                    <el-option label="2019211313" value="2019211313"></el-option>
                    <el-option label="2019211314" value="2019211314"></el-option>
                    <el-option label="2019211315" value="2019211315"></el-option>
                    <el-option label="2019211316" value="2019211316"></el-option>
                    <el-option label="2019211317" value="2019211317"></el-option>
                    <el-option label="2019211318" value="2019211318"></el-option>
                    <el-option label="2019211319" value="2019211319"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="活动时间">
                    <el-date-picker
                    v-model="form.value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="摘要">
                    <el-input type="textarea" v-model="form.abstract"></el-input>
                </el-form-item>

                <el-form-item label="正文">
                    <quill-editor v-model="form.content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                    <!-- 自定义toolar -->
                    <div id="toolbar" slot="toolbar">
                    <!-- Add a bold button -->
                    <button class="ql-bold" title="加粗">Bold</button>
                    <button class="ql-italic" title="斜体">Italic</button>
                    <button class="ql-underline" title="下划线">underline</button>
                    <button class="ql-strike" title="删除线">strike</button>
                    <button class="ql-blockquote" title="引用"></button>
                    <button class="ql-code-block" title="代码"></button>
                    <button class="ql-header" value="1" title="标题1"></button>
                    <button class="ql-header" value="2" title="标题2"></button>
                    <!--Add list -->
                    <button class="ql-list" value="ordered" title="有序列表"></button>
                    <button class="ql-list" value="bullet" title="无序列表"></button>
                    <!-- Add font size dropdown -->
                    <select class="ql-header" title="段落格式">
                    <option selected>段落</option>
                    <option value="1">标题1</option>
                    <option value="2">标题2</option>
                    <option value="3">标题3</option>
                    <option value="4">标题4</option>
                    <option value="5">标题5</option>
                    <option value="6">标题6</option>
                    </select>
                    <select class="ql-size" title="字体大小">
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px" selected>16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    </select>
                    <select class="ql-font" title="字体">
                    <option value="SimSun">宋体</option>
                    <option value="SimHei">黑体</option>
                    <option value="Microsoft-YaHei">微软雅黑</option>
                    <option value="KaiTi">楷体</option>
                    <option value="FangSong">仿宋</option>
                    <option value="Arial">Arial</option>
                    </select>
                    <!-- Add subscript and superscript buttons -->
                    <select class="ql-color" value="color" title="字体颜色"></select>
                    <select class="ql-background" value="background" title="背景颜色"></select>
                    <select class="ql-align" value="align" title="对齐"></select>
                    <button class="ql-clean" title="还原"></button>
                    <!-- You can also add your own -->
                    </div>
                    </quill-editor>
                </el-form-item>

                <el-form-item label="上传附件" id="upload">
                    <el-upload
                        class="upload-demo"
                        action="/api/notification/file"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :file-list="form.fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">(上传不超过5个文件，单个文件最多不大于xMB)</div>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <!-- <el-button>保存</el-button> -->
                    <el-button type="primary" @click="handlereset">发布</el-button>
                </el-form-item>

                </el-form>
        </el-card>
    </div>
    <!--页脚部分留白--> 
    <div id="footer">
    </div>
  </div>
</template>
 
<script>

import { Quill,quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '../../assets/font.css'

// 自定义字体类型
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
'宋体', '黑体'
]
var Font = Quill.import('formats/font')
Font.whitelist = fonts
Quill.register(Font, true)

export default {
    name: 'FuncFormsEdit',
    data() {
        return {
            editorOption: {
                placeholder: "请输入",
                theme: "snow", // or 'bubble'
                modules: {
                toolbar: {
                container: '#toolbar'
                    }
                }
            } ,
            form: {
                title: '',
                range: '',
                top: false,
                type: '',
                resource: '',
                date: '',
                abstract: '',
                content: '',
                fileList: [],
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            },
            //日期
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            
        }
    },
    components: {
    quillEditor
    },
    methods: {
        handlereset() {
            if (this._data.loading == true) return false; //防止重复点击
            this.$refs.form.validate(valid => {
                if (valid) {
                this.loading = true;
                this.$store
                    .dispatch("releaseItem", this.form) //调用Login后返回了一个promise对象，后面的then是promise的方法
                    .then(response => {
                    this.loading = false;
                    let data = JSON.parse(response.data);
                    let state = data.success;
                    if (state == true) {
                        this.$message.success("公告发布成功");
                        this.$store.commit("cleanRelease");
                        this.form = {
                        //上传成功将其设为空表
                            title: '',
                            range: '',
                            top: false,
                            type: '',
                            resource: '',
                            date: '',
                            abstract: '',
                            remark: '',
                            content: '',
                            fileList: [],
                            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                        };
                        this.$router.push("/instructorBoard");
                    } else {
                        this.errorTip(data.msg);
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
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        hrefReturn()
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
    }
}
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