import { ProductsZone } from './component/ProductsZone';
import { CategoryCard, CategorySelectEvent } from './component/CategoryCard';
import { CategoryZone } from './component/CategoryZone';
import { ProductCard } from './component/ProductCard';
import { OptionsPanel, RatingSetEvent } from './component/optionsPanel';

window.customElements.define('category-card', CategoryCard);
window.customElements.define('products-zone', ProductsZone);
window.customElements.define('category-zone', CategoryZone);
window.customElements.define('product-card', ProductCard);
window.customElements.define('options-panel', OptionsPanel);

const productsZone = document.querySelector('products-zone') as ProductsZone;
const optionsPanel = document.querySelector('options-panel') as OptionsPanel;
optionsPanel.rating = "1";



document.addEventListener('category-select', (e)=>{
  if (!(e instanceof CategorySelectEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {id}}= e;
  productsZone.category = id;
})
document.addEventListener('rating-set', (e)=>{
  if (!(e instanceof RatingSetEvent)) {
    throw Error('Not a custom event')
  }
  const {detail: {rating}}= e;
  productsZone.rating = rating;
})
