<template>
  <div id="pageEditor">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-text-field
            name="input-1"
            label="Title"
            color="primary"
            id="title"
          ></v-text-field>
        </v-flex>

        <v-flex sm12>
          <v-text-field
            name="input-1"
            label="Description"
            color="primary"
            id="description"
          ></v-text-field>
        </v-flex>

        <v-flex sm12>
          <quill-editor
            class="quill"
            :content="content"
            :options="editorOption"
          >
          </quill-editor>
        </v-flex>

        <v-flex sm12>
          <v-text-field
            name="input-1"
            label="Template"
            color="primary"
            id="template"
          ></v-text-field>
        </v-flex>

        <v-flex sm12>
          <v-subheader class="pa-0">Published: {{s1}} </v-subheader>
          <v-switch :label="s1 ? 'On': 'Off'" v-model="s1"></v-switch>
        </v-flex>
        <v-btn color="primary">Save</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      s1: false,
      content: '',
      editorOption: {

      }
    };
  },
  computed: {
  },  

  methods: {
  }
};
</script>
<style lang="stylus" scoped>
  .quill
    height : 320px
    margin-bottom : 20px
</style>
