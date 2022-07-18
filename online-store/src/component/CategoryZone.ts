import { Category } from './../model/Category'
import { CategoryCard } from './CategoryCard'
import { Component } from './Component'

export class CategoryZone extends Component {

  async render(){

    this.shadow.innerHTML = `
    <style>
    .wrapper {
      padding: 20px; 
      margin-top: 20px;
      display: flex;
      gap: 2em;
      flex-wrap: wrap;
      border: 0.5rem dashed black;
      background: #ffb3b3
      border-radius: 5%;
    }
    </style>
    <div id="categories" class="wrapper"></div>
    `
    const catWrapper = this.getElementById('categories')
    catWrapper.innerHTML = ``
    const data = await Category.loadCategories()
    data.forEach(item => {
      const element = new CategoryCard(item)
      element.render()
      catWrapper.append(element)
    })
    this.shadow.append(catWrapper)
  }

}