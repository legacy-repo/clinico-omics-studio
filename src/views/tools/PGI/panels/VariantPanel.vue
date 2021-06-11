<template>
  <div class="variant-details">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="IGV">
        <genome-viewer :vcfUrl="vcfUrl" :vcfIndexUrl="vcfIndexUrl" class="content-container"></genome-viewer>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import GenomeViewer from '@/components/GenomeViewer'

export default {
  components: { GenomeViewer },
  data() {
    return {
      vcfUrl: "https://s3.amazonaws.com/1000genomes/release/20130502/ALL.wgs.phase3_shapeit2_mvncall_integrated_v5b.20130502.sites.vcf.gz",
      vcfIndexUrl: "https://s3.amazonaws.com/1000genomes/release/20130502/ALL.wgs.phase3_shapeit2_mvncall_integrated_v5b.20130502.sites.vcf.gz.tbi",
    }
  }
}
</script>

<style lang="less" scoped>
.variant-details {
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
}
</style>

<style lang="less">
.variant-details {
  .content-container {
    height: calc(100vh - 160px);
    overflow: scroll;
  }
}
</style>
