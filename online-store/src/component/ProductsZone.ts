import { Component } from './Component'
import { Product } from './../model/Product'
import { ProductCard } from './ProductCard'



export class ProductsZone extends Component {
  private _products:Product[] = []   

  render(){
    this.shadow.innerHTML = `
    <style>
    .wrapper {
      margin-top: 20px;
      display: flex;
      gap: 2em;
      flex-wrap: wrap;
    }
    .wrapper > * {
      background: #ebeded;
      border-radius: 5%;
      width: 30%;
      font-style: italic;
      transition: .3s all;
    }
    .wrapper > *:hover {
      transform: scale(1.02);
      box-shadow: 0 0.7rem 1.2rem rgba(0,0,0,.2);
    }
    
    </style>
    <div id="cards" class="wrapper"></div>`
  }
  get products() {
    return this._products
  }
  set products(value: Product[]) {
    this._products = value;
    const wrapper = this.getElementById('cards')
    wrapper.innerHTML = ``
    if (this.products.length == 0) {
      const noData = document.createElement('p')
      noData.innerText = 'Sorry, such products do not exist!'
      wrapper.append(noData)
    }
    this.products.forEach(item => {
      const element = new ProductCard(item)
      wrapper.append(element)
    })
    this.shadow.append(wrapper)
  }
  findProductCard(id: string){
    const cardContainer = this.getElementById('cards');
    return Array.from(cardContainer.children).find(card => card.id == id) as ProductCard;
  }
}


