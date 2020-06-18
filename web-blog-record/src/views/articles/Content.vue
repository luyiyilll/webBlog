<template>

  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ article.title }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>{{article.post_date}}
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body ">
          <div class="markdown-body" v-html="article.content"></div>


          <div v-if="article.user_id === user.id" class="panel-footer operate">
            <div class="actions">
              <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
              <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 点赞 -->

    <div class="votes-container panel panel-default padding-md">
      <div class="panel-body vote-box text-center">
        <div class="btn-group">
          <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html">
            <i class="fa fa-thumbs-up"></i> {{ likeClass ? '已赞' : '点赞' }}
          </a>
          <div class="or"></div>
          <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> 打赏</button>
        </div>
        <div class="voted-users">
          <div class="user-lists">
            <span v-for="likeUser in likeUsers">
              <img :src="likeUser.avatar" class="img-thumbnail avatar avatar-middle"
                :class="{ 'animated swing' : likeUser.id === user.id }">
            </span>
          </div>
        </div>
      </div>
    </div>
    <Modal :show.sync="showQrcode" class="text-center">
      <template v-slot:header>
        <div v-if="user">
          <img :src="user.avatar" class="img-thumbnail avatar" width="48">
        </div>
      </template>
      <div>
        <p class="text-md">觉得不错的话，就打赏作者吧~</p>
        <div class="payment-qrcode inline-block">
          <h5>关注微博</h5>
          <p>
            <qrcode-vue value="https://weibo.com/u/3243345820?nick=%E5%8D%A2%E6%BC%AALuYi" :size="160"></qrcode-vue>
          </p>
        </div>
      </div>
      <template v-slot:footer>
        <div>
          <div class="text-center">hava a nice day :)</div>
        </div>
      </template>
    </Modal>
    <!-- 评论列表 -->
    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          回复数量: <b>{{ commentList.length }}</b>
        </div>
      </div>
      <div class="panel-body">
        <ul id="reply-list" class="list-group row">
          <li v-for="(comment, index) in commentList" :key="comment.commentId" class="list-group-item media">
            <div class="avatar avatar-container pull-left">
              <router-link :to="`/${comment.uname}`">
                <img :src="comment.avatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
            </div>
            <div class="infos">
              <div class="media-heading">
                <router-link :to="`/${comment.username}`" class="remove-padding-left author rm-link-color">
                  {{ comment.username }}
                </router-link>


                <span v-if="auth" class="operate pull-right">
                  <span v-if="comment.username === user.username">
                    <a href="javascript:;" @click="editComment(comment, index)"><i class="fa fa-edit"></i></a>
                    <span> ⋅ </span>
                    <a href="javascript:;" @click="deleteComment(comment.id)"><i class="fa fa-trash-o"></i></a>
                  </span>
                </span>
                </span>

                <div class="meta">
                  <a :id="`reply${index + 1}`" :href="`#reply${index + 1}`" class="anchor">第{{ index + 1 }}楼</a>
                  <span> ⋅ </span>
                  <abbr class="timeago">
                    {{comment.creat_time}}
                  </abbr>
                </div>
              </div>

              <div class="preview media-body markdown-reply markdown-body" v-html="comment.content"></div>
            </div>
          </li>
        </ul>
        <div v-show="!commentList.length" class="empty-block">
          暂无评论~~
        </div>
      </div>
    </div>


    <!-- 评论框 -->
    <div id="reply-box" class="reply-box form box-block">
      <textarea v-model="content" v-if="auth" id="editor" ref="content" placeholder="写点什么吧..."></textarea>
      <textarea v-else disabled class="form-control" placeholder="需要登录后才能发表评论..."></textarea>
    </div>
    <div class="form-group reply-post-submit">
      <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
        {{ editId ? '保存编辑' : '回复' }}
      </button>
      <span v-show="editId" class="help-inline btn-cancel" style="cursor:pointer" @click="cancelEditComment">取消编辑</span>
      <span v-show="!editId" class="help-inline">Ctrl+Enter</span>
    </div>
    <div v-show="content" id="preview-box" class="box preview markdown-body" v-html="content"></div>
  </div>
  </div>

</template>

