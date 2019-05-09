<template>
  <div class="doc">
    <v-flex xs12 m6>
      <v-card>
        <nuxt-link :to="{name: `profile-id`, params: {id}}">
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
            <nuxt-link :to="{name: `profile-id`, params: {id}}">
            <v-btn v-for="nextdate in displaypeviewdates" :key="nextdate" class="somebtn" flat>{{ nextdate }}</v-btn>
            </nuxt-link>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-end>
            <nuxt-link :to="{name: `profile-id`, params: {id}}">
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
        displaypeviewdates: []
      }
    },
    async created () {
      let appointmentTypes
      try {
        // set auth for acutiy api
        const x = new Buffer.from(`${process.env.ACUITYUSER}:${process.env.ACUITYPW}`)
        this.$http.setToken(x.toString('base64'), 'Basic')

        appointmentTypes = await this.$http.$get(`${process.env.ACUITYPROXY}/api/appointment-types`)
      } catch (e) {
        console.error('Error with Acuity API:', e)
        //show Error Page
      }
      for (const type of appointmentTypes) {
        if(type.calendarIDs[0]) {
          if (Number(this.calendarId) === type.calendarIDs[0]) {
            this.appointmentTypes.push(type)
          }
        }
      }
      this.ADD_APPOINTMENTTYPES({appointmentTypes: this.appointmentTypes, id: this.id})

      for(const type of this.appointmentTypes){
        const date = this.$dayjs()
        let dates = await this.$http.$get(`${process.env.ACUITYPROXY}/api/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month()+1}&calendarID=${this.calendarId}`)
        // TODO if a doctor is booked out we maybe need to next month until we have 3 dates at least
        if(this.$dayjs().endOf('month').diff(date, 'days') < 10){
          // TODO doesnt work on the end of the year
          const nextMonth = await this.$http.$get(`${process.env.ACUITYPROXY}/api/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month()+2}&calendarID=${this.calendarId}`)

          if (dates.length < 0 && nextMonth.length < 0) {
            dates = [...dates, ...nextMonth]
          } else if (dates.length === 0 && nextMonth.length > 0) {
            dates = nextMonth
          }
        }
        this.nextDates = dates.slice(0, 3)
        this.ADD_INITIAL_DATES({dates, id: this.id, appointmentType: type})
      }
      this.displaydates()
    },
    methods: {
      ...mapMutations({
        ADD_INITIAL_DATES: 'localStorage/ADD_INITIAL_DATES',
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