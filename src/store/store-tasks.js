import Vue from 'vue';
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from '../boot/firebase'
import { showErrorMessage } from '../functions/error-message'

const state = {
 tasks: {
//   'id1': {
//    name: "Go to store",
//    details: "Some details",
//    dueDate: "1/30/2020",
//    dueTime: "11:00",
//    completed: false
//   },
//   'id2': {
//    name: "Let the dog out",
//    details: "Some details",
//    dueDate: "1/31/2020",
//    dueTime: "15:30",
//    completed: false
//   },
//   'id3': {
//    name: "Make dinner",
//    details: "Some details",
//    dueDate: "1/10/2020",
//    dueTime: "08:00",
//    completed: true
//   },
 },
    search: '',
    sort: 'name',
    tasksDownloaded: false
};

const mutations = {
    addTask(state, payload) {
        Vue.set( state.tasks, payload.id, payload.task)
    },
 updateTask(state, payload) {
  // -TODO: Remove consolelog
  //console.log('from mutaion payload:', payload);
  Object.assign(state.tasks[payload.id], payload.updates);
 },
 deleteTask(state, id) {
  // -TODO: Remove consolelog
  console.log('mutation deleteTask:', id);
  Vue.delete(state.tasks, id);
 },
 clearTasks(state) {
    state.tasks = {}
 },
 setSearch(state, value) {
     state.search = value
 },
 setSort(state, value) {
    state.sort = value
 },
 setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
 }
};

const actions = {
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task
    };
    dispatch("fbAddTask", payload);
  },
  fbAddTask({}, payload) {
    //console.log(payload)
    let currentUser = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref('tasks/' + currentUser + '/' + payload.id);
    taskRef.set(payload.task, err => {
        if(err) {
            showErrorMessage(err.message)
        } else {
            Notify.create({
              color: "primary",
              message: "Task created",
              position: "center",
              timeout: 100
            });
        }
    })
  },
  updateTask({ dispatch }, payload) {
    // -TODO: Remove consolelog
    //console.log('updateTask action');
    //console.log('payload:', payload);
    dispatch("fbUpdateTask", payload);
  },
  fbUpdateTask({}, payload) {
    let currentUser = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("tasks/" + currentUser + "/" + payload.id);
    taskRef.update(payload.updates, err => {
        if (err) {
          showErrorMessage(err.message);
        } else {
            let keys = Object.keys(payload.updates)
            if (!(keys.includes('completed') && keys.length == 1)) {
            Notify.create({
                color: "green",
                message: "Task updated",
                position: "center",
                timeout: 200
            });
            }
        }
    });
  },
  deleteTask({ dispatch }, id) {
    console.log('deleteTask:', id);
    dispatch("fbDeleteTask", id);
  },
  fbDeleteTask({}, id) {
    let currentUser = firebaseAuth.currentUser.uid;
    let taskRef = firebaseDb.ref("tasks/" + currentUser + "/" + id);
    taskRef.remove( err => {
        if (err) {
          showErrorMessage(err.message);
        } else {
          console.log('fbDeleteTask:', id);
            Notify.create({
                color: "negative",
                message: "Task deleted",
                position: "center",
                timeout: 200
            })
        }
    });
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbReadData({ commit }) {
    //console.log("reading data from firebase");
    let currentUser = firebaseAuth.currentUser.uid;
    let userTasks = firebaseDb.ref("tasks/" + currentUser);
    // intial check for data
    userTasks.once('value', snapshot => {
        commit('setTasksDownloaded', true)}, err => {
            showErrorMessage(err.message)
            this.$router.replace('/auth')
    })
    // update on create method
    userTasks.on("child_added", snapshot => {
      console.log('snapshot:', snapshot)
      let task = snapshot.val();
      console.log("task", task);
      let payload = {
          id: snapshot.key,
          task: task
      }
      commit('addTask', payload)
    });
    //update on update method
    userTasks.on("child_changed", snapshot => {
      // console.log('snapshot:', snapshot)
      let task = snapshot.val();
      console.log("task", task);
      let payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTask", payload);
    });
    //update on delete method
    userTasks.on("child_removed", snapshot => {
      let taskId = snapshot.key;
      console.log('fbReadData delete', taskId)
      commit("deleteTask", taskId);
    });
  }
};

const getters = {
    tasksSorted: (state) => {
        let tasksSorted = {},
            keysOrdered = Object.keys(state.tasks)
        
        keysOrdered.sort((a,b) => {
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
                taskBProp = state.tasks[b][state.sort].toLowerCase()

            if(taskAProp > taskBProp) return 1
            else if(taskAProp < taskBProp) return -1
            else return 0
        })
        
        keysOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        })

        return tasksSorted
    },
    tasksFiltered: (state, getters) => {
        let tasksSorted = getters.tasksSorted,
            tasksFiltered = {}
        if(state.search) {
            Object.keys(tasksSorted).forEach(function(key) {
                let task = tasksSorted[key],
                taskNameLowerCase = task.name.toLowerCase(),
                searchLowerCase = state.search.toLowerCase()
                if (taskNameLowerCase.includes(searchLowerCase)) {
                    tasksFiltered[key] = task
                }
            })
            return tasksFiltered
        }
        return tasksSorted
    },
    tasksTodo: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered)
            .forEach(function(key) {
                let task = tasksFiltered[key]
                if(!task.completed) {
                    tasks[key] = task
                }
            });
        return tasks;
    },
    tasksComplete: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered)
            .forEach(function (key) {
                let task = tasksFiltered[key]
                if (task.completed) {
                    tasks[key] = task
                }
            });
        return tasks;
    }
};

export default {
 namespaced: true,
 state,
 mutations,
 actions,
 getters
};