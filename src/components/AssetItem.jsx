import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
const AssetItem = ({ asset }) => {
  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const diff = (now - d) / 1e3;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "mb-6 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative group shadow-lg shadow-green-900/10", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-3 flex items-center justify-between bg-gray-950 border-b border-gray-900", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: asset.authorAvatar,
            alt: asset.author,
            className: "w-6 h-6 rounded-full border border-gray-700"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 19,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-gray-400", children: [
          "@",
          asset.author
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 24,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-600 font-mono", children: timeAgo(asset.createdAt) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "relative bg-black min-h-[200px] flex items-center justify-center", children: asset.type === "image" ? /* @__PURE__ */ jsxDEV(
      "img",
      {
        src: asset.url,
        alt: asset.prompt,
        className: "w-full h-auto object-cover max-h-[500px]",
        loading: "lazy"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 31,
        columnNumber: 21
      }
    ) : asset.type === "audio" ? /* @__PURE__ */ jsxDEV("div", { className: "w-full p-8 flex flex-col items-center justify-center gap-4 bg-gray-900/50", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center border border-green-500/30 animate-pulse", children: /* @__PURE__ */ jsxDEV("i", { className: "fas fa-volume-high text-green-500 text-2xl" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 40,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 39,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("audio", { controls: true, src: asset.url, className: "w-full max-w-md accent-green-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 42,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 38,
      columnNumber: 21
    }) : /* @__PURE__ */ jsxDEV("div", { className: "p-4 text-red-500", children: "Unknown asset type" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-t border-gray-900 bg-gray-950/50", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-300 font-mono break-words leading-relaxed", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-green-500/50 mr-2", children: "$" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 51,
          columnNumber: 21
        }),
        asset.prompt
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxDEV("button", { className: "text-gray-600 hover:text-green-500 transition-colors", children: /* @__PURE__ */ jsxDEV("i", { className: "far fa-heart" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 56,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 55,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 49,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 16,
    columnNumber: 9
  });
};
var stdin_default = AssetItem;
export {
  stdin_default as default
};
