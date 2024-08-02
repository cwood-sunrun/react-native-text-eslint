import { ESLintUtils } from "@typescript-eslint/utils";
import * as tsutils from "ts-api-utils";
import * as ts from "typescript";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://sunrun.com/rule/${name}`,
);

export const rule = createRule({
  create(context) {
    return {
      JSXExpressionContainer: function(node) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        const symbol = services.getSymbolAtLocation(node.expression);
        if (symbol) {
          console.log('internal');
          const type = services.program
            .getTypeChecker()
            // @ts-ignore
            .getTypeOfSymbolAtLocation(symbol, node.expression);

          // @ts-ignore
          if (!checker.isTypeAssignableTo(type, checker.getStringType())) {
            console.log("erporting");
            context.report({
              node,
              messageId: "loopOverEnum",
              data: {}
            });
          }
        }

      },
    };
  },
  meta: {
    docs: {
      description:
        "React Native Text components must have either strings or null as their children",
    },
    messages: {
      loopOverEnum: "Text components can only render type string or null",
    },
    type: "suggestion",
    schema: [],
  },
  name: "enforce-string-in-text",
  defaultOptions: [],
});
