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
    this.data = data
    this.records = this.data.records.map(a => a.fields)
  }

  filter(filter) {
    return this.records.filter(a => {
      for (let key in filter) {
        if (filter[key] === undefined) continue
        if (filter[key] instanceof RegExp) {
          if (!filter[key].test()) return false
        } else if (filter[key] != a[key]) return false
      }
      return true
    })
  }
}

export const data = new Model(import('../data/trajets-des-voyageurs-entre-les-cantons-suisses1.json')) 
