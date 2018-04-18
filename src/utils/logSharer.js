export default class LogSharer {
  constructor(project, api = 'http://172.17.102.83/api/projects/') {
    this.config = { project, api }
  }
  get url() {
    return this.config.api + this.config.project
  }
  sendData(data) {
    let fd = new FormData()
    fd.append('data',JSON.stringify(data))
    fetch(this.url, {
      method: 'POST',
      body: fd,
    })
      .then(_ => {})
      .catch(e => console.error('failed to send data', data, e))
  }
  send(event, name, data) {
    this.sendData({ event, name, data })
  }
}
