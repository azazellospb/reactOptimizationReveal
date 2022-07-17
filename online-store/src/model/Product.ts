import { ICategory, ProductFilter, SephoraEndpoints, ProductData } from '../interface'
import { Sephora } from './Sephora'

//No such data in API
const releaseDates = ['2017','2018','2019','2020','2021','2022'];
const stockBalance = ['few','in stock','many'];
// export const brands: string[] = []

const brands: Map<string, string[]> = new Map()
const products: Map<string, Product[]> = new Map()
export class Product {
  constructor(
    public data: ProductData
  ){
  }
  static async loadProducts(categoryId:string){
    if (products.has(categoryId)) {
      return [ products.get(categoryId), brands.get(categoryId)]
    }
    const data = await Sephora.load({
        endpoint: SephoraEndpoints.productsByCategory,
        queryPath:  {categoryId: categoryId, pageSize: 30} // pageSize - quantity of products for API request
    }) as ICategory;
    const prodArray:Product[] = []
    const brandArray: string[] = []
    data.products.forEach(
      ({
        currentSku: {listPrice}, 
        brandName,
        image250,
        rating,
        displayName
      }) => 
      {
        if (brandArray.indexOf(brandName) === -1) brandArray.push(brandName)
        const [price, priceMax] = listPrice.split('-').map(pricestr => Number(pricestr.trim().slice(1)))
        prodArray.push(new Product({
          title: displayName,
          brand: brandName,
          imageUrl: image250,
          rating: Number(rating),
          stockBalance: stockBalance[Math.ceil(Math.random()*3)-1],
          releaseDate: +releaseDates[Math.ceil(Math.random()*6)-1],
          price,
          priceMax
        }))
      })
    brands.set(categoryId, brandArray)  
    products.set(categoryId,prodArray)

    return [prodArray, brandArray]
  }

  static async filterProducts(options: ProductFilter): Promise<[Product[], string[]]> {
    const prodAr  = await this.loadProducts(options.category) as [Product[],string[]]
    let prodArr = prodAr[0]
    const brandsArr = prodAr[1] 
    if (options.search.length !== 0) prodArr = prodArr?.filter(x=> x.data.title.toLowerCase().includes(options.search.toLowerCase()))
    if (typeof options.rating !== 'undefined') prodArr = prodArr?.filter(x=> x.data.rating > options.rating!)
    switch (options.sortByBrand){
      case "1": 
      prodArr = prodArr?.sort((a,b)=>(b.data.brand<a.data.brand ? 1 : b.data.brand>a.data.brand ? -1 :0))
      break;
      case "-1": 
      prodArr = prodArr?.sort((a,b)=>(b.data.brand<a.data.brand ? 1 : b.data.brand>a.data.brand ? -1 :0)).reverse()
      break;
      default: break;
    }
    switch (options.sortByRelease){
      case "1": 
      prodArr = prodArr?.sort((a,b)=>(b.data.releaseDate<a.data.releaseDate ? 1 : b.data.releaseDate>a.data.releaseDate ? -1 :0))
      break;
      case "-1": 
      prodArr = prodArr?.sort((a,b)=>(b.data.releaseDate<a.data.releaseDate ? 1 : b.data.releaseDate>a.data.releaseDate ? -1 :0)).reverse()
      break;
      default: break;
    }
    return [prodArr, brandsArr]
  }

}
