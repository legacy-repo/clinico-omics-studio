<template>
  <a-row class="variant-table">
    <a-row class="variant-table__operations">
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <a-popover v-model="menuVisible" trigger="click" placement="bottomLeft">
          <a-input-search
            style="margin-bottom: 10px"
            slot="content"
            placeholder="Filter Columns"
            allowClear
            @change="onSearch"
          />
          <a-row slot="content">
            <a-col class="variant-table__operations__columns">
              <a-checkbox
                v-for="item in filteredColumns"
                :defaultChecked="item.visible"
                :key="item.key"
                @change="onSelectColumn(item.title, $event)"
                >{{ item.title }}</a-checkbox
              >
            </a-col>
          </a-row>
          <a-button>
            <a-icon type="menu" />
          </a-button>
        </a-popover>
        <a-button @click="showSortMenu" disabled>
          <a-icon type="sort-ascending" />
        </a-button>
        <a-button @click="downloadAsJSON">JSON</a-button>
        <a-button @click="downloadAsCSV">CSV</a-button>
        <a-button @click="switchCartTable">
          <a-icon type="experiment" />
          <span>Cart Variants &nbsp;</span>
          <a-tag color="#87d068" style="margin: 0px">{{ recordCounts }}</a-tag>
        </a-button>
      </a-col>
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <p class="variant-table__operations__header-info">Showing {{ first }} - {{ last }} of {{ total }} files</p>
      </a-col>
    </a-row>
    <a-table
      :row-selection="{ onSelect: onSelectRecord, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="visibleColumns"
      :pagination="pagination"
      :dataSource="data"
      :loading="loading"
      :style="{ 'variant-table--empty': empty, 'variant-table--not-empty': !empty }"
      :scroll="{ x: 1000, y: true }"
    >
      <a slot="link" slot-scope="text, record, rindex, columnAttr" @click="redirectToRecord(text, columnAttr)">{{ text }}</a>
      <span slot="tags" slot-scope="text">
        <a-tag v-for="tag in splitByComma(text)" :key="tag">{{ tag }}</a-tag>
      </span>
      <span slot="plain" slot-scope="text">{{ text }}</span>
      <span slot="tag" slot-scope="text">
        <a-tag v-if="splitByComma(text).length === 0">{{ splitByComma(text).length }}</a-tag>
        <a-tag color="#f50" v-else>{{ splitByComma(text).length }}</a-tag>
      </span>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-row v-for="key in extraFields" :key="key" style="margin-bottom: 5px;">
          <a-col :span="3"><a-tag color="#108ee9">{{ getFieldTitle(key) }}</a-tag></a-col>
          <a-col :span="21">{{ record[key] }}</a-col>
        </a-row>
      </p>
      <span slot="operation" slot-scope="text" class="table-operation">
        <a>Check</a>
      </span>
    </a-table>
    <a id="downloadAnchorElem" v-show="false"></a>
    <a-drawer
      title="Cart Variants"
      :placement="placement"
      :visible="cartTableActive"
      @close="switchCartTable"
      width="50%"
      class="variant-table__dataset-panel"
    >
      <data-set></data-set>
    </a-drawer>
  </a-row>
</template>

<script>
import filter from 'lodash.filter'
import map from 'lodash.map'
import DataSet from '@/views/datasource/DataSet'

