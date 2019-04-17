<template>
  <v-app>
    <section class="mycontainer">
      <Navbar></Navbar>
      <v-card class="docdetails" >
        <v-card class="avatarcard" width="300px" height="300px">
          <v-avatar size="200px">
            <img :src="doctor.pictureurl"></img>
          </v-avatar>
          <h2 v-if="doctor">{{doctor.title}} {{doctor.firstname}} {{doctor.lastname}}</h2>
          <p v-if="doctor">{{doctor.speciality}}</p>
        </v-card>

        <!--use the adress to get the coordinates and set the map-->

          <no-ssr>
            <l-map class="map" :zoom=15 :center="[52.6446503, 13.5393354]">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-marker :lat-lng="[52.6446503, 13.5393354]"></l-marker>
            </l-map>
          </no-ssr>

      </v-card>

      <v-card>
        <!--pass the final formated items-->
        <Calendar :dates="formatedDates" :appointmentTypes="doctor.appointmentTypes"></Calendar>
      </v-card>


      <v-card class="descriptioncontainer">
        <v-card-text v-for="(description, index) in descriptions" :key="`T-${index}`">
          <h1 :key="`H-${description.header}`">{{ description.header }}</h1>
          <p :key="`B-${description.header}`">{{ description.body}}</p>
        </v-card-text>
      </v-card>
      <Yaofooter></Yaofooter>
    </section>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Calendar from '@/components/Calendar'
  import Yaofooter from '@/components/Yaofooter'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Navbar,
      Yaofooter,
      Calendar
    },
    data() {
      return {
        doctor: {},
        allDates: this.$route.params.allDates || '',
        descriptions: [],
        formatedDates: []
      }
    },
    methods: {
      ...mapGetters({
        getSpecificDoctor: 'localStorage/getSpecificDoctor'
      }),
      formatTimes(times) {
        return times.map(day => {
          const fullDate = this.$dayjs(day[0].time)
          return {
            date: fullDate.format('DD'),
            weekday: fullDate.format('dd'),
            month: fullDate.format('MMMM'),
            times: day.map(time => {

              return this.$dayjs(time.time).format('HH:mm')

            }) // "2019-04-16T09:00:00+0200"
          }
        })
      }
    },
    async created() {
      this.doctor = (this.getSpecificDoctor())(this.$route.params.id)
      let dateRequests =[]
      // request all times for the next 5 next days
      for(const date of this.doctor.allDates) {
        dateRequests.push(this.$axios.$get(`${process.env.ACUITYPROXY}/api/availability/times?appointmentTypeID=${this.doctor.appointmentTypes[0].id}&calendarID=${this.doctor.calendarid}&date=${date.date}`, {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}}))
      }
      let times = await Promise.all(dateRequests)

      this.formatedDates = this.formatTimes(times)
      console.log('formated dates')
    },
    async asyncData({ $axios, route }) {
      const descriptions = await $axios.$get(`${process.env.YAOAPI}/doctors/description/${route.params.id}`)

      return {descriptions}
    }
  }
</script>

<style lang="scss" scoped>
  .avatarcard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }

  .docdetails {
    height: 50vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  v-card__title {
    padding-top: 0 !important;
    padding-bottom: 20px !important;
  }

  p {
    margin: 0;
  }

  .map {
    width: 50vw;
    height: 300px;
    margin-right: 20px;
    z-index: 1;
  }

  .descriptioncontainer {
    padding: 20px;
    margin-bottom: 50px;
  }


</style>


