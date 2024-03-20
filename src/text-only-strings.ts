import { ESLintUtils } from "@typescript-eslint/utils";
import * as tsutils from "ts-api-utils";
import * as ts from "typescript";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://sunrun.com/rule/${name}`,
);

export const rule = createRule({
  create(context) {
    return {
      JSXElement: function (node) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        if (node.openingElement && node.closingElement) {
          // const symbol = services.getSymbolAtLocation(node.openingElement.name);
          // console.log("symobl", symbol);
          // const type = services.program
          //   .getTypeChecker()
          //   .getTypeOfSymbolAtLocation(symbol, node.openingElement);
          const symbol = services.getSymbolAtLocation(
            node.children[0].expression,
          );

          const openingType = services.getTypeAtLocation(
            node.openingElement.name,
          );
          // @ts-ignore
          const type = services.getTypeAtLocation(symbol.valueDeclaration);
          const strName = checker.typeToString(type);
          // console.log("symbol", symbol, strName);
          //
          // console.log("checker", checker);
          //
          console.log(
            "openinType",
            !!openingType,
            !!type,
            openingType === type,
          );

          // @ts-ignore
          const result = checker.isTypeAssignableTo(type, openingType);

          console.log(type, openingType);

          console.log("result", result);

          // if (node.openingElement.name.name === "Text") {
          //   console.log("is text");
          // }
          // if (node.openingElement.name === "Text") {
          // }
        }
        // console.log("jsx element", node);
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
