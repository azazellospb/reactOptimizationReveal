import { ICategory, ProductFilter, SephoraEndpoints, ProductData } from '../interface'
import { Sephora } from './Sephora'

//No such data in API
const realizeDates = ['2017','2018','2019','2020','2021','2022'];
const stockBalance = ['few','in stock','many'];

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
        image250,
        rating,
        displayName
      }) => 
      {
        const [price, priceMax] = listPrice.split('-').map(pricestr => Number(pricestr.trim().slice(1)))
        prodArray.push(new Product({
          title: displayName,
          brand: brandName,
          imageUrl: image250,
          rating: Number(rating),
          stockBalance: stockBalance[Math.ceil(Math.random()*3)-1],
          realizeDate: +realizeDates[Math.ceil(Math.random()*6)-1],
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
