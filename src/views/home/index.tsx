import config from '@/config'
import { formDataAppend, download as downloadFile } from '@/request/hook'
import user from '@/apis/user'
export default defineComponent({
  name: 'Home',
  setup () {
    // 主题切换
    const setTheme = () => {
      document.documentElement.style.setProperty('--color-primary-base', '16,185,129')
    }
    setTheme()
    const input = useStorage('input-value', '可同步数据到localstorage的输入框') // vueuse的api，自动将ref同步到localstorage,实现双向绑定
    const selectedFile = ref<File | null>(null)
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        selectedFile.value = target.files[0]
      }
    }

    const uploadFile = async () => {
      if (!selectedFile.value) {
        alert('请先选择文件')
        return
      }

      try {
        const response = await user.upload(formDataAppend({
          file: selectedFile.value,
          arr: [1, 2],
          test: '测试'
        }))
        console.log('文件上传成功:', response)
      } catch (error) {
        console.error('文件上传失败:', error)
      }
    }

    const download = () => {
      user.download().then((res) => {
        downloadFile(res, '测试.pdf')
      })
    }

    return () => {
      const route = useRoute()
      console.log(route.query, '传递给home页面的参数')
      return (
          <>
            <input type="file" onChange={(event) => handleFileChange(event)} />
            <button onClick={() => uploadFile()}>上传文件</button>
            <button onClick={() => download()}>下载文件</button>
            <div class='tw-flex tw-justify-center  tw-items-center  tw-bg-gray-50  tw-text-black'>
              <span > 我是首页{config.server}</span>
            </div>

            <div class='tw-m-16  tw-text-large  tw-bg-primary tw-rounded ' >
              容器1
            </div>

            <div class='tw-m-16  tw-text-base  tw-bg-primary-10  tw-text-regular tw-border-base  tw-border tw-leading-32 ' >
              容器2
            </div>

            <input v-model={input.value} class='tw-w-500 tw-border tw-border-solid tw-border-black' ></input>
          </>
      )
    }
  }
})
