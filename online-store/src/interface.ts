export interface IProduct {
  brandName: string
  currentSku: CurrentSKU
  displayName: string
  heroImage: string
  image135: string
  image250: string
  image450: string
  productId: string
  rating: string
  reviews: string
  targetUrl: string
}

// Alias type
export type CategorySelectEvent = CustomEvent<{id:string}>

export interface ProductData {
  title: string
  brand: string
  imageUrl: string
  rating: number
  price: number
  priceMax?: number
  releaseDate: number
  stockBalance: string
}
export interface FilterOptions {
  rating:number
  category: string
  sortByBrandOrder:string
  search:string
  sortByReleaseOrder:string
}


export type CategoryList = {
  rootCategories: ICategory[]
}

export interface CategoryCardData {
  title: string
  img: string
}

export enum SephoraEndpoints {
  categories = 'categories/v2/list-root',
  productsByCategory = 'products/list',
  product = 'products/detail',
  productsByBrand = 'products/search'
}
export type SephoraURLOptions = {
  [key: string]: string|number
}
export type CatClick = {
  data: ClickData
}
export type ClickData = {
  categoryId: string 
}

export interface ICategory {
  categoryId: string
  displayName: string
  hasChildCategories: boolean
  hasDropdownMenu: boolean
  selectedThumbImage: string
  showInAppJaBsDropdown: boolean
  targetUrl: string
  products: IProduct[]
  thumbImage: string
}


export interface CurrentSKU {
  listPrice: string
  imageAltText: string
  skuId: string

}