import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { subscribeToFeed, addAssetToUser, initUserRecord } from "./utils/db.js";
import AssetItem from "./components/AssetItem.jsx";
const App = () => {
  const [feed, setFeed] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("image");
  const [preview, setPreview] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  useEffect(() => {
    initUserRecord();
    const unsubscribe = subscribeToFeed((assets) => {
      setFeed(assets);
    });
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") unsubscribe();
    };
  }, []);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedUrl(null);
    setPreview(null);
    try {
      if (mode === "image") {
        const result = await window.websim.imageGen({
          prompt,
          aspect_ratio: "1:1"
        });
        setGeneratedUrl(result.url);
        setPreview({ type: "image", url: result.url });
      } else if (mode === "audio") {
        const result = await window.websim.textToSpeech({
          text: prompt,
          voice: "en-male"
          // Default fallback
        });
        setGeneratedUrl(result.url);
        setPreview({ type: "audio", url: result.url });
      }
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handlePost = async () => {
    if (!generatedUrl) return;
    setLoading(true);
    try {
      const asset = {
        type: mode,
        url: generatedUrl,
        prompt,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await addAssetToUser(asset);
      setIsCreating(false);
      setPrompt("");
      setGeneratedUrl(null);
      setPreview(null);
    } catch (error) {
      console.error("Posting failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col h-full bg-black text-white relative", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "h-14 flex items-center justify-between px-4 border-b border-gray-900 bg-black/80 backdrop-blur-md sticky top-0 z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-3 h-3 bg-green-500 rounded-full animate-pulse" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("h1", { className: "font-bold text-lg tracking-wider glitch-text", "data-text": "FAKE_OS", children: "FAKE_OS" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 89,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 88,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("main", { className: "flex-1 overflow-y-auto feed-scroll p-4 pb-24", children: feed.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "h-full flex flex-col items-center justify-center text-gray-600 gap-4", children: [
      /* @__PURE__ */ jsxDEV("i", { className: "fas fa-ghost text-4xl opacity-50" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 99,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-sm", children: "No signals detected yet..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 100,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 98,
      columnNumber: 21
    }) : feed.map((asset, idx) => /* @__PURE__ */ jsxDEV(AssetItem, { asset }, `${asset.authorId}-${idx}`, false, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 25
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 13
    }),
    !isCreating && /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-20", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setIsCreating(true),
        className: "w-14 h-14 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg shadow-green-900/50 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95",
        children: /* @__PURE__ */ jsxDEV("i", { className: "fas fa-plus text-xl" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 25
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 112,
        columnNumber: 21
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 111,
      columnNumber: 17
    }),
    isCreating && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full sm:max-w-md bg-gray-950 border-t sm:border border-gray-800 sm:rounded-xl p-4 shadow-2xl animate-slide-up", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold text-green-500 font-mono", children: "NEW_SIGNAL" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 126,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsCreating(false),
            className: "w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white",
            children: /* @__PURE__ */ jsxDEV("i", { className: "fas fa-times" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 131,
              columnNumber: 33
            })
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 127,
            columnNumber: 29
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 125,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex bg-gray-900 rounded-lg p-1 mb-4", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMode("image"),
            className: `flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "image" ? "bg-gray-800 text-green-400 shadow" : "text-gray-500"}`,
            children: [
              /* @__PURE__ */ jsxDEV("i", { className: "fas fa-image mr-2" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 141,
                columnNumber: 33
              }),
              " Image"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 137,
            columnNumber: 29
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMode("audio"),
            className: `flex-1 py-2 rounded-md text-sm font-medium transition-all ${mode === "audio" ? "bg-gray-800 text-green-400 shadow" : "text-gray-500"}`,
            children: [
              /* @__PURE__ */ jsxDEV("i", { className: "fas fa-microphone mr-2" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 147,
                columnNumber: 33
              }),
              " Audio"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 143,
            columnNumber: 29
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 136,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          value: prompt,
          onChange: (e) => setPrompt(e.target.value),
          placeholder: mode === "image" ? "Describe the fake reality..." : "What should the voice say?",
          className: "w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 min-h-[100px] resize-none font-mono text-sm"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 153,
          columnNumber: 29
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 152,
        columnNumber: 25
      }),
      (loading || preview) && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 rounded-lg bg-black border border-gray-800 overflow-hidden min-h-[150px] flex items-center justify-center relative", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full loader-spin" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 166,
          columnNumber: 41
        }),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-green-500 font-mono animate-pulse", children: "GENERATING..." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 167,
          columnNumber: 41
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 165,
        columnNumber: 37
      }) : preview ? preview.type === "image" ? /* @__PURE__ */ jsxDEV("img", { src: preview.url, alt: "Preview", className: "w-full h-full object-cover" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 171,
        columnNumber: 41
      }) : /* @__PURE__ */ jsxDEV("audio", { controls: true, src: preview.url, className: "w-full px-4" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 173,
        columnNumber: 41
      }) : null }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 163,
        columnNumber: 29
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3", children: !generatedUrl ? /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleGenerate,
          disabled: !prompt.trim() || loading,
          className: "flex-1 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors font-mono border border-gray-700",
          children: "GENERATE"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 182,
          columnNumber: 33
        }
      ) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleGenerate,
            disabled: loading,
            className: "flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors font-mono border border-gray-700",
            children: "RETRY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 191,
            columnNumber: 37
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handlePost,
            disabled: loading,
            className: "flex-[2] py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-colors font-mono",
            children: "POST_SIGNAL"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 198,
            columnNumber: 37
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 190,
        columnNumber: 33
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 180,
        columnNumber: 25
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 124,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 123,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("style", { children: `
                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            ` }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 212,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 86,
    columnNumber: 9
  });
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 227,
  columnNumber: 13
}));
var stdin_default = App;
export {
  stdin_default as default
};
