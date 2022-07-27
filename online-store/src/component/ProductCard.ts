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
      @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
        *{
          font-family: 'Finger Paint', cursive;
        }
        .product__img {
          margin: 0 auto;
          padding-bottom: 10px;
          width: 70%;
        }
        .product__title {
          margin: 0 auto;
          text-transform: uppercase;
        }
        .productcard {
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-items: baseline;
        }
        .product__add-btn {
          margin-top: 20px;
          background: cornsilk;
          border-radius: 10px;
          font-weight: 700;
          text-transform: uppercase;
          box-shadow: 0 0.7rem 1.2rem rgba(75, 75, 75, 0.5);
          transition: .3s all;
        }
        .product__add-btn:hover {
          transform: scale(1.01);
          box-shadow: 0 0.7rem 1.2rem rgba(0,0,0,.2);
        }
        .product__add-btn:active {
          transform: scale(1.00);
          box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.8);
        }
        .inCart {
          background: #ffa599;
          letter-spacing: 0.3rem;
          font-weight: 700;
        }

      </style>
      <div class="productcard">
        <img class="product__img" src="${data.imageUrl}" alt="">
        <div class="product__title">${data.title}</div>
        <div class="product__rating"><b>Rating:</b> ${data.rating.toFixed(1)}</div>
        <div class="product__price"><b>Price:</b> € ${data.price}</div>
        <div class="product__brand-name"><b>Brand:</b> ${data.brand}</div>
        <div class="product__brand-name"><b>Realize period:</b> ${data.releaseDate}</div>
        <div class="product__brand-name"><b>Availability:</b> ${data.stockBalance}</div>
        <button class="product__add-btn">Add to cart</button>
        </div>
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

