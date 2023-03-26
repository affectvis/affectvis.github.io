<template>
<div class="panel">
  <div class="abstract">
    The visualization community has become increasingly interested in the emotional response to visualization.
Meanwhile, the field of affective computing is rapidly advancing, shedding light on new paradigms of human-computer interaction.
While the two streams of research naturally intersect in the shared emphasis on emotion, there lacks a comprehensive overview of how researchers have approached emotion and affective computing in visualization.
This arguably impedes opportunities for developing affective computing techniques in the context of visualization.
To fill the knowledge gap, we undertake a systematic review of literature that attends to the emotional dimension of data visualizations. 
We collected 59 articles spanning six areas between 1991 to 2023.
Following the elicitation-response model in psychology, we coded and analyzed four essential aspects around emotion in consuming visualization:
(1) What aspects of emotion have been of interest; (2) How emotion can be assessed; (3) What factors elicit human emotions; and (4) What effects associate with the elicited emotions.
Drawing upon our analysis, we discuss implications, common challenges, and promising avenues for future studies.
  </div>
<div class="image-panel">
  <div  class="image-card" style="width:300px">
    <img alt="#papers by years, broken up by paper types" :src="`./images/paperno_type.png`" style="width:100%" />
    <caption>Number of papers by type</caption>
    </div>

     <div  class="image-card" style="width:300px">
    <img alt="#papers by years, broken up by publishing venues" :src="`./images/paperno_venue.png`" style="width:100%" />
        <caption>Number of papers by publication venues</caption>
    </div>



  </div>
</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.abstract {
  max-width: 950px;
  text-align: justify;
  text-justify: inter-word;
  margin-bottom: 30px;
}
.image-panel{
  display: flex;
  gap: 20px;
  caption {
    padding: 0;
    width: max-content;
  }
}

</style>
