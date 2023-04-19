# zodidien

Generates [zod](https://github.com/colinhacks/zod) schema from JSON string on standard inputs.

---

TODO: テストのバッジ
[![Created by (Twitter@DekinaiFootball)](https://img.shields.io/badge/created-%40wbydo-blue)](https://twitter.com/DekinaiFootball)
![npm](https://img.shields.io/npm/dt/@wbydo/zodidien)

## Installation

```
npm install --save-dev @wbydo/zodidien
```

## Usage

### Generating a schema

```
cat sample.json


cat sample.json | npx zodidien foobar
```

### Generating a schema in code

```
TODO
```

## Dependencies

This package has the following dependencies:

[zod](https://github.com/colinhacks/zod) (v3.6.0 or later) - A TypeScript-first schema validation library.

## Similar Library

[rsinohara/json-to-zod](https://github.com/rsinohara/json-to-zod) - Converts JSON objects or file to simple Zod schemas

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This library is licensed under the MIT license.
