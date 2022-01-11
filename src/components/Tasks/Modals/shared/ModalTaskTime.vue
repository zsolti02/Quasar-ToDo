<template>
    <q-card-section>
        <q-input :value="dueTime" @input="$emit('update:dueTime', $event)" clearable label="due time">
            <template v-slot:append>
            <q-icon color="primary" name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time :value="dueTime" @input="$emit('update:dueTime', $event)" />
                </q-popup-proxy>
            </q-icon>
            </template>
        </q-input>
    </q-card-section>
</template>
<script>
export default {
    props:['dueTime','dueDate']
}
</script>