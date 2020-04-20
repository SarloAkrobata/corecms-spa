<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-container>
                <vue-dropzone ref="myVueDropzone"
                              id="dropzone"
                              :options="dropzoneOptions"
                              v-on:vdropzone-sending="sendingEvent"></vue-dropzone>
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
                    <v-subheader>Page layout</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Add layout name"
                      v-model="layout"
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
                              <v-btn dark flat @click.native ="dialog = false" @click="createPageRequest">Save</v-btn>
                            </v-toolbar-items>
                          </v-toolbar>
                          <v-flex sm12>
                            <quill-editor
                              v-model="content"
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VWidget from "@/components/VWidget";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import axios from "axios"
export default {
  components: {
    vueDropzone: vue2Dropzone,
    VWidget,
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "Enter your content here"
      },
      dropzoneOptions: {
        url:  process.env.VUE_APP_API_URL + process.env.VUE_APP_IMAGE_UPLOAD,
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      },
      title: "",
      description: "",
      layout: "",
      published: false,
      fullscreen: {
        dialog: false,
        notifications: true,
        sound: true,
        widgets: true
      },
      rules: {
        required: (value) => !!value || 'Required.',
      }
    };
  },
  computed: {},
  methods: {
    createPageRequest () {
      this.loading = true;
      return axios({
        method: "post",
        withCredentials: false,
        data: {
          title: this.title,
          description: this.description,
          layout: this.layout,
          content: this.content,
          published: this.published
        },
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_PAGES_CREATE,
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
    },
    sendingEvent(file, xhr, formData) {
      formData.append("album", '');
    }
  }
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