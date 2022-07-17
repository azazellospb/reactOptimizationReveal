import { Component } from './Component'
import { Product } from './../model/Product'
import { ProductCard } from './ProductCard'


export class BrandsPopulateEvent extends CustomEvent<{brands:string[]}>{
  constructor(brands: string[]) {
    super('brands-populate', {
      bubbles: true,
      composed: true,
      detail: {brands}
    })
  }
}


export class ProductsZone extends Component {
  private _rating = 1
  private _category = "cat140006"
  private _sortByBrandOrder = "0"
  private _sortByReleaseOrder = "0"
  private _search = ""
  async render(){
    this.shadow.innerHTML = ""
    const fragment = document.createDocumentFragment()
    const modelData = await Product.filterProducts({
      category: this._category,
      rating: this._rating,
      sortByBrand: this._sortByBrandOrder,
      sortByRelease: this._sortByReleaseOrder,
      search: this._search,
    })

    const data = modelData[0]
    if (data.length == 0) {
      const noData = document.createElement('p');
      noData.innerText = 'Sorry, such products do not exist!'
      fragment.append(noData)}
    data.forEach(item => {
      const element = new ProductCard(item)
      element.render()
      fragment.append(element)
    })
    this.shadow.append(fragment)
    this.dispatchEvent (new BrandsPopulateEvent(modelData[1]))
  }
  static get observedAttributes() {
    return ['rating', ' category', 'sortByBrandOrder','sortByReleaseOrder', 'search']
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
  set sortByBrandOrder(value: string) {
    this._sortByBrandOrder = value
    this.render().catch((err)=>console.log(err))
  }
  set sortByReleaseOrder(value: string) {
    this._sortByReleaseOrder = value
    this.render().catch((err)=>console.log(err))
  }
  set search(value: string) {
    this._search = value
    this.render().catch((err)=>console.log(err))
  }
  get search(){
    return this._search;
  }

  get category() {
    return this._category
  }
  set category(value) {
    this._category = value;
    this.render().catch((err)=>console.log(err));
  }
}


