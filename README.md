# Razzle React Vue Elm PHP...starter kit.

![Blazing FAST!](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)

These apps are a demonstration of how Razzle can be used to adapt to changing needs.

It includes examples of universal server rendering with React, React in PHP via Babel-PHP, Vue, and Elm with hot module replacement....all at the same time.

---
#### The punch line...

All of the code in `razzle.config.js` in the last example can actually just be replaced with new Razzle v2 plugins:

```js

module.exports = {
 plugins: ['elm', 'vue', 'php']
}

```
