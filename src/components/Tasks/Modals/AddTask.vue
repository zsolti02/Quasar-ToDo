<template>
  <q-card>
    <ModalHeader>Add Task</ModalHeader>
    <q-space/>
    <q-form @submit.prevent="submitForm">
      <ModalTaskName ref="modalTaskName" :name.sync="taskToSumbit.name"/>
      <ModalTaskDetails :details.sync="taskToSumbit.details"/>
      <ModalTaskDate :dueDate.sync="taskToSumbit.dueDate" />
      <ModalTaskTime v-if="taskToSumbit.dueDate" :dueTime.sync="taskToSumbit.dueTime"/>
      <ModalButtons/>
    </q-form>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
export default {
  mixins: [mixinAddEditTask],
    data(){
      return{
        taskToSumbit: {
          name: "",
          details: "",
          dueDate: "",
          dueTime: "",
          completed: false
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      
      submitTask() {
        this.addTask(this.taskToSumbit)
        this.$emit('close')
      }
    }
}
</script>
<style lang="scss" scoped></style>