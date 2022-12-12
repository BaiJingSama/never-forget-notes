import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      alias: "/notebooks",
      component: () => import("@/components/NotebookList.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/components/Login")
    },
    {
      path: "/notebooks",
      component: () => import("@/components/NotebookList.vue")
    },
    {
      path: "/note",
      component: () => import("@/components/NoteDetail.vue")
    },
    {
      path: "/trash",
      component: () => import("@/components/TrashDetail.vue")
    }
  ]
});
