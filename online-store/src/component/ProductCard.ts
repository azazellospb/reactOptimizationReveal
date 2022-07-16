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
    this.shadow.innerHTML = 
    `<div class="product">
      <img class="product__img" src="${data.imageUrl}" alt="">
      <div class="product__title">${data.title}</div>
      <div class="product__rating">${data.rating}</div>
      <div class="product__price">${data.price}</div>
      <div class="product__brand-name">${data.brand}</div>
      <button class="product__open-btn">Open</button>
      <button class="product__add-btn">Buy</button>
    </div>`
  }
  connectedCallback() {
    this.render()
  }
}

