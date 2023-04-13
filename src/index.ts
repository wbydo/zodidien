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

const createSimpleStatement = (prefix: string, arg: string) => {
  return factory.createVariableStatement(
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
              factory.createIdentifier(arg)
            ),
            undefined,
            []
          )
        ),
      ],
      NodeFlags.Const
    )
  );
};

export const parse = (prefix: string, input: unknown) => {
  if (typeof input === 'string' || typeof input === 'number') {
    return createSimpleStatement(prefix, typeof input);
  } else if (input === null) {
    return createSimpleStatement(prefix, 'null');
  } else if (typeof input === 'object') {
    return factory.createVariableStatement(
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
  } else {
    throw new Error();
  }
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
