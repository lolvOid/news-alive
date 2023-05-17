<template>
     <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500px" persistent>
        <v-card>
            <v-card-title>
                <span class="text-h6">Edit Title</span>
            </v-card-title>
            <v-card-text style="padding: 0 !important">
                <v-container>
                    <v-textarea counter ref="editTitle"  
                    v-model="headlineTitle" :rules="rules" variant="filled" auto-grow rows="2" row-height="25" shaped 
                      ></v-textarea>

                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" variant="text" @click="; (dialog = false), $emit('dialogClosed')">
                    Close
                </v-btn>
                <v-btn color="black" variant="text" @click="  saveTitle(), $emit('dialogClosed')">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
    name: 'EditTitleDialog',
    props: {
      
        id:{
            type:String,
            default:''
        }
    },
    emits: ['dialogClosed','onSaved'],

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
    watch: {
        id(val){
            this.currentId= val;
            this.getCurrentHeadline();
        }
    },
   
    methods: {
        ...mapActions(['updateHeadlineTitle']),

        getCurrentHeadline() {
            this.currentHeadline = this.article || this.visited
            this.headlineTitle = this.currentHeadline.title;
         
        },
        saveTitle() {
            const headline = this.article || this.visited

            if (this.headlineTitle.length > 255) {
                return
            }
            this.dialog = false;
            this.updateHeadlineTitle({ id: headline.id, title: this.headlineTitle })
            this.$emit("onSaved"); // set the value of the showSnackbar prop to true
        },
        onDeactivate() {
            this.dialog = false
        },
    },
    data() {
        return {
            currentHeadline: {},
            currentId: this.id,
            rules: [(v) => v.length <= 255 || 'Max 255 characters'],
            headlineTitle: 'Title',
            dialog: false,
            
        }
    },
}
</script>
