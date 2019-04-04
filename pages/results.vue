<template>
  <section class="container">
    <Navbar></Navbar>
    <p class="subtitle" v-if="doctors.length">You searched for: {{ search}}</p>
    <p class="subtitle" v-if="!doctors.length">Sorry no results for: {{ search }}</p>
    <br>
    <v-layout align-center justify-space-around row>
      <Doc v-for="doctor in doctors" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.id"></Doc>
    </v-layout>
  </section>
</template>

<script>
  import Doc from '@/components/Doc'
  import Navbar from '@/components/Navbar'
  export default {
    components: {
      Doc,
      Navbar
    }, data: function () {
      return {
        search: ''
      }
    },
    created() {
      this.search = this.$route.query.search
    },
    asyncData ({$axios, query}) {
      return $axios.$get(`http://localhost:3000/doctors/speciality/${query.search}`).then(data => {
        return {doctors : data}
      }, reason => {
        return {doctors: []}
      })
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    text-align: center;
    padding: 0;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .logo {
    width: 400px;
    padding-bottom: 100px;
  }

</style>
