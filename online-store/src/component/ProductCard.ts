import { Product } from '../model/Product'
import { Component } from "./Component"


export class CartToggleEvent extends CustomEvent<{productId:string}> {
  constructor(productId: string) {
    super('cart-toggle', {
      bubbles: true,
      composed: true,
      detail: {productId}
    })
  }
}

export class ProductCard extends Component {
  public cartStatus = false
  private _cart = false

  public id:string
  public btnStatus = true
  public cartBtn: HTMLButtonElement | null = null
  constructor(
    public product: Product
  ) {
    super()
    this.id = product.data.imageUrl.slice(-25).split('').filter(x=>x!='/').join('')

    
  }
  render() {
    
    const {data} = this.product
    this.shadow.innerHTML =`
      <style>
        .inCart {
          background: green;
          color: white; 
          font-weight: 700;
        }
      </style>
      <img class="product__img" src="${data.imageUrl}" alt="">
      <div class="product__title">${data.title}</div>
      <div class="product__rating">Rating: ${data.rating.toFixed(1)}</div>
      <div class="product__price">Price: € ${data.price}</div>
      <div class="product__brand-name">Brand: ${data.brand}</div>
      <div class="product__brand-name">Realize period: ${data.releaseDate}</div>
      <div class="product__brand-name">Availability: ${data.stockBalance}</div>
      <button class="product__open-btn">Open</button>
      <button class="product__add-btn">Add to cart</button>
    </div>`
  }
  set cart(value:boolean) {
    if (!this.cartStatus) {
      this._cart = value
      const btn = this.cartBtn as HTMLButtonElement
      btn.classList.toggle('inCart', value)
      btn.innerHTML= value ? `Remove` : `Add to cart`
    }
  }
  get cart() {
    return this._cart;
  }

  connectedCallback() {
    super.connectedCallback()
    this.cartBtn = this.shadow.querySelector('.product__add-btn') as HTMLButtonElement
    this.cartBtn.addEventListener('click', ()=>{
        this.cart= !this.cart
        this.dispatchEvent(new CartToggleEvent(this.id))
    })  
  }
}

