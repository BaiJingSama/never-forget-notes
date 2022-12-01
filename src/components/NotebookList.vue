<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表0</h3>
        <div class="book-list">
          <router-link to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> 笔记本
              <span>2</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">3</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from '@/apis/auth';
import router from '@/router/index'
export default {
  name: 'Login',
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          router.push({ path: '/login' })
        }
      })
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/notebook-list.less);
</style>