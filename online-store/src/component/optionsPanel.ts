import { Component } from './Component'
const ratingInputId = 'rating-input'

export class RatingSetEvent extends CustomEvent<{rating:number}>{
  constructor(rating: number) {
    super('rating-set', {
      bubbles: true,
      composed: true,
      detail: {rating}
    })
  }
}
export class OptionsPanel extends Component {
  private ratingInput: HTMLInputElement | null = null

  constructor() {
    super()
  }

  get rating() {
    return this.ratingInput?.value || ""
  }
  set rating(value: string | number) {
    const input = this.ratingInput as HTMLInputElement
    input.value = value.toString() || ''
    this.dispatchEvent(new RatingSetEvent(+input.value))
  }
  render() {
    this.shadow.innerHTML=
    `<div class="rating">
      <label class="rating__label" for="rating-filter">Рейтинг</label>
      <input type="range" id="${ratingInputId}" min="1" max="5" step="0.1">
    </div>`
  }
  connectedCallback(): void {
    this.render()
    this.ratingInput = this.getElementById(ratingInputId) as HTMLInputElement
    this.ratingInput.addEventListener('input', ()=>
    {
      this.rating = this.ratingInput?.value || ""
    })
  }
  
}