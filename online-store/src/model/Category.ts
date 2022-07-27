import { CategoryList, SephoraEndpoints, ICategory } from '../interface'
import { Sephora } from './Sephora'

export class Category extends Sephora {
  constructor()
  {
    super()
  }
  static async loadCategories(){
    const data = await Sephora.load({
        endpoint: SephoraEndpoints.categories
    }) as CategoryList
    const catArray: ICategory[] = []
    data.rootCategories.forEach(item => catArray.push(item))
    return catArray
  }
}
