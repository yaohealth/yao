<template>
  <section class="mycontainer">
    <Navbar></Navbar>
    <p class="subtitle" v-if="doctors.length">You searched for: {{ search}}</p>
    <p class="subtitle" v-if="!doctors.length">Sorry no results for: {{ search }}</p>
    <br>
    <v-layout align-center justify-space-around row>
      <Doc v-for="doctor in doctors" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.id" :calendar-id="doctor.calendarid" :dates="doctor.dates"></Doc>
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
        search: '',
        doctors: []
      }
    },
    created() {
      this.search = this.$route.query.search
    },
    async asyncData ({$axios, query}) {
      return { doctors: await $axios.$get(`${process.env.YAOAPI}/doctors/speciality/${query.search}`)}
    }
  }
</script>

<style lang="scss" scoped>
  .mycontainer {
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
