<template>
  <div class="panel">
    <div id="coding-table">
      <h3>Coding of Literature</h3>
      <table>
        <thead>
          <tr class="taxonomy-row">
            <th colspan="4" class="meta-class need-middle">Meta</th>
            <th colspan="1" class="emotion-class need-middle">Emotion</th>
            <th colspan="4" class="assessment-class need-middle">Assessment</th>
            <th colspan="4" class="elicitation-class need-middle">Elicitation Factors</th>
            <th colspan="1" class="effect-class need-middle">Effect</th>
          </tr>
          <!-- <tr class="explanation-row">
             <th></th>
            
                     <th>Year</th>
                     <th>Venue</th>
                        <th>Type</th>
            <th>Emotion</th>
            <th>Instrument</th>
            <th>Qual.</th>
            <th>Quan.</th>
            <th>Timing</th>
            <th>User</th>
            <th>Data & Info</th>
            <th>Encoding</th>
            <th>Unspecified</th>
            <th>Effect</th>
          </tr> -->
          <tr class="icon-row">
            <th>
                  <a-tooltip placement="top">
                  <template #title>Paper No. (Click for Details)</template>
                 <i class="fa-solid fa-hashtag"></i>
                </a-tooltip>
            </th>
            <th class="need-middle"> 
              <a-tooltip placement="top">
                  <template #title>Publication Year</template>
                <i class="fa-regular fa-calendar-days"></i>
                </a-tooltip>
            </th>
            <th>
               <a-tooltip placement="top">
                  <template #title>Publication Venue<br> (Hover for Details)</template>
                 <i class="fa-solid fa-location-dot"></i>
                </a-tooltip>
            </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Paper Type</template>
                <i class="fa-solid fa-thumbtack"></i>
                </a-tooltip>
                </th>
            <th class="need-middle">
                <a-tooltip placement="top">
                  <template #title>Emotion</template>
                 <i class="fa-solid fa-heart emotion-class"></i>
                </a-tooltip>
            </th>
            <th class="need-middle">
               <a-tooltip placement="top">
                  <template #title>Instrument<br>(Self-Report, Device, Observation)</template>
                   <i class="fa-solid fa-sheet-plastic assessment-class"></i>
                </a-tooltip>
              </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Qualitative Assessment</template>
                <i class="fa-solid fa-comment assessment-class"></i>
                </a-tooltip>
            </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Quantitative Assessment</template>
                 <i class="fa-solid fa-square-poll-vertical assessment-class"></i>
                </a-tooltip>
              </th>
            <th class="need-middle">
              <a-tooltip placement="top">
                  <template #title>Timing of Assessment<br>Before—During—After</template>
               <i class="fa-solid fa-hourglass-start assessment-class"></i>
                </a-tooltip>
              </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Factor: User Characteristics</template>
                <i class="fa-solid fa-user elicitation-class"></i>
                </a-tooltip>
            </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Factor: Data & Info</template>
                 <i class="fa-solid fa-circle-info elicitation-class"></i>
                </a-tooltip>
            </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Factor: Visualization Design</template>
                   <i class="fa-solid fa-palette elicitation-class"></i>
                </a-tooltip>
            </th>
            <!-- <th>
              <a-tooltip placement="top">
                  <template #title>Factor: Narrative</template>
                  <i class="fa-solid fa-book elicitation-class"></i>
                </a-tooltip>
            </th>
            <th>
              <a-tooltip placement="top">
                  <template #title>Factor: Interaction</template>
                  <i class="fa-solid fa-computer-mouse elicitation-class"></i>
                </a-tooltip>
            </th> -->
            <th>
              <a-tooltip placement="top">
                  <template #title>Unspecify Any Factor</template>
              <i class="fa-solid fa-circle-question elicitation-class"></i>
                </a-tooltip> 
              </th>
            <th class="need-middle">
              <a-tooltip placement="top" >
                  <template #title>Effect of Emotion</template>
                <i class="fa-solid fa-hammer effect-class"></i>
                </a-tooltip>
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pub, idx) in pubs" :key="pub.key" class="pub-row">
            <td @click="scrollMeTo(`pub_${pub.key}`)"><a>{{getAbbr(pub, idx+1)}}</a></td>
            <td class="meta-class">{{ pub.YEAR }}</td>
            <td class="meta-class">
                <a-tooltip class="need-hover" placement="right">
                   <template #title><i>{{pub['venue']}}</i></template>
                   {{ shortenVenueMapping[pub["Venue"]]}}
                </a-tooltip>
            </td>
            <td class="meta-class">{{ typeMapping[pub.Type] }}
            </td>
            <td class="emotion-class">
                <a-tag v-if="pub['Emotion']">
                   <template #icon><small-dash-outlined/></template>
                   Open-ended
                </a-tag>
                <a-tag v-else>
                   <template #icon><menu-outlined /></template>
                  Specific
                </a-tag>

            </td>
            <td class="assessment-class">
              <template v-for="(tag, tid) in pub['Instrument'].split('; ')" :key="`instrument_${tid}`">
                <a-tag v-if="tag=='self-report'">
                   <template #icon><sound-outlined /></template>
                   Self
                </a-tag>
                <a-tag v-if="tag=='interpreted'">
                   <template #icon><eye-outlined /></template>
                   Obs.
                </a-tag>
                <a-tag v-if="tag=='device'">
                   <template #icon><camera-outlined /></template>
                  Device
                </a-tag>
                <a-tag v-if="tag=='unclear'">
                   <template #icon><question-outlined /></template>
                </a-tag>         
              </template>
              </td>
            <td class="assessment-class"><div :class="getLabelClass(pub['Qual.'])"></div></td>
            <td class="assessment-class"><div :class="getLabelClass(pub['Quan.'])"></div></td>
            <td class="assessment-class need-middle">
              <tspan v-if=" pub['Timing']=='unclear' ">
                <question-outlined />
              </tspan>
              <tspan v-else class="timing-label">
                {{ getTimingLabel(pub['Timing']) }}
              </tspan>
            </td>
            <td class="elicitation-class"><div :class="getLabelClass(pub['User'])"></div></td>
            <td class="elicitation-class"><div :class="getLabelClass(pub['Data & Info'])"></div></td>
            <!-- <td class="elicitation-class"><div :class="getLabelClass(pub['Encoding'] || pub['Narrative'] || pub['Interaction'])"></div></td> -->
            <td class="elicitation-class"><div :class="getLabelClass(pub['Vis Design'])"></div></td>
            <!-- <td class="elicitation-class"><div :class="getLabelClass(pub['Narrative'])"></div></td>
            <td class="elicitation-class"><div :class="getLabelClass(pub['Interaction'])"></div></td> -->
            <td class="elicitation-class"><div :class="getLabelClass(pub['Unspecified'])"></div></td>
            <td class="effect-class">
                <a-tag v-if="pub.Effect=='priming'">
                  <template #icon><warning-outlined /></template>
                  Priming
                </a-tag>
                <a-tag v-if="pub.Effect=='probe'">
                  <template #icon><zoom-in-outlined /></template>
                  Probe
                </a-tag>
                <a-tag v-if="pub.Effect=='impact'">
                  <template #icon><bulb-outlined /></template>
                  Impact
                </a-tag>
            </td>
          </tr>
          </tbody>
    
      </table>
    </div>
    <div id="reference-panel">
      <h3 class="section-title">Reference List</h3>
        <div v-for="(pub, idx) in pubs" :key="pub.key" :id="`pub_${pub.key}`" class="pub-item" :ref="`pub_${pub.key}`">

          <a-row>
            <a-col span="1" class="pub-idx">
              [{{idx + 1}}]
            </a-col>
            <a-col span="23">
          <span>{{ getAuthorList(pub.authors) }}</span>.
          <span>{{ `(${pub.YEAR})` }}</span>.
          <span><b>{{ pub.title }}</b></span>.
          <span><i>{{ pub.venue }} </i></span>.
          <span>{{ pub.detail }} </span>.
          <span v-if="pub.DOI">
            DOI: <a target="_blank" :href="`https://doi.org/${pub.DOI}`">{{ pub.DOI }}</a>
          </span>
              <span v-if="pub.HREF">
            Link: <a target="_blank" :href="`${pub.HREF}`">{{ pub.HREF }}</a>
          </span>
            </a-col>
          </a-row>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Format } from "@/assets/ts/preprocessing"
