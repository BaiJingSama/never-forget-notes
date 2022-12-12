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
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote"
            placeholder="输入内容，支持markdown语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from './NoteSidebar.vue';
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'



export default {
  name: 'Login',
  data() {
    return {
      statusText: '笔记未保存',
      isShowPreview: false,
      md: new MarkdownIt()
    }
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent() {
      return this.md.render(this.curNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote: _.debounce(function () {
      if (!this.curNote.id) return
      this.updateNote(
        { noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
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
    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id })
        .then(data => {
          this.$router.replace({ path: '/note' })
          // this.$router.replace({path:'/note'})
        })
    },



  },
  created() {
    this.checkLogin({ path: '/login' })
  },
  components: {
    NoteSidebar
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId })
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