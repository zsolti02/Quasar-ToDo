<template>
    <q-select class="col q-mb-md q-mr-sm"  rounded outlined dense
        v-model="sortBy" :options="options" label="Sort by:" 
        emit-value map-options/>
</template>
<script>
	import { mapState, mapActions } from 'vuex'

	export default {
		data () {
		  return {
		    options: [
		      {
		      	label: 'Name',
		      	value: 'name'
		      },
		      {
		      	label: 'Date',
		      	value: 'dueDate'
		      }
		    ]
		  }
		},
		computed: {
			...mapState('tasks', ['sort']),
			sortBy: {
				get() {
					return this.sort
				},
				set(value) {
					this.setSort(value)
				}
			}
		},
		methods: {
			...mapActions('tasks', ['setSort'])
		}
	}
</script>
<style scoped>
.q-select{
    flex: 0  0 120px;
}
</style>