<template>
  <div class="col-md-9 col-sm-12 col-xs-12 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <div class="comment-title">全部评论</div>
        <el-collapse>
          <el-collapse-item v-for="(item,index) in List">
            <template slot="title">
              <el-tag type="danger" size="mini">{{item.atype}}</el-tag>{{item.title}}
              <el-badge v-show="item.clength" :value="item.clength" type="primary" />
            </template>
            <div class="panel-body">
              <ul id="reply-list" class="list-group row">
                <li v-for="(comment, index) in item.comments" :key="comment.commentId" class="list-group-item media">
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
                      <span class="operate pull-right">
                        <span>
                          <!-- <a href="javascript:;" @click="editComment(comment, index)"><i class="fa fa-edit"></i></a>
                          <span> ⋅ </span> -->
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
              <div v-show="!item.clength" class="empty-block">
                暂无评论~~
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入 mapState 辅助函数
  import { getArticleComment, deleteComment } from 'network/comment'

  export default {
    name: 'AdminComment',
    data() {
      return {
        List: [],
      }
    },
    computed: {
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        getArticleComment().then(res => {
          let cList = []
          res.data.forEach((item) => {
            let data = {
              aid: item[0].id,
              user_id: item[0].user_id,
              title: item[0].title,
              content: item[0].content,
              post_date: item[0].post_date,
              atype: item[0].atype,
              comments: item[1],
              clength: item[1].length
            }
            cList.push(data)
          })
          console.log(cList)
          this.List = cList
        }).catch(err => {
          console.log(err)
        })
      },
      deleteComment(cid) {
        deleteComment(cid).then(res => {
          this.getData()
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style>
  .panel {
    margin-top: 0px;
  }

  .comment-title {
    padding-left: 12px;
    font-size: 20px;
    font-weight: bold;
  }

  .el-collapse-item__header {
    padding: 0 20px;
    font-size: 15px;
    font-weight: bold
  }

  .media-heading {
    margin-top: -15px;
    margin-bottom: 0;
  }

  .el-collapse-item__content {
    line-height: 16px;
  }

  .el-tag {
    margin-right: 8px;
  }

  .el-badge__content--primary {
    background-color: rgba(108, 166, 205, .8);

  }
</style>