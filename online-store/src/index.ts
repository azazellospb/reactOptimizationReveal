import { ProductsZone } from './component/ProductsZone';
import { CategoryCard } from './component/CategoryCard';
import { CategoryZone } from './component/CategoryZone';
import { ProductCard } from './component/ProductCard';
import { OptionsPanel, OptionsUpdateEvent } from './component/optionsPanel';
import { FilterOptions } from './interface';
import { Product } from './model/Product';

window.customElements.define('category-card', CategoryCard);
window.customElements.define('products-zone', ProductsZone);
window.customElements.define('category-zone', CategoryZone);
window.customElements.define('product-card', ProductCard);
window.customElements.define('options-panel', OptionsPanel);

const productsZone = document.querySelector('products-zone') as ProductsZone;
const optionsPanel = document.querySelector('options-panel') as OptionsPanel;

let options: FilterOptions = { 
  rating: 1,
  category: "cat140006",
  sortByBrandOrder: "0",
  sortByReleaseOrder: "0",
  search: "",
  brand: ""
}
optionsPanel.rating = options.rating;
optionsPanel.sortByBrandOrder = options.sortByBrandOrder;
optionsPanel.sortByReleaseOrder = options.sortByReleaseOrder;


document.addEventListener('options-update', (e)=>{
  if (!(e instanceof OptionsUpdateEvent)) {
    throw Error('Expected options update event')
  }
  const {detail} = e
  options = Object.assign(options, detail) // merge options by rewriting updated ones
  reloadProducts().catch((e)=>{throw e});

})


async function reloadProducts () {
  const [products, brands] = await Product.filterProducts(options)
  optionsPanel.brands = brands
  productsZone.products = products
}
reloadProducts().catch((e)=>{throw e});
