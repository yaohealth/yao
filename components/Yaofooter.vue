<template>
  <div>
    <v-footer dark class="myfooter">
      <v-card class="flex" flat tile>
        <v-card-title class="links">
          <strong class="subheading">Follow us</strong>
          <v-spacer></v-spacer>
          <!--<fa-icon>facebook-f</fa-icon>-->
          <!--<fa-icon>twitter</fa-icon>-->
          <!--<fa-icon>twitter</fa-icon>-->
          <!--<v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>-->
            <!--<v-icon size="24px">{{ icon }}</v-icon>-->
          <!--</v-btn>-->
        </v-card-title>
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — <strong>YAO</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </div>
</template>


<style scoped lang="scss">
  .links {
    background-color: rgba(51, 169, 181, 255);
  }
</style>