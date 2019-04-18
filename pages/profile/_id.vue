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

        <!--show adress below calendar-->

      </v-card>

      <v-card>
        <Calendar></Calendar>
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
        descriptions: []
      }
    },
    methods: {
      ...mapGetters({
        getSpecificDoctor: 'localStorage/getSpecificDoctor'
      })
    },
    async created() {
      this.doctor = (this.getSpecificDoctor())(this.$route.params.id)
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


