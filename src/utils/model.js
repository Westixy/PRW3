export class Model {
  constructor(data) {
    this.data = data
    this.records = this.data.records.map(a => a.fields)
  }

  filter(filter) {
    return this.records.filter(a => {
      for (let key in filter) {
        if (filter[key] instanceof RegExp) {
          if (!filter[key].test()) return false
        } else if (filter[key] != a[key]) return false
      }
      return true
    })
  }
  filterCount(filter) {
    return this.filter(filter).reduce(
      (a, b) => a.anzahl_reisende + b.anzahl_reisende
    )
  }
}