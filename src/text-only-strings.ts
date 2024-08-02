import { ESLintUtils } from "@typescript-eslint/utils";
import * as tsutils from "ts-api-utils";
import * as ts from "typescript";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://sunrun.com/rule/${name}`,
);


function getNodeForSymbolLookup(node) {
  switch (node.expression.type) {
    case 'CallExpression':
      return node.expression.callee;
    default:
      return node.expression;
  }
}

function getReturnTypeOfFunction(type, checker) {
  // TODO: How to handle multiple signatures?
  const signatures = checker.getSignaturesOfType(type, 0);
  const returnType = checker.getReturnTypeOfSignature(signatures[0]);
  return returnType;
}

export const rule = createRule({
  create(context) {
    return {
      JSXExpressionContainer: function(node) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        const symbol = services.getSymbolAtLocation(getNodeForSymbolLookup(node));
        if (symbol && node) {
          let type = services.program
            .getTypeChecker()
            // @ts-ignore - node.expression
            .getTypeOfSymbolAtLocation(symbol, node.expression);

          if (node.expression.type === 'CallExpression') {
            // We need to narrow to just the return type of calling the function
            type = getReturnTypeOfFunction(type, checker);
          }

          // @ts-ignore - isTypeAssignableTo
          if (!checker.isTypeAssignableTo(type, checker.getStringType())) {
            context.report({
              node,
              messageId: "textOutsideText",
              data: {}
            });
          }
        }

      },
    };
  },
  meta: {
    docs: {
      description: "Avoid rendering text outside <Text> components",
    },
    messages: {
      textOutsideText: "Possible text rendered outside <Text> component.",
    },
    type: "suggestion",
    schema: [],
  },
  name: "enforce-string-in-text",
  defaultOptions: [],
});
