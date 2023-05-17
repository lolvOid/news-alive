<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: ' Try again later!',
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  watch: {
    error(value) {
      this.dialog = value
    },
  },
}
</script>

<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <v-card align="center" justify="center">
      <v-card-title class="text-wrap">
        <v-icon class="text-h3" color="red" icon="mdi:mdi-alert-box"></v-icon>

        <div class="text-6">{{ message }}</div>
      </v-card-title>
      <v-card-text> Please try again! </v-card-text>
      <v-card-actions>
        <v-btn color="black" block @click="dialog = false">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
