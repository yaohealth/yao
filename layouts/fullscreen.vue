<template>
  <v-app class="mycontainer">
    <Navbar/>
    <v-container fill-height>
      <nuxt/>
    </v-container>
    <Yaofooter/>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Yaofooter from '@/components/Yaofooter'

  export default {
    components: {
      Navbar,
      Yaofooter
    }
  }
</script>