// components(viewModel)
// для товара отдельный вьюмодел - промежутоынцй слой, изменение который вляет на вью
// инстансы только от потомков у абстрактного класса
export abstract class Component extends HTMLElement {
  protected shadow: ShadowRoot
  constructor(
  ) {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }
  getElement(selector:string) {
    const element = this.shadowRoot?.querySelector(selector)
    if (!element) throw Error(`Couldn't find an element with ${selector} selector`)
    return element as HTMLElement
  }
  getElementById(id:string) {
    return this.getElement(`#${id}`)
  }
  connectedCallback(){
    this.render()
  }

  abstract render(): void

}