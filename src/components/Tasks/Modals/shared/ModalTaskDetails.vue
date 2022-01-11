<template>
    <q-card-section>
        <q-input v-select-all :value="details" @input="$emit('update:details', $event)" clearable label="details"/>
      </q-card-section>
</template>
<script>
import { selectAll } from 'src/directives/directive-select-all'
export default {
    props:['details'],
    directives:{ selectAll}
}
</script>