<template>
  <section class="mycontainer">
    <Navbar></Navbar>
    <p class="subtitle" v-if="doctors.length">You searched for: {{ search}}</p>
    <p class="subtitle" v-if="!doctors.length">Sorry no results for: {{ search }}</p>
    <br>
    <v-layout align-baseline justify-space-around row wrap>
      <Doc v-for="doctor in doctors" :id="doctor.iddoctorprofile" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.id" :calendar-id="doctor.calendarid" :dates="doctor.dates"></Doc>
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
    },
    watchQuery: ['search'],
    data: function () {
      return {
        search: this.$route.query.search || '',
        doctors: []
      }
    },
    created() {
      this.search = this.$route.query.search
    },
    async asyncData ({$http, query}) {
      let result = {}
      if (query.search === '*') {
        result.doctors = await $http.$get(`${process.env.YAOAPI}/doctors/`)
      } else {
        result.doctors = await $http.$get(`${process.env.YAOAPI}/doctors/speciality/${query.search}`)
      }
      return result
    }
  }
</script>

<style lang="scss" scoped>

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
