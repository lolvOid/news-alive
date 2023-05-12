<template>
    <v-toolbar flat color="white" fixed density="comfortable" elevate-on-scroll>
        <v-btn icon class="hidden-xs-only" href="/">
            <v-icon icon="mdi:mdi-chevron-left" />
        </v-btn>

        <v-toolbar-title>Title</v-toolbar-title>
        <!-- <v-btn class="hidden-xs-only"> Edit </v-btn> -->
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="500px" persistent>
            <template v-slot:activator="{ props }">
                <v-btn class="hidden-xs-only" color="black" v-bind="props"> Edit</v-btn>
            </template>

            <v-card>
                <v-card-title>
                    <span class="text-h6">Edit Title</span>
                </v-card-title>
                <v-card-text style="padding: 0 !important;">
                    <v-container>


                        <v-textarea counter placeholder=" " :rules="rules" :model-value="value" variant="filled" auto-grow
                            rows="2" row-height="25" shaped></v-textarea>

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

        <!-- <v-spacer></v-spacer> -->
    </v-toolbar>
    <v-main class="mt-2">
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" lg="8" sm="12" xs="12" xl="5">
                    <v-card class="mx-auto rounded-0" max-width="100%" flat>
                        <div class="text-h6 mb-1">Headline</div>
                        <div class="text-overline mb-1">Date | Source</div>

                        <v-img class="align-end text-white" height="auto"
                            src="https://dummyimage.com/500x500/dedede/000.jpg?text=Sample" cover>
                        </v-img>

                        <v-card-subtitle class="pt-4"> Subtitle </v-card-subtitle>

                        <v-card-text>
                            <div>Whitehaven Beach</div>

                            <div>Whitsunday Island, Whitsunday Islands</div>
                        </v-card-text>

                        <!-- <v-card-actions>
                            <v-btn color="orange">
                                Share
                            </v-btn>

                            <v-btn color="orange">
                                Explore
                            </v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'Details',
    data() {
        return {
            rules: [(v) => v.length <= 255 || 'Max 255 characters'],
            value: 'Title',
            dialog: false,
        }
    },
    methods: {},
}
</script>

<style type="css"></style>
