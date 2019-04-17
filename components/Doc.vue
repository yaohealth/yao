<template>
  <div class="doc">
    <v-flex xs12 m6>
      <v-card>
        <nuxt-link :to="{name: `profile-id`, params: {id, allDates}}">
          <v-img src="https://qph.fs.quoracdn.net/main-qimg-c55f4f1eab6aa42861d2e42436825ba9" aspect-ratio="1"></v-img>
        </nuxt-link>
        <v-card-title>
          <div>
            <h3 class="headline mb-0">{{ title }} {{ firstname }} {{ lastname }}</h3>
            <div>{{ speciality }}</div>
          </div>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-text v-if="displaypeviewdates.length">
          <v-layout align-center>
            <v-icon>access_time</v-icon>
            <nuxt-link :to="{name: `profile-id`, params: {id, allDates}}">
            <v-btn v-for="nextdate in displaypeviewdates" :key="nextdate" class="somebtn" flat>{{ nextdate }}</v-btn>
            </nuxt-link>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-end>
            <nuxt-link :to="{name: `profile-id`, params: {id, allDates}}">
              <v-btn flat color="rgba(51, 169, 181, 255)">Booking</v-btn>
            </nuxt-link>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {

    props: {
      'id': String,
      'title': String,
      'firstname': String,
      'lastname': String,
      'speciality': String,
      'calendarId': String,
      'previewdates': {
        type: Array,
        default: () => []
      },
      'dates': {
        type: Array,
        default: () => []
      },
      'appointmentTypes': {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        nextDates: [],
        displaypeviewdates: [],
        allDates: []
      }
    },
    async created () {
      let appointmentTypes = []
      try {
        appointmentTypes = await this.$axios.$get(`${process.env.ACUITYPROXY}/api/appointment-types`, {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}})
        
      } catch (e) {
        console.log(e)
      }
      for (const type of appointmentTypes) {
        if(type.calendarIDs[0]) {
          if (Number(this.calendarId) === type.calendarIDs[0]) {
            this.appointmentTypes.push(type)
          }
        }
      }


      // this whole function needs a rewrite because it overwrites when there are more
      // then one type
      for(const type of this.appointmentTypes){
        const date = new Date()
        const dates = await this.$axios.$get(`${process.env.ACUITYPROXY}/api/availability/dates?appointmentTypeID=${type.id}&month=${date.getFullYear()}-${date.getMonth()+1}&calendarID=${this.calendarId}`, {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}})
        // need to sort the dates in case they have multiple appointment types
        this.nextDates = dates.slice(0, 3)

        // dates is just for the current month
        // maybe we need to add it as an object with the month as key
        // and add more when they are needed in the profile page
        this.allDates = dates
        this.ADD_DATES({dates, id: this.id})
      }
      this.ADD_APPOINTMENTTYPES({appointmentTypes: this.appointmentTypes, id: this.id})
      this.displaydates()
    },
    methods: {
      ...mapMutations({
        ADD_DATES: 'localStorage/ADD_DATES',
        ADD_APPOINTMENTTYPES: 'localStorage/ADD_APPOINTMENTTYPES'
      }),
      displaydates() {
        for (const dateString of this.nextDates) {
          const date = new Date(dateString.date);
          const options = {weekday: 'short', month: '2-digit', day: 'numeric'};
          this.displaypeviewdates.push(`${date.toLocaleDateString('de-DE', options)}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .v-card {
    width: 320px;
    margin: 20px;
  }

  .v-card__title {
    justify-content: center;
  }

  .somebtn{
    margin: 0;
    padding: 0 10px;
  }

  a {
    text-decoration: none;
    display: flex;
  }
</style>