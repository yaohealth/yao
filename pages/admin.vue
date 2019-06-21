<template>
  <section>
  hello {{user}}
    <v-btn color="primary" flat @click="$store.dispatch('auth/fetch')">Check Me</v-btn>
    <v-btn color="primary" flat @click="logOut">Log Out</v-btn>
  </section>
</template>

<script>
  export default {

    computed: {
      user () { return (this.$store.state.auth || {}).user || null }
    },
    methods: {
      logOut () {
        this.$store.dispatch('auth/reset').then(() => {
          this.$router.push('/')
        })}
    }
  }
</script>