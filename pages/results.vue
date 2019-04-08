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
      console.log('done')
    },
    async asyncData ({$axios, query}) {
      const [doctors, appointmentTypes, tmpData] = await Promise.all([
        $axios.$get(`http://localhost:3000/doctors/speciality/${query.search}`),
        $axios.$get('http://localhost:3001/api/appointment-types', {auth: {username: '17442156', password: 'a4cacb401c53a2ab5621bd7dc9bfaf00'}}),
        $axios.$get(`http://localhost:3000/specialities`)
      ])
      let therapies = []
      console.log("got docs")
      for(const doctor of doctors) {
        doctor.appointmentTypes = []
        for ( const type of appointmentTypes) {
          if(type.calendarIDs) {
            if (doctor.calendarid == type.calendarIDs[0]) {
              doctor.appointmentTypes.push(type)
            }
          }
        }
      }
      console.log("got types")

      for(const doctor of doctors) {
        for(const type of doctor.appointmentTypes){
          const date = new Date()
          const dates = await $axios.$get(`http://localhost:3001/api/availability/dates?appointmentTypeID=${type.id}&month=${date.getFullYear()}-${date.getMonth()+1}&calendarID=${doctor.calendarid}`, {auth: {username: '17442156', password: 'a4cacb401c53a2ab5621bd7dc9bfaf00'}})
          // need to sort the dates in case they have multiple appointment types
          doctor.dates = dates.slice(0, 3)
        }
      }
      console.log("got dates")
      therapies = tmpData.map( speciality => speciality.speciality)
      return {doctors, therapies}
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
