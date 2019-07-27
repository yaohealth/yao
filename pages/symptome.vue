<template>
  <v-app class="mycontainer">
      <Navbar/>
    <div class="articleContainer">
      <section class="article">
        <h1>ALTERNATIVE MEDIZIN BEI CHRONISCHEN KRANKHEITEN</h1>
        <p>
          Alternativ- und Komplementärmedizin ist als geeignete Behandlung von chronischen Krankheiten anerkannt.
        </p>
        <p>Der <a href="cam-europe.eu">EUROCAM</a> reports nennt folgende Vorteile der Alternativ- und Komplementärmedizin:</p>
        <ul>
          <li>
            Der Selbstgenerierungsprozesses wird herbeiführt und unterstützt: Bei hierdurch eintretender Heilung ist 
            die spätere Notwendigkeit stärker beeinträchtigender Eingriffe und höherer Kosten vermindert.
          </li>
          <li>
            Die Behandlung ist harmlos und hat so gut wie keine nachteiligen Nebenwirkungen: 
            Es gibt keine Morbiditäts- oder Mortalitätsrisiken wie bei konventionellen verschreibungspflichtigen Medikamenten.
          </li>
          <li>
            Der Bedarf und die langzeitige Abhängigkeit von konventionellen verschreibungspflichtigen Medikamenten wird reduziert.
          </li>
          <li>
            Der Bedarf an Antibiotika wird reduziert, was wiederum hilft, das Problem der Antibiotikaresistenz zu vermindern.
          </li>
          <li>
            Eine gesteigerte Zufriedenheit des Patienten hebt die Lebensqualität und reduziert Absentismus.
          </li>
          <li>
            Die Behandlung ist zumeist kostengünstig.
          </li>
        </ul>
        <p>
          Chronische Krankheiten treten meistens in einem Alter ab 30 Jahren auf. Die bekannteste chronische Krankheit ist Fibromyalgie. 
          Ausgelöst werden kann diese unter anderem durch Stress, körperliches oder mentales Trauma oder chronischen Schmerz.
        </p>
        <p>
          Das Hauptsymptom sind Schmerzen. Diese sind diffus, chronisch und medikamentenrestistent; ihre Stärke variiert und es 
          gibt keine erkennbare Ursache. Häufig gehen sie mit vielen anderen Symptomen einher: Schlafstörungen, Müdigkeit, kognitive Störungen, 
          Verdauungsprobleme, Stimmungsschwankungen, Kolopathie, Kopfschmerzen, Rheuma, etc.
        </p>
        <p>
          Viele Faktoren, wie Kälte, schlechter Schlaf, Stress oder Trägheit können eine Fibromyalgie verstärken. Die Pathopysiologie 
          von Fibromyalgie bleibt bislang ungeklärt; auch wenn die plausibelste Hypothese eine Veränderung der Schmerzwahrnehmung wäre.
        </p>
        <p>
          Aufgrund der vielfältigen Symptome kann Fibromyalgie beträchtliche Auswirkungen auf das Familienleben sowie den emotionalen und beruflichen Wirkungskreis haben.
        </p>
        <p>
          Die Alternativ- und Komplementärmedizin weist gute Behandlungsergebnisse bei Fibromyalgie auf, wie zum Beispiel durch:
        </p>
        <p>
          Hypnose: Hypnose kann das Befinden von unter Fibromyalgie Leidenden durch positive Effekte bei der Wahrnehmung von Schmerzen und Ängsten verbessern.
        </p>
        <p>
          Akupunktur: Akupunktur kann dank ihrer schmerzmodulierenden Wirkung eine erfolgreiche Behandlung für Fibromyalgie-Patienten sein.
        </p>
        <p>
          Naturheilkunde: Bestimmte Ernährungsempfehlungen sowie Anpassungen des Lebensstils können die Lebensqualität des Fibromyalgie-Patienten verbessern.
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