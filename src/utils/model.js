import Data from '../data/trajets-des-voyageurs-entre-les-cantons-suisses1.json'

const genColor = () =>
  '#' + ('000000' + Math.floor(0xffffff * Math.random()).toString(16)).slice(-6)

export class TravelItem {
  constructor(data) {
    if (data === undefined) debugger
    if (!(data instanceof TravelItem)) {
      if (data.fields) data = data.fields
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
    const ds = Number(dateStart.replace(/-/g, ''))
    const de = Number(dateEnd.replace(/-/g, ''))
    const dt = Number(this.date.replace(/-/g, ''))
    return dt >= ds && dt <= de
  }

  hasCanton(cantonName) {
    return this.cantonStart === cantonName || this.cantonEnd === cantonName
  }

  hasOneCanton(cantons) {
    return cantons.map(c => this.hasCanton(c)).indexOf(true) !== -1
  }
}

export class Travels {
  constructor(data) {
    if (data === undefined) this.travelItems = []
    else if (!(data instanceof Travels)) {
      this.travelItems = data.map(a => new TravelItem(a))
    } else this.travelItems = [...data.travelItems]
  }

  filter(act) {
    return new Travels(this.travelItems.filter(act))
  }

  startOn(canton) {
    return this.filter(a => a.cantonStart === canton)
  }

  endOn(canton) {
    return this.filter(a => a.cantonEnd === canton)
  }

  map(act) {
    return new Travels(this.travelItems.map(act))
  }

  concat(travels) {
    return new Travels(this.travelItems.concat(travels.travelItems))
  }

  groupBy(name) {
    const res = {}

    this.travelItems.forEach(a => {
      if (res[a[name]] === undefined) res[a[name]] = []
      res[a[name]].push(a)
    })

    for (let key in res) {
      res[key] = new Travels(res[key])
    }
    return res
  }

  hasOne(cantons) {
    return this.filter(a => a.hasOneCanton(cantons))
  }

  only(cantons) {
    return this.filter(
      a =>
        cantons.indexOf(a.cantonStart) !== -1 &&
        cantons.indexOf(a.cantonEnd) !== -1
    )
  }

  get totalValue() {
    return this.travelItems.map(a => a.value).reduce((a, b) => a + b)
  }

  get noUndefined() {
    return this.filter(
      a =>
        a.cantonStart !== undefined &&
        a.cantonEnd !== undefined &&
        a.cantonStart.toLowerCase() !== 'undefined' &&
        a.cantonEnd.toLowerCase() !== 'undefined'
    )
  }

  get withoutOwn() {
    return this.filter(a => a.cantonStart !== a.cantonEnd)
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
    this.travelItems.forEach(a => (dates[a.date] = 1))
    return Object.keys(dates).sort()
  }

  transform() {
    const result = {
      matrix: [],
      colors: [],
      labels: [],
    }
    let cantonList = this.cantonList
    cantonList.forEach(canton => {
      result.labels.push(canton)
      const travels = this.endOn(canton).groupBy('cantonStart')
      result.matrix.push(
        cantonList.map(cantonName => {
          if (travels[cantonName] === undefined) return 0
          return travels[cantonName].totalValue
        })
      )
      result.colors.push(genColor())
    })
    if (result.matrix.length === 0) result.matrix = [[0]]

    return result
  }
}
export const data = new Travels(Data)
