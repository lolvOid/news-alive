<template>
    <v-toolbar flat color="white" fixed density="comfortable" elevate-on-scroll>
        <v-btn icon="mdi:mdi-chevron-left" class="hidden-xs-only" @click="$router.back()">
        </v-btn>

        <v-toolbar-title v-if="article">{{ article.title }}</v-toolbar-title>

        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500px" persistent>
            <template v-slot:activator="{ props }">
                <v-btn class="hidden-xs-only" color="black" v-bind="props"> Edit</v-btn>
            </template>

            <v-card>
                <v-card-title>
                    <span class="text-h6">Edit Title</span>
                </v-card-title>
                <v-card-text style="padding: 0 !important">
                    <v-container>
                        <v-textarea v-if="article" counter placeholder=" " :rules="rules" :model-value='article.title'
                            variant="filled" auto-grow rows="2" row-height="25" shaped></v-textarea>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="black" variant="text" @click="dialog = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-toolbar>
</template>
<script>

import { mapGetters } from 'vuex'
export default {
    name: "HeadlineToolbar",
    props: ['id', 'title'],
    data() {
        return {
            rules: [(v) => v.length <= 255 || 'Max 255 characters'],
            value: 'Title',
            dialog: false,
        }
    },
    computed:{

...mapGetters(['getHeadline']),
    article() {
      return this.getHeadline(this.getId)
    },
    getId() {
      return parseInt(this.$route.params.id)
    },
    },
    mounted() {

    }
}
</script> 