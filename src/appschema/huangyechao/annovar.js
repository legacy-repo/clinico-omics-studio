const huangyechaoAnnovarLatest = {
  help: `vcf,sample,sample_id
# vcf  			需要进行注释的vcf文件
# sample		输出文件名的前缀
# sample_id		每个样本任务的识别码。注意：同一个samples文件中，不同样本的ID应该不同`,
  fields: [
    {
      tmplType: 'sample_id',
      type: 'number',
      label: 'Sample ID',
      name: 'sample_id',
      question: 'How many samples? For auto generating sample id.',
      placeholder: 'How many samples? For auto generating sample id.',
      model: 'sample_id',
      disabled: false,
      min: 1,
      max: 100,
      config: {
        rules: [{ type: 'number', required: true, message: 'Please input a number.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'VCF Files',
      model: 'vcf',
      readOnly: false,
      filterType: 'vcf',
      placeholder: 'Select vcf files.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files.' }]
      }
    },
    {
      tmplType: 'input',
      type: 'input',
      label: 'Prefix for Output Files',
      name: 'sample',
      model: 'sample',
      disabled: false,
      config: {
        rules: [{ type: 'string', required: true, message: 'Please input prefix for output files.' }]
      }
    },
    {
      tmplType: 'actions',
      buttons: [
        {
          type: 'cancel',
          buttonType: 'default',
          buttonLabel: 'Previous Step'
        },
        {
          type: 'submit',
          buttonType: 'primary',
          buttonLabel: 'Next Step',
          validate: true
        }
      ],
      wrapperCol: { span: 19, offset: 10 }
    }
  ]
}

export {
  huangyechaoAnnovarLatest
}
