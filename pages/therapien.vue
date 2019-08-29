<template>
  <v-app class="mycontainer">
    <Navbar/>
    <div class="articleContainer">
      <section class="article">
        <h1>ALTERNATIV- UND KOMPLEMENTÄRMEDIZIN</h1>
        <p>
          Das NCBI (National Center for Biotechnology
          Information: <a href="https://www.ncbi.nlm.nih.gov/books/NBK83804/">www.ncbi.nlm.nih.gov</a>)
          definiert Alternativ- und Komplementärmedizin (im Weiteren mit CAM abgekürzt)
          mit der am meisten angewandten und vom NCCAM (National Center for Complementary
          and Alternative Medicine) entwickelten Klassifizierungsstruktur, die CAM-Heilungsmethoden
          in <b>fünf Kategorien</b> aufteilt:
        </p>
        <ol>
          <li>Alternativmedizinische Systeme</li>
          <li>Interaktion von Körper und Geist</li>
          <li>Auf biologischer Basis beruhende Heilungsmittel</li>
          <li>Manuelle und körperbasierte Anwendungen</li>
          <li>Energietherapien</li>
        </ol>
        <p>
          Die alternativmedizinischen Systeme der <b>ersten Kategorie</b> sind ein über einzelne Heilungsmethoden
          hinausgehendes System aus Theorie und Praxis, das sich getrennt von der konventionellen Medizin entwickelt hat.
          Beispiele sind Traditionelle Chinesische Medizin, Ayurvedische Medizin, Homöopathie und Naturheilkunde.
        </p>
        <p>
          In der <b>zweiten Kategorie</b> des NCCAM-Klassifizierungsschemas geht es um Interaktionen von Körper und Geist,
          welche mentale Praktiken enthalten, die sich auf den Körper und das körperliche Wohlbefinden auswirken, wie
          beispielsweise Meditation, Beten und mentale Heilung.
        </p>
        <p>
          Die <b>dritte Kategorie</b> der biologisch basierten Therapien umfasst spezielle Diäten, Kräuter und andere
          natürliche Produkte, wie zum Beispiel Mineralien und Hormone. Zu spezialisierten Diäten gehören die Diäten
          von Dr. Atkins und Dr. Ornish, ebenso wie der weiter gefasste Bereich der „Funktionellen Ernährung“, die
          Krankheitsrisiken mindernd und gesundheitsfördernd wirken kann. Einige der bekannten Kräutertherapien, deren
          Wirkung nachgewiesen wurde, sind Johanniskraut zur Behandlung leichter bis mittelschwerer Depression sowie
          Ginkgo zur Behandlung leichter kognitiver Beeinträchtigung. Beispiel für ein natürliches Mittel außerhalb der
          Kräutermedizin ist Fischöl zur Behandlung von kardiovaskulären Zuständen.
        </p>
        <p>
          Die </b>vierte Kategorie</b> sind manuelle und körperbasierte Behandlungen und beinhalten Therapien mit Körperbewegung und -einwirkung.
          Am bekanntesten ist die Chiropraktik. Eine Technik der chiropraktischen Behandlung ist die Spinalmanipulation oder auch
          spinale Adjustierung, zur Korrektur von Anomalitäten der
          Wirbelsäulengelenke <a href="https://www.ncbi.nlm.nih.gov/books/NBK83804/">(Meeker and Haldeman, 2002)</a>. Massagetherapien sind ein weiteres
          Beispiel für körperbasierte Behandlungen.
        </p>
        <p>
          Die <b>fünfte Kategorie</b> sind Energietherapien, welche Energiefelder im Körper behandeln und einbringen.
          Es wird vermutet, dass es zusätzlich zu den elektromagnetischen Feldern außerhalb der Körpers auch
          innerhalb des Körpers Energiefelder gibt. Auch wenn die Existenz dieser Biofelder nicht empirisch
          bewiesen ist, beziehen einige Therapien, wie Qi Gong, Reiki und Heilen mit Berührung diese mit ein.
        </p>
        <p>
          Die ehemalige WHO-Generaldirektorin Dr. Margaret Chan sagte einmal: „Die beiden Systeme der traditionellen
          und der westlichen Medizin sollten nicht im Konflikt stehen. Im Rahmen der grundlegenden Gesundheitsfürsorge
          können sie in konstruktiver Harmonie verschmelzen“, insbesondere da die CAM, gemäß dem WHO Traditional
          Medicine strategy Report 2014-2023 „nachgewiesen gute Ergebnisse im Kostenvergleich mit konventioneller Medizin,
          speziell bei manuellen Therapien aufweist“.

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