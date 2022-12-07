<template>
  <div id="note" class="detail">
    <Note-sidebar @update:notes="val=>notes=val" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{curNote.createdAtFriendly}}</span>
          <span>更新日期：{{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="updateNote" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="updateNote"
            placeholder="输入内容，支持markdown语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth';
import router from '@/router/index'
import NoteSidebar from './NoteSidebar.vue';
import Bus from '../helpers/bus';
import _ from 'lodash'
import Notes from '../apis/notes';
import MarkdownIt from 'markdown-it'



export default {
  name: 'Login',
  data() {
    return {
      curNote: {},
      notes: [],
      statusText: '笔记未保存',
      isShowPreview: false,
      md: new MarkdownIt()
    }
  },
  computed: {
    previewContent() {
      return this.md.render(this.curNote.content || '')
    }
  },
  methods: {
    updateNote: _.debounce(function () {
      Notes.updateNote(
        { noteId: this.curNote.id },
        { title: this.curNote.title, content: this.curNote.content })
        .then(data => {
          this.statusText = '笔记已保存，保存时间为' + this.getDate()
        })
        .catch(data => {
          this.statusText = '笔记保存失败'
        })
    }, 300),
    getDate() {
      let now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' '
        + now.toTimeString().substr(0, 8)
    },
    deleteNote() {
      Notes.deleteNote({ noteId: this.curNote.id })
        .then(data => {
          this.$message.success(data.msg)
          this.notes.splice(this.notes.indexOf(this.curNote), 1)
          this.$router.go(0)
          // this.$router.replace({path:'/note'})
        })
    },



  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          router.push({ path: '/login' })
        }
      })
    Bus.$on('update:notes', val => {
      this.curNote = val.find(note => note.id.toString() === this.$route.query.noteId) || {}
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