import { Vue, Options } from 'vue-class-component'
import { useStore } from 'vuex'
import { key } from '../store'
import { SoundOutlined, EyeOutlined, CameraOutlined, QuestionOutlined, BulbOutlined, ZoomInOutlined, WarningOutlined, MenuOutlined, SmallDashOutlined  } from '@ant-design/icons-vue'
@Options({ 
  components: {
    SoundOutlined,
    EyeOutlined,
    CameraOutlined,
    QuestionOutlined,
    BulbOutlined,
    ZoomInOutlined,
    WarningOutlined,
    MenuOutlined,
    SmallDashOutlined
  }
})

export default class OverviewView extends Vue {
  public store = useStore(key)
  get pubs() {
    return this.store.state.pubs
  }
  public shortenVenueMapping = {
      "VIS": "Vis.",
      "HCI": "HCI",
      "Social Science": "Soc.",
      "Engineering": "Eng.",
      "Design": "Design",
      "Cartography": "Carto."
  }
  public typeMapping = {
    "empirical study": "Empirical Study",
    "design study": "Visualization Design",
    "algorithm/technique": "Algorithm/Technique"
  }
  mounted() {
    console.log('load overview')

  }
  getAuthorList(list: string[]) {
    if(list.length == 1) return list[0]
    if(list.length == 2) {
      return `${list[0]} and ${list[1]}`
    } else {
      let str = ""
      for (let i = 0; i < list.length - 1; i++) {
        str += list[i] + ", "
      }
      str += "and " + list[list.length - 1]
      return str
    }
  }
  getAbbr(pub: Format, idx: number) {
    console.log(pub.authors[0].split(' '))
    const first = pub.authors[0].split(' ').slice(-1)
    let abbr = `[${idx}] ` + first
    if(pub.authors.length > 2) {
      abbr += ' et al.'
    } else if (pub.authors.length == 2) {
      abbr += ' and ' +  pub.authors[1].split(' ').slice(-1) 
    }
    return `[${idx}] `
  }
  getTimingLabel(instance: string) {
    const codes = ['prior', 'simultaneous', 'retrospective']
    return codes.map((s, idx)=> {
      let sym = instance.includes(s)? '●' : '◌'
      if(idx < 2) sym += "-"
      return sym
    }).reduce((a, b)=> a+b )  
  }
  getLabelClass(status: boolean) {
    if(status == false) return `codecell inactive-class`
    return `codecell`
  } 
  public scrollMeTo(refName: string) {
      const element = this.$refs[refName] as HTMLElement[]
      const top = element[0].offsetTop
      window.scrollTo(0, top)
    
    }
}
</script>