const allFields = [
  {
    key: 'id',
    name: 'ID',
    short: 'ID',
    description: 'Identity',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'chrom',
    name: 'CHROM',
    short: 'CHROM',
    description: 'Chromosome',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'pos',
    name: 'Position',
    short: 'Position',
    description: 'The position of the variant in a chromosome.',
    type: 'number',
    priority: 1,
    values: ''
  },
  {
    key: 'gene_symbol',
    name: 'Gene Symbol',
    short: 'Gene Symbol',
    description: 'Gene.refGene annotation provided by ANNOVAR',
    type: 'number',
    priority: 1,
    displayType: 'link',
    values: ''
  },
  {
    key: 'ref',
    name: 'Reference',
    short: 'Reference',
    description: 'Reference',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'alt',
    name: 'Alteration',
    short: 'Alteration',
    description: 'Alteration',
    type: 'category',
    priority: 1,
    values: ''
  },
  {
    key: 'qual',
    name: 'Quality',
    short: 'Quality',
    description: 'Quality',
    type: 'category',
    priority: 5,
    values: ''
  },
  {
    key: 'info_therapy',
    name: 'Therapy',
    short: 'Therapy',
    description: 'Alternative allele related therapy provided by PGI',
    type: 'category',
    priority: 4,
    displayType: 'tag',
    values: ''
  },
  {
    key: 'info_druginfo',
    name: 'Drug Info',
    short: 'Drug Info',
    description: 'Drug information provided by PGI',
    type: 'category',
    priority: 5,
    displayType: 'info',
    values: ''
  },
  {
    key: 'filter',
    name: 'Filter',
    short: 'Filter',
    description: 'Filter',
    type: 'category',
    priority: 6,
    displayType: 'info',
    values: ''
  },
  {
    key: 'info_dp',
    name: 'Read Depth',
    short: 'Read Depth',
    description: 'Approximate read depth (reads with MQ=255 or with bad mates are filtered)',
    type: 'number',
    priority: 7,
    displayType: 'info',
    values: ''
  },
  {
    key: 'info_ecent',
    name: 'Number of events',
    short: 'Number of events',
    description: 'Number of events in this haplotype',
    type: 'number',
    priority: 8,
    displayType: 'info',
    values: ''
  },
  {
    key: 'info_in_pon',
    name: 'IN PON',
    short: 'IN PON',
    description: 'site found in panel of normals',
    type: 'number',
    priority: 9,
    displayType: 'info',
    values: ''
  }
]

const genColumns = function(allFields) {
  const columns = []

  allFields.forEach(field => {
    columns.push({
      title: field.short,
      dataIndex: field.key,
      key: field.key,
      align: 'center',
      scopedSlots: { customRender: field.displayType },
      visible: field.priority < 5
    })
  })

  columns.push({
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    visible: true
  })

  return columns
}

const columns = genColumns(allFields)

