<template>
  <v-app class="mycontainer">
    <Navbar></Navbar>
    <v-container pa-0>
      <v-layout>
        <v-flex xs12 class="resultSearchcontainer">
          <Yaosearch></Yaosearch>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-center v-if="specialities" class="symptomContainer">
        <v-flex xs12 class="subtitle" v-if="specialities.length > 0">
          Considering the symptoms or conditions you are looking for, these therapies should be the most appropriate for
          you
        </v-flex>
        <v-flex xs4 v-for="treat in treatmentIcons.filter(icon => specNameList.includes(icon.name))" :key="treat.id">
          <component :is="treat.icon"></component>
          <p>{{ treat.name }}</p>
        </v-flex>
      </v-layout>

      <!--<p class="subtitle" v-if="treatment.length > 0">search for: {{ treatment.map(elem => elem.symptom)}}</p>-->
      <!--<hr>-->

      <v-layout align-baseline justify-space-around row wrap>
        <v-flex xs12 class="subtitle" v-if="doctors">Discover {{doctors.length}} Doctors or Practitioners adapted to your needs</v-flex>
        <Doc v-for="doctor in doctors" :id="doctor.iddoctorprofile" :title="doctor.title" :firstname="doctor.firstname"
             :lastname="doctor.lastname" :specialities="doctor.speciality" :key="doctor.id"
             :calendar-id="doctor.calendarid" :dates="doctor.dates" :pictureurl="doctor.pictureurl"
        ></Doc>
      </v-layout>
    </v-container>

    <Yaofooter></Yaofooter>
  </v-app>
</template>

<script>
  import Doc from '@/components/Doc'
  import Navbar from '@/components/Navbar'
  import Yaosearch from '@/components/Yaosearch'
  import Yaofooter from '@/components/Yaofooter'
  import Acupuncture from '@/assets/customIcons/acupuncture.svg'
  import Chiropractic from '@/assets/customIcons/chiropractic.svg'
  import Herbal from '@/assets/customIcons/herbal.svg'
  import Homeopathy from '@/assets/customIcons/homeopathy.svg'
  import Hypno from '@/assets/customIcons/hypno.svg'
  import Meditation from '@/assets/customIcons/meditation.svg'
  import Osteopathy from '@/assets/customIcons/osteopathy.svg'
  import Reflexology from '@/assets/customIcons/reflexology.svg'
  import TCM from '@/assets/customIcons/TCM.svg'
  import Tuina from '@/assets/customIcons/tuina-massage.svg'
  import qs from 'qs'
  import lodash from 'lodash'

  export default {
    components: {
      Doc,
      Navbar,
      Yaosearch,
      Yaofooter,
      Acupuncture,
      Chiropractic,
      Herbal,
      Homeopathy,
      Hypno,
      Meditation,
      Osteopathy,
      Reflexology,
      TCM
    },
    watchQuery: ['search'],
    data: function () {
      return {
        search: this.$route.query.search || '',
        doctors: [],
        specialities: [],
        treatment: [],
        specNameList: [],
        treatmentIcons: [
          {name: 'Acupuncture', icon: Acupuncture},
          {name: 'Chiropractic', icon: Chiropractic},
          {name: 'Massage Therapy', icon: Chiropractic},
          {name: 'Herbal Medicine', icon: Herbal},
          {name: 'Homeopathy', icon: Homeopathy},
          {name: 'Hypno', icon: Hypno},
          {name: 'Meditation', icon: Meditation},
          {name: 'Yoga', icon: Meditation},
          {name: 'Osteopathy', icon: Osteopathy},
          {name: 'Reflexology', icon: Reflexology},
          {name: 'TCM', icon: TCM},
          {name: 'Tuina-Massage', icon: Tuina}
        ]
      }
    },
    created() {
      this.search = this.$route.query.search
    },
    async asyncData({$http, query}) {
      let result = {}
      try {
        if (query.search.length > 0) {
          if (query.search === '*') {
            result.doctors = await $http.$get(`doctors`)
          } else {
            const search = {[query.search[0].group]: query.search.map(elem => elem.name)}
            const searchquery = qs.stringify(search)
            const type = query.search[0].group
            if (type === 'Therapy') {
              result.doctors = await $http.$get(`doctors/specialities?${searchquery}`)
            } else if (type === 'Symptom') {
              result.treatment = await $http.$get(`therapies/symptoms?${searchquery}`)

              result.treatment = result.treatment.map(elem => {
                return {
                  symptom: elem.symptom,
                  specialities: elem.specialities.map((spec, index, array) => {
                    return {
                      name: spec,
                      weight: 1 / array.length
                    }
                  })
                }
              })

              result.specialities = []
              const allSpecialites = lodash.flatten(result.treatment.map(treatment => treatment.specialities))
              for (const spec of allSpecialites) {
                const amount = allSpecialites.filter(elem => elem.name === spec.name)
                const weight = amount.length > 1 ? amount.reduce((total, num) => {
                  return {weight: total.weight + num.weight}
                }) : amount[0].weight
                result.specialities.push({name: spec.name, weight: weight.weight})
              }

              result.specialities = lodash.orderBy(lodash.uniqBy(result.specialities, 'name'), ['weight'], ['desc'])
              result.doctors = await $http.$get(`doctors/specialities?${qs.stringify({Therapy: result.specialities.map(spec => spec.name)})}`)
              result.specNameList = result.specialities.map(elem => elem.name)
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

<style lang="scss">
  $yaoGradient: radial-gradient(circle at center, rgba(0, 175, 164, 1) 0, rgba(0, 175, 164, 0.38) 100%);
  $yaoGreyFont: #393f4d;

  .subtitle {
    font-size: 24px;
    color: $yaoGreyFont;
    word-spacing: 5px;
    padding: 15px 0;
    max-width: 70vw !important;
  }

  .resultSearchcontainer {
    background: $yaoGradient;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .symptomContainer {
    font-family: Roboto;
    font-weight: 600;
    background: radial-gradient(circle at center, rgba(0, 175, 164, 0.33) 0, rgba(0, 175, 164, 0.33) 100%);
  }

</style>
