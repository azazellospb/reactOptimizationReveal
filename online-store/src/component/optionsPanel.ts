import { FilterOptions } from '../interface'
import { Component } from './Component'
const ratingInputId = 'rating-input'
const sorterByBrand = 'sortByBrand'
const sorterByRelease = 'sortByRelease'
const searchInput = 'search-input'
const brands = 'brands'
const resetBtn = 'reset-btn'

export class OptionsUpdateEvent extends CustomEvent<Partial<FilterOptions>>{
  constructor(options: Partial<FilterOptions>) {
    super('options-update', {
      bubbles: true,
      composed: true,
      detail: options
    })
  }
}
export class OptionsPanel extends Component {
  private ratingInput: HTMLInputElement | null = null
  private brandsContainer: HTMLElement | null = null
  private resetBtn: HTMLButtonElement | null = null
  private searchInput: HTMLInputElement | null = null
  private brandSortOrder: HTMLSelectElement | null = null
  private releaseSortOrder: HTMLSelectElement | null = null
  public defaultOptions: Pick<FilterOptions, "rating" | "search"> = {rating: 1, search: ""}
  public productsByBrand: string[] = [];
  public _brands: string[] = [];
  constructor() {
    super()
  }

  get rating() {
    return this.ratingInput?.value || ""
  }
  set rating(value: string | number) {
    const input = this.ratingInput as HTMLInputElement
    input.value = value.toString() || ''
    this.dispatchEvent(new OptionsUpdateEvent({rating: +input.value}))
  }
  get sortByBrandOrder() {
    return this.brandSortOrder?.value || ""
  }
  set sortByBrandOrder(value: string | number) {
    const input = this.brandSortOrder as HTMLSelectElement
    input.value = value.toString() || ''
    this.dispatchEvent(new OptionsUpdateEvent({sortByBrandOrder: input.value}))
  }
  get sortByReleaseOrder() {
    return this.releaseSortOrder?.value || ""
  }
  set sortByReleaseOrder(value: string | number) {
    const input = this.releaseSortOrder as HTMLSelectElement
    input.value = value.toString() || ''
    this.dispatchEvent(new OptionsUpdateEvent({sortByReleaseOrder: input.value}))
  }
  static get observedAttributes() {
    return ['category', 'brands']
  }
  get brands() {
    return this._brands;
  }
  set brands(value) {
    this._brands = value;
    const brandsContainer = this.brandsContainer as HTMLElement;
    brandsContainer.innerHTML = this._brands.map(name=>`<button class='btn brand-filter'>${name}</button>`).join('')
  }
  get search() {
    return this.searchInput?.value;
  }
  set search(value) {
    const searchInput = this.searchInput as HTMLInputElement
    searchInput.value = value || '';
  }
  reset() {
    const {
      rating,
      search
    } = this.defaultOptions
    this.rating = rating;
    this.search = search;

    this.dispatchEvent(new OptionsUpdateEvent({search, rating}))
  }
  render() {
    this.shadow.innerHTML=
    `<div class="rating">
      <label class="search__label" for="search-input">Search field: </label>
      <input id="${searchInput}" type="search" placeholder="search product by input" autocomplete="off" autofocus>
      <label class="rating__label" for="rating-filter">Рейтинг</label>
      <input type="range" id="${ratingInputId}" min="1" max="5" step="0.1">
      <label for="brandSort">Sort by brand:</label>
      <select name="brandSort" id="sortByBrand">
        <option value="0">-</option>
        <option value="1">ascending order</option>
        <option value="-1">descending order</option>
      </select>
      <label for="releaseSort">Sort by release date:</label>
      <select name="releaseSort" id="sortByRelease">
        <option value="0">-</option>
        <option value="1">ascending order</option>
        <option value="-1">descending order</option>
      </select>
      <br>
      <div id="brands">
      </div>
      <button id = ${resetBtn}>Reset filters</button>
    </div>`
  }
  connectedCallback(): void {
    this.render()
    this.resetBtn = this.getElementById(resetBtn) as HTMLButtonElement 
    this.resetBtn?.addEventListener('click', ()=> {
      this.reset()
    })
    this.brandsContainer = this.getElementById(brands)

    this.searchInput = this.getElementById(searchInput) as HTMLInputElement
    this.searchInput.addEventListener('input', ()=>{
      const searchInputField = this.searchInput?.value || "" 
      this.dispatchEvent(new OptionsUpdateEvent({search:searchInputField}))
      })
    this.ratingInput = this.getElementById(ratingInputId) as HTMLInputElement
    this.ratingInput.addEventListener('input', ()=>
    { this.rating = this.ratingInput?.value || "" })

    this.brandSortOrder = this.getElementById(sorterByBrand) as HTMLSelectElement 
    this.brandSortOrder.addEventListener('input', ()=>{
      this.sortByBrandOrder = this.brandSortOrder?.value || "0" })
  
    this.releaseSortOrder = this.getElementById(sorterByRelease) as HTMLSelectElement
    this.releaseSortOrder.addEventListener('input', ()=>{
      this.sortByReleaseOrder = this.releaseSortOrder?.value || "0" })
  }
  
}