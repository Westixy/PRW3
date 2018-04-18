# Documentation

## How to run it

- Clone the project <br> `git clone https://github.com/Westixy/prw3.git`
- Go on the folder <br> `cd prw3`
- Install deps <br> `npm i`
- run it <br> `npm run start`

## Structure

```raw
+ src
  + utils
    - model.js
    - logSharer.js
  - App.jsx
  - Page.jsx
```

App.jsx is the entry point. <br>
Page.jsx contains the full application.<br>
utils/model.js is the data manager.<br>
utils/logSharer.js is a simple class that send data to logs.

For more details there is a [documentation](https://github.com/Westixy/React-D3-doc/blob/master/index.pdf) of how I builded it (in french)