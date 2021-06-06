<template>
  <a-card :bordered="false" class="step-form">
    <a-steps class="steps" :current="stepNum">
      <a-step :title="$t('workflow.stepForm.stepForm.projectInformation')" />
      <a-step :title="$t('workflow.stepForm.stepForm.jobParameters')" />
      <a-step :title="$t('workflow.stepForm.stepForm.submit')" />
    </a-steps>
    <div class="content">
      <step1 v-if="stepNum === 0" @nextStep="nextStep" :appId="appId"/>
      <step2 v-if="stepNum === 1" @nextStep="nextStep" @prevStep="prevStep"/>
      <step3 v-if="stepNum === 2" @finished="submitStepForm" @prevStep="prevStep"/>
    </div>
  </a-card>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
  },
  props: {
    appId: {
      required: false,
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    stepNum () {
      let num = this.$route.query.step
      try {
        num = parseInt(num)
        if (num >= 0 && num <= 2) {
          return num
        } else {
          return 0
        }
      } catch (error) {
        return 0
      }
    }
  },
  methods: {
    // handler
    nextStep () {
      if (this.stepNum < 2) {
        this.$router.push({ name: 'create-project', query: { step: this.stepNum + 1 } })
      }
    },
    prevStep () {
      if (this.stepNum > 0) {
        this.$router.push({ name: 'create-project', query: { step: this.stepNum - 1 } })
      }
    },
    submitStepForm (data) {
      console.log('Project Id: ', data)
      localStorage.removeItem('datains_PROJECT_DATA')
      localStorage.removeItem('datains_APP_DATA')
      localStorage.removeItem('datains_SAMPLE_IDS')
      localStorage.removeItem('datains_FINAL_APP_DATA')
      this.$router.push({ name: 'project-management', props: { refresh: true } })
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.step-form {
  min-height: 91vh;

  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
}
</style>
