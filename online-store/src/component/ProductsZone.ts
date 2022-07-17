import { Component } from './Component'
import { Product } from './../model/Product'
import { ProductCard } from './ProductCard'



export class ProductsZone extends Component {
  private _products:Product[] = []   

  render(){
    this.shadow.innerHTML = ""
    const fragment = document.createDocumentFragment()
    if (this.products.length == 0) {
      const noData = document.createElement('p');
      noData.innerText = 'Sorry, such products do not exist!'
      fragment.append(noData)}
      this.products.forEach(item => {
      const element = new ProductCard(item)
      element.render()
      fragment.append(element)
    })
    this.shadow.append(fragment)
  }
  get products() {
    return this._products
  }
  set products(value: Product[]) {
    this._products = value;
    this.render();
  }
}


