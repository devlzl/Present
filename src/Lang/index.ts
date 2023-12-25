import { createI18n } from 'vue-i18n'
import enUS from './Locale/en-US'
import zhCN from './Locale/zh-CN'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS | typeof zhCN

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
})

export default i18n
