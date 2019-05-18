<template>
  <div id="pageEditor">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3 class="pa-0"></h3>
        </v-flex>
        <v-flex sm12>
            <v-text-field
                    name="input-1"
                    label="Title"
                    color="primary"
                    id="title"
            ></v-text-field>
            <v-text-field
                    name="input-1"
                    label="Description"
                    color="primary"
                    id="description"
            ></v-text-field>
            <quill-editor
              class="quill"
              :content="content"
              :options="editorOption"
            >
            </quill-editor>
          <v-text-field
                  name="input-1"
                  label="Template"
                  color="primary"
                  id="template"
          ></v-text-field>
          </v-flex>
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
    height : 520px
</style>
