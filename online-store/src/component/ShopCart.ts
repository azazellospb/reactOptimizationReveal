import { Component } from "./Component"

const cartLimit = 10
export class CartFeedback extends CustomEvent<{added:boolean, productId: string}> {
  constructor(added: boolean, productId: string) {
    super('cart-feedback', {
      bubbles: true,
      composed: true,
      detail: {
        added,
        productId}
    })
  }
}

export class ShopCart extends Component {
  private _output: HTMLOutputElement | null = null
  private _products:Set<string> = new Set()
  constructor() {
    super()
  }
  render(){
    this.shadow.innerHTML=`
    <style>
    .cart {
      position
    }
    .cart-full {
      display: none;
    }
    .cart-full.show {
      display: block;
    }
    </style>
    <div class="cart">
      Products in cart: 
      <output id="cart-output">${this._products.size}</output>
      <p class="cart-full">Cart is full (limit reached)</p>
    </div>
    `
  }
  updateCart(product:string){
    if (this._products.has(product)) {
      this._products.delete(product)
      this.feedback(false, product)
      return 
    }
    if (this._products.size < cartLimit) {
      this._products.add(product)
      this.feedback(true,product)
    } else this.feedback(false, product)
  }
  feedback (added:boolean, productId: string){
    const cartFull = this.shadow.querySelector('.cart-full') as HTMLElement
    if (this._products.size >=cartLimit) cartFull.classList.add('show')
    if (this._products.size >=cartLimit) alert ('Cart is full!')
    const output = this._output as HTMLOutputElement
    output.innerText = this._products.size.toString()
    this.dispatchEvent(new CartFeedback(added, productId))
  }
  connectedCallback(): void {
    super.connectedCallback()
    this._output = this.shadow.querySelector('#cart-output')
  }
}