<style lang="scss">
$assessment-color: rgb(92, 175, 227);
$elicitation-color: rgba(14, 127, 6, 0.913);
$effect-color: #60c1b9;
$emotion-color: rgb(229, 131, 147);
$title-height: 80px;
#reference-panel {
  max-width: 1080px;
}
.pub-item {
  margin-bottom: 1.5vh;
  .pub-idx{
    text-align: right;
    padding-right: 16px;
  }
}
#coding-table {
  margin-bottom: 5vh;
  .icon-row {
    height: $title-height;
    vertical-align: bottom;
  }
  th {
    text-align: left;
    position: sticky;
    top: 0;
    background-color: white;
    i {
      cursor: pointer;
      font-size: 20px;
      margin-bottom: 8px;
      margin-right: 16px;
      &.assessment-class {
        color: $assessment-color;
      }
      &.elicitation-class {
        color: $elicitation-color;
      }
      &.effect-class {
        color: $effect-color;
      }
      &.emotion-class {
        color: $emotion-color;
      }
    }
  } 
  table {
    border-collapse: collapse;
    position: relative;
    td {
      font-size: 14px;
    }
  }
  .need-middle {
    text-align: center;
  }
}
.taxonomy-row {
  .meta-class {
    border-bottom: 2px solid rgb(125, 125, 125);
  }
  .assessment-class {
     color: darken($assessment-color, 20%);
     border-bottom: 2px solid $assessment-color;
  }
  .elicitation-class {
    color: darken($elicitation-color, 0%);
    border-bottom: 2px solid $elicitation-color;
  }
  .effect-class {
    color: darken($effect-color, 5%);
    border-bottom: 2px solid $effect-color;
  }
  .emotion-class {
    color: darken($emotion-color, 20%);
    border-bottom: 2px solid $emotion-color;
  }
}
.explanation-row {
  color: white;
  visibility: hidden;
  height:0px;
  line-height: 0;
}
.emotion-class {
  .codecell {
    background-color: $emotion-color;
  }
  .ant-tag {
    background-color: lighten($emotion-color, 50%) !important;
  }

}
.ant-tag {
  background-color: white !important;
  .anticon + span {
    margin-left: 0 !important;
  }
}
.meta-class {
  padding-right: 16px;
}
.emotion-class {
    .ant-tag {
    border-color: lighten($emotion-color, 5%) !important;
  }
  .anticon {
    color: darken($emotion-color, 20%) !important;
  }
}
.assessment-class {
  .timing-label {
    font-size: 28px;
    color:  darken($assessment-color, 0%);
    margin: 0 16px;
    line-height: 16px;
  }
  .anticon, .icon-row {
    color: darken($assessment-color, 20%) !important;
  }
  .codecell {
    background-color: $assessment-color;
  }
  .ant-tag {
    border-color: lighten($assessment-color, 5%) !important;
  }

}
.elicitation-class {
  .codecell {
    background-color: $elicitation-color;
  }

}
.effect-class {
  .codecell {
    background-color: $effect-color;
  }
.ant-tag {
    border-color: lighten($effect-color, 0%) !important;
  }
  .anticon {
    color: darken($effect-color, 5%) !important;
  }
}
.codecell {
  width: 15px;
  height: 15px;
  margin-left: 2px;
  border-radius: 3px;
   &.inactive-class {
      background-color: #e1e1e1;
   }
}

.need-hover {
  cursor: help;
}

</style>