<template>
  <v-app class="mycontainer">
      <Navbar/>
      <section class="article">
        <h1>CHRONIC DISEASE AND ALTERNATIVE MEDICINE </h1>
        <p>
          Complementary and Alternative Medicine is now accepted for being adequate in treating chronic diseases.
        </p>
        <p>As EUROCAM reports stipulated the benefits of CAM : </p>
        <ul>
          <li>Supporting and inducing the self-regenerating process for the person ; if recovery can occur from this,
            the need for later high-impact, high-cost interventions is reduced</li>
          <li>
            Safe treatment with hardly any adverse effects; no morbidity or mortality as from conventional prescription drugs
          </li>
          <li>
            Reduce need of conventional prescription drugs and long-term dependency on them
          </li>
          <li>
            Reduce need of antibiotics, thus helping to reduce the problem of antimicrobial resistance
          </li>
          <li>
            High patient satisfaction, increased quality of life, and reduction of absenteeism
          </li>
          <li>
            Mostly low cost treatment
          </li>
        </ul>
        <p>
          Chronic diseases are mainly appearing starting around 30 years old. One of the most known is fibromyalgia.
          It can be caused  by stress, physical or psychological trauma, chronic pain ...
        </p>
        <p>
          The main symptom is pain. It is diffuse, chronic, resistant to treatment, its intensity changes and it has no
          identified cause. There are often many associated symptoms: sleep disorders, fatigue, cognitive disorders,
          digestive disorders, mood disorders, colopathy, headaches, rheumatism, etc.
        </p>
        <p>
          Many factors are likely to worsen fibromyalgia such as cold, poor sleep, stress, inactivity ... Currently,
          the pathophysiology of fibromyalgia remains unexplained even if the most plausible hypothesis would be
          related to an alteration of the perception of pain.
        </p>
        <p>
          Due to the multiplicity of symptoms, the impact of fibromyalgia on the family, emotional and professional sphere is considerable.
        </p>
        <p>
          CAM has given good results in treating Fibromyalgia, such as :
        </p>
        <p>
          Hypnosis: Hypnosis can improve the condition of fibromyalgia individuals through its beneficial effect on the perception of pain and anxiety.
        </p>
        <p>
          Acupuncture: Thanks to its modulating effect on pain, acupuncture could be an effective aid for people with fibromyalgia.
        </p>
        <p>
           Naturopathy: certain dietary recommendations and a change in lifestyle can improve the quality of life of the individual fibromyalgia.
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