const data = [
  {
    info_1000g_afr: '.',
    info_phylop46way_placental: '',
    info_in_pon: '',
    info_polyphen2_hvar_score: '',
    info_mutationassessor_score: '',
    info_ru: '',
    info_polyphen2_hdiv_pred: '',
    info_1000g_eur: '.',
    info_mutationtaster_pred: '',
    info_ps2: '0',
    info_mutationtaster_score: '',
    info_phylop100way_vertebrate: '',
    info_bs1: '0',
    info_ps4: '0',
    info_n_art_lod: '',
    info_radialsvm_score: '',
    info_exac_all: '',
    info_fathmm_pred: '',
    info_genomicsuperdups: '',
    info_polyphen2_hvar_pred: '',
    info_pm5: '0',
    info_lr_score: '',
    info_clnacc: '.',
    id: '',
    gene_symbol: 'KRAS',
    info_clndsdbid: '.',
    info_exac_amr: '',
    info_bp4: '0',
    info_1000g_amr: '.',
    info_pp1: '0',
    info_exac_sas: '',
    info_polyphen2_hdiv_score: '',
    info_1000g_sas: '.',
    info_ecnt: '1',
    info_bp5: '0',
    info_exac_oth: '',
    info_p_contam: '',
    info_bp3: '0',
    info_cadd_phred: '',
    info_ps1: '0',
    info_sift_score: '',
    info_druginfo:
      'Cetuximab(FDA批准/NMPA批准|西妥昔单抗竞争性抑制表皮生长因子与表皮生长因子受体的结合。西妥昔单抗由Fv可变区（225株鼠源EGFr单克隆抗体的抗原结合区）与人IgG1重链和kappa轻链恒定区结合。适应症：用于治疗对其他伊立替康为主的化疗方案无效的、EGFR表达的转移性结直肠癌患者；或用于治疗头颈部鳞状细胞癌，并与放射疗法联合治疗。西妥昔单抗不适用于Ras突变型结直肠癌的治疗。)Panitumumab(FDA批准/NMPA尚未批准|帕尼单抗是一种人重组IgG2单克隆抗体，可与人表皮生长因子受体（EGFR）特异性结合，是一种抗肿瘤药。适应症：用于治疗表达EGFR且对含氟嘧啶、奥沙利铂和伊立替康的化疗方案无效的转移性结直肠癌。)Trametinib(FDA批准/NMPA尚未批准|曲美替尼是一种激酶抑制剂。适应症：曲美替尼用于治疗BRAF V600E或V600K突变的不可切除或转移性黑色素瘤。曲美替尼也与达布非尼一起用于治疗BRAF V600E基因异常引起的间变性甲状腺癌。)Binimetinib(FDA批准/NMPA尚未批准|比美替尼是一种强效的选择性口服丝裂原活化蛋白激酶1/2（mek1/2）抑制剂，与encorafenib（康奈非尼）合用。适应症：FDA批准康奈非尼和比美替尼联合治疗BRAF V600E或V600K突变的不可切除或转移性黑色素瘤。)Cobimetinib(FDA批准/NMPA尚未批准|考比替尼是一种抗肿瘤药物和丝裂原激活细胞外激酶（MEK）途径的选择性抑制剂。适应症：考比替尼用于治疗BRAF V600E或V600K突变的不可切除或转移性黑色素瘤患者，常与维莫非尼（BRAF抑制剂）联合使用。)',
    pos: '25398284',
    info_pm1: '0',
    info_cosmic78: '',
    info_clndbn: '.',
    info_bs4: '0',
    info_pop_af: '',
    info_gene_refgene: '',
    qual: '',
    info_lrt_score: '',
    info_str: '',
    info_popfreqmax: '',
    info_pp4: '0',
    info_cytoband: '',
    info_genedetail_refgene: '',
    info_p_germline: '',
    info_pm6: '0',
    info_rpa: '',
    info_fathmm_score: '',
    info_clinsig: '.',
    info_gerp___rs: '',
    info_mutationassessor_pred: '',
    info_exac_eas: '',
    info_1000g_all: '.',
    info_clndsdb: '.',
    info_bp2: '0',
    info_esp6500siv2_all: '',
    info_ps3: '0',
    info_pvs1: '1',
    info_bp1: '0',
    info_exac_nfe: '',
    info_esp6500siv2_aa: '',
    info_ba1: '0',
    info_pm4: '0',
    info_sift_pred: '',
    chrom: '12',
    info_pm3: '0',
    info_siphy_29way_logodds: '',
    info_pm2: '1',
    info_func_refgene: '',
    info_bp7: '0',
    info_annovar_date: '2018-04-16',
    info_esp6500siv2_ea: '',
    info_lr_pred: '',
    info_nlod: '23.73',
    info_tlod: '27.77',
    info_snp138: '',
    info_cadd_raw: '',
    info_intervar_automated: '',
    info_allele_end: '',
    info_bs3: '0',
    info_lrt_pred: '',
    alt: 'T',
    info_aachange_refgene: '',
    info_therapy: 'Cetuximab(R1), Panitumumab(R1), Trametinib(4), Binimetinib(4), Cobimetinib(4)',
    ref: 'C',
    info_bp6: '0',
    info_radialsvm_pred: '',
    info_vest3_score: '',
    info_pp3: '0',
    filter: 'PASS',
    info_dp: '189',
    info_exac_afr: '',
    info_bs2: '0',
    info_exac_fin: '',
    info_exonicfunc_refgene: '',
    info_1000g_eas: '.',
    info_cg46: '.',
    info_pp2: '0',
    info_pp5: '0'
  },
  {
    info_1000g_afr: '.',
    info_phylop46way_placental: '',
    info_in_pon: '',
    info_polyphen2_hvar_score: '',
    info_mutationassessor_score: '',
    info_ru: '',
    info_polyphen2_hdiv_pred: '',
    info_1000g_eur: '.',
    info_mutationtaster_pred: '',
    info_ps2: '0',
    info_mutationtaster_score: '',
    info_phylop100way_vertebrate: '',
    info_bs1: '0',
    info_ps4: '0',
    info_n_art_lod: '',
    info_radialsvm_score: '',
    info_exac_all: '',
    info_fathmm_pred: '',
    info_genomicsuperdups: '',
    info_polyphen2_hvar_pred: '',
    info_pm5: '0',
    info_lr_score: '',
    info_clnacc: 'RCV000131966.4|RCV000144665.4|RCV000149051.1|RCV000205625.1|RCV000254692.1',
    id: '',
    gene_symbol: 'TP53',
    info_clndsdbid: 'C0027672:699346009|C1835398:151623|C0376358:176807:399068003|C0085390:ORPHA524:428850001|CN221809',
    info_exac_amr: '',
    info_bp4: '0',
    info_1000g_amr: '.',
    info_pp1: '0',
    info_exac_sas: '',
    info_polyphen2_hdiv_score: '',
    info_1000g_sas: '.',
    info_ecnt: '1',
    info_bp5: '0',
    info_exac_oth: '',
    info_p_contam: '',
    info_bp3: '0',
    info_cadd_phred: '',
    info_ps1: '0',
    info_sift_score: '',
    info_druginfo: '',
    pos: '7577121',
    info_pm1: '0',
    info_cosmic78: '',
    info_clndbn:
      'Hereditary_cancer-predisposing_syndrome|Li-Fraumeni_syndrome_1|Malignant_tumor_of_prostate|Li-Fraumeni_syndrome|not_provided',
    info_bs4: '0',
    info_pop_af: '',
    info_gene_refgene: '',
    qual: '',
    info_lrt_score: '',
    info_str: '',
    info_popfreqmax: '',
    info_pp4: '0',
    info_cytoband: '',
    info_genedetail_refgene: '',
    info_p_germline: '',
    info_pm6: '0',
    info_rpa: '',
    info_fathmm_score: '',
    info_clinsig: 'Pathogenic|Pathogenic|Uncertain_significance|other|Pathogenic',
    info_gerp___rs: '',
    info_mutationassessor_pred: '',
    info_exac_eas: '',
    info_1000g_all: '.',
    info_clndsdb: 'MedGen:SNOMED_CT|MedGen:OMIM|MedGen:OMIM:SNOMED_CT|MedGen:Orphanet:SNOMED_CT|MedGen',
    info_bp2: '0',
    info_esp6500siv2_all: '',
    info_ps3: '0',
    info_pvs1: '0',
    info_bp1: '0',
    info_exac_nfe: '',
    info_esp6500siv2_aa: '',
    info_ba1: '0',
    info_pm4: '0',
    info_sift_pred: '',
    chrom: '17',
    info_pm3: '0',
    info_siphy_29way_logodds: '',
    info_pm2: '0',
    info_func_refgene: '',
    info_bp7: '0',
    info_annovar_date: '2018-04-16',
    info_esp6500siv2_ea: '',
    info_lr_pred: '',
    info_nlod: '120.42',
    info_tlod: '84.04',
    info_snp138: '',
    info_cadd_raw: '',
    info_intervar_automated: '',
    info_allele_end: 'ALLELE_END',
    info_bs3: '0',
    info_lrt_pred: '',
    alt: 'A',
    info_aachange_refgene: '',
    info_therapy: '',
    ref: 'G',
    info_bp6: '0',
    info_radialsvm_pred: '',
    info_vest3_score: '',
    info_pp3: '0',
    filter: 'PASS',
    info_dp: '808',
    info_exac_afr: '',
    info_bs2: '0',
    info_exac_fin: '',
    info_exonicfunc_refgene: '',
    info_1000g_eas: '.',
    info_cg46: '.',
    info_pp2: '0',
    info_pp5: '1'
  },
  {
    info_1000g_afr: '.',
    info_phylop46way_placental: '',
    info_in_pon: '',
    info_polyphen2_hvar_score: '',
    info_mutationassessor_score: '',
    info_ru: '',
    info_polyphen2_hdiv_pred: '',
    info_1000g_eur: '.',
    info_mutationtaster_pred: '',
    info_ps2: '.',
    info_mutationtaster_score: '',
    info_phylop100way_vertebrate: '',
    info_bs1: '.',
    info_ps4: '.',
    info_n_art_lod: '',
    info_radialsvm_score: '',
    info_exac_all: '',
    info_fathmm_pred: '',
    info_genomicsuperdups: '',
    info_polyphen2_hvar_pred: '',
    info_pm5: '.',
    info_lr_score: '',
    info_clnacc: '.',
    id: '',
    gene_symbol: 'PIK3CA',
    info_clndsdbid: '.',
    info_exac_amr: '',
    info_bp4: '.',
    info_1000g_amr: '.',
    info_pp1: '.',
    info_exac_sas: '',
    info_polyphen2_hdiv_score: '',
    info_1000g_sas: '.',
    info_ecnt: '1',
    info_bp5: '.',
    info_exac_oth: '',
    info_p_contam: '',
    info_bp3: '.',
    info_cadd_phred: '',
    info_ps1: '.',
    info_sift_score: '',
    info_druginfo:
      'Alpelisib(FDA批准/NMPA尚未批准|阿培利司是一种磷脂酰肌醇3激酶（PI3K）抑制剂，具有很强的抗肿瘤活性。它通过选择性抑制I类PI3K p110α（PI3K的催化亚单位）发挥作用，从而影响增殖、存活、分化和代谢。适应症：阿培利司联合氟维司琼治疗绝经后晚期或转移性乳腺癌。这种癌必须是激素受体（HR）阳性、人表皮生长因子受体2（HER2）阴性和PIK3CA­ 突变；且必须通过FDA批准的检测，在内分泌治疗方案的进展或之后进行检测。)，Everolimus(FDA批准/NMPA批准|依维莫司是雷帕霉素（西罗莫司）的衍生物，其作用与雷帕霉素类似，作为mTOR抑制剂。它目前用作免疫抑制剂以防止器官移植物的排斥，仅作用于mTORC1蛋白而不在mTORC2蛋白上。适应症：依维莫司适用于以下患者：（1）来曲唑或阿那曲唑治疗失败后合并激素依西美坦治疗晚期激素受体阳性，HER2阴性乳腺癌（高级HR + BC）的绝经后妇女；（2）适用于有不可切除，局部晚期或转移性疾病的胰腺源性进行性神经内分泌肿瘤（PNET）的成年患者；（3）适用于舒尼替尼或索拉非尼治疗失败后的成人晚期肾细胞癌（RCC）患者；（4）适用于有成人肾血管平滑肌脂肪瘤和结节性硬化症（TSC），且不可手术治愈的患者。)Buparlisib(FDA尚未批准/NMPA尚未批准|Buparlisib已被用于研究淋巴瘤，转移瘤，肺癌，实体瘤和乳腺癌等治疗和基础科学的试验中。)Taselisib(FDA尚未批准/NMPA尚未批准|Taselisib已被用于淋巴瘤，乳腺癌，卵巢癌，实体肿瘤和HER2-Neu阴性乳腺癌等肿瘤的治疗研究中。)Copanlisib(FDA批准/NMPA尚未批准|库潘尼西是一种选择性泛I类磷酸肌醇3-激酶（PI3K /磷脂酰肌醇-4，5-二磷酸3-激酶/磷脂酰肌醇3-激酶）抑制剂。该药物靶向起作用的酶在调节细胞生长和存活中的作用。适应症：库潘尼西适用于已接受至少两次先前全身治疗的复发性滤泡性淋巴瘤（FL）成人患者的治疗。)',
    pos: '178922324',
    info_pm1: '.',
    info_cosmic78: '',
    info_clndbn: '.',
    info_bs4: '.',
    info_pop_af: '',
    info_gene_refgene: '',
    qual: '',
    info_lrt_score: '',
    info_str: '',
    info_popfreqmax: '',
    info_pp4: '.',
    info_cytoband: '',
    info_genedetail_refgene: '',
    info_p_germline: '',
    info_pm6: '.',
    info_rpa: '',
    info_fathmm_score: '',
    info_clinsig: '.',
    info_gerp___rs: '',
    info_mutationassessor_pred: '',
    info_exac_eas: '',
    info_1000g_all: '.',
    info_clndsdb: '.',
    info_bp2: '.',
    info_esp6500siv2_all: '',
    info_ps3: '.',
    info_pvs1: '.',
    info_bp1: '.',
    info_exac_nfe: '',
    info_esp6500siv2_aa: '',
    info_ba1: '.',
    info_pm4: '.',
    info_sift_pred: '',
    chrom: '3',
    info_pm3: '.',
    info_siphy_29way_logodds: '',
    info_pm2: '.',
    info_func_refgene: '',
    info_bp7: '.',
    info_annovar_date: '2018-04-16',
    info_esp6500siv2_ea: '',
    info_lr_pred: '',
    info_nlod: '13.25',
    info_tlod: '11.47',
    info_snp138: '',
    info_cadd_raw: '',
    info_intervar_automated: '',
    info_allele_end: 'ALLELE_END',
    info_bs3: '.',
    info_lrt_pred: '',
    alt: 'A',
    info_aachange_refgene: '',
    info_therapy: 'Alpelisib(3B), Everolimus(3B), Buparlisib(3B), Taselisib(3B), Copanlisib(3B)',
    ref: 'G',
    info_bp6: '.',
    info_radialsvm_pred: '',
    info_vest3_score: '',
    info_pp3: '.',
    filter: 'PASS',
    info_dp: '86',
    info_exac_afr: '',
    info_bs2: '.',
    info_exac_fin: '',
    info_exonicfunc_refgene: '',
    info_1000g_eas: '.',
    info_cg46: '.',
    info_pp2: '.',
    info_pp5: '.'
  }
]