<script>
  import SimpleMDE from 'simplemde'
  import hljs from 'highlight.js'
  import { getPostArticle, deleteArticle, findArticle } from 'network/article'
  import { getLikeUser, deleteLike, addLike } from 'network/like'
  import { findArticleComment, insertComment, updateComment, deleteComment } from 'network/comment'
  import { updateClickNum } from 'network/statistics'

  import emoji from 'node-emoji'
  import ls from '@/utils/localStorage'
  import QrcodeVue from 'qrcode.vue'

  export default {
    name: 'Content',
    data() {
      return {
        article: {
          id: '',
          title: '', // 文章标题
          content: '', // 文章内容
          post_date: '',
          user_id: '',
          login_id: '',
          atype: ''
        },
        likeUsers: [], // 点赞用户列表
        likeClass: 0, // 点赞样式
        userLength: 0,
        showQrcode: false, // 是否显示打赏弹窗

        content: '',
        commentList: [],

        editId: undefined

      }
    },
    components: {
      QrcodeVue
    },
    computed: {
      user() {
        console.log(this.$store.state.user)
        return this.$store.state.user;
      },
      auth() {
        return this.$store.state.auth;
      }
    },
    mounted() {


    },
    created() {
      const articleId = this.$route.params.articleId
      this.getArticle(articleId)
      this.updateClickNum(articleId);
    },
    methods: {
      editArticle() {
        ls.setItem('article', this.article)
        console.log(ls.getItem('article', this.article))
        this.$router.push({ name: 'Edit', params: { articleId: this.article.id } })
      },
      deleteArticle() {
        this.$swal({
          text: '你确定要删除此内容吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            deleteArticle(this.article.id).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.$router.push({ path: '/' })
            }).catch(err => {
              this.$message.error('编辑失败');
            })
          }
        })
      },
      getArticle(articleId) {
        const that = this
        findArticle(articleId).then(res => {
          const resArticle = res.data
          console.log(resArticle)
          if (resArticle) {
            let { id, user_id, title, content, post_date, atype } = resArticle
            this.article.id = id
            this.article.user_id = user_id
            this.article.title = title
            this.article.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
            this.article.post_date = post_date
            this.article.atype = atype

            that.getLikeUserList(resArticle.id)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      getLikeUserList(articleId) {
        let that = this
        getLikeUser(articleId).then(res => {
          that.getCommentList(articleId);
          let list = []
          res.data.forEach(function (item, index, array) {
            list.push({
              name: item.username,
              avatar: item.avatar,
              id: item.id
            })
          })
          that.likeUsers = list
          that.userLength = list.length
          that.likeUsers.some(function (item, index, array) {
            if (item.id === that.user.id) {
              that.likeClass = 1
            }
          })
          // this.$nextTick(() => {
          //   this.$el.querySelectorAll('pre code').forEach((el) => {
          //     hljs.highlightBlock(el)
          //   })
          // })
        }).catch(err => {
          console.log(err)
        })
      },
      getCommentList(articleId) {
        findArticleComment(articleId).then(res => {
          this.commentList = res.data;

        }).catch(err => {
          console.log(err)
        })
      },

      like(e) {
        if (!this.$store.state.auth) {
          this.$swal({
            text: '需要登录以后才能执行此操作。',
            confirmButtonText: '前往登录'
          }).then((res) => {
            if (res.value) {
              this.$router.push('/auth/login')
            }
          })
        } else {
          if (this.likeClass == 1) {
            this.likeClass = 0
            deleteLike(this.article.id, this.user.id).then(res => {
              this.getLikeUserList(this.article.id)
            }).catch(err => {

            })
          } else {
            this.likeClass = 1
            addLike(this.article.id, this.user.id).then(res => {
              this.getLikeUserList(this.article.id);
            }).catch(err => {

            })
          }
        }
      },
      comment() {
        if (this.editId == undefined && this.content && this.content.trim() !== '') {

          insertComment(this.article.id, this.content, this.user.username, this.user.avatar).then(res => {
            this.$message({
              message: '发表成功',
              type: 'success'
            });
            this.getCommentList(this.article.id);
          }).catch(err => {
            this.$message.error('发表失败');
          })
          this.content = ""
          document.querySelector('#reply-btn').focus()
        } else {
          updateComment(this.editId, this.content).then(res => {
            this.$message({
              message: '发表成功',
              type: 'success'
            });
            this.getCommentList(this.article.id);
          }).catch(err => {
            this.$message.error('发表失败');
          })
          this.content = ""
          document.querySelector('#reply-btn').focus()
        }
      },

      //编辑评论
      editComment(comment, commentIndex) {
        // const comments = this.commentList
        console.log(comment)
        this.editId = comment.id
        this.content = comment.content
        this.$refs.content.focus()
        // for (const comment of comments) {
        //   // 找到与 commentId 对应的评论时
        //   if (parseInt(comment.id) === parseInt(commentId)) {
        //     // 设置编辑器的内容
        //     this.content = comment.content
        //     this.commentId = commen.id
        //     break
        //   }
        // }
      },

      // 取消编辑评论
      cancelEditComment() {
        this.content = ""
        this.editId = undefined
        // 清除 commentId
        // this.commentId = undefined
        // // 清空编辑器
        // this.content = ""

        // // 下次 DOM 更新后，将评论滚动回视图的顶部
        // this.$nextTick(() => {
        //   if (this.commentIndex === undefined) return
        //   const currentComment = document.querySelector(`#reply-list li:nth-child(${this.commentIndex})`)

        //   if (currentComment) {
        //     currentComment.scrollIntoView(true)
        //     currentComment.querySelector('.operate a').focus()
        //   }
        // })
      },

      // 删除评论
      deleteComment(commentId) {
        this.$swal({
          text: '你确定要删除此评论吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            // 此时不用传入 comment
            deleteComment(commentId).then(res => {
              this.getCommentList(this.article.id);
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }).catch(er => {

              this.$message.error('删除失败');
            })
          }
        })
      },
      updateClickNum(aid) {
        updateClickNum(aid).then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
      }

    },
  }
</script>

<style scoped lang="scss">
  @import "~animate.css/animate.min.css";

  textarea {
    width: 100%;
    padding: 2%;
    min-height: 80px;
  }
</style>