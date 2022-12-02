<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.cont}}</span>
              <span class="action" @click.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyCreatedAt }}</span>
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
import Notebook from '@/apis/notebooks'
import { friendlyDate } from '@/helpers/util'


export default {
  data() {
    return {
      msg: '笔记本列表',
      notebooks: [],
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          router.push({ path: '/login' })
        }
      })
    Notebook.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      let title = window.prompt('创建笔记本')
      if (title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      Notebook.addNotebook({ title })
        .then(res => {
          console.log(res.msg);
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },
    onEdit(notebook) {
      let title = window.prompt('修改标题', notebook.title)
      Notebook.updateNotebook(notebook.id, { title })
        .then(res => {
          console.log(res);
          alert(res.msg)
          notebook.title = title
        })
    },
    onDelete(notebook) {
      let isConfirm = window.confirm('确定要删除笔记本吗？')
      console.log(isConfirm);
      if (isConfirm) {
        Notebook.deleteNotebook(notebook.id)
          .then(res => {
            console.log(res);
            alert(res.msg)
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
          })
      }

    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/notebook-list.less);
</style>