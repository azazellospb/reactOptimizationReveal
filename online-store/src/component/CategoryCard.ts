
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
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
    *{
      font-family: 'Finger Paint', cursive;
    }
    .category__btn {
      background: #edc0af;
      border-radius: 10px;
      width: 10rem;
      height: 3rem;
      font-weight: 700;
      text-transform: uppercase;
      box-shadow: 0 0.7rem 1.2rem rgba(75, 75, 75, 0.5);
      transition: .3s all;
    }
    .category__btn:hover {
      transform: scale(1.01);
      box-shadow: 0 0.7rem 1.2rem rgba(0,0,0,.2);
    }
    .category__btn:active {
      transform: scale(1.00);
      box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.8);
    }
    </style>

    <div class="category">
        <button class="category__btn">${displayName}</button>
    </div>
    `
  }  
}

