<template>
  <v-app class="mycontainer">
  <section>
    <section class="searchInfoContainer">
      <div class="bg">
        <Navbar id="navbar"/>
        <section class="searchContainer">
          <p class="discoverText">
            {{ $t('landing.welcome')}}
          </p>
            <Yaosearch></Yaosearch>
        </section>
          <v-container class="information">
            <v-layout row wrap fill-height align-center>
              <v-flex xs12 md4 class="infocontainer">
                <SearchLogo class="customicon"></SearchLogo>
                <p class="infotext">{{ $t('landing.infotext1')}}</p>
                <v-btn round @click="$vuetify.goTo('#navbar', {duration: 300, easing: 'easeInOutCubic'})">{{ $t('landing.findBtn')}}</v-btn>
              </v-flex>
              <v-flex xs12 md4 class="infocontainer">
                <EventLogo class="customicon"></EventLogo>
                <p class="infotext">{{ $t('landing.infotext2')}}</p>
                <nuxt-link class="links" :to="localePath({name: 'results', query: { search:'*' }})">
                  <v-btn round>{{ $t('landing.bookBtn')}}</v-btn>
                </nuxt-link>
              </v-flex>
              <v-flex xs12 md4 class="infocontainer">
                <AgendaLogo class="customicon"></AgendaLogo>
                <p class="infotext">{{ $t('landing.infotext3')}}</p>
                <v-btn round @click="$vuetify.goTo('#content', {duration: 300, easing: 'easeInOutCubic'})">{{ $t('landing.discoverBtn')}}</v-btn>
              </v-flex>
              <v-flex xs12>
                <hr>
              </v-flex>
              <v-flex xs12 md4 infocontainer>
                <p class="joinText">{{ $t('landing.jointext')}}</p>
                <nuxt-link class="links" :to="localePath({name: 'impressum'})">
                  <v-btn round>{{$t('landing.registerBtn')}}</v-btn>
                </nuxt-link>
              </v-flex>
              <v-flex xs12 md8>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <Arrow class="customicon"></Arrow>
                    </v-list-tile-avatar>
                      <p class="bulletpoints">{{$t('landing.bulletpoint1')}}</p>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <Arrow class="customicon"></Arrow>
                    </v-list-tile-avatar>
                      <p class="bulletpoints">{{$t('landing.bulletpoint2')}}</p>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <Arrow class="customicon" />
                    </v-list-tile-avatar>
                      <p class="bulletpoints">{{$t('landing.bulletpoint3')}}</p>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
      </div>
    </section>
    <v-container class="discoverContainer" id="content">
      <v-layout  align-center justify-center row wrap>
          <p class="discoverText">
            {{$t('landing.discovertext')}}
          </p>
      </v-layout>
      <v-layout  align-center justify-center row wrap>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <nuxt-link :to="localePath({name: 'therapies'})">
              <v-img class="discoverAvatar" :src="require('../assets/back.jpg')"></v-img>
            </nuxt-link>
          </v-flex>
          <v-flex xs12 md4>
            <span>{{$t('landing.content1')}}</span>
          </v-flex>
        </v-layout>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <nuxt-link :to="localePath({name: 'symptoms'})">
              <v-img class="discoverAvatar" :src="require('../assets/belly.jpg')"></v-img>
            </nuxt-link>
          </v-flex>
          <v-flex xs12 md4>
            <span>{{$t('landing.content2')}}</span>
          </v-flex>
        </v-layout>
        <v-layout align-center column>
          <v-flex xs12 md4>
            <nuxt-link :to="localePath({name: 'topics'})">
              <v-img class="discoverAvatar" :src="require('../assets/berries.jpg')"></v-img>
            </nuxt-link>
          </v-flex>
          <v-flex xs12 md4>
            <span>{{$t('landing.content3')}}</span>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <section class="docPreview">
      <p class="discoverText">{{$t('landing.doctorhighlights')}}</p>
      <v-container>
        <v-layout row wrap justify-space-around fill-height align-center>
          <Doc v-for="doctor in doctors"
               :id="doctor.iddoctorprofile"
               :title="doctor.title"
               :firstname="doctor.firstname"
               :lastname="doctor.lastname"
               :specialities="doctor.speciality"
               :key="doctor.iddoctorprofile"
               :calendar-id="doctor.calendarid"
               :dates="doctor.dates"
               :pictureurl="doctor.pictureurl"
          ></Doc>
        </v-layout>
      </v-container>
    </section>
  </section>
    <Yaofooter></Yaofooter>
    <v-snackbar auto-height color="white" class="black--text" v-model="snackbar" bottom :timeout="0">
      {{ $t('landing.snacktext') }}:
      <v-text-field class="emailinput" v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
      <v-btn color="rgba(51, 169, 181, 255)" flat @click="subscribe">{{ $t('landing.subscribe') }}</v-btn>
      <v-btn color="rgba(51, 169, 181, 255)" flat @click="snackbar = false">{{ $t('landing.close') }}</v-btn>
    </v-snackbar>
    <v-snackbar v-model="errorsnackbar" :timeout="4000" color="error">Ups something went wrong</v-snackbar>
    <v-snackbar v-model="sucessnackbar" :timeout="4000" color="success">You successful subscribed to our newsletter</v-snackbar>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Doc from '@/components/Doc'
  import Yaofooter from '@/components/Yaofooter'
  import Yaosearch from '@/components/Yaosearch.vue'
  import { mapMutations } from 'vuex'
  import SearchLogo from '@/assets/customIcons/search.svg'
  import EventLogo from '@/assets/customIcons/event.svg'
  import AgendaLogo from '@/assets/customIcons/agenda.svg'
  import Arrow from '@/assets/customIcons/arrow.svg'


