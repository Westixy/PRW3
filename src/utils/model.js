import * as Data from '../data/trajets-des-voyageurs-entre-les-cantons-suisses1.json'

export class TravelItem {
  constructor(data) {
    if (!data instanceof TravelItem) {
      this.cantonStart = data.start_kanton
      this.cantonEnd = data.ziel_kanton
      this.value = data.anzahl_reisende
      this.date = data.reisedatum
    } else {
      this.cantonStart = data.cantonStart
      this.cantonEnd = data.cantonEnd
      this.value = data.value
      this.date = data.date
    }
  }

  dateIsBetween(dateStart, dateEnd) {
    const ds = Number(dateStart.replace(/\-/g, ''))
    const de = Number(dateEnd.replace(/\-/g, ''))
    const dt = Number(this.date.replace(/\-/g, ''))
    return dt >= ds && dt <= de
  }

  hasCanton(cantonName) {
    return this.cantonStart == cantonName || this.cantonEnd == cantonName
  }

}

export class Travels {
  constructor(data) {
    if (!data instanceof Travels) this.travelItems = data.records.map(a => a.fields).map(a => new TravelItem(a))
    else this.travelItems = clone(data.travelItems)
  }

  filter(act) {
    return new Travels(this.travelItems.filter(act))
  }

  map(act) {
    return new Travels(this.travelItems.map(act))
  }

  reduce(act) {
    return this.travelItems.reduce(act)
  }

  concat(travels) {
    return new Travels(this.travelItems.concat(travels.travelItems))
  }

  get totalValue() {
    return this.reduce((a, b) => a.value + b.value)
  }

  get length() {
    return this.travelItems.length
  }

  get cantonList() {
    let cantons = {}
    this.travelItems.forEach(a => {
      cantons[a.cantonStart] = 1
      cantons[a.cantonEnd] = 1
    })
    return Object.keys(cantons)
  }

  get dateList() {
    let dates = {}
    this.model.records.forEach(a => dates[a.reisedatum] = 1)
    return Object.keys(dates).sort()
  }
}

export const data = new Travels(Data)