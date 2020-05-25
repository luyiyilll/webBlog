<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">创作文章</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-model.trim="title" v-validator:blur.required="{ title: '标题' }" type="text" class="form-control"
                placeholder="请填写标题" @input="saveTitle">
            </div>
            <div class="form-group">
              <textarea id="editor"></textarea>
            </div>
            <br>

            <el-select v-model="value" placeholder="请选择文章分类" class="select-type">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
  import SimpleMDE from 'simplemde'
  import hljs from 'highlight.js'
  import ls from '@/utils/localStorage'
  import { postArticle, findArticle, editArticle, getPostArticle } from 'network/article'
  window.hljs = hljs

  export default {
    name: 'Create',
    data() {
      return {
        title: '', // 文章标题
        content: '', // 文章内容
        aid: undefined,
        options: [{
          value: '程序人生',
          label: '程序人生'
        }, {
          value: '服务器端',
          label: '服务器端'
        }, {
          value: 'HTML/CSS',
          label: 'HTML/CSS'
        }],
        value: ''
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
      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
        spellChecker: false,
        autoDownloadFontAwesome: false,
        autosave: {
          enabled: true,
          uniqueId: 'vuejs-essential'
        },
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      })

      simplemde.codemirror.on('change', () => {
        this.content = simplemde.value()
      })

      this.simplemde = simplemde
      this.fillContent(this.aid)
    },
    methods: {
      saveTitle() {
        ls.setItem('smde_title', this.title)
      },
      fillContent(articleId) {
        const simplemde = this.simplemde
        const title = ls.getItem('smde_title')
        if (articleId) {
          // findArticle(articleId).then(res => {
          //   this.title = res.data.title
          //   this.content = res.data.content
          // })
          this.title = ls.getItem('article').title
          this.content = ls.getItem('article').content
          this.value = ls.getItem('article').atype
          simplemde.value(this.content)

        } else {
          if (title !== null) {
            this.title = title
          }

          this.content = simplemde.value()
        }


      },
      post() {
        const title = this.title
        const content = this.content
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
                  this.$router.push({ name: 'Content', params: { user: this.$store.state.user.username, articleId: res.data.id } })
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
              this.$router.push({ name: 'Content', params: { user: this.$store.state.user.username, articleId: this.aid } })
            }).catch(err => {
              this.$message.error('编辑失败');
            })
          }
        }


      },
      clearData() {
        this.title = ''
        ls.removeItem('smde_title')
        this.simplemde.value('')
        this.simplemde.clearAutosavedValue()
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

  @import '~simplemde/dist/simplemde.min.css';
  @import '~highlight.js/styles/paraiso-dark.css';
</style>