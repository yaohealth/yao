<template>
  <v-app class="mycontainer">
      <Navbar/>
      <section class="article">
        <h1>IMPROVING YOUR GENERAL HEALTH</h1>
        <h2>DISCOVER TAI CHI</h2>
        <p>
          Tai Chi Chuan (also written as Taijiquan) is an ancient Chinese form of exercise originally created as a
          fighting art. Tai Chi was accredited to a Taoist Monk named Zhang San Feng as its creator. Its origins date
          back over 700 years, some say even up to 1500 years. Tai Chi is a type of Qigong (Chi Kung) practiced by
          millions of people worldwide every day.  Qigong in Chinese means energy or breath skill, as Tai Chi when
          practiced correctly is always practiced using Qigong (breathing, energy) methods.
        </p>
        <p>
          Although Tai Chi was originally a Martial Art it is mainly practiced today as an excellent form of exercise
          with many health benefits. The words Tai Chi Chuan mean Supreme Ultimate Boxing, used as an exercise for
          health it would loosely translate as Supreme Ultimate Exercise or Skill. An exercise that utilizes breathing,
          visualizations and movements to work the entire body all at once. As The Tai Chi Classics say “If one part
          of the body moves, the entire body moves”. Tai Chi Chuan was created by applying the concept of Tai Chi to
          very natural movements using relaxation and breathing to generate health, longevity and internal strength and
          power. The philosophy of TaiChi is simple yet profound, in short, the idea that everything consists of two
          opposing forces that harmonize with each other to create a whole.
        </p>
        <p>
          Today, as it is widely spread in western countries, Tai Chi has proven some great health benefits in aging
          population, as Harvard Health was stipulating it :
        </p>
        <p>
          Although tai chi is slow and gentle and doesn't leave you breathless, it addresses the key components of
          fitness — muscle strength, flexibility, balance, and, to a lesser degree, aerobic conditioning. Here's some
          of the evidence:
        </p>
        <p>
          Muscle strength. Tai chi can improve both lower-body strength and upper-body strength. When practiced
          regularly, tai chi can be comparable to resistance training and brisk walking.
        </p>
        <p>
          "Although you aren't working with weights or resistance bands, the unsupported arm exercise involved in tai
          chi strengthens your upper body," says internist Dr. Gloria Yeh, an assistant professor at Harvard Medical
          School. "Tai chi strengthens both the lower and upper extremities and also the core muscles of the back and abdomen."
        </p>
        <p>
          Flexibility. Tai chi can boost upper- and lower-body flexibility as well as strength.
        </p>
        <p>
          Balance. Tai chi improves balance and, according to some studies, reduces falls. Proprioception — the ability
          to sense the position of one's body in space — declines with age. Tai chi helps train this sense, which is a
          function of sensory neurons in the inner ear and stretch receptors in the muscles and ligaments. Tai chi also
          improves muscle strength and flexibility, which makes it easier to recover from a stumble. Fear of falling
          can make you more likely to fall; some studies have found that tai chi training helps reduce that fear.
        </p>
        <p>
          Aerobic conditioning. Depending on the speed and size of the movements, tai chi can provide some aerobic
          benefits. If your clinician advises a more intense cardio workout with a higher heart rate than tai chi
          can offer, you may need something more aerobic as well.
        </p>
      </section>
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

<style lang="scss">
  .article {
    text-align: left;
    padding: 0 20vw;
    font-family: Roboto;
    font-weight: 400;
    padding-bottom: 2.5rem;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }
</style>