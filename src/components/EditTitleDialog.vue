<template>
  <!-- Edit Title Dialog -->
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    width="500px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h6">Edit Title</span>
      </v-card-title>
      <v-card-text style="padding: 0 !important">
        <v-container>
          <!-- Textarea for editing the title -->
          <v-textarea
            counter
            ref="editTitle"
            v-model="headlineTitle"
            :rules="rules"
            variant="filled"
            auto-grow
            rows="2"
            row-height="25"
            shaped
          ></v-textarea>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn
          color="black"
          variant="text"
          @click=";(dialog = false), $emit('dialogClosed')"
        >
          Close
        </v-btn>
        <!-- Save button -->
        <v-btn
          color="black"
          variant="text"
          @click="saveTitle(), $emit('dialogClosed')"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  // Component name
  name: 'EditTitleDialog',

  // Component props
  props: {
    id: {
      type: String,
      default: '',
    },
  },

  // Component emits
  emits: ['dialogClosed', 'onSaved'],

  // Computed properties
  computed: {
    ...mapGetters(['getHeadline', 'getVisited']),
    article() {
      return this.getHeadline(this.currentId)
    },
    getId() {
      return this.currentId
    },
    visited() {
      return this.getVisited(this.currentId)
    },
  },

  // Watchers
  watch: {
    // Watch for changes in the 'id' prop
    id(val) {
      // Update the currentId with the new value
      this.currentId = val
      // Update the current headline based on the new id
      this.getCurrentHeadline()
    },
  },

  // Component methods
  methods: {
    ...mapActions(['updateHeadlineTitle']),

    // Get the current headline based on the currentId
    getCurrentHeadline() {
      // Set the currentHeadline based on the article or visited data
      this.currentHeadline = this.article || this.visited
      // Set the headlineTitle to the current headline's title
      this.headlineTitle = this.currentHeadline.title
    },

    // Save the edited title
    saveTitle() {
      // Get the current headline
      const headline = this.article || this.visited

      // Check if the length of the edited title exceeds the maximum limit
      if (this.headlineTitle.length > 255) {
        return // Exit the function if the limit is exceeded
      }

      // Close the dialog
      this.dialog = false
      // Update the headline title through the Vuex action 'updateHeadlineTitle'
      this.updateHeadlineTitle({ id: headline.id, title: this.headlineTitle })
      // Emit the 'onSaved' event to possibly trigger other actions in the parent component
      this.$emit('onSaved')
    },

    // Handle deactivation of the dialog
    onDeactivate() {
      this.dialog = false
    },
  },

  // Component data
  data() {
    return {
      currentHeadline: {}, // Store the current headline object
      currentId: this.id, // Store the current id prop
      rules: [(v) => v.length <= 255 || 'Max 255 characters'], // Validation rules for the textarea
      headlineTitle: 'Title', // Initial value of the edited title
      dialog: false, // Control the visibility of the dialog
    }
  },
}
</script>
