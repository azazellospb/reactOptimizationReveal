import { Component } from './Component'
import { Product } from './../model/Product'
import { ProductCard } from './ProductCard'

export class ProductsZone extends Component {
  private _rating = 1
  private _category = "cat140006"
  async render(){
    this.shadow.innerHTML = ""
    const fragment = document.createDocumentFragment()
    const data = await Product.filterProducts({
      category: this._category,
      rating: this._rating
    }) as Product[]
    data.forEach(item => {
      const element = new ProductCard(item)
      element.render()
      fragment.append(element)
    })
    this.shadow.append(fragment)
  }
  get category() {
    return this._category
  }
  set category(value) {
    this._category = value;
    this.render().catch((err)=>console.log(err))
  }
  static get observedAttributes() {
    return ['rating', 'category']
  }
  attributeChangedCallback(prop:string) {
    if (prop === 'category') this.render().catch((err)=>console.log(err))
  }
  async connectedCallback(){ 
    await this.render()
  }
  set rating(value: number) {
    this._rating = value
    this.render().catch((err)=>console.log(err))
  }
}



