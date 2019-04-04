<template>
  <div class="doc">
    <v-flex>
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
            <v-btn class="somebtn" flat>Fr. 13.4</v-btn>
            <v-btn class="somebtn" flat>Mo. 16.4</v-btn>
            <v-btn class="somebtn" flat>Di. 17.4</v-btn>
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
    props: ['title', 'firstname', 'lastname', 'speciality']
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