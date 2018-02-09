import * as Data from '../data/trajets-des-voyageurs-entre-les-cantons-suisses1.json'

export const operator = {
  reduce: { count: (a, b) => a.anzahl_reisende + b.anzahl_reisende },
  filter: {
    by: ({ date, cantonStart, cantonEnd, value }) => ({
      anzahl_reisende: value,
      start_kanton: cantonStart,
      ziel_kanton: cantonEnd,
      reisedatum: date,
    }),
  },
}

export class Model {
  constructor(data) {
    console.log(data)
    this.data = data
    this.records = this.data.map(a => a.fields)
  }

  filter(filter) {
    return this.records.filter(a => {
      for (let key in filter) {
        if (filter[key] === undefined) continue
        if (filter[key] instanceof RegExp) {
          if (!filter[key].test()) return false
        } else if (filter[key] !== a[key]) return false
      }
      return true
    })
  }
}

export class Travels {
  constructor() {
    this.model = new Model(Data)
    this.filters = {}
  }

  get cantonList(){
    let cantons = {}
    this.model.records.forEach(a=>cantons[a.start_kanton]=1)
    return Object.keys(cantons)
  }

  get dateList(){
      let dates = {}
      this.model.records.forEach(a=>dates[a.reisedatum]=1)
      return Object.keys(dates).sort()
  }


}

export const data = new Travels()
