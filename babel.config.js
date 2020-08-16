module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'markup', 'json', 'bash'],
        plugins: ['line-numbers'],
        theme: 'okaidia',
        css: true
      }
    ],
    // if your use import on Demand, Use this code
    // [
    //   'import',
    //   {
    //     libraryName: 'ant-design-vue',
    //     libraryDirectory: 'es',
    //     style: true // `style: true` 会加载 less 文件
    //   }
    // ]
  ]
}
