import { ProductsZone, BrandsPopulateEvent } from './component/ProductsZone';
import { CategoryCard, CategorySelectEvent } from './component/CategoryCard';
import { CategoryZone } from './component/CategoryZone';
import { ProductCard } from './component/ProductCard';
import { OptionsPanel, RatingSetEvent, SortingByBrandEvent, SortingByReleaseEvent, SearchEvent, ResetEvent } from './component/optionsPanel';

window.customElements.define('category-card', CategoryCard);
window.customElements.define('products-zone', ProductsZone);
window.customElements.define('category-zone', CategoryZone);
window.customElements.define('product-card', ProductCard);
window.customElements.define('options-panel', OptionsPanel);

const productsZone = document.querySelector('products-zone') as ProductsZone;
const optionsPanel = document.querySelector('options-panel') as OptionsPanel;
optionsPanel.rating = "1";
optionsPanel.sortByBrandOrder = "0";
optionsPanel.sortByReleaseOrder = "0";


document.addEventListener('category-select', (e)=>{
  if (!(e instanceof CategorySelectEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {id}}= e;
  productsZone.category = id;
})

document.addEventListener('brands-populate', (e)=>{
  if (!(e instanceof BrandsPopulateEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {brands}}= e;
  optionsPanel.brands = brands;
})

document.addEventListener('search', (e)=>{
  if (!(e instanceof SearchEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {search}}= e;
  productsZone.search = search;
})
document.addEventListener('rating-set', (e)=>{
  if (!(e instanceof RatingSetEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {rating}}= e;
  productsZone.rating = rating;
})
document.addEventListener('brandsort-set', (e)=>{
  if (!(e instanceof SortingByBrandEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {sortByBrandOrder}}= e;
  productsZone.sortByBrandOrder = sortByBrandOrder;
})
document.addEventListener('releasesort-set', (e)=>{
  if (!(e instanceof SortingByReleaseEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {sortByReleaseOrder}}= e;
  productsZone.sortByReleaseOrder = sortByReleaseOrder;
})
