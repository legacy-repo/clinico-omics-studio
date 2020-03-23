const huangyechaoAnnovarLatest = {
  schema: {
    fields: [
      {
        tmplType: 'input',
        type: 'input',
        label: 'ID',
        name: 'input',
        model: 'id',
        disabled: false,
        config: {
          rules: [{ type: 'string', required: true, message: 'Please select time!' }],
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
          { label: 'label 1', value: "1" },
          { label: 'label 2', value: "2" },
          { label: 'label 3', value: "3" }
        ],
        validate: {
          required: true,
          included: [1, 2]
        }
      },
      {
        tmplType: 'checkbox',
        label: 'Status',
        name: 'status',
        model: 'status',
        validate: {
          required: [true]
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
        validate: {
          required: true
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
        ],
        validate: {
          required: true
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
            buttonLabel: 'Submit'
          }
        ],
        wrapperCol: { span: 19, offset: 10 }
      }
    ]
  }
}

export {
  huangyechaoAnnovarLatest
}
