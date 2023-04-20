![zodidien](./logo.svg)

[![Unit Testing](https://github.com/wbydo/zodidien/actions/workflows/unit-testing.yml/badge.svg?branch=main)](https://github.com/wbydo/zodidien/actions/workflows/unit-testing.yml)
[![LICENSE](https://img.shields.io/github/license/wbydo/zodidien)](https://github.com/wbydo/zodidien/blob/master/LICENSE)
[![Created by wbydo](https://img.shields.io/badge/created-%40wbydo-blue)](https://lit.link/wbydo)
[![npm](https://img.shields.io/npm/dt/@wbydo/zodidien)](https://www.npmjs.com/package/@wbydo/zodidien)

Generates [zod](https://github.com/colinhacks/zod) schema from JSON string on standard inputs.

## Installation

```
npm install --save-dev @wbydo/zodidien
```

## Usage

!!! It does not work properly until v1.0.0 !!!

### Generating a schema

When you type this command...

```bash
echo '{"foo": 1234, "bar": "asdf"}' | npx zodidien foobar
```

This string will be output

```ts
const foobarSchema = z.object({
  foo: z.number(),
  bar: z.string(),
});
```

It reads from standard input and outputs to standard output, so it can be used like this.

```bash
pbpaste | npx zodidien foobar

# output
#
# const foobarSchema = z.object({
#    foo: z.number(),
#    bar: z.string()
#});
```

### Generating a schema in code

```
TODO...
```

## Convert Types

Here is what the types on JSON are converted to.†1

| JSON    | TypeScript      |
| ------- | --------------- |
| number  | `z.number()`    |
| string  | `z.string()`    |
| boolean | `z.boolean()`   |
| array   | `z.array()` †2  |
| object  | `z.object()` †3 |

- †1: If anything other than the types in the table is entered, an error will occur.
- †2: Ignored except for first elements.
- †3: Non-string type keys are not supported.

## Dependencies

This package has the following dependencies:

[zod](https://github.com/colinhacks/zod) - A TypeScript-first schema validation library.

## Similar Library

[rsinohara/json-to-zod](https://github.com/rsinohara/json-to-zod) - Converts JSON objects or file to simple Zod schemas

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

To check the operation in the local development environment, execute the following command

```bash
git clone https://github.com/wbydo/zodidien.git

cd zodidien

npm ci

npm test

echo '{"foo": 1234, "bar": "asdf"}' | npm start prefix
```

## License

This library is licensed under the MIT license.
