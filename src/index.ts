import { readFileSync, writeFileSync } from 'fs';

import {
  factory,
  NodeFlags,
  createPrinter,
  createSourceFile,
  VariableStatement,
  ScriptTarget,
  ScriptKind,
  EmitHint,
  CallExpression,
} from 'typescript';

const createSimpleCallStatement = (arg: string) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('z'),
      factory.createIdentifier(arg)
    ),
    undefined,
    []
  );
};

export const parse = (prefix: string, input: unknown): VariableStatement => {
  // TODO: path: string[]を受け取るようにする
  const inner = (input: unknown): CallExpression => {
    if (typeof input === 'string' || typeof input === 'number') {
      return createSimpleCallStatement(typeof input);
    } else if (input === null) {
      return createSimpleCallStatement('null');
    } else if (Array.isArray(input)) {
      const item: unknown = input[0];
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('z'),
          factory.createIdentifier('array')
        ),
        undefined,
        [inner(item)]
      );
    } else if (typeof input === 'object') {
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier('z'),
          factory.createIdentifier('object')
        ),
        undefined,
        [
          factory.createObjectLiteralExpression(
            Object.entries(input).map(([k, v]: [string, unknown]) =>
              factory.createPropertyAssignment(
                factory.createIdentifier(k),
                inner(v)
              )
            ),
            true
          ),
        ]
      );
    } else {
      throw new Error();
    }
  };

  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(`${prefix}Schema`),
          undefined,
          undefined,
          inner(input)
        ),
      ],
      NodeFlags.Const
    )
  );
};

export const toString = (v: VariableStatement): string => {
  // https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md#creating-and-printing-a-typescript-ast

  const resultFile = createSourceFile(
    '', // ファイル名(今回は使わないので空文字)
    '',
    ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ScriptKind.TS
  );
  const printer = createPrinter();

  return printer.printNode(EmitHint.Unspecified, v, resultFile);
};

const main = () => {
  const input = readFileSync('/dev/stdin', 'utf-8');
  writeFileSync(1, toString(parse('tempPrefix', JSON.parse(input))));
};

main();
