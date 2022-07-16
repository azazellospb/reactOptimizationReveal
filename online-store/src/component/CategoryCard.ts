
import { ICategory } from './../interface'
import { Component } from "./Component"

export class CategorySelectEvent extends CustomEvent<{id:string}>{
  constructor(id: string) {
    super('category-select', {
      bubbles: true,
      composed: true,
      detail: {id}
    })
  }
}

export class CategoryCard extends Component {
  constructor(
    public data: ICategory
  ) {
    super()
    }
  connectedCallback() {
    this.render();
    this.getElement('.category__btn').addEventListener('click', () => {
      this.dispatchEvent(new CategorySelectEvent(this.data.categoryId))
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

