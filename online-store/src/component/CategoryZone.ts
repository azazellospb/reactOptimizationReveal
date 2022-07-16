import { Category } from './../model/Category'
import { CategoryCard } from './CategoryCard'
import { Component } from './Component'

export class CategoryZone extends Component {

  async render(){
    const fragment = document.createDocumentFragment()
    const data = await Category.loadCategories()
    data.forEach(item => {
      const element = new CategoryCard(item)
      element.render()
      fragment.append(element)
    })
    this.shadow.append(fragment)
  }

}