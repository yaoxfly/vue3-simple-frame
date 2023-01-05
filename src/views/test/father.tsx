import Child from './child'
import { btnParam } from './types'
import { useTestStore } from '@/store/test-store'
import user from '@/apis/user'
export default defineComponent({
  name: 'Father',
  setup () {
    const router = useRouter()
    const route = useRoute()
    console.log(route.params, '传递给demo页面的参数')
    const child = ref()
    const testStore = useTestStore()
    onMounted(() => {
      // 调用子组件里的方法
      child.value.btn()
      // store监听值的变化-只会在 patches 之后触发一次
      testStore.$subscribe((mutation, state) => {
        console.log(mutation, state, '监听值的变化')
      })
      testStore.increment()
      console.log(testStore.doubleCount, 'pinia的值')
    })

    // 调用子组件里方法并传递参数给父组件emit方式
    const onBtn = (param: btnParam) => {
      console.log(param.value)
    }

    const fun = (param: string) => <><span>我是render;{param}</span></>
    const routerLink = () => {
      router.push({ path: '/', query: { id: 1 } })
      // router.push({ name: 'home', params: { id: 1 } })  // params：路由跳转只能使用name
    }

    const getUserInfo = () => {
      const param = {
        userID: '10001',
        userName: 'Mike',
        obj: { test: 1 },
        arr: [1, 2, 3],
        message: '500自定义错误信息'
      }
      user.getUserInfo(param).then(res => {
        console.log(res, '用户信息')
      }).catch(res => {
        console.log(res, '错误信息')
      }).finally(() => {
        console.log('结束')
      })
    }

    getUserInfo()

    return () => <>
      <div>
       <button onClick={() => routerLink()}>路由跳转,调整到首页;</button>
      </div>

      <Child show={false} ref={child} onBtn={param => onBtn(param)}
        fun={fun}
        v-slots={{
          default: () => <>
           <div>我是默认插槽;</div>
          </>,
          foo: (param: string) => <>
           <div><span>我是插槽foo;{param};</span></div>
          </>
        }}
      >
      </Child>
    </>
  }
})
