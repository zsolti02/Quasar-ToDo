<template>
    <q-card-section>
        <q-input :value="dueDate" @input="$emit('update:dueDate', $event)" clearable label="due date">
          <template v-slot:append>
            <q-icon color="primary" name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date :value="dueDate" @input="$emit('update:dueDate', $event)"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
</template>
<script>
export default {
    props:['dueDate']
}
</script>