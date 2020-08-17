<template>
  <div id="adminBoardApply">
    <!--头部logo-->
    <div id="header">
        <el-button type="text" @click="hrefReturnBackToAdmin">返回</el-button>
    </div>

    <!--主体部分-->
    <div id="body">
        <div id='Board'>发布公告公示<br/></div>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告类型">
            <el-select v-model="form.class" placeholder="请选择公告类型">
            <el-option label="条目一" ></el-option>
            <el-option label="条目二" ></el-option>
            <el-option label="条目三" ></el-option>
            <el-option label="条目四" ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="置顶">
            <el-switch v-model="form.top"></el-switch>
        </el-form-item>

        <el-form-item label="发布范围">
            学生届数：
            <el-select v-model="form.class" placeholder="请选择发布范围">
            <el-option label="计算机学院19级" ></el-option>
            <el-option label="计算机学院18级" ></el-option>
            <el-option label="计算机学院17级" ></el-option>
            </el-select>
            班级范围：
            <el-select v-model="form.class" placeholder="请选择发布范围">
            <el-option label="计算机学院19级" ></el-option>
            <el-option label="一大班" ></el-option>
            <el-option label="二大班" ></el-option>
            <el-option label="三大班" ></el-option>
            <el-option label="2019211301" ></el-option>
            <el-option label="2019211302" ></el-option>
            <el-option label="2019211303" ></el-option>
            <el-option label="2019211304" ></el-option>
            <el-option label="2019211305" ></el-option>
            <el-option label="2019211306" ></el-option>
            <el-option label="2019211307" ></el-option>
            <el-option label="2019211308" ></el-option>
            <el-option label="2019211309" ></el-option>
            <el-option label="2019211310" ></el-option>
            <el-option label="2019211311" ></el-option>
            <el-option label="2019211312" ></el-option>
            <el-option label="2019211313" ></el-option>
            <el-option label="2019211314" ></el-option>
            <el-option label="2019211315" ></el-option>
            <el-option label="2019211316" ></el-option>
            <el-option label="2019211317" ></el-option>
            <el-option label="2019211318" ></el-option>
            <el-option label="2019211319" ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="公示时间">
            <el-col :span="11">
                <div class="block">
                    <el-date-picker
                    v-model="form.date"
                    type="datetime"
                    placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </el-col>
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

        <el-form-item label="上传附件">
            <el-upload
                class="upload-demo"
                action="http://124.70.77.11:8080/notification/file"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="form.fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">(上传不超过5个文件，单个文件最多不大于xMB)</div>
            </el-upload>
        </el-form-item>

        <el-form-item>
            <el-button>保存</el-button>
            <el-button type="primary" @click="handlereset">申请发布</el-button>
        </el-form-item>

        </el-form>
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
                class: '',
                top: false,
                type: [],
                resource: '',
                date: '',
                abstract: '',
                remark: '',
                content: '',
                fileList: [],
            },
            //日期
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            }, 
        }
    },
    components: {
    quillEditor
    },
    created: function() {
        if (this.$store.state.user.is_login == false)
        setTimeout(() => {
            //未登陆的的原因可能是用户一开始就访问了需要登录的网址，还没来得及加载状态，所以一旦检测到没登陆，延时等待看是不是状态还没返回，延时后还未登录就说明真没登陆了
            if (this.$store.state.user.is_login == false) {
            this.$message.error("您还未登录呢，快去登陆吧");
            this.$router.push("/");
            }
        }, 1500);
    },
    methods: {
        handlereset() {
            if (this._data.loading == true) return false; //防止重复点击
            this.$refs[this.form].validate(valid => {
                if (valid) {
                this.loading = true;
                this.$store
                    .dispatch("releaseItem", this.form) //调用Login后返回了一个promise对象，后面的then是promise的方法
                    .then(response => {
                    this.loading = false;
                    let state = response.data.success;
                    if (state == true) {
                        this.$message.success("公告发布成功");
                        this.$store.commit("cleanRelease");
                        this.form = {
                        //上传成功将其设为空表
                        title: '',
                        class: '',
                        top: false,
                        type: [],
                        resource: '',
                        date: '',
                        abstract: '',
                        remark: '',
                        content: '',
                        fileList: [],
                        };
                        if (this.$route.params.type == "change") this.$router.push("/adminBoard");
                    } else {
                        this.errorTip(response.data.msg);
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
        hrefReturnBackToAdmin()
        {
            this.$router.push({path: './admin'});
        }
    }
}
</script>
 
<style scoped>
#Board
{
    text-align: center;
};

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