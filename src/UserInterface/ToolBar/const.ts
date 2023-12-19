import i18n from '@Lang/index'

const { t } = i18n.global

export const TOOL_LIST: { label: string, value: string }[] = [
  { label: t('ToolBar.home.text'), value: 'home' },
  { label: t('ToolBar.insert.text'), value: 'insert' },
  { label: t('ToolBar.draw.text'), value: 'draw' },
  { label: t('ToolBar.design.text'), value: 'design' },
  { label: t('ToolBar.transitions.text'), value: 'transitions' },
  { label: t('ToolBar.animations.text'), value: 'animations' },
  { label: t('ToolBar.slideshow.text'), value: 'slideshow' },
  { label: t('ToolBar.review.text'), value: 'review' },
  { label: t('ToolBar.view.text'), value: 'view' },
]