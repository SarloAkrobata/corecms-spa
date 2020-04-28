<template>
    <div id="page-timepickers">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg6 sm12>
                    <v-widget title="Menu manager">
                        <div slot="widget-content">

                            <drag-menu></drag-menu>

                        </div>
                    </v-widget>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import VWidget from '@/components/VWidget';
    import DragMenu from '@/components/DragMenu';
    export default {
        components: {
            VWidget,
            DragMenu
        },
        data () {
            return {

            };
        },

        methods: {

        }
    };
</script>