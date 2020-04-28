<!-- this is an example -->
<template lang="pug">
div
  h2 Main menu
  DraggableTree(:data="originalData" draggable crossTree ref="tree1" @change="tree1Change")
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.name}}
</template>

<script>
    import {DraggableTree} from 'vue-draggable-nested-tree'
    export default {
        components: {DraggableTree},
        data() {
            return {
                originalData: [
                    {route: "about", name: "About"},
                    {route: "kontakt", name: "Kontakt"},
                    {route: "services", name: "Services", "children": [
                            {route: "pranje", name: "Pranje"},
                            {route: "poliranje", name: "Poliranje", "children": [
                                    {route: "sitna-smirgla", name: "Sitna smirgla"},
                                    {route: "krupna-smirgla", name: "Krupna smirgla"}
                                ]},
                            {route: "redovan-servis", name: "Redovan servis", "children": [
                                    {route: "veliki", name: "Veliki servis"}
                                ]},
                            {route: "mali", name: "Mali servis"},
                            {route: "kontrolni", name: "Kontrolni servis"}
                        ]}
                ],
                data: null,
            }
        },
        // computed: {},
        // watch: {},
        methods: {
            tree1Change(node, targetTree) {
                this.data = targetTree.getPureData()
                console.log(this.data)
            },
        },
        // created() {},
        // mounted() {},
    }
</script>

<style>
    #app {
        padding: 50px;
    }

    .he-tree{
        border: 1px solid #ccc;
        padding: 20px;
    }
    .tree-node{
    }
    .tree-node-inner{
        padding: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    .draggable-placeholder{
    }
    .draggable-placeholder-inner{
        border: 1px dashed #0088F8;
        box-sizing: border-box;
        background: rgba(0, 136, 249, 0.09);
        color: #0088f9;
        text-align: center;
        padding: 0;
        display: flex;
        align-items: center;
    }

    .tree-node-inner-back:hover{
        background: #cfd8ff;
    }


    .tree-node-inner{
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 10px 15px;
        background: #f0f0ff;
    }
    .draggable-placeholder-inner{
        background-color: #cfd8ff;
    }

</style>