const hiddenDisplayTypes = ['info', 'tag']

export default {
  props: {},
  components: {
    DataSet
  },
  data() {
    return {
      cartTableActive: false,
      placement: 'right',
      data: data,
      filterValue: '',
      loading: false,
      menuVisible: false,
      // selectedRowKeys: [],
      columns,
      pagination: {
        size: 'small',
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchCollections()
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchCollections()
        }
      }
    }
  },
  watch: {
    queryString(newValue, oldValue) {
      console.log('Query Map - Payload: ', newValue, oldValue)
      this.searchCollections()
    },
    $route(to, from) {
      console.log('DataTable(to, from): ', to, from)
      this.saveCurrentDataSet()
    }
  },
  computed: {
    selectedRowKeys() {
      return []
    },
    recordCounts() {
      return 0
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    filteredColumns() {
      return filter(this.columns, record => {
        return record.title.indexOf(this.filterValue) >= 0
      })
    },
    extraFields() {
      return map(
        filter(allFields, column => {
          return hiddenDisplayTypes.indexOf(column.displayType) >= 0
        }),
        'key'
      )
    },
    visibleColumns() {
      return filter(this.columns, record => {
        return record.visible === true
      })
    },
    first() {
      return (this.pagination.current - 1) * this.pagination.pageSize + 1
    },
    last() {
      return this.pagination.current * this.pagination.pageSize
    },
    empty() {
      return this.data === 0
    },
    total() {
      return this.pagination.total
    },
    pageSize() {
      return this.pagination.pageSize
    },
    allowDownload() {
      if (this.total <= 100) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getFieldTitle(key) {
      const fields = filter(this.columns, column => {
        return column.key === key
      })

      if (fields.length === 1) {
        return fields[0].title
      } else {
        return ''
      }
    },
    splitByComma(text) {
      if (text) {
        return text.split(',')
      } else {
        return text ? [text] : []
      }
    },
    saveCurrentDataSet() {},
    redirectToRecord(id, columnAttr) {
      console.log('redirectToRecord: ', id, columnAttr)
      if (columnAttr.key === 'gene_symbol') {
        this.$emit('show-panel', {
          panelType: columnAttr.key,
          id: id
        })
      } else {
        this.$message.warning('No such panel')
      }
    },
    switchCartTable() {
      this.cartTableActive = !this.cartTableActive
    },
    onSelectRecord(record, selected, selectedRows) {},
    onSearch(e) {
      this.filterValue = e.target.value
    },
    onSelectColumn(value, event) {
      console.log('onSelectColumn: ', value, event)
      map(this.columns, record => {
        if (record.title === value) {
          record.visible = event.target.checked
        }
      })
    },
    showSortMenu() {},
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      // this.selectedRowKeys = selectedRowKeys
    },
    json2csv(data) {
      var fields = Object.keys(data[0])
      var replacer = function(key, value) {
        return value === null ? '' : value
      }

      var csv = data.map(function(row) {
        return fields
          .map(function(fieldName) {
            return JSON.stringify(row[fieldName], replacer)
          })
          .join(',')
      })

      csv.unshift(fields.join(',')) // add header column
      csv = csv.join('\r\n')
      return csv
    },
    resetPage() {},
    setTotal() {},
    downloadAsJSON() {
      if (this.allowDownload) {
        this.setTotal()
        this.searchCollections(data => {
          var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
          var dlAnchorElem = document.getElementById('downloadAnchorElem')
          dlAnchorElem.setAttribute('href', dataStr)
          dlAnchorElem.setAttribute('download', 'data.json')
          dlAnchorElem.click()

          this.resetPage()
        }, true)
      } else {
        this.$message.warn('Please filter before downloading (No more than 100 records are supported).')
      }
    },
    downloadAsCSV() {
      if (this.allowDownload) {
        this.setTotal()
        this.searchCollections(data => {
          const csv = this.json2csv(data)
          var dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
          var dlAnchorElem = document.getElementById('downloadAnchorElem')
          dlAnchorElem.setAttribute('href', dataStr)
          dlAnchorElem.setAttribute('download', 'data.csv')
          dlAnchorElem.click()

          this.resetPage()
        }, true)
      } else {
        this.$message.warn('Please filter before downloading (No more than 100 records are supported).')
      }
    },
    searchCollections(callback, disableFormat) {}
  },
  mounted() {
    setTimeout(() => {
      this.saveCurrentDataSet()
    }, 6000)
  },
  created() {
    console.log('Variant Table: ', this.columns)
    this.searchCollections()
  }
}
</script>

<style lang="less" scoped>
.variant-table {
  .variant-table__operations {
    margin-bottom: 5px;
    height: 35px;

    .ant-col {
      height: 100%;

      .variant-table__operations__header-info {
        font-weight: 500;
        width: 100%;
        text-align: right;
        line-height: 2;
        height: 100%;
      }
    }

    button {
      margin-right: 8px;
    }
  }
}
</style>

<style lang="less">
.variant-table__operations__columns {
  display: flex;
  flex-direction: column;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}

.variant-table {
  .variant-table--empty {
    .ant-table-body {
      height: calc(100vh - 310px);
    }
  }

  .variant-table--not-empty {
    .ant-table-body {
      height: calc(100vh - 310px);
    }
  }
}
</style>
