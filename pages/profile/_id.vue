<template>
  <v-app>
    <section class="mycontainer">
      <Navbar></Navbar>
      <v-card class="docdetails" >
        <v-card class="avatarcard" width="300px" height="300px">
          <v-avatar size="200px">
            <img v-if="doctor" :src="doctor.pictureurl"/>
          </v-avatar>
          <h2 v-if="doctor">{{doctor.title}} {{doctor.firstname}} {{doctor.lastname}}</h2>
          <p v-if="doctor">{{doctor.speciality}}</p>
        </v-card>

          <no-ssr v-if="doctor && doctor.latlong">
            <l-map class="map" :zoom=15 :center="[52.6446503, 13.5393354]">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-marker :lat-lng="[doctor.latlong.x, doctor.latlong.y]"></l-marker>
            </l-map>
          </no-ssr>
          <strong v-else>Sorry can't load map</strong>

      </v-card>

      <v-card>
        <Calendar :doctor="doctor" @successfulBooking="showSuccessSnack" @failedBooking="showFailedSnack"></Calendar>
        <v-divider></v-divider>
        <div class="descriptioncontainer">
          <section v-for="(description, index) in descriptions" :key="`T-${index}`">
            <h1 :key="`H-${description.header}`">{{ description.header }}</h1>
            <p :key="`B-${description.header}`">{{ description.body}}</p>
          </section>
        </div>

      </v-card>


      <Yaofooter></Yaofooter>
      <v-snackbar auto-height :color="color" v-model="snackbar" bottom :timeout="4000">
        Buchung war erfolgreich!
      </v-snackbar>
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
        descriptions: [],
        snackbar: false,
        color: ''
      }
    },
    methods: {
      ...mapGetters({
        getSpecificDoctor: 'localStorage/getSpecificDoctor'
      }),
      showSuccessSnack () {
        this.color = 'success'
        this.snackbar = true
      },
      showFailedSnack () {
        this.color = 'error'
        this.snackbar = true
      }
    },
    computed: {
      doctor () {
        return (this.getSpecificDoctor())(this.$route.params.id)
      }
    },
    async asyncData({ $http, route }) {
      // set auth for yao api
      let descriptions
      const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
      $http.setToken(x.toString('base64'), 'Basic')
      try {
        descriptions = await $http.$get(`${process.env.YAOAPI}/doctors/description/${route.params.id}`)
      } catch (e) {
        console.error('Error with YAO API:', e)
        // show error page
      }
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

  h1 {
    margin-top: 20px;
    font-size: calc(16px + 1.5vw);
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


