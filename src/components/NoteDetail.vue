<template>
  <div id="note" class="detail">
    <Note-sidebar />
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{curNote.createdAtFriendly}}</span>
        <span>更新日期：{{curNote.updatedAtFriendly}}</span>
        <span>{{curNote.statusText}}</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" :value="curNote.title" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="true" :value="curNote.context" placeholder="输入内容，支持markdown语法"></textarea>
        <div class="preview markdown-body" v-show="false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth';
import router from '@/router/index'
import NoteSidebar from './NoteSidebar.vue';
export default {
  name: 'Login',
  data() {
    return {
      curNote: {
        title: '我的笔记',
        context: '我的笔记内容',
        createdAtFriendly: '1天前',
        updatedAtFriendly: '刚刚',
        statusText: '未更新'
      }
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          router.push({ path: '/login' })
        }
      })
  },
  components: {
    NoteSidebar
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  border-color: #fff;
  flex: 1;
}
</style>