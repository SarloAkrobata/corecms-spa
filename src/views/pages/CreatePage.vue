<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Page title</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="title"
                      label="Add title here"
                      v-model="title"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Page description </v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="description"
                      label="Add description"
                      v-model="description"
                      value="here"
                      color="teal"
                      multi-line
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Page template</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Add template name"
                      v-model="template"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-flex xl4>
                  <v-widget title="Add content here">
                    <div slot="widget-content">
                      <v-switch label="Published" v-model="published" color="success" class="desno"></v-switch>
                      <v-dialog v-model="fullscreen.dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                        <v-btn color="primary" dark slot="activator">Enter content</v-btn>
                        <v-card>
                          <v-toolbar dark color="primary">
                            <v-btn icon @click.native="fullscreen.dialog = false" dark>
                              <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Content section</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                              <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                            </v-toolbar-items>
                          </v-toolbar>
                          <v-flex sm12>
                            <quill-editor
                              class="quill"
                              :content="content"
                              :options="editorOption"
                            >
                            </quill-editor>
                          </v-flex>

                        </v-card>
                      </v-dialog>
                    </div>
                  </v-widget>
                </v-flex>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    VWidget,
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "Enter your content here"
      },
      title: "",
      description: "",
      template: "",
      published: false,
      fullscreen: {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      },
      rules: {
        required: (value) => !!value || 'Required.',
      }
    };
  },
  computed: {},
  methods: {}
};
</script>
<style scoped lang="css">
.desno {
  float: right;
}
.quill {
  height : 520px
}
</style>