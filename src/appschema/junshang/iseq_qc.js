const junshangIseqQcLatest = {
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
      label: 'Read1 Files',
      model: 'read1',
      readOnly: false,
      filterType: 'fastq|fastq.gz|fq|fq.gz',
      placeholder: 'Select files for read1.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for read1.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'Read2 Files',
      model: 'read2',
      readOnly: false,
      filterType: 'fastq|fastq.gz|fq|fq.gz',
      placeholder: 'Select files for read2.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for read2.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'Bam File(s)',
      model: 'bam',
      readOnly: false,
      filterType: 'bam',
      placeholder: 'Select files for bam.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for bam.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'Bai File(s)',
      model: 'bai',
      readOnly: false,
      filterType: 'bai',
      placeholder: 'Select files for bai.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for bai.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'GTF Files',
      model: 'gtf',
      readOnly: false,
      filterType: 'gtf',
      placeholder: 'Select files for gtf.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for gtf.' }]
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
  junshangIseqQcLatest
}
