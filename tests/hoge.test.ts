import { factory, NodeFlags } from 'typescript';

import { parse, toString } from '../src';

describe('string', (): void => {
  const prefix = 'prefix';
  const input = 'foo';
  const ast = parse(prefix, input);

  test('AST', (): void => {
    const actual = ast;

    const expected = factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(`${prefix}Schema`),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier('z'),
                factory.createIdentifier('string')
              ),
              undefined,
              []
            )
          ),
        ],
        NodeFlags.Const
      )
    );

    expect(actual).toStrictEqual(expected);
  });

  test('code', (): void => {
    const actual = toString(ast);
    const expected = `const ${prefix}Schema = z.string();`;

    expect(actual).toBe(expected);
  });
});

describe('number', (): void => {
  const prefix = 'prefix';
  const input = 1234;
  const ast = parse(prefix, input);

  test('AST', (): void => {
    const actual = ast;

    const expected = factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(`${prefix}Schema`),
            undefined,
            undefined,
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier('z'),
                factory.createIdentifier('number')
              ),
              undefined,
              []
            )
          ),
        ],
        NodeFlags.Const
      )
    );

    expect(actual).toStrictEqual(expected);
  });

  test('code', (): void => {
    const actual = toString(ast);
    const expected = `const ${prefix}Schema = z.number();`;

    expect(actual).toBe(expected);
  });
});
