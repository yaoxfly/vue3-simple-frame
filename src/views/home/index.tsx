import { defineComponent } from 'vue'
import config from '@/config'

export default defineComponent({
  name: 'Home',
  setup () {
    // 主题切换
    const setTheme = () => {
      document.documentElement.style.setProperty('--color-primary-base', '16,185,129')
    }
    setTheme()
    return () => {
      const route = useRoute()
      console.log(route.query, '传递给home页面的参数')
      return (
        <>
          <div class='tw-flex tw-justify-center  tw-items-center  tw-bg-gray-50  tw-text-black'>
              <span > 我是首页{config.server}</span>
          </div>

          <div class='tw-container   tw-m-16  tw-text-large  tw-bg-primary tw-rounded ' >
                容器1
          </div>

          <div class='tw-container  tw-m-16  tw-text-base  tw-bg-primary-10  tw-text-regular tw-border-base  tw-border tw-leading-32 ' >
                容器2
          </div>

        </>
      )
    }
  }
})