export default {
  components: {
    Navbar,
    Yaosearch,
    Doc,
    Yaofooter,
    SearchLogo,
    AgendaLogo,
    EventLogo,
    Arrow
  },
  data() {
    return {
      doctors: [],
      allDocs:[],
      therapies: [],
      snackbar: true,
      errorsnackbar: false,
      sucessnackbar: false,
      valid: false,
      email: '',
      emailRules: [ v => /.+@.+\..+/.test(v) || 'E-mail must be valid']
    }
  },
  methods: {
    ...mapMutations({
      SET_DOCTORS: 'localStorage/SET_DOCTORS'
    }),
    subscribe() {
      console.log('sub')
      if (this.email) {
        try {
          console.log('send')

          this.$http.$post(`subscription/${this.email}`).then(res => {
            this.snackbar = false
            if (res.name === 'error') {
              this.errorsnackbar = true
            } else if(res.command === 'INSERT') {
              this.sucessnackbar = true
            }
          })
        } catch (e) {
          // show error page
        }
      }
    }
  },
  created() {
    // add expiry of localstorage
    this.SET_DOCTORS(this.allDocs)
  },
  async asyncData({ $http }) {
    let doctors = []
    let therapies = []
    try {
      const [allDocs, specialities] = await Promise.all([
        $http.$get(`doctors`),
        $http.$get(`specialities`)
      ]).catch(e => console.error('Error with YAO API:', e)) // show error page

      let allDocsCopy = allDocs.slice()
      if(allDocsCopy.length >= 3) {
        for (let i = 0; i < 3; i++) {
          // pick and remove three doctors from the array for preview
          doctors.push(allDocsCopy.splice(Math.ceil(Math.random() * 10) % allDocsCopy.length, 1)[0])
        }
      } else if(allDocsCopy.length < 3 && allDocsCopy.length > 0) {
        doctors = allDocsCopy
      }
      therapies = specialities.map( speciality => speciality.speciality)
      return {doctors, allDocs, therapies}
    } catch (e) {
      console.error('Error with Acuity API:', e)
      //show Error Page
    }

  }
}
</script>

<style lang="scss">
$yao: rgba(0, 174, 163, 1);
$yaoLow: rgba(236, 247, 251, 0.64);
$yaobg: #effafc;
$yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);
$yaoGreyFont: #393f4d;

a {
  text-decoration: none;
}

.customicon {
  height: 70px;
  margin: 0 10px;
}

.searchInfoContainer {
  position: relative;

  .bg {
    background: url("../assets/bgWomen.jpg") no-repeat center;
    background-size: cover;
    min-height: 200vh;
    display: flex;
    flex-flow: column;

    .searchContainer {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      position: relative;
      top: -10vh
    }

    .information {
      background-color: $yaoLow;
      min-height: 100vh;
      height: auto;
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 5vw;


      @media only screen and (max-width: 1000px) {
        .customicon {
          height: 50px;
        }

        .infocontainer {
          padding-bottom: 20px;
        }

      }

      .infocontainer {
        font-family: Roboto;
        font-weight: 400;
      }

      button {
        background-image: $yaoGradient !important;
        color: white;
        box-shadow: none;
      }

      .infotext {
        height: fit-content;
        margin: 0;
        color: $yaoGreyFont;
        font-family: Roboto;
        font-weight: 400;
      }

      .bulletpoints {
        text-align: left;
        height: fit-content;
        margin: 0;
        color: $yaoGreyFont;
        font-family: Roboto;
        font-weight: 400;
      }

      .joinText {
        height: fit-content;
        text-transform: uppercase;
        font-size: 50px;
        background-image: $yaoGradient;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Fjalla One;
      }

      .v-list {
        background: none;
      }

      .v-list__tile__title {
        height: fit-content;
        white-space: pre-wrap;
        color: $yaoGreyFont;
      }

      @media only screen and (max-width: 1200px) {
        .joinText {
          font-size: 40px;
        }
      }

      @media only screen and (max-width: 1000px) {
        .joinText {
          font-size: 30px;
        }
      }

      @media only screen and (max-width: 600px) {
        .joinText {
          font-size: 30px;
        }
      }

      hr {
        display: inline-block;
        height: 1px;
        border: 0;
        border-top: 4px solid #909090;
        margin: 1em 0;
        padding: 0;
        width: 70vw;
      }
    }
  }
}

.discoverContainer {
  height: auto;
  background: #fafafa;

  span {
    text-transform: uppercase;
    font-size: 24px;
    color: $yaoGreyFont;
    font-family: Roboto;
    font-weight: 400;
  }
}

.discoverAvatar {
  margin: 30px;
  height: 300px;
  width: 300px;
  border: double 6px transparent;
  border-radius: 150px;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4,#074f65);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 0 14px #e5eeed;
}



.discoverText {
  text-transform: uppercase;
  font-size: 50px;
  background-image: $yaoGradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 70vw;
}

@media only screen and (max-width: 1200px) {
  .discoverText {
    font-size: 40px;
  }
}

@media only screen and (max-width: 1000px) {
  .discoverAvatar {
    width: 150px;
    height: 150px;
  }
}

@media only screen and (max-width: 600px) {
  .discoverText {
    font-size: 30px;
  }
}

.docPreview {
  background: $yaobg;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;

  .discoverText {
    padding-top: 10vh;
  }
}

.emailinput {
  padding-left: 20px;
}
</style>
