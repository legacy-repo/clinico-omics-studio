<template>
  <a-row>
    <a-collapse :activeKey="activeKey" v-if="visible">
      <a-collapse-panel v-for="key in allKeys" :key="key" :header="formatLabel(key)">
        <a-empty v-if="filterLabels(labels[key]).length === 0" />
        <a-row v-for="label in filterLabels(labels[key])" v-else :key="label" style="margin-bottom: 10px">
          <a-col :xs="24" :sm="12" :md="6" :lg="4">
            <a-tag color="#108ee9">
              <b>{{ formatLabel(label) }}</b>
            </a-tag>
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="12">
            <span v-html="formatValue(gene[label], label)"></span>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
    <a-row v-else class="empty">
      <a-spin v-if="loading" />
      <a-empty v-else />
    </a-row>
  </a-row>
</template>

<script>
import v from 'voca'
import filter from 'lodash.filter'
import map from 'lodash.map'
import { getGeneData } from './utils'

const allKeys = ['general', 'gene', 'nucleotide', 'clinical', 'orthologs', 'specialist']
const labels = {
  general: [
    'symbol',
    'name',
    'locus_group',
    'locus_type',
    'hgnc_id',
    'status',
    'prev_symbol',
    'prev_name',
    'alias_symbol',
    'location',
    'gene_group'
  ],
  gene: ['entrez_id', 'ensembl_gene_id', 'ucsc_id'],
  nucleotide: ['refseq_accession', 'rna_central_id'],
  clinical: ['omim_id'],
  orthologs: ['rgd_id', 'mgd_id'],
  specialist: ['mirbase', 'lncrnadb', 'lncipedia']
}
const labelDict = {
  gene: 'Gene Resources',
  nucleotide: 'Nucleotide Resources',
  general: 'General Information',
  clinical: 'Clinical Resources',
  orthologs: 'Orthologs Resources',
  specialist: 'Specialist Resources',
  symbol: 'Approved Symbol',
  name: 'Approved Name',
  hgnc_id: 'HGNC ID',
  status: 'Symbol Status',
  prev_symbol: 'Previous Symbols',
  prev_name: 'Previous Names',
  alias_symbol: 'Alias Symbols',
  location: 'Chromosomal Location',
  gene_group: 'Gene Groups',
  entrez_id: 'NCBI Gene',
  ensembl_gene_id: 'Ensembl',
  ucsc_id: 'UCSC',
  refseq_accession: 'RefSeq',
  rna_central_id: 'RNAcentral',
  omim_id: 'OMIM',
  rgd_id: 'Rattus Norvegicus',
  mgd_id: 'Mus Musculus',
  mirbase: 'miRBase',
  lncrnadb: 'lncRNAdb',
  lncipedia: 'LNCipedia'
}
const linkPrefix = {
  ensembl_gene_id: 'https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=',
  ucsc_id: 'http://genome.cse.ucsc.edu/cgi-bin/hgGene?org=Human&hgg_chrom=none&hgg_type=knownGene&hgg_gene=',
  entrez_id: 'http://view.ncbi.nlm.nih.gov/gene/',
  refseq_accession: 'https://www.ncbi.nlm.nih.gov/nuccore?term=',
  rna_central_id: 'http://rnacentral.org/rna/',
  mgd_id: 'http://www.informatics.jax.org/marker/',
  rgd_id: 'http://rgd.mcw.edu/rgdweb/report/gene/main.html?id=',
  mirbase: 'http://www.mirbase.org/cgi-bin/mirna_entry.pl?acc=',
  omim_id: 'http://www.omim.org/entry/',
  hgnc_id: 'https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/',
  lncrnadb: 'http://lncrnadb.com/',
  lncipedia: 'http://lncipedia.org/db/gene/'
}

export default {
  props: {
    geneSymbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      gene: {},
      activeKey: ['general', 'gene', 'nucleotide', 'clinical', 'orthologs', 'specialist'],
      allKeys,
      labels,
      labelDict,
      linkPrefix
    }
  },
  methods: {
    formatLabel(label) {
      const formatedLabel = this.labelDict[label]
      if (formatedLabel) {
        return formatedLabel
      } else {
        return v.titleCase(label.replaceAll('_', ' '))
      }
    },
    filterLabels(labels) {
      return filter(labels, label => {
        if (this.gene[label]) {
          return true
        } else {
          return false
        }
      })
    },
    formatLink(value, label) {
      if (this.linkPrefix[label]) {
        const link = this.linkPrefix[label] + value
        return '<a href="' + link + '" target="_blank">' + value + '</a>'
      } else {
        return value
      }
    },
    formatValue(value, label) {
      if (typeof value === 'string') {
        if (label) {
          return this.formatLink(value, label)
        } else {
          return value
        }
      } else {
        if (label) {
          return map(value, item => {
            return this.formatLink(item, label)
          }).join('; ')
        } else {
          return value.join('; ')
        }
      }
    }
  },
  created() {
    this.loading = true
    getGeneData(this.geneSymbol)
      .then(response => {
        console.log('Get Gene Information: ', response)

        const numFound = response.response.numFound
        if (numFound === 0) {
          this.visible = false
        } else if (numFound === 1) {
          this.visible = true
          this.gene = response.response.docs[0]
        } else if (numFound > 1) {
          this.visible = false
        }

        this.loading = false
      })
      .catch(error => {
        console.log('Get Gene Symbol (Error): ', error)
        this.loading = false
      })
  }
}
</script>

<style lang="less" scoped>
.empty {
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 300px;
}
</style>
