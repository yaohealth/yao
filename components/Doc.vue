<template>
  <v-flex xs12 md4 align-self-start class="doc">
    <v-card>
      <nuxt-link :class="!clickable ? 'disabled avatarLink' : 'avatarLink'" :to="{name: `profile-id`, params: {id}}">
        <v-img v-if="pictureurl.length > 0" class="docAvatar" :src="pictureurl"></v-img>
        <v-img v-else class="docAvatar" src="https://via.placeholder.com/150"
               aspect-ratio="1"></v-img>
      </nuxt-link>
      <v-card-title>
        <div>
          <span class="name mb-0">{{ title }} {{ firstname }} {{ lastname }}</span>
          <div class="specialities" v-if="Array.isArray(specialities)">{{ specialities.slice(0,3).join(', ')}}</div>
          <div class="specialities" v-else>{{ specialities }}</div>
        </div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-text v-if="displaypeviewdates.length">
        <v-icon>access_time</v-icon>
        <nuxt-link :class="!clickable ? 'disabled' : ''" :to="{name: `profile-id`, params: {id}}">
          <v-btn v-for="nextdate in displaypeviewdates" :key="nextdate" class="somebtn" flat>{{ nextdate }}</v-btn>
        </nuxt-link>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <nuxt-link :class="!clickable ? 'disabled' : ''" :to="{name: `profile-id`, params: {id}}">
            <v-btn round class="bookingButton">Booking</v-btn>
          </nuxt-link>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {

    props: {
      'id': String,
      'title': String,
      'firstname': String,
      'lastname': String,
      'specialities': [Array, String],
      'calendarId': String,
      'pictureurl': String,
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
        clickable: false
      }
    },
    async created() {
      this.clickable = false
      let appointmentTypes
      try {
        appointmentTypes = await this.$http.$get(`acuity/appointment-types`)
        for (const type of appointmentTypes) {
          if (type.calendarIDs[0]) {
            if (Number(this.calendarId) === type.calendarIDs[0]) {
              this.appointmentTypes.push(type)
            }
          }
        }
        this.ADD_APPOINTMENTTYPES({appointmentTypes: this.appointmentTypes, id: this.id})

        for (const type of this.appointmentTypes) {
          const date = this.$dayjs()
          let dates = await this.$http.$get(`acuity/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month() + 1}&calendarID=${this.calendarId}`)
          // TODO if a doctor is booked out we maybe need to next month until we have 3 dates at least
          if (this.$dayjs().endOf('month').diff(date, 'days') < 10) {
            // TODO doesnt work on the end of the year
            const nextMonth = await this.$http.$get(`acuity/availability/dates?appointmentTypeID=${type.id}&month=${date.year()}-${date.month() + 2}&calendarID=${this.calendarId}`)

            if (dates.length > 0 && nextMonth.length > 0) {
              dates = [...dates, ...nextMonth]
            } else if (dates.length === 0 && nextMonth.length > 0) {
              dates = nextMonth
            }
          }
          this.nextDates = dates.slice(0, 3)
          this.ADD_INITIAL_DATES({dates, id: this.id, appointmentType: type})
        }
        this.displaydates()
        this.clickable = true
      } catch (e) {
        console.error('Error with Acuity API:', e)
        //show Error Page
      }
    },
    methods: {
      ...mapMutations({
        ADD_INITIAL_DATES: 'localStorage/ADD_INITIAL_DATES',
        ADD_APPOINTMENTTYPES: 'localStorage/ADD_APPOINTMENTTYPES'
      }),
      displaydates() {
        for (const dateString of this.nextDates) {
          const date = new Date(dateString.date)
          const options = {weekday: 'short', month: '2-digit', day: 'numeric'}
          this.displaypeviewdates.push(`${date.toLocaleDateString('de-DE', options)}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);
  $yaoGreyFont: #393f4d;

  .disabled {
    pointer-events: none
  }

  .doc {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    font-family: Roboto;
    font-weight: 400;
  }

  .v-card {
    width: 300px;
    margin: 20px;
    background: #f2f2f2;
  }

  .v-card__title {
    justify-content: center;
  }

  .v-card__text {
    padding: 8px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name {
    font-size: 18px;
    background-image: $yaoGradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .specialities {
    color: $yaoGreyFont;
  }

  .somebtn {
    margin: 0;
    padding: 0 10px;
    color: $yaoGreyFont;
  }

  a {
    text-decoration: none;
    display: flex;
    justify-content: center;
  }

  .avatarLink {
    padding: 20px;
  }

  .docAvatar {
    height: 200px;
    width: 200px;
    flex: none;
    border: double 7px transparent;
    border-radius: 100px;
    background-image: linear-gradient(white, white), radial-gradient(circle at top left, #00afa4, #074f65);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 0 0 10px #e5eeed;

  }

  .bookingButton {
    background-image: $yaoGradient !important;
    color: white;
    box-shadow: none !important;
    padding: 0;
  }

</style>