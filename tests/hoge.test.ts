import { factory, NodeFlags } from 'typescript';
import dedent from 'ts-dedent';

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

describe('null', (): void => {
  const prefix = 'prefix';
  const input = null;
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
                factory.createIdentifier('null')
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
    const expected = `const ${prefix}Schema = z.null();`;

    expect(actual).toBe(expected);
  });
});

describe('object', (): void => {
  describe('pattern 1', () => {
    const prefix = 'prefix';
    const input = { foo: 123 };
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
                  factory.createIdentifier('object')
                ),
                undefined,
                [
                  factory.createObjectLiteralExpression(
                    [
                      factory.createPropertyAssignment(
                        factory.createIdentifier('foo'),
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
                    true
                  ),
                ]
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
      const expected = dedent`
        const ${prefix}Schema = z.object({
            foo: z.number()
        });
      `;

      expect(actual).toBe(expected);
    });
  });

  describe('pattern 2', () => {
    const prefix = 'prefix';
    const input = { bar: 'Bar' };
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
                  factory.createIdentifier('object')
                ),
                undefined,
                [
                  factory.createObjectLiteralExpression(
                    [
                      factory.createPropertyAssignment(
                        factory.createIdentifier('bar'),
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
                    true
                  ),
                ]
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
      const expected = dedent`
        const ${prefix}Schema = z.object({
            bar: z.string()
        });
      `;

      expect(actual).toBe(expected);
    });
  });

  describe('pattern 3', () => {
    const prefix = 'prefix';
    const input = { bar: { baz: 1234 } };
    const ast = parse(prefix, input);

    test('code', (): void => {
      const actual = toString(ast);
      const expected = dedent`
        const ${prefix}Schema = z.object({
            bar: z.object({
                baz: z.number()
            })
        });
      `;

      expect(actual).toBe(expected);
    });
  });

  describe('pattern 4', () => {
    const prefix = 'prefix';
    const input = { bar: { baz: 1234 }, foobar: 'asdf', barbaz: null };
    const ast = parse(prefix, input);

    test('code', (): void => {
      const actual = toString(ast);
      const expected = dedent`
        const ${prefix}Schema = z.object({
            bar: z.object({
                baz: z.number()
            }),
            foobar: z.string(),
            barbaz: z.null()
        });
      `;
      expect(actual).toBe(expected);
    });
  });
});

describe('array', (): void => {
  describe('pattern 1', () => {
    const prefix = 'prefix';
    const input = [1];
    const ast = parse(prefix, input);

    test('code', () => {
      const actual = toString(ast);
      const expected = 'const prefixSchema = z.array(z.number());';
      expect(actual).toBe(expected);
    });
  });

  describe('pattern 2', () => {
    const prefix = 'prefix';
    const input = {
      foo: 1,
      bar: 'asdf',
      baz: {
        foobar: [1],
        barbaz: ['asdf'],
        bazfoo: [
          {
            foobarbaz: 123,
            barbazfoo: 'asdf',
            bazfoobar: {
              foobarbazfoo: 1234,
              barbazfoobar: 'asdf',
              bazfoobarbaz: [[null]],
            },
          },
        ],
      },
    };
    const ast = parse(prefix, input);

    test('code', () => {
      const actual = toString(ast);
      const expected = dedent`
        const prefixSchema = z.object({
            foo: z.number(),
            bar: z.string(),
            baz: z.object({
                foobar: z.array(z.number()),
                barbaz: z.array(z.string()),
                bazfoo: z.array(z.object({
                    foobarbaz: z.number(),
                    barbazfoo: z.string(),
                    bazfoobar: z.object({
                        foobarbazfoo: z.number(),
                        barbazfoobar: z.string(),
                        bazfoobarbaz: z.array(z.array(z.null()))
                    })
                }))
            })
        });
      `;
      expect(actual).toBe(expected);
    });
  });
});
