import request from "@/helpers/request";
import { friendlyDate } from "@/helpers/util";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id"
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) =>
            notebook1.createAt < notebook2.createAt ? 1 : -1
          );
          res.data.forEach(notebook => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
            notebook.friendlyUpdatedAt = friendlyDate(notebook.updatedAt);
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateNotebook(notebookId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId), "PATCH", { title });
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
  addNotebook({ title = "" } = { title: "" }) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, "POST", { title })
        .then(res => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          res.data.friendlyUpdatedAt = friendlyDate(res.data.UpdatedAt);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
