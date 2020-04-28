<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Type something"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table :loading="loading"
                :headers="complex.headers"
                :search="search"
                :items="complex.items[0]"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                select-all
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                <td>
                    <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  >  </v-checkbox></td>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.layout }}</td>
                  <td>{{ props.item.published }}</td>
                  <td>
                    <v-btn depressed outline icon fab light color="grey" small>
                      <v-icon v-on:click="editPage(props.item.id)">edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab light color="grey" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      search: "",
      complex: {
        selected: [],
        headers: [
          {
            text: "ID",
            value: "id"
          },
          {
            text: "Title",
            value: "title"
          },
          {
            text: "Template",
            value: "layout"
          },
          {
            text: "Published",
            value: "published"
          },
          {
            text: "Edit",
            value: "edit"
          }
        ],
        items: []
      }
    };
  },
  mounted() {
    this.getPages();
  },
  methods: {
    getPages() {
      this.loading = true;
      return axios({
        method: "get",
        withCredentials: false,
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_PAGES_GET_ALL,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then((response) => {
          this.complex.items.push(response.data.data);
          this.loading = false;
        })
        .catch(function() {
          return false;
        });
    },
    editPage(id) {
      this.$router.push({ path: '/pages/edit/'+id });
    }
  }
};
</script>
