import { useExpose } from '@/hooks/use-expose'
const props = {
  show: {
    type: Boolean,
    default: false
  },
  fun: Function
}
export default defineComponent({
  name: 'Child',
  props,
  emits: ['btn'],
  setup (props, { emit, slots }) {
    const btn = () => {
      console.log('当前点击的是子组件里的btn')
      emit('btn', { value: 1 })
    }
    console.log(props.show, 'props的值')
    // 返回方法
    useExpose({ btn })
    return () => <>
      <button onClick={() => btn()} v-show={props.show}>跳到demo</button>
      {slots.default && slots.default()}
      {/* 当在插槽里传出参数后，就变成了具名的作用域插槽了 */}
      {slots.foo && slots.foo('作用域插槽')}
      {props.fun && props.fun('返回给父亲的参数')}
    </>
  }
})
