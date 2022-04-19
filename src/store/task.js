import { apolloClient } from "./utils/apollo";
import dasboard from "./dashboard";
import gql from "graphql-tag";
import program from "./program";

const state = {
  tasks: [],
};

const getters = {
  getMyTasks(state) {
    let user = dasboard.state.user;
    let myTasks = [];
    let allTasks = localStorage.getItem("tasks");

    if (allTasks) {
        allTasks = JSON.parse(allTasks);
        allTasks.forEach((task)=>{
            if(task.task_received==user.id || task.task_created == user.id)
                myTasks.push(task)
        })   
    }
    return JSON.parse(JSON.stringify(myTasks));
  },
  getTask(state) {
    return (id) => {
      let task = {};
      let allTasks = localStorage.getItem("tasks");
      if (allTasks) {
        allTasks = JSON.parse(allTasks);
        allTasks.forEach((s) => {
          if (s.id == id) task = JSON.parse(JSON.stringify(s));
        });
      }

      return task;
    };
  },
  getTasks(state) {
    let allTasks = localStorage.getItem("tasks");
    if (allTasks) {
      allTasks = JSON.parse(allTasks);
      return allTasks;
    } else {
      return JSON.parse(JSON.stringify(state.tasks));
    }
  },
};

const mutations = {
  setNewTask(state, payload) {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
      tasks = JSON.parse(tasks);
      tasks.push(payload);
      state.tasks = tasks;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  /* addReport(state, payload) {
    state.submission.push(payload);
  }, */
};

const actions = {
  async addTask({ state, commit }, payload) {
    payload.id = Math.floor(Math.random() * 500);

    console.log(`Dans task.js : ${JSON.stringify(payload)}`);

    commit("setNewTask", payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
