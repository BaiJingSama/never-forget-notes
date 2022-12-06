<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`"
            class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
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
import { Loading } from 'element-ui';


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
    let loadingInstance = Loading.service({ target: '#notebook-list', text: '拼命加载中' });

    Notebook.getAll()
      .then(res => {
        this.notebooks = res.data
        loadingInstance.close();
      }).catch(() => {
        loadingInstance.close();
      })
  },
  methods: {
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,36}$/,
        inputErrorMessage: '标题不能为空，且不超过36个字符'
      }).then(({ value }) => {
        return Notebook.addNotebook({ title: value })
      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg);
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,36}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过36个字符'
      }).then(({ value }) => {
        title = value
        return Notebook.updateNotebook(notebook.id, { title: value })
      }).then(res => {
        notebook.title = title
        this.$message.success(res.msg);
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebook.deleteNotebook(notebook.id)
      }).then((res) => {
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg);
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/notebook-list.less);
</style> 