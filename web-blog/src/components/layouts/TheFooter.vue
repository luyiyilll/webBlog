<template>
  <footer class="footer">
    <div class="container flex justify-center">
      <div class="">
        <p class="padding-top-xsm">{{ description }}</p>
        <div class="text-md">
          <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
            <i :class="`fa fa-${item.icon}`"></i>
          </a>
        </div>
        <br>
        <div v-html="designer1"></div>

        <!-- <div v-html="designer2"></div>

        <div v-html="designer3"></div> -->
      </div>
    </div>
  </footer>
</template>

<script>
  import title from '@/directives/title'
  export default {
    name: 'TheFooter',
    directives: {
      title
    },
    data() {
      return {
        description: 'Zero Blog 是基于Vue.js+SpringBoot搭建的博客网站',
        contacts: [
          {
            icon: 'envelope',
            title: '反馈问题',
            link: 'mailto:1224847912@qq.com'
          },
          {
            icon: 'weibo',
            title: '关注微博',
            link: 'https://weibo.com/u/3243345820?nick=%E5%8D%A2%E6%BC%AALuYi&is_all=1'
          },
          {
            icon: 'weixin',
            title: '加我微信',
            link: ''
          }
        ],
        contactStyle: {
          paddingRight: '8px'
        },
        designer1: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/luyiyilll"target="_blank"style="color:inherit">Sarah Lu</a>
        </span>
        <span style="font-size:0.9em">
          <span style="color: #e27575;font-size: 20px;">♬</span>
          <a href="https://github.com/liu8926847"target="_blank"style="color:inherit">Song Liu</a>
        </span>
        <span style="font-size:0.9em">
          <span style="color: #e27575;font-size: 22px;">☺</span>
          <a href="https://github.com/dnhy"target="_blank"style="color:inherit">dnhy</a>
        </span>
      `,

        designer2: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/luyiyilll"target="_blank"style="color:inherit">Song Liu</a>
        </span>
      `,

        designer3: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/luyiyilll"target="_blank"style="color:inherit">dnhy</a>
        </span>
      `,
      }
    }
  }
</script>

<style scoped>
  a:hover,
  a:focus {
    color: #e27575;
    transition: color .15s;
  }

  .footer {
    position: relative;
  }

  .flex {
    text-align: center;
    justify-content: center;
  }
</style>