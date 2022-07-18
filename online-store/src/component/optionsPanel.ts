import { FilterOptions } from '../interface'
import { Component } from './Component'

//Tag's DOM elements id's group
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
export class ResetStorageEvent extends CustomEvent<{toReset: boolean}>{
  constructor(toReset: boolean) {
    super('reset-storage', {
      bubbles: true,
      composed: true,
      detail: {toReset}
    })
  }
}



export class OptionsPanel extends Component {
  private ratingInput: HTMLInputElement | null = null
  private outPut: HTMLOutputElement | null = null
  private brandsContainer: HTMLElement | null = null
  private resetBtn: HTMLButtonElement | null = null
  private searchInput: HTMLInputElement | null = null
  private brandSortOrder: HTMLSelectElement | null = null
  private resetStorageBtn: HTMLButtonElement | null = null
  private releaseSortOrder: HTMLSelectElement | null = null
  public defaultOptions: Pick<FilterOptions, "rating" | "search" | "brand"> = {rating: 1, search: "", brand: "" }
  public productsByBrand: string[] = []
  public _brands: string[] = []
  private _currentBrand= ""

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



  get currentBrand() {
    return this._currentBrand
  }
  set currentBrand(value: string){
    this.dispatchEvent(new OptionsUpdateEvent({brand: value}))
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
    this.rating = rating
    this.search = search
    const output = this.outPut as HTMLOutputElement
    output.value = '1'
    this.dispatchEvent(new OptionsUpdateEvent({search, rating}))
  }
  render() {
    this.shadow.innerHTML=
    `
    <style>
    *{
      font-family: 'Finger Paint', cursive;
    }
    @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
    .optionPanel {
      padding: 20px;  
      margin-top: 20px;
      display: flex;
      gap: 1em;
      flex-wrap: wrap;
      border: 0.5rem dashed black;
      background: #ffb3b3
      border-radius: 5%;
    }
    #resetStorage,
    .brand-filter,
    #${resetBtn} {
      background: #edc0af;
      border-radius: 10px;
      font-weight: 700;
      text-transform: uppercase;
      box-shadow: 0 0.7rem 1.2rem rgba(75, 75, 75, 0.5);
      transition: .1s ease-out all;
    }
    #resetStorage:hover,
    .brand-filter:hover,
    #${resetBtn}:hover {
      transform: scale(1.01);
      box-shadow: 0 0.7rem 1.2rem rgba(0,0,0,.2);
    }
    #resetStorage:active,
    .brand-filter:active, 
    #${resetBtn}:active {
      transform: scale(1.00);
      box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.8);
    }
    #${resetBtn}, #resetStorage {
      background: #ff5757;
    }  
    #brands {
      display:flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    </style> 
    
    
    <div class="optionPanel">
      <label class="search__label" for="search-input"><b>Search field: </b></label>
      <input id="${searchInput}" type="search" placeholder="input request" autocomplete="off" autofocus>
      

 
      <form>
      <label class="rating__label" for="rating-filter"><b>Rating (from 1 to 5):</b></label>
      <input type="range" id="${ratingInputId}" min="1" max="5" step="0.1" oninput="this.nextElementSibling.value = this.value">
      <output name="ratingRangeOutput" id="ratingRangeOutput">1</output>
      </form>
      <label for="brandSort"><b>Sort by name:</b></label>
      <select name="brandSort" id="sortByBrand">
        <option value="0">-</option>
        <option value="1">ascending order</option>
        <option value="-1">descending order</option>
      </select>
      <label for="releaseSort"><b>Sort by release date:</b></label>
      <select name="releaseSort" id="sortByRelease">
        <option value="0">-</option>
        <option value="1">ascending order</option>
        <option value="-1">descending order</option>
      </select>
      <br>
      <div id="brands">
      </div>
      <button id="${resetBtn}">Reset filters</button>
      <button id ="resetStorage">Reset storage</button>
    </div>`
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.resetBtn = this.getElementById(resetBtn) as HTMLButtonElement 
    this.resetBtn?.addEventListener('click', ()=> {
      this.reset()
    })
    this.resetStorageBtn = this.getElementById('resetStorage') as HTMLButtonElement 
    this.resetStorageBtn?.addEventListener('click', ()=> {
      this.dispatchEvent(new ResetStorageEvent(true))
    })

    this.brandsContainer = this.getElementById(brands)
    this.brandsContainer?.addEventListener('click', (e) =>{
      const btn = e.target as HTMLButtonElement;
      const brandName = btn.innerText || "";
      this.currentBrand = brandName;
      this.dispatchEvent(new OptionsUpdateEvent({brand:brandName}))
    }
    )

    this.searchInput = this.getElementById(searchInput) as HTMLInputElement
    this.searchInput.addEventListener('input', ()=>{
      const searchInputField = this.searchInput?.value || "" 
      this.dispatchEvent(new OptionsUpdateEvent({search:searchInputField}))
      })
    this.ratingInput = this.getElementById(ratingInputId) as HTMLInputElement
    this.outPut = this.getElementById('ratingRangeOutput') as HTMLOutputElement
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