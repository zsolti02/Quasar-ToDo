<template>
<q-card-section class="q-pt-none">
    <q-input v-select-all :value="name" 
        clearable 
        label="name"  ref="name"
        @input="$emit('update:name', $event)"
        :rules="[val => !!val || 'Please add a name']"/>
</q-card-section>
</template>
<script>
// TODO: compare code at end of cousre module
import { selectAll } from 'src/directives/directive-select-all'
export default {
    props:['name'],
    directives:{
        selectAll
    }
}
</script>