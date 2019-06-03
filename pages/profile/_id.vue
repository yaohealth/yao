<template>
  <v-app>
    <v-container class="mycontainer">
      <Navbar></Navbar>
      <v-layout row wrap>
        <v-flex xs12>
          <v-container class="profileContainer">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <img class="docAvatar" v-if="doctor" :src="doctor.pictureurl"/>
              </v-flex>
              <v-flex xs12 md3 class="docdetails">
                <p class="gradientText" v-if="doctor">{{doctor.title}} {{doctor.firstname}} {{doctor.lastname}}</p>
                <p v-if="doctor && Array.isArray(doctor.speciality)">{{doctor.speciality.slice(0,3).join(', ')}}</p>
                <p v-if="doctor && !Array.isArray(doctor.speciality)">{{doctor.speciality}}</p>
                <p v-if="doctor">{{doctor.street}} {{ doctor.housenumber}}</p>
                <p v-if="doctor">{{doctor.zipcode}} {{ doctor.city}}</p>
                <section>
                  <a v-if="doctor && doctor.contactemail" :href="'mailto:'+doctor.contactemail">
                    <fa class="socialicon" :icon="['far', 'envelope-open']"/>
                  </a>
                  <a v-if="doctor && doctor.facebook" :href="doctor.facebook">
                    <fa class="socialicon" :icon="['fab', 'facebook']"/>
                  </a>
                  <a v-if="doctor && doctor.twitter" :href="doctor.twitter">
                    <fa class="socialicon" :icon="['fab', 'twitter']"/>
                  </a>
                  <a v-if="doctor && doctor.instagram" :href="doctor.instagram">
                    <fa class="socialicon" :icon="['fab', 'instagram']"/>
                  </a>
                  <a v-if="doctor && doctor.youtube" :href="doctor.youtube">
                    <fa class="socialicon" :icon="['fab', 'youtube']"/>
                  </a>
                </section>
              </v-flex>
              <v-flex xs12 md5 class="mapContainer">
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
        </v-flex>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 md8 class="calenderContainer">
              <v-card color="#effafc">
                <Calendar :doctor="doctor" @successfulBooking="showSuccessSnack"
                          @failedBooking="showFailedSnack"></Calendar>
              </v-card>
            </v-flex>

            <v-flex xs12 md4 class="infobox">
              <v-card color="#effafc">
                <p class="gradientText">Expertise</p>
                <template v-if="doctor && Array.isArray(doctor.speciality)">
                  <div v-for="speciality in doctor.speciality">
                    <v-chip label color="#64c9c5" text-color="white">{{speciality}}</v-chip>
                  </div>
                </template>
                <div v-if="doctor && !Array.isArray(doctor.speciality)">
                  <v-chip label color="#64c9c5" text-color="white">{{doctor.speciality}}</v-chip>
                </div>
                <div class="paymentOptions">
                  <p class="gradientText">Payment Options</p>
                  <span>Cash, Credit Card</span>
                </div>
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
      </v-layout>
      <Yaofooter></Yaofooter>
    </v-container>
    <v-snackbar auto-height :color="color" v-model="snackbar" bottom :timeout="4000">
      Buchung war erfolgreich!
    </v-snackbar>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Calendar from '@/components/Calendar'
  import Yaofooter from '@/components/Yaofooter'
  import {mapGetters} from 'vuex'

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
      showSuccessSnack() {
        this.color = 'success'
        this.snackbar = true
      },
      showFailedSnack() {
        this.color = 'error'
        this.snackbar = true
      }
    },
    computed: {
      doctor() {
        return (this.getSpecificDoctor())(this.$route.params.id)
      }
    },
    async asyncData({$http, route}) {
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
  $yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);

  .profileContainer {
    padding: 0;
    background-color: #effafc;
    height: 300px;

    p {
      font-size: 24px;
    }

    .socialicon {
      width: 32px;
      height: 32px;
      color: #7f828b;
    }
  }

  .docAvatar {
    /*margin: 30px;*/
    /*height: 300px;*/
    width: 300px;
    border: double 5px transparent;
    border-radius: 150px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4, #074f65);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transform: scale(1.1); /*need to do a media query for this to remove it on break*/
  }

  .mapContainer {
    height: 300px;
  }

  .avatarcard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }

  .docdetails {
    text-align: left;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .gradientText {
    text-transform: uppercase;
    font-size: 40px !important;
    background-image: $yaoGradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .infobox {
    .v-chip {
      text-transform: uppercase;
      font-size: 16px;
    }

    .paymentOptions {
      padding-bottom: 20px;
    }
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
    width: 500px;
  }

  .descriptioncontainer {
    padding: 20px;
    margin-bottom: 50px;
  }
</style>


