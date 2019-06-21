<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Log In</v-card-title>
      <v-card-text>
        <v-form @keyup.enter="login">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="username"/>
          <v-text-field label="Password" v-model="password" type="password"/>
          <v-btn @click="login" :loading="loading" :disabled="loading">Log In</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    layout: 'fullscreen',
    data () {
      return {
        username: '',
        password: '',
        alert: null,
        loading: false
      }
    },
    computed: {
    },
    methods: {
      async login() {
        this.alert = null
        this.loading = true
        this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password
        }).then(result => {
          this.alert = {type: 'success', message: result.message}
          this.loading = false
          this.$router.push({name: 'admin'})
        }).catch(error => {
          this.loading = false
          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.message || error.reponse.status}
          }
        })

      }
    }
  }
</script>