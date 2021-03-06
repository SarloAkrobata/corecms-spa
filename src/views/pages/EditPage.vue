<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget v-bind:title="this.topTitle + this.title">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Page title</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field :loading="loading"
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
                    <v-textarea :loading="loading"
                      name="description"
                      label="Add description"
                      v-model="description"
                      value="here"
                      color="teal"
                      multi-line
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Page layout</v-subheader>
                  </v-flex>
                  <v-flex xs6>
                    <v-select :loading="loading"
                            :items="layouts[0]"

                            v-model="layout"
                            label="Select"
                            item-text="name"
                            item-value="name"
                            single-line
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Images</v-subheader>
                  </v-flex>
                  <v-flex xs6>
                    <v-btn  light @click="editImages">Edit images</v-btn>
                  </v-flex>
                </v-layout>
                <v-flex xl4>
                  <v-widget title="Add content here">
                    <div slot="widget-content">
                      <v-switch label="Published" v-model="published" color="success" class="desno"></v-switch>
                      <v-dialog v-model="fullscreen.dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                        <v-btn color="primary" dark slot="activator">Edit content</v-btn>
                        <v-card>
                          <v-toolbar dark color="primary">
                            <v-btn icon @click.native="fullscreen.dialog = false" dark>
                              <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Content section</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                              <v-btn dark flat @click.native ="fullscreen.dialog = false">Save</v-btn>
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
                <v-container>
                  <v-flex>
                    <v-btn color="primary" class="desno" @click="">Update page</v-btn>
                  </v-flex>
                </v-container>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
            :timeout="3000"
            bottom
            left
            :color="snackbar.color"
            v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
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
      loading: true,
      topTitle: "Edit: ",
      title: "",
      description: "",
      layout: "",
      published: false,
      content: "",
      layouts: [],
      album_id: null,
      snackbar: {
        show: false,
        text: 'ERROR',
        color: 'green',
      },
      editorOption: {
        placeholder: "Enter your content here"
      },
      dropzoneOptions: {
        url:  process.env.VUE_APP_API_URL + process.env.VUE_APP_IMAGE_UPLOAD,
        thumbnailWidth: 150,
        acceptedFiles: 'image/*,application/pdf,.doc',
        maxFilesize: 5,
        maxFiles: 50,
        uploadMultiple: true,
        parallelUploads: 50,
        autoProcessQueue: false,
        addRemoveLinks: true,
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      },
      basic: {
        dialog: false
      },
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
  mounted() {
    this.getPageData();
    this.getLayouts();
  },
  methods: {
    createPageRequest (albumId, pageId) {
      this.loading = true;
      return axios({
        method: "put",
        withCredentials: false,
        data: {
          title: this.title,
          description: this.description,
          layout: this.layout,
          content: this.content,
          published: this.published,
          album_id: albumId
        },
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_PAGES_UPDATE + pageId,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then(() => {
          setTimeout(()=>{
            this.snackbar.show = true;
            this.snackbar.text = "Success";
            this.snackbar.color = "green";
            // this.$router.replace({ path: '/pages/all' });
          },1000);
        })
        .catch(function() {
          return false;
        });
    },
    editImages() {
      let albumId = this.album_id;
      if (albumId === null) {
        this.createAlbum(this.title)
        .then((newAlbumId) => {
          this.createPageRequest(newAlbumId, this.$route.params.id);
          this.$router.replace({ path: '/albums/edit/' + newAlbumId });
        });
      } else {
        this.$router.replace({ path: '/albums/edit/' + albumId });
      }
    },
    createAlbum(name) {
      return axios({
        method: "post",
        withCredentials: false,
        data: {
          name: name,
        },
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_ALBUM_CREATE_AND_RETURN,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then((response) => {
          return response.data.album_id;
        })
        .catch(function() {
          return false;
        });
    },
    getLayouts () {
      this.loading = true;
      return axios({
        method: "get",
        withCredentials: false,
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_GET_LAYOUTS,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then((response) => {
          this.layouts.push(response.data.layouts);
        })
        .catch(function() {
          return false;
        });
    },
    getPageData() {
      this.loading = true;
      return axios({
        method: "get",
        withCredentials: false,
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_PAGES_GET_ALL + '/' + this.$route.params.id,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.token
        }
      })
              .then((response) => {
                this.title  = response.data.data.title;
                this.description  = response.data.data.description;
                this.layout = response.data.data.layout;
                this.published = response.data.data.published;
                this.content = response.data.data.content;
                this.album_id = response.data.data.album_id;
                this.loading = false;
              })
              .catch(function() {
                return false;
              });
    },
    validate() {
      if (this.title === '') {
        this.snackbar.show = true;
        this.snackbar.text = "Title is required";
        this.snackbar.color = "red";
        return false;
      }
      if (this.description === '') {
        this.snackbar.show = true;
        this.snackbar.text = "Description is required";
        this.snackbar.color = "red";
        return false;
      }
      if (this.layout === '') {
        this.snackbar.show = true;
        this.snackbar.text = "Layout is required";
        this.snackbar.color = "red";
        return false;
      }
      if (this.content === '') {
        this.snackbar.show = true;
        this.snackbar.text = "Content is required";
        this.snackbar.color = "red";
        return false;
      }

      return true;
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