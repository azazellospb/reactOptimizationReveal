import { ProductsZone } from './component/ProductsZone';
import { CategoryCard } from './component/CategoryCard';
import { CategoryZone } from './component/CategoryZone';
import { CartToggleEvent, ProductCard } from './component/ProductCard';
import { OptionsPanel, OptionsUpdateEvent, ResetStorageEvent } from './component/optionsPanel';
import { FilterOptions } from './interface';
import { Product } from './model/Product';
// import { DoubleRangeSlider } from './component/doubleSlider';
import { ShopCart, CartFeedback } from './component/ShopCart';

window.customElements.define('category-card', CategoryCard);
window.customElements.define('products-zone', ProductsZone);
window.customElements.define('category-zone', CategoryZone);
window.customElements.define('product-card', ProductCard);
window.customElements.define('options-panel', OptionsPanel);
// window.customElements.define('double-slider', DoubleRangeSlider);
window.customElements.define('shop-cart', ShopCart);

const productsZone = document.querySelector('products-zone') as ProductsZone;
const optionsPanel = document.querySelector('options-panel') as OptionsPanel;
const shopCart = document.querySelector('shop-cart') as ShopCart;

let options: FilterOptions = { 
  rating: 1,
  category: "cat140006",
  sortByBrandOrder: "0",
  sortByReleaseOrder: "0",
  search: "",
  brand: ""
}
const inCartprod: Set<string> = new Set();
optionsPanel.rating = options.rating
optionsPanel.search = options.search
optionsPanel.currentBrand = options.search
optionsPanel.sortByBrandOrder = options.sortByBrandOrder
optionsPanel.sortByReleaseOrder = options.sortByReleaseOrder

if (localStorage.getItem('inCart')==null) localStorage.setItem('inCart', '')

document.addEventListener('options-update', (e)=>{
  if (!(e instanceof OptionsUpdateEvent)) {
    throw Error('Expected options update event')
  }
  const {detail} = e
  options = Object.assign(options, detail) // rewriting updated properties by merge
  reloadProducts().catch((e)=>{throw e})
  localStorage.setItem('options', JSON.stringify(options))
})

document.addEventListener('cart-toggle', (e)=>{
  if (!(e instanceof CartToggleEvent)) {
    throw Error('Expected product add event')
  }
  const {productId} = e.detail
  shopCart.updateCart(productId)
})

document.addEventListener('cart-feedback', (e)=>{
  if (!(e instanceof CartFeedback)) {
    throw Error('Expected product add event')
  }
  const {added, productId} = e.detail
  const inCart = localStorage.getItem('inCart') as string
  const card = productsZone.findProductCard(productId)
  card.cart = added
  if (added) inCartprod.add(productId);
  if (!added) inCartprod.delete(productId);
  if (added && inCart.indexOf(productId) == -1) {
    localStorage.setItem('inCart', `${inCart}/${productId}`)
  }
})

document.addEventListener('reset-storage', (e)=>{
  if (!(e instanceof ResetStorageEvent)) {
    throw Error('Expected product add event')
  }
  localStorage.setItem('inCart', ``)
  localStorage.setItem('options', ``)

})

document.addEventListener("DOMContentLoaded", ()=> {
      if (localStorage.getItem('options')) {
        const storedOptions = localStorage.getItem('options') as string
        const storedOptionsVal = JSON.parse(storedOptions) as FilterOptions 
        options=Object.assign(options, storedOptionsVal)
      }
  })

async function reloadProducts () {
  const [products, brands] = await Product.filterProducts(options)
  optionsPanel.brands = brands
  productsZone.products = products
  inCartprod.forEach((productId)=>{
    const card = productsZone.findProductCard(productId);
    card.cart = true

  }) 
}
// const test:Promise<void> = new Promise((resolve, reject) => {
//   if (localStorage.getItem('options')) {
//     const storedOptions = localStorage.getItem('options') as string
//     const storedOptionsVal = JSON.parse(storedOptions) as FilterOptions 
//     options=Object.assign(options, storedOptionsVal)
//   }
// })
reloadProducts().catch((e)=>{throw e})