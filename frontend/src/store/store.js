import { reactive } from 'vue'

export const store = reactive({
  currentState: 'electricity',
  firstChart: false,
  secondChart: false,
  switchChart: false,
  firstTarget: "",
  secondTarget: ""
})