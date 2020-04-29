<template>
    <transition name="fade" appear>
    <div id="page-timepickers">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg6 sm12>
                    <v-widget title="Menu manager">
                        <div slot="widget-content">
                            <v-subheader class="pa-0">Drag & Drop re-order menu items. Make unlimited depending tree.</v-subheader>
                            <drag-menu @sortedItems="store"></drag-menu>
                            <v-btn color="primary" @click="send">Save</v-btn>
                        </div>
                    </v-widget>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
    </transition>
</template>

<script>
    import VWidget from '@/components/VWidget';
    import DragMenu from '@/components/DragMenu';
    import axios from "axios"
    export default {
        components: {
            VWidget,
            DragMenu
        },
        data () {
            return {
                data: null
            };
        },

        methods: {
            store(value) {
                this.data = value;
            },
            send() {
                this.loading = true;
                return axios({
                    method: "post",
                    withCredentials: false,
                    data: {
                        data: this.data
                    },
                    url: process.env.VUE_APP_API_URL + process.env.VUE_APP_MENU_ITEMS_POST,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: "Bearer " + localStorage.token
                    }
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(function() {
                        return false;
                    });
            }
        }
    };
</script>

<style>
    .fade-enter-active {
        transition: opacity 2s;
    }
    .fade-enter /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>