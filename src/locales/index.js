/**
 * Vue i18n loader
 * created by @musnow
 * https://github.com/musnow
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// default language
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
// change default accept-language
import { axios } from '@/utils/request'
import merge from 'lodash.merge'

import { project } from '@/config/defaultSettings'
const customLang = require('@/custom/' + project + '/lang')
const enUSLang = merge(enUS, customLang.enUS)
const zhCNLang = merge(zhCN, customLang.zhCN)

Vue.use(VueI18n)

export const defaultLang = 'en-US'

const messages = {
  'en-US': {
    ...enUSLang
  },
  'zh-CN': {
    ...zhCNLang
  }
}

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  silentTranslationWarn: true,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.ls.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
