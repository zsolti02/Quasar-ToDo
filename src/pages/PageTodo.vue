<template>
  <q-page class="q-pa-md column">
    <!-- <div class="q-pa-md absolute full-width full-height "> -->
      <template v-if="tasksDownloaded">
        <div class="row">
        <Sort/>
        <Search/>
      </div>
      <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksComplete).length">
        <q-icon color="red" name="not_interested"/>
        Your search didn't return a results
        <q-icon color="red" name="not_interested"/>
      </p>
      <div class="relative-position">
        <q-scroll-area class="q-scroll-area-tasks">
          <NoTasks  v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></NoTasks>
          <TasksTodo :tasksTodo="tasksTodo"
            v-if="Object.keys(tasksTodo).length"
          ></TasksTodo>
          <TasksComplete class="q-mb-xl" v-if="Object.keys(tasksComplete).length"
            :tasksComplete="tasksComplete" >
          </TasksComplete>
        </q-scroll-area>
      </div>
      <div class="absolute-bottom text-center q-pb-md q-mb-xl no-pointer-events">
        <q-btn ripple fab round class="all-pointer-events" @click="showAddTask = true"
          color="primary" size="xl" icon="add"/>
      </div>
      </template>
      <template v-else>
        <q-spinner-gears class="absolute-center" size="8rem" color="orange-3" />
      </template>
    <!-- </div> -->
    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false"/>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  components: {
    TasksTodo: require("components/Tasks/TasksTodo.vue").default,
    TasksComplete: require("components/Tasks/TasksComplete.vue").default,
    Search: require("components/Tasks/Tools/Search.vue").default,
    Sort: require("components/Tasks/Tools/Sort.vue").default,
    AddTask: require("components/Tasks/Modals/AddTask.vue").default,
    NoTasks: require("components/Tasks/NoTasks.vue").default
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksComplete"]),
    ...mapGetters("settings", ["settings"]),
    ...mapState("tasks", ['search','tasksDownloaded'])
  },
  mounted(){
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  }
};
</script>
<style scoped>

.q-scroll-area-tasks {
  width: 100%;
  height: 550px;
  
}
</style>
