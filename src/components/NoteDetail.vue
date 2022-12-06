<template>
  <div id="note" class="detail">
    <Note-sidebar />
    <div id="note-detail">
      <h1>notebookId : {{ $route.query.notebookId }}</h1>
      <h2>noteId : {{ $route.query.noteId }}</h2>
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
      msg: '笔记本详情列表'
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

<style scoped>
#note {
  display: flex;
  align-items: stretch;
  border-color: #fff;
  flex: 1;
}
</style>