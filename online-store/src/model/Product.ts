import { ICategory, ProductFilter, SephoraEndpoints, ProductData } from '../interface'
import { Sephora } from './Sephora'

export const products: Map<string, Product[]> = new Map()
export class Product {
  constructor(
    public data: ProductData
  ){
  }
  static async loadProducts(categoryId:string){
    if (products.has(categoryId)) {
      return products.get(categoryId)
    }
    const data = await Sephora.load({
        endpoint: SephoraEndpoints.productsByCategory,
        queryPath:  {categoryId: categoryId, pageSize: 30} // pageSize - quantity of products for API request
    }) as ICategory;
    const prodArray:Product[] = []
    data.products.forEach(
      ({
        currentSku: {listPrice}, 
        brandName,
        image450,
        rating,
        displayName
      }) => 
      {
        const [price, priceMax] = listPrice.split('-').map(pricestr => Number(pricestr.trim().slice(1)))
        prodArray.push(new Product({
          title: displayName,
          brand: brandName,
          imageUrl: image450,
          rating: Number(rating),
          price,
          priceMax
        }))
      })
    products.set(categoryId,prodArray)
    return prodArray
  }
  static async filterProducts(options: ProductFilter) {
    let prodArr = await this.loadProducts(options.category)
    if (typeof options.rating !== 'undefined') prodArr = prodArr?.filter(x=> x.data.rating > options.rating!) as Product[]
    return prodArr
  }

}
