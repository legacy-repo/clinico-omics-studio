const huangyechaoAnnovarLatest = {
  fields: [
    {
      tmplType: 'file',
      label: 'Files',
      model: 'read1',
      readOnly: false,
      placeholder: 'Select files for read1.',
      config: {
        rules: [{ type: 'array', required: true, message: 'Please select files.' }]
      }
    },
    {
      tmplType: 'sample-id',
      type: 'number',
      label: 'Sample ID',
      name: 'sample_id',
      placeholder: 'Auto Generate Sample ID.',
      model: 'sample_id',
      disabled: false,
      min: 1,
      max: 100,
      config: {
        rules: [{ type: 'number', required: true, message: 'Please input a number.' }]
      }
    },
    {
      tmplType: 'input',
      type: 'input',
      label: 'ID',
      name: 'input',
      model: 'id',
      disabled: false,
      config: {
        rules: [{ type: 'string', required: true, message: 'Please select time!' }]
      }
    },
    {
      tmplType: 'select',
      label: 'Skills',
      model: 'skills',
      name: 'skills',
      placeholder: 'Select',
      mode: 'multiple',
      options: [
        { label: 'label 1', value: '1' },
        { label: 'label 2', value: '2' },
        { label: 'label 3', value: '3' }
      ]
    },
    {
      tmplType: 'checkbox',
      label: 'Status',
      name: 'status',
      model: 'status',
      config: {
        valuePropName: 'checked'
      }
    },
    {
      tmplType: 'checkbox',
      label: 'Addons',
      name: 'addons',
      model: 'addons',
      options: [
        { label: 'label 1', value: 1 },
        { label: 'label 2', value: 2 },
        { label: 'label 3', value: 3 }
      ],
      config: {
        valuePropName: 'checked'
      }
    },
    {
      tmplType: 'radio',
      label: 'Delivery',
      name: 'delivery',
      model: 'delivery',
      options: [
        { label: 'label 1', value: 1 },
        { label: 'label 2', value: 2 },
        { label: 'label 3', value: 3 }
      ]
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
