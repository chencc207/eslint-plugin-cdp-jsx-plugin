/**
 * @fileoverview keep jsx function lines no more than 1
 * @author swchen
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "行内函数最大限制",
    },
  },
  create: function (context) {
    /**
     * 获取函数的参数的开始、结束位置
     * @param {node} node AST Node
     */

    return {
      // 限制箭头函数
      ArrowFunctionExpression: (node) => {
        // 当箭头函数的父节点为
        const parent = node.parent;
        if (
          parent.type === "JSXExpressionContainer" &&
          parent.parent.type === "JSXAttribute"
        ) {
          if (node.loc.end.line - node.loc.start.line + 1 > 3) {
            context.report({
              loc: node.loc,
              node,
              message: "不可在 JSX 内部写超过一行的函数",
            });
          }
        }
      },
    };
  },
};
