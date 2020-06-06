<template>
  <div class="col-md-9 col-sm-12 col-xs-12 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          全部文章
        </h1>
        <el-table :data="articleList" style="width: 100%" row-key="id" border lazy
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="avatar" label="用户" width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" class="img-avatar" min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center">
          </el-table-column>
          <!-- <el-table-column prop="post_date" label="发布时间">
          </el-table-column> -->
          <el-table-column prop="click_num" label="浏览量" width="100" align="center">
          </el-table-column>
          <el-table-column prop="comment_num" label="评论量" width="100" align="center">
          </el-table-column>
          <el-table-column prop="likes_num" label="点赞量" width="100" align="center">
          </el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              操作
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 
        <ul class="list-group">
          <li v-for="article in articleList" class="list-group-item">
            <div class="post_date">
              <img :src="article.avatar" class="avatar avatar-small">
              <div>
                <router-link :to="`/${article.username}/articles/${article.aid}/content`" class="title">
                  {{ article.title }}-{{article.username}}
                </router-link>
                <p class="timeago">{{ article.post_date}}</p>
              </div>

            </div>
            <span class="meta pull-right">
              <a href="javascript:;" @click="deleteArticle(article.aid)"><i class="fa fa-trash-o"></i></a>
            </span>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
  // 引入 mapState 辅助函数
  import { userAndArticle, deleteArticle } from 'network/article'
  import { userInfo } from 'network/user'

  export default {
    name: 'AdminArticle',
    data() {
      return {
        articleList: [],
        user_id: '',
        info: ''
      }
    },
    computed: {
      getInfo() {
        return this.info
      },
      user() {
        return this.$store.state.user
      }
    },

    created() {
      this.getAllArticlesInfo()
    },
    methods: {
      handleDelete(index, row) {
        let aid = row.aid;
        this.$swal({
          text: '你确定要删除此篇文章吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            deleteArticle(aid).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }).catch(err => {
              this.$message.error('删除失败');
            })
          }
        })
      },
      handleView(index, row) {
        this.$router.push()
        this.$router.push({ name: 'Content', params: { user: row.username, articleId: row.aid } })
      },
      getAllArticlesInfo() {
        let list = []
        userAndArticle().then(res => {
          res.data.forEach((item, index, array) => {
            let data = {
              aid: item[0].id,
              user_id: item[0].user_id,
              title: item[0].title,
              content: item[0].content,
              post_date: item[0].post_date,
              atype: item[0].atype,
              username: item[1][1],
              avatar: item[1][2],
              click_num: item[2][0],
              comment_num: item[2][1],
              likes_num: item[2][2]
            }
            list.push(data)
          })
          this.articleList = list;
        }).catch(err => {
          console.log(err)
        })
      },

    },
  }
</script>

<style scoped>
  .panel {
    margin-top: 0px;
  }

  .all-articles {
    padding-left: 12px;
    font-size: 20px;
    font-weight: bold;
  }


  .img-avatar {
    border: 5px solid rgba(220, 220, 220, .3);
    border-radius: 10px;

  }
</style>