import { App } from 'vue'

export default function (app: App) {
  app.directive('autofocus', {
    mounted(el: HTMLInputElement, binding: { value: boolean | undefined }) {
      if (binding.value === true || binding.value === undefined) {
        el.focus()
      }
    }
  })
}