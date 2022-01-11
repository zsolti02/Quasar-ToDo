<template>
     <q-input v-select-all class="col q-mb-md" outlined rounded autofocus
        dense clearable clear-icon="close" label="search" 
        v-model="searchField"
        @keyup.esc="searchField = ''">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { selectAll } from 'src/directives/directive-select-all'
export default {
    
    computed: {
        ...mapState( 'tasks', ['search']),
        searchField: {
            get(){
                return this.search
            },
            set(value){
                this.setSearch(value)
            }
        },
        
    },
    methods: {
        ...mapActions('tasks', ['setSearch'])
    },
    directives: { selectAll}
}
</script>
