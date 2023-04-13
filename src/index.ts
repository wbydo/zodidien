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

export const parse = (prefix: string, input: unknown): VariableStatement => {
  if (typeof input === 'string' || typeof input === 'number') {
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
                factory.createIdentifier(typeof input)
              ),
              undefined,
              []
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
