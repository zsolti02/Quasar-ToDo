<template>
    <transition appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
    >
        <div :class="{'q-mt-md' : !settings.showTasksInOneList }">
            <ListHeader v-if="!settings.showTasksInOneList"  bgColor="bg-green">
                Complete
            </ListHeader>
            
            <q-list separator bordered>
            <Task
                v-for="(task, key) in tasksComplete"
                :key="key"
                :task="task"
                :id="key"
            ></Task>
            </q-list>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    components: {
    Task: require("components/Tasks/Task.vue").default,
    ListHeader: require('components/Shared/ListHeader.vue').default
    },
    props: ['tasksComplete'],
    computed: {
			...mapGetters('settings', ['settings'])
		}
}
</script>