<template>
  <v-app class="mycontainer">
    <Navbar/>
    <div class="articleContainer">
      <section class="article">
        <h1>Contact</h1>
        <br>
        <p>
          For any questions or inquiries regarding YAO please contact:
        </p>
        <p>
          Emmanuel Bideault
        </p>
        <p>
          <a href="mailto:emmanuel@yao.health">emmanuel@yao.health</a>
        </p>
      </section>
    </div>
    <Yaofooter/>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Yaofooter from '@/components/Yaofooter'

  export default {
    components: {
      Navbar,
      Yaofooter
    }
  }
</script>