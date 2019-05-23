<template>
  <v-app>
    <div class="mycontainer">
      <section class="profileOverview">
        <Navbar></Navbar>
        <v-container class="profileContainer">
          <v-layout row wrap>
            <v-flex xs12 md4>
              <img class="docAvatar" v-if="doctor" :src="doctor.pictureurl"/>
            </v-flex>
            <v-flex xs12 md3>
              <h2 v-if="doctor">{{doctor.title}} {{doctor.firstname}} {{doctor.lastname}}</h2>
              <p v-if="doctor">{{doctor.speciality}}</p>
            </v-flex>
            <v-flex xs12 md5>
              <no-ssr v-if="doctor && doctor.latlong">
                <l-map class="map" :zoom=15 :center="[52.6446503, 13.5393354]">
                  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                  <l-marker :lat-lng="[doctor.latlong.x, doctor.latlong.y]"></l-marker>
                </l-map>
              </no-ssr>
              <strong v-else>Sorry can't load map</strong>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 md8>
            <v-card color="#effafc">
              <Calendar :doctor="doctor" @successfulBooking="showSuccessSnack" @failedBooking="showFailedSnack"></Calendar>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card color="#effafc">
              <h2>Expertise</h2>
              <div>
                <v-chip label>Label</v-chip>
              </div>
              <div>
                <v-chip label>Label</v-chip>
              </div>
              <div>
                <v-chip label>Label</v-chip>
              </div>
              <div>
                <v-chip label>Label</v-chip>
              </div>
              <h2>Payment Options</h2>
              <span>Cash, Credit Card, Bitcoin</span>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card color="#effafc">
              <div class="descriptioncontainer">
                <section v-for="(description, index) in descriptions" :key="`T-${index}`">
                  <h1 :key="`H-${description.header}`">{{ description.header }}</h1>
                  <p :key="`B-${description.header}`">{{ description.body}}</p>
                </section>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <Yaofooter></Yaofooter>
      <v-snackbar auto-height :color="color" v-model="snackbar" bottom :timeout="4000">
        Buchung war erfolgreich!
      </v-snackbar>
    </div>
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
  .profileOverview {
    height: auto;
  }

  .profileContainer {
    padding: 0;
    background-color: #effafc;
  }

  .docAvatar {
    margin: 30px;
    height: 300px;
    width: 300px;
    border: double 5px transparent;
    border-radius: 150px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4,#074f65);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }



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
    z-index: 1;
    height: 300px;
    width: 500px;
  }

  .descriptioncontainer {
    padding: 20px;
    margin-bottom: 50px;
  }
</style>


