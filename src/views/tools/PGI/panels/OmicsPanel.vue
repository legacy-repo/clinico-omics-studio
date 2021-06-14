<template>
  <div class="gene-details">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Ontology">
        <a-row class="content-container" :gutter="16">
          <a-col :lg="24" :xs="24" :sm="24" :md="24">
            <a-collapse
              accordion
              v-if="isValid"
              :activeKey="formatGeneSymbol(geneSymbols)"
            >
              <a-collapse-panel
                :key="symbol"
                :header="symbol"
                v-for="symbol in formatGeneSymbol(geneSymbols)"
              >
                <ontology :geneSymbol="symbol"></ontology>
              </a-collapse-panel>
            </a-collapse>
            <a-empty v-else />
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Curation">
        <a-row class="content-container" :gutter="16">
          <a-col :lg="24" :xs="24" :sm="24" :md="24">
            <a-collapse v-model="activeKey">
              <a-collapse-panel v-for="key in allKeys" :key="key" :header="formatLabel(key)">
                <a-row v-for="label in labels[key]" :key="label" style="margin-bottom: 10px">
                  <a-col :xs="24" :sm="12" :md="6" :lg="6">
                    <a-tag color="#108ee9">
                      <b>{{ formatLabel(label) }}</b>
                    </a-tag>
                  </a-col>
                  <a-col :xs="24" :sm="12" :md="18" :lg="18" v-if="label !== 'knowledge_points'">
                    <span>{{ biomarker[label] }}</span>
                  </a-col>
                  <a-col :xs="24" :sm="12" :md="18" :lg="18" v-if="label === 'knowledge_points'">
                    <p style="text-align: justify" v-html="formatKnowledgePoints(biomarker[label])"></p>
                  </a-col>
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Knowledge">
        <!-- <knowledge-detail :paperId="biomarker.pmid" v-if="biomarker.pmid"></knowledge-detail> -->
        <!-- <a-empty v-else/> -->
        <a-row v-if="isValid" class="content-container" :gutter="16">
          <a-col class="knowledge-header" :lg="24" :xs="24" :sm="24" :md="24">
            <a-select size="small" :value="currentGeneSymbol" style="width: 120px" @change="selectGeneSymbol">
              <a-select-option :value="gene" :key="gene" v-for="gene in formatGeneSymbol(geneSymbols)">
                {{ gene }}
              </a-select-option>
            </a-select>
            <span style="margin-left: 5px">Precision Medicine KnowledgeBase(PreMedKB)</span>
          </a-col>
          <full-frame :src="buildGeneQueryUrl(currentGeneSymbol)"></full-frame>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Genomic Data">
        <a-row class="content-container" :gutter="16">
          <a-col :lg="24" :xs="24" :sm="24" :md="24">
            <full-frame
              v-if="isValid" 
              :src="generateDataPortalURL('glioma_msk_2018', formatGeneSymbol(geneSymbols))"
              :onloadfn="onload"
            ></full-frame>
            <a-empty v-else />
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="5" tab="Expression Data">
        <a-row style="position: relative; top: -15px" v-if="isValid">
          <a-row class="gepia-header">
            <a-select size="small" :value="currentGeneSymbol" style="width: 120px" @change="selectGeneSymbol">
              <a-select-option :value="gene" :key="gene" v-for="gene in formatGeneSymbol(geneSymbols)">
                {{ gene }}
              </a-select-option>
            </a-select>
            <span style="margin-left: 5px">
              Gene Expression Profiling Interactive Analysis(
              <a href="http://gepia.cancer-pku.cn/index.html" target="_blank">GEPIA</a>)
            </span>
          </a-row>
          <full-frame :src="buildGepiaURL(currentGeneSymbol)"></full-frame>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import v from 'voca'
import FullFrame from '@/components/FullFrame'
import { generateDataPortalURL, formatGeneSymbol } from './utils'
import Ontology from './Ontology'

