import { Product } from '../model/Product'
import { Component } from "./Component"

export class ProductCard extends Component {
  constructor(
    public product: Product
  ) {
    super()
    this.render()
  }
  render() {
    const {product:{data}} = this
    this.shadow.innerHTML =`
      <img class="product__img" src="${data.imageUrl}" alt="">
      <div class="product__title">${data.title}</div>
      <div class="product__rating">Rating: ${data.rating.toFixed(1)}</div>
      <div class="product__price">Price: € ${data.price}</div>
      <div class="product__brand-name">Brand: ${data.brand}</div>
      <div class="product__brand-name">Realize period: ${data.realizeDate as number}</div>
      <div class="product__brand-name">Availability: ${data.stockBalance as string}</div>
      <button class="product__open-btn">Open</button>
      <button class="product__add-btn">Buy</button>
    </div>`
  }
  connectedCallback() {
    this.render()
  }
}

