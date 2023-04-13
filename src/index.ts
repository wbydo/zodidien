import {
  factory,
  NodeFlags,
  createPrinter,
  createSourceFile,
  VariableStatement,
  ScriptTarget,
  ScriptKind,
  EmitHint,
} from 'typescript';

const createSimpleCallStatement = (prefix: string, arg: string) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier('z'),
      factory.createIdentifier(arg)
    ),
    undefined,
    []
  );
};

export const parse = (prefix: string, input: unknown) => {
  const inner = (() => {
    if (typeof input === 'string' || typeof input === 'number') {
      return createSimpleCallStatement(prefix, typeof input);
    } else if (input === null) {
      return createSimpleCallStatement(prefix, 'null');
    } else if (typeof input === 'object') {
      return factory.createCallExpression(
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
      );
    } else {
      throw new Error();
    }
  })();

  return factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(`${prefix}Schema`),
          undefined,
          undefined,
          inner
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
