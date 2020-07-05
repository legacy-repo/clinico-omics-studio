const junshangRnaseqEngineeringLatest = {
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
      multiple: true,
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
      multiple: true,
      filterType: 'fastq|fastq.gz|fq|fq.gz',
      placeholder: 'Select files for read2.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files for read2.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'FastqScreen Conf File',
      model: 'fastq_screen_conf',
      readOnly: false,
      multiple: false,
      filterType: 'conf',
      placeholder: 'Select file for fastq screen.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select file for fastq screen.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'References of Fastq Screen',
      model: 'screen_ref_dir',
      readOnly: false,
      filterType: '',
      multiple: false,
      placeholder: 'Select directory for Fastq Screen References.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Select directory for Fastq Screen References.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'Index Directory',
      model: 'idx',
      readOnly: false,
      filterType: '',
      multiple: false,
      placeholder: 'Select directory for idx.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select directory for idx.' }]
      }
    },
    {
      tmplType: 'file',
      label: 'GTF File',
      model: 'gtf',
      readOnly: false,
      multiple: true,
      filterType: 'gtf',
      placeholder: 'Select file for gtf.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select file for gtf.' }]
      }
    },
    {
      tmplType: 'input',
      type: 'string',
      label: 'Index Prefix',
      name: 'idx_prefix',
      placeholder: 'Please enter index prefix.',
      model: 'idx_prefix',
      disabled: false,
      min: 1,
      max: 100,
      config: {
        initialValue: 'genome_snp_tran',
        rules: [{ type: 'string', required: false, message: 'Please input an index prefix.' }]
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
  junshangRnaseqEngineeringLatest
}
