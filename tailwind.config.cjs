/** @type {import('tailwindcss').Config} */
const spacing = {
  0: 0,
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  500: '500px'
}

module.exports = {
  prefix: 'tw-',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'var(--color-primary)',
      'primary-10': 'var(--color-primary-10)',
      'primary-20': 'var(--color-primary-20)',
      'primary-30': 'var(--color-primary-30)',
      'primary-40': 'var(--color-primary-40)',
      'primary-50': 'var(--color-primary-50)',
      'primary-60': 'var(--color-primary-60)',
      'primary-70': 'var(--color-primary-70)',
      'primary-80': 'var(--color-primary-80)',
      'primary-90': 'var(--color-primary-90)'
    },

    fontSize: {
      // 行间距是字体的1.5倍 ，行间距是段落间距的50%或者75%。
      small: ['var(--font-size-smal)', '16px'], // 辅助
      base: ['var(--font-size-base)', '20px'], // 正文
      medium: ['var(--font-size-medium)', '24px'], // 小标题
      large: ['var(--font-size-large)', '28px'], // 标题
      'extra-larg': ['var(--font-extra-large)', '30px'] // 主标题
    },

    textColor: {
      primary: 'var(--color-text-primary)', // 主要文字
      regular: 'var(--color-text-regular)', // 常规文字
      secondary: 'var(--color-text-secondary)', // 次要文字
      placeholder: 'var(--color-text-placeholder)', // 占位文字
      theme: 'var(--color-primary)', // 主题色
      danger: 'var(--color-danger)' // 危险
    },

    spacing,

    extend: {
      lineHeight: spacing
    },

    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '16px',
      lg: '24px',
      large: '32px'
    },

    borderColor: {
      base: 'var(--border-color-base)',
      light: 'var(--border-color-light)',
      lighter: 'var(--border-color-lighter)',
      'extra-light': 'var(--border-color-extra-light)'
    },

    container: {
      padding: '20px'
    }
  },
  plugins: []
}
