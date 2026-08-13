function useAvailableUtils(context) {
  let averageFunctionExists = false;
  return {
    Program(node) {
      averageFunctionExists = context.sourceCode
        .getScope(node)
        .childScopes[0].variables.some((v) => v.name === "average");
    },
    VariableDeclarator(node) {
      if (
        averageFunctionExists &&
        node.id.name === "averageScore" &&
        !context.sourceCode.getText(node.init).includes("average(")
      ) {
        context.report({
          node,
          message: "Use utility function `average` instead",

          fix(fixer) {
            return [fixer.replaceText(node.init, "average(scores)")];
          },
        });
      }
    },
  };
}

function removeUnusedFunctions(context) {
  let references;
  return {
    Program(node) {
      references = context.sourceCode.getScope(node).childScopes[0].references;
    },
    FunctionDeclaration(node) {
      if (references.some((ref) => ref.identifier.name === node.id.name))
        return;

      context.report({
        node,
        message: `Function ${node.id.name} is unused`,

        fix(fixer) {
          return [fixer.removeRange([node.start, node.end])];
        },
      });
    },
  };
}

const sharedMeta = {
  type: "problem",
  hasSuggestions: false,
  fixable: "code",
  schema: [],
  languages: ["js/js"],
};

const plugin = {
  rules: {
    useAvailableUtils: { create: useAvailableUtils, meta: sharedMeta },
    removeUnusedFunctions: {
      create: removeUnusedFunctions,
      meta: sharedMeta,
    },
  },
};

export default plugin;
