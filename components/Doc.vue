<template>
  <div class="doc">
    <v-flex xs12 m6>
      <v-card>
        <v-img src="https://qph.fs.quoracdn.net/main-qimg-c55f4f1eab6aa42861d2e42436825ba9" aspect-ratio="1"></v-img>
        <v-card-title>
          <div>
            <h3 class="headline mb-0">{{ title }} {{ firstname }} {{ lastname }}</h3>
            <div>{{ speciality }}</div>
          </div>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-text>
          <v-layout align-center>
            <v-icon>access_time</v-icon>
            <v-btn v-for="nextdate in displaypeviewdates" :key="nextdate" class="somebtn" flat>{{ nextdate }}</v-btn>

          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-end>
            <v-btn flat color="rgba(51, 169, 181, 255)">Booking</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
  export default {
    props: {
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
      const appointmentTypes = await this.$axios.$get('http://localhost:3001/api/appointment-types', {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}})
      for (const type of appointmentTypes) {
        if(type.calendarIDs[0]) {
          if (Number(this.calendarId) === type.calendarIDs[0]) {
            this.appointmentTypes.push(type)
          }
        }
      }

      for(const type of this.appointmentTypes){
        const date = new Date()
        const dates = await this.$axios.$get(`http://localhost:3001/api/availability/dates?appointmentTypeID=${type.id}&month=${date.getFullYear()}-${date.getMonth()+1}&calendarID=${this.calendarId}`, {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}})
        // need to sort the dates in case they have multiple appointment types
        this.nextDates = dates.slice(0, 3)
        this.allDates = dates
      }
      this.displaydates()
    },
    methods: {
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
</style>