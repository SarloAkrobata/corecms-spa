<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/default.png" alt="Core cms" width="300" height="300">
                  <h1 class="flex my-4 primary--text">Login</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    model: {
      username: 'nikola1@gmail.com',
      password: '123'
    }
  }),

  methods: {
    login () {
      this.loading = true;
      return axios({
        method: "post",
        withCredentials: false,
        data: {
          email: this.model.username,
          password: this.model.password
        },
        url: process.env.VUE_APP_API_URL + process.env.VUE_APP_LOGIN,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      })
        // .then(() => this.$router.push("/dashboard"))
          .then(data => {
            localStorage.token = data.data.token;
            this.$router.push("/dashboard");
          })
        .catch(function() {
          return false;
        });
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
