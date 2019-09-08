<template>
  <v-app class="mycontainer">
    <v-container pa-0>
      <Navbar></Navbar>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-container class="profileContainer">
              <v-layout row wrap>
                <v-flex xs12 md6 lg4>
                  <v-img class="docAvatar" v-if="doctor && doctor.pictureurl" :src="doctor.pictureurl" aspect-ratio="1"/>
                  <v-img class="docAvatar" v-else src="https://via.placeholder.com/150" aspect-ratio="1"/>
                </v-flex>
                <v-flex xs12 md6 lg3 class="docdetails">
                  <p class="gradientText" v-if="doctor">{{doctor.title}} {{doctor.firstname}} {{doctor.lastname}}</p>
                  <p v-if="doctor && Array.isArray(doctor.speciality)">
                    {{doctor.speciality.slice(0,3).map(thrpy => $t(`therapy.${thrpy}`)).join(', ')}}
                  </p>
                  <p v-if="doctor && !Array.isArray(doctor.speciality)">{{$t(`therapy.${doctor.speciality}`)}}</p>
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
                <v-flex xs12 lg5 class="mapContainer">
                  <no-ssr v-if="doctor && doctor.latlong">
                    <l-map class="map" :zoom=15 :center="[doctor.latlong.x, doctor.latlong.y]">
                      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                      <l-marker :lat-lng="[doctor.latlong.x, doctor.latlong.y]"></l-marker>
                    </l-map>
                  </no-ssr>
                  <strong v-else>Sorry can't load map</strong>
                </v-flex>
              </v-layout>
            </v-container>
            <v-flex xs12 md8 class="calenderContainer">
              <v-card>
                <Calendar :doctor="doctor" @successfulBooking="showSuccessSnack"
                          @failedBooking="showFailedSnack"></Calendar>
              </v-card>
            </v-flex>

            <v-flex xs12 md4 class="infobox">
              <v-card>
                <p class="gradientText">Expertise</p>
                <template v-if="doctor && Array.isArray(doctor.speciality)">
                  <div v-for="speciality in doctor.speciality">
                    <v-chip label text-color="white">{{$t(`therapy.${speciality}`)}}</v-chip>
                  </div>
                </template>
                <div v-if="doctor && !Array.isArray(doctor.speciality)">
                  <v-chip label color="#64c9c5" text-color="white">{{$t(`therapy.${doctor.speciality}`)}}</v-chip>
                </div>
                <div class="paymentOptions">
                  <p class="gradientText">{{$t('doctor.profile.paymentoptions')}}</p>
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
      <Yaofooter></Yaofooter>
    </v-container>
    <v-snackbar auto-height :color="color" v-model="snackbar" bottom :timeout="4000">
      {{snacktext}}
    </v-snackbar>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Calendar from '@/components/Calendar'
  import Yaofooter from '@/components/Yaofooter'

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
        snacktext: '',
        color: '',
        doctor: ''
      }
    },
    methods: {
      showSuccessSnack() {
        this.color = 'success'
        this.snacktext = 'Booking successful'
        this.snackbar = true
      },
      showFailedSnack() {
        this.color = 'error'
        this.snacktext = 'Booking failed'
        this.snackbar = true
      }
    },
    async asyncData({$http, route, redirect, $dayjs}) {

      try {
        let [doctor, descriptions, appointmentTypes] = await Promise.all([
          $http.$get(`doctor/bydocid/${route.params.id}`),
          $http.$get(`doctors/description/${route.params.id}`),
          $http.$get(`acuity/appointment-types`)
        ])

        doctor = doctor[0]
        if(!doctor) {
          redirect('/')
        } else {
          const types = []
          for (const type of appointmentTypes) {
            if (type.calendarIDs[0]) {
              if (Number(doctor.calendarid) === type.calendarIDs[0]) {
                types.push(type)
              }
            }
          }

          doctor.appointmentTypes = types

          for (const type of doctor.appointmentTypes) {
            const date = $dayjs()
            let dates = await $http.$get(`acuity/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month() + 1}&calendarID=${doctor.calendarid}`)
            // TODO if a doctor is booked out we maybe need to next month until we have 3 dates at least
            if ($dayjs().endOf('month').diff(date, 'days') < 10) {
              // TODO doesnt work on the end of the year
              const nextMonth = await $http.$get(`acuity/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month() + 2}&calendarID=${doctor.calendarid}`)

              if (dates.length > 0 && nextMonth.length > 0) {
                dates = [...dates, ...nextMonth]
              } else if (dates.length === 0 && nextMonth.length > 0) {
                dates = nextMonth
              }
            }

            if (doctor && doctor.appointmentTypes) {
              doctor.appointmentTypes.map(type => {
                type.availableDates = dates
              })
            }
          }

          return {descriptions, doctor}
        }
      } catch (e) {
        console.error('Error with YAO API:', e)
        // show error page
      }
    }
  }
</script>

<style lang="scss" scoped>
  $yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);
  //$yaoLowGradient: radial-gradient(circle at center, rgba(0, 175, 164, 0.2) 0, rgba(0, 175, 164, 0.2) 100%);
  $yaoLowGradient: #cce9e9;
  $yaoGreyFont: #393f4d;

  .profileContainer {
    padding: 0;
    //background-image: $yaoLowGradient;
    background: $yaoLowGradient;
    height: fit-content;

    p {
      font-size: 18px;
    }

    .socialicon {
      width: 32px;
      height: 32px;
      color: #7f828b;
    }
  }

  .docAvatar {
    /*TODO margin is just a hack. fix this!*/
    margin-left: 50px;
    width: 300px;
    border: double 7px transparent;
    border-radius: 150px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4, #074f65);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transform: scale(1.1); /*need to do a media query for this to remove it on break*/
  }

  @media only screen and (max-width:  960px) {
    .docAvatar {
      margin-left: 0;
      width: 150px;
      border: double 7px transparent;
      border-radius: 75px;
      background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4, #074f65);
      background-origin: border-box;
      background-clip: padding-box, border-box;

      position: relative;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
    }

    .docdetails {
      align-items: center;
    }

    .mapContainer {
      height: 300px;
      width: 100%;
    }
  }

  .mapContainer {
    height: 324px;
    align-self: center;
  }

  .map {
    z-index: 1;
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
    height: 300px;
    color: $yaoGreyFont;
    font-family: Roboto;
    font-weight: 400;
  }

  .gradientText {
    font-family: Fjalla One;
    text-transform: uppercase;
    font-size: 40px !important;
    background-image: $yaoGradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .infobox {
    font-family: Roboto;
    font-weight: 400;
    .v-chip {
      text-transform: uppercase;
      font-size: 16px;
      background-image: $yaoGradient;
    }

    .v-card {
      //background-image: $yaoLowGradient;
      background: $yaoLowGradient;
    }

    .paymentOptions {
      padding-bottom: 20px;

      span {
        color: $yaoGreyFont;
      }
    }
  }

  .calenderContainer {
    .v-card {
      background: $yaoLowGradient;
      //background-image: $yaoLowGradient;
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

  .descriptioncontainer {
    font-family: Roboto;
    padding: 20px;
    margin-bottom: 50px;
    color: $yaoGreyFont;
    //background-image: $yaoLowGradient;
    background: $yaoLowGradient;
  }
</style>


