<template>
  <section class="mycontainer">
    <Navbar></Navbar>
    <p class="subtitle" v-if="treatment.length > 1">search for: {{ treatment.map(elem => elem.symptom)}}</p>
    <hr>
    <p class="subtitle" v-if="specialities.length > 1">Based on your search we recommend following Treatments: {{ specialities }}</p>
    <br>
    <p class="subtitle" v-if="doctors">Discover {{doctors.length}} Doctors or Practitioners adapted to your needs</p>
    <v-layout align-baseline justify-space-around row wrap>
      <Doc v-for="doctor in doctors" :id="doctor.iddoctorprofile" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :specialities="doctor.speciality" :key="doctor.id" :calendar-id="doctor.calendarid" :dates="doctor.dates"></Doc>
    </v-layout>
  </section>
</template>

<script>
  import Doc from '@/components/Doc'
  import Navbar from '@/components/Navbar'
  import qs from 'qs'
  import lodash from 'lodash'

  export default {
    components: {
      Doc,
      Navbar
    },
    watchQuery: ['search'],
    data: function () {
      return {
        search: this.$route.query.search || '',
        doctors: [],
	      specialities: [],
	      treatment: []
      }
    },
    created() {
      this.search = this.$route.query.search
    },
    async asyncData ({$http, query}) {
      // set auth for yao api
      const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
      $http.setToken(x.toString('base64'), 'Basic')

      let result = {}
      try {
        if(query.search.length > 0) {
          if(query.search === '*') {
            result.doctors = await $http.$get(`${process.env.YAOAPI}/doctors`)
          } else {
            const search = {[query.search[0].group]:query.search.map(elem => elem.name)}
            const searchquery = qs.stringify(search)
            const type = query.search[0].group
            if (type === 'Therapy') {
              result.doctors = await $http.$get(`${process.env.YAOAPI}/doctors/specialities?${searchquery}`)
            } else if (type === 'Symptom') {
              result.treatment = await $http.$get(`${process.env.YAOAPI}/therapies/symptoms?${searchquery}`)

              result.treatment = result.treatment.map(elem => {
                return {
                  symptom: elem.symptom,
                  specialities: elem.specialities.map((spec, index, array) => {
                    return {
                      name: spec,
                      weight: 1/array.length
                    }
                  })
                }
              })

              result.specialities = []
              const allSpecialites = lodash.flatten(result.treatment.map( treatment => treatment.specialities))
              for (const spec of allSpecialites) {
                const ammount = allSpecialites.filter(elem => elem.name === spec.name)
                const x = ammount.length > 1 ? ammount.reduce((total, num) => total.weight + num.weight) : ammount[0].weight
                result.specialities.push({name: spec.name, weight: x})
              }
              result.specialities = lodash.uniqBy(result.specialities, 'name')
              result.doctors = await $http.$get(`${process.env.YAOAPI}/doctors/specialities?${qs.stringify({Therapy: result.specialities.map(spec => spec.name)})}`)
              // TODO logic for ranking of therapies
            }
          }
        }
      } catch (e) {
        console.error('Error with YAO API on the result page:', e)
        // show error page
      }
      return result
    }
  }
</script>

<style lang="scss" scoped>

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .logo {
    width: 400px;
    padding-bottom: 100px;
  }

</style>
