<template>
    <transition name="fade" appear>
    <div id="page-timepickers">
        <v-container grid-list-xl fluid>
            <v-layout row wrap >
                <v-flex lg3 sm12  v-for="image in images" :key="image.name">
                    <v-flex>
                        <v-card>
                            <v-card-media src="https://via.placeholder.com/450" height="250">
                                <h4 class="white--text pa-3">
                                    {{image.name}}
                                </h4>
                            </v-card-media>
                            <v-card-text>
                                <div>
                                    Alt tag: {{image.alt}}
                                </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn flat small>Edit image</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
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
                data: null,
                images: [
                    {
                        name: "Jankov Kamen",
                        alt: "jankov kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                    {
                        name: "Pogled",
                        path: "/path/to/image"
                    },
                    {
                        name: "Jankov Kamen",
                        path: "/path/to/image"
                    },
                ]
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