const allKeys = ['general', 'clinical', 'experimental', 'disease', 'statistics', 'knowledge']
const labels = {
  general: [
    'biomarker',
    'gene_symbol',
    'description',
    'type_of_biomarker',
    'type_of_rna_biomarker',
    'clinical_use',
    'level_of_evidence'
  ],
  clinical: ['research_region', 'total_number', 'male', 'female', 'mean_age', 'age', 'stage'],
  experimental: ['source', 'key_experiment'],
  disease: ['disease_classification', 'disease_type', 'disease_subtype'],
  statistics: ['sensitivity', 'specificity', 'area_under_the_curve', 'supplementary_statistics'],
  knowledge: ['up_regulator', 'down_effector_or_targets', 'knowledge_points']
}
const labelDict = {
  type_of_rna_biomarker: 'Type of RNA Biomarker',
  type_of_biomarker: 'Type of Biomarker',
  level_of_evidence: 'Level of Evidence',
  area_under_the_curve: 'AUC',
  down_effector_or_targets: 'Down Effector or Targets'
}

export default {
  components: {
    FullFrame,
    Ontology
  },
  props: {
    geneSymbols: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      geneSymbol: '',
      biomarker: {
        abstract:
          'Background. Glioma is one of the most aggressive and lethal human brain tumors. Accumulating evidence shows that microRNAs play important roles in cancers, including glioma. Previous studies reported that miR-124 levels were downregulated in glioma specimens. Here, we further investigate the potential role of miR-124 in glioma. Methods. The expression levels of miR-124 were detected in glioma specimens by quantitative reverse transcriptase PCR. The direct targets of miR-124 were identified by bioinformatics analysis and were further validated by immunoblotting and luciferase reporter assay. The effects of miR-124 on glioma cell proliferation and chemosensitivity to temozolomide were analyzed by Cell-Counting Kit 8 assay. Apoptosis was evaluated by fluorescence activated cell sorting analysis. A xenograft model was used to study the effect of miR-124 on tumor growth and angiogenesis. Results. Expression levels of miR-124 were greatly downregulated in glioma specimens. related Ras viral oncogene homolog (R-Ras) and neuroblastoma Ras viral oncogene homolog (N-Ras) were identified as direct targets of miR-124. MiR-124 inhibited glioma cell growth, invasion, angiogenesis, and tumor growth and increased chemosensitivity to temozolomide treatment by negatively regulating the Ras family and its downstream signaling pathways: phosphatidylinositol-3 kinase/Akt and Raf/extracellular signal-regulated kinase 1/2. Furthermore, overexpression of R-Ras rescued the inhibitory effects of miR-124. Meanwhile, overexpression of R-Ras and N-Ras restored miR-124–inhibited vascular endothelial growth factor (VEGF) transcription activation. In clinical glioma specimens, protein levels of R-Ras and N-Ras were upregulated and inversely correlated with miR-124 expression levels. Conclusions. Taken together, these results revealed that miR-124 levels in tumor tissues are associated with glioma occurrence, angiogenesis, and chemoresistance and that miR-124 may be used as a new diagnostic marker and therapeutic target for glioma in the future.',
        age: 'NA',
        area_under_the_curve: 'NA',
        biomarker: 'miR-124',
        clinical_use: 'Diagnositic,Therapeutic',
        description:
          'Taken together, these results revealed that miR-124 levels in tumor tissues are associated with glioma occurrence, angiogenesis, and chemoresistance and that miR-124 may be used as a new diagnostic marker and therapeutic target for glioma in the future.',
        disease_classification: 'Glioma',
        disease_subtype: 'Diffuse Astrocytoma,Anaplastic Astrocytoma,Glioblastoma',
        disease_type: 'Glioma',
        doi: '10.1093/neuonc/nou084',
        down_effector_or_targets: 'R-Ras; N-Ras',
        female: 'NA',
        gene_symbol: 'MIR124-1; MIR124-2; MIR124-3',
        if_2020: '9.384',
        journal: 'Neuro Oncol',
        key_experiment: 'qRT-PCR',
        keywords: 'carcinogenesis; glioma; miR-124; N-Ras; R-Ras',
        knowledge_points:
          '1. Downregulation of MiR-124 Expression in Human Gliomas  2. MiR-124 Overexpression Inhibits Akt and Raf/ERK1/2 Signaling Pathways  3. R-Ras and N-Ras Have Synergistic Effects to Restore MiR-124 inhibited VEGF Transcriptional Activation  4. Overexpression of R-Ras Reverses the Inhibitory Effects of MiR-124  5. Overexpression of MiR-124 Increases Chemosensitivity of Glioma Cells to Temozolomide and Its Apoptotic Induction Effect in the Presence of Temozolomide Through R-Ras and N-Ras  6. MiR-124 Suppresses Tumor Angiogenesis in Nude Mice  7. Overexpression of MiR-124 Inhibits Cell Proliferation, Invasion, and Tumor Growth ',
        level_of_evidence: 'Tier 3, Biomarker is validated in pre-clinical research',
        male: 'NA',
        mean_age: 'NA',
        pmid: '24861879',
        publication_time: '2014',
        research_region: 'China',
        sensitivity: 'NA',
        source: 'Tissue',
        specificity: 'NA',
        stage: 'II,III,IV',
        supplementary_statistics:
          'miR-124 levels were downregulated in these 3 groups compared with the normal brain group (P < .01). Moreover, the levels of miR-124 expression in high-grade tumors (WHO grades III and IV) were significantly lower than those in low-grade tumors (WHO grade II) (P < .05)',
        title:
          'MiR-124 governs glioma growth and angiogenesis and enhances chemosensitivity by targeting R-Ras and N-Ras',
        total_number: '24',
        type_of_biomarker: 'RNA Biomarker',
        type_of_rna_biomarker: 'miRNA',
        up_regulator: 'NA'
      },
      activeKey: ['general', 'clinical', 'experimental', 'disease', 'statistics', 'knowledge'],
      allKeys,
      labelDict,
      labels,
      onload: function(id) {
        console.log('DataPortal: ', id)
        // document.getElementById(id).contentWindow.postMessage({ hideHeader: true }, 'http://data.3steps.cn')
        document.getElementById(id).contentWindow.postMessage({ hideHeader: true }, 'http://dataportal.prophetdb.org/')
      },
      currentGeneSymbol: '',
      paperActive: true,
      tagName: '1'
    }
  },
  computed: {
    isValid() {
      return this.geneSymbols.length > 0
    }
  },
  methods: {
    generateDataPortalURL,
    formatGeneSymbol,
    buildGeneQueryUrl(hugoGeneSymbol) {
      const baseUrl = 'http://www.fudan-pgx.org/premedkb/index.html#/search/result'
      const label = '?view=widget&hideHeader=true'
      const queryStr = '&queryType=3&num=1&step=1&term=%27' + hugoGeneSymbol + '%27%5Bgene%5D'
      return baseUrl + label + queryStr
    },
    buildGepiaURL(geneSymbol) {
      return `http://gepia.cancer-pku.cn/detail.php?gene=${geneSymbol}`
    },
    formatLabel(label) {
      const formatedLabel = this.labelDict[label]
      if (formatedLabel) {
        return formatedLabel
      } else {
        return v.titleCase(label.replaceAll('_', ' '))
      }
    },
    formatKnowledgePoints(knowledgepoints) {
      if (knowledgepoints) {
        return knowledgepoints.replaceAll(/[1-9]\.[ ]+/gi, '<br>&check; ').replace(/^<br>/, '')
      } else {
        return ''
      }
    },
    switchGene(geneSymbol) {
      this.geneSymbol = geneSymbol
    },
    selectGeneSymbol(geneSymbol) {
      this.currentGeneSymbol = geneSymbol
    },
    changeTab(activeKey) {
      this.tagName = activeKey
    }
  },
  created() {
    this.selectGeneSymbol(this.formatGeneSymbol(this.geneSymbols)[0])
  }
}
</script>

<style lang="less" scoped>
.gene-details {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 10px;

  .ant-empty {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .knowledge-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
  }

  .gepia-header {
    height: 60px;
    position: absolute;
    top: 0px;
    z-index: 1;
    background-color: #fff;
    width: 100%;
    align-items: center;
    display: flex;
  }
}
</style>

<style lang="less">
.gene-details {
  .content-container {
    height: calc(100vh - 160px);
    overflow: scroll;
  }
}
</style>
