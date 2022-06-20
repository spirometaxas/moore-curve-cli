# moore-curve-cli
Print the Moore Curve to the console!

## Usage
### Via `npx`:
```
$ npx moore-curve-cli <n>
$ npx moore-curve-cli <n> -c
```

### Via Global Install
```
$ npm install --global moore-curve-cli
$ moore-curve-cli <n>
$ moore-curve-cli <n> -c
```

### Via Import
```
$ npm install moore-curve-cli
```
then:
```
const moore_curve = require('moore-curve-cli');
console.log(moore_curve.create(<n>));
console.log(moore_curve.create(<n>, <closeCurve>));
```