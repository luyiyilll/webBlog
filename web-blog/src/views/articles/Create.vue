<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-md-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">创作文章</h2>
                    <hr>
                    <div data-validator-form>
                        <div class="form-group">
                            <input v-model.trim="title" v-validator:blur.required="{ title: '标题' }" type="text"
                                   class="form-control"
                                   placeholder="请填写标题" @input="saveTitle">
                        </div>
                        <!--            <div class="form-group">-->
                        <!--              <textarea id="editor"></textarea>-->
                        <!--            </div>-->
                        <div :id="id">
                            <textarea>{{content}}</textarea>
                        </div>
                        <br>

                        <el-select v-model="value" placeholder="请选择文章分类" class="select-type">
                            <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit" @click="post">发 布</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //import SimpleMDE from 'simplemde'
    import hljs from 'highlight.js'
    //本地存储
    import ls from '@/utils/localStorage'
    import {postArticle, findArticle, editArticle, getPostArticle} from 'network/article'
    // import editormd from 'editor.md'
    import $ from "jquery";
    import uuid from "uuid/dist/v4";

    window.hljs = hljs

    export default {
        name: 'Create',
        data() {
            return {
                title: '', // 文章标题
                content: '', // 文章内容
                aid: undefined,
                options2: [{
                    value: '程序人生',
                    label: '程序人生'
                }, {
                    value: '服务器端',
                    label: '服务器端'
                }, {
                    value: 'HTML/CSS',
                    label: 'HTML/CSS'
                }],
                value: '',
                editor: null,
                defaultOptions: {
                    width: "100%",
                    height: 740,
                    path: "/lib/editor.md/lib/",
                    theme: "default",
                    previewTheme: "neo",
                    editorTheme: "default",
                    //markdown : md,   //动态设置的markdown文本
                    codeFold: true,
                    //syncScrolling : false,
                    saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
                    searchReplace: true,
                    //watch : false,                // 关闭实时预览
                    htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
                    //toolbar  : false,             //关闭工具栏
                    //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
                    emoji: true,
                    taskList: true,
                    tocm: true,         // Using [TOCM]
                    tex: true,                   // 开启科学公式TeX语言支持，默认关闭
                    flowChart: true,             // 开启流程图支持，默认关闭
                    sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
                    //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
                    //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
                    //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
                    //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
                    //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
                    imageUpload: true,
                    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL: "./php/upload.php",
                    onload: function () {
                        //console.log('onload', this);
                        //this.fullscreen();
                        //this.unwatch();
                        //this.watch().fullscreen();

                        //this.setMarkdown("#PHP");
                        // this.width("100%");
                        // this.height(480);
                        // this.resize("100%", 640);
                    }
                }
            }
        },
        props: {
            /**
             * editormd挂载元素的id
             */
            id: {
                type: String,
                default: uuid()
            },
            /**
             * editormd的选项对象
             */
            options: {
                type: Object
            }
        },
        beforeRouteEnter(to, from, next) {
            console.log(to)
            next()
        },
        created() {
            if (this.$route.params.articleId) {
                this.aid = this.$route.params.articleId
            }
        },
        mounted() {
            let vm = this;
            //加载editormd
            this.requireEditor(function () {
                vm.editor = editormd(vm.id, vm.getOptions());
            })
            //     const simplemde = new SimpleMDE({
            //         element: document.querySelector('#editor'),
            //         placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
            //         spellChecker: false,
            //         autoDownloadFontAwesome: false,
            //         autosave: {
            //             enabled: true,
            //             uniqueId: 'vuejs-essential'
            //         },
            //         renderingConfig: {
            //             codeSyntaxHighlighting: true
            //         }
            //     })
            //     simplemde.codemirror.on('change', () => {
            //         this.content = simplemde.value()
            //     })
            //     this.simplemde = simplemde
            //     this.fillContent(this.aid)
            //     if (this.$route.params.articleId){
            //         this.fillContent(this.aid)
            //     }
            this.fillArticle(this.aid)
        },
        methods: {
            requireEditor(callback) {
                let vm = this;
                //设置全局变量，因为editormd依赖jquery
                window.$ = window.jQuery = $;
                //异步加载并执行
                $.getScript("/lib/editor.md/editormd.min.js", function (script) {
                    callback();
                })
                //加载css
                $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/lib/editor.md/css/editormd.min.css'));
            },
            getOptions() {
                return Object.assign(this.defaultOptions, this.options);
            },
            saveTitle() {
                ls.setItem('smde_title', this.title)
            },
            fillArticle(articleId) {
                if (articleId) {
                    this.fillContent(articleId)
                }
            },
            fillContent(articleId) {
                // const simplemde = this.simplemde
                const title = ls.getItem('smde_title')
                if (articleId) {
                    // findArticle(articleId).then(res => {
                    //   this.title = res.data.title
                    //   this.content = res.data.content
                    // })
                    this.title = ls.getItem('article').title
                    this.content = ls.getItem('article').content
                    this.value = ls.getItem('article').atype
                    //simplemde.value(this.content)

                } else {
                    if (title !== null) {
                        this.title = title
                    }

                    //this.content = simplemde.value()
                }


            },
            post() {
                const title = this.title
                const content = this.editor.getHTML()
                const uid = this.$store.state.user.id
                const type = this.value
                if (type == "") {
                    this.$message.error('请选择文章分类');
                } else {
                    if (this.aid == undefined) {
                        if (title !== '' && content.trim() !== '') {
                            postArticle(title, content, type, uid).then(res => {
                                this.$message({
                                    message: '发表成功',
                                    type: 'success'
                                });
                                getPostArticle(uid).then(res => {
                                    this.clearData()
                                    this.$router.push({
                                        name: 'Content',
                                        params: {user: this.$store.state.user.username, articleId: res.data.id}
                                    })
                                    // this.$router.push({ name: 'Content', params:  { user: this.$store.state.user.username, articleId: this.aid } })
                                }).catch(err => {
                                    console.log(err)
                                })


                            }).catch(err => {
                                this.$message.error('发表失败');
                            })

                        }
                    } else {
                        editArticle(this.title, this.content, this.value, this.aid).then(res => {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.clearData()
                            this.$router.push({
                                name: 'Content',
                                params: {user: this.$store.state.user.username, articleId: this.aid}
                            })
                        }).catch(err => {
                            this.$message.error('编辑失败');
                        })
                    }
                }


            },
            clearData() {
                this.title = ''
                ls.removeItem('smde_title')
                // this.simplemde.value('')
                // this.simplemde.clearAutosavedValue()
            },
            setArticleId(articleId) {
                this.aid = articleId
                this.fillContent(articleId)
            }
        }
    }
</script>

<style lang="scss">
    .blog-container {
        max-width: 980px;
        margin: 0 auto;
        margin-top: 20px;
    }

    textarea {
        height: 200px;
    }

    .btn-primary {
        color: #fff;
        background-color: #6ca6cd;
        border-color: #6ca6cd;
    }

    .select-type {
        margin-bottom: 20px
    }

    /*@import "~editor.md/css/editormd.min.css";*/
    /*@import '~simplemde/dist/simplemde.min.css';*/
    @import '~highlight.js/styles/paraiso-dark.css';
</style>