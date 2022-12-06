<template>
  <div id="note" class="detail">
    <Note-sidebar @update:notes="val=>notes=val" />
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{curNote.createdAtFriendly}}</span>
        <span>更新日期：{{curNote.updatedAtFriendly}}</span>
        <span>{{curNote.statusText}}</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" v-model="curNote.title" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持markdown语法"></textarea>
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
      curNote: {},
      notes: []
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
  },
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id.toString() == to.query.noteId)
    next()
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