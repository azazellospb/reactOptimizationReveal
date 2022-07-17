
import { ICategory } from './../interface'
import { Component } from "./Component"
import { OptionsUpdateEvent } from './optionsPanel';

export class CategoryCard extends Component {
  constructor(
    public data: ICategory
  ) {
    super()
    }
  connectedCallback() {
    super.connectedCallback()
    this.getElement('.category__btn').addEventListener('click', () => {
      this.dispatchEvent(new OptionsUpdateEvent({category: this.data.categoryId}))
    })
  }
  render() {
    const {data:{displayName}} = this 
    this.shadow.innerHTML = `
    <div class="category">
        <button class="category__btn">${displayName}</button>
    </div>
    `
  }  
}

