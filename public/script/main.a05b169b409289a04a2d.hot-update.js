"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateblog"]("main",{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var octokit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! octokit */ \"./node_modules/octokit/dist-bundle/index.js\");\n\nconst mobileTagIcon = document.querySelector(\".mobile-menu\");\nconst backdrop = document.querySelector(\".backdrop\");\nconst toggleMobileMenu = () => {\n  const tagContainer = document.querySelector(\".tag-container\");\n  tagContainer.classList.toggle(\"display-tag\");\n  backdrop.classList.toggle(\"display-block\");\n  mobileTagIcon.classList.toggle(\"open\");\n};\nmobileTagIcon.addEventListener(\"click\", toggleMobileMenu);\nbackdrop.addEventListener(\"click\", toggleMobileMenu);\nconst octokit = new octokit__WEBPACK_IMPORTED_MODULE_0__.Octokit({\n  auth: \"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\"\n});\noctokit.request(\"GET /repos/{owner}/{repo}/contents/{path}\", {\n  owner: \"eanby00\",\n  repo: \"blog\",\n  path: \"public\",\n  headers: {\n    \"X-GitHub-Api-Version\": \"2022-11-28\"\n  }\n}).then(response => {\n  console.log(response);\n});\n\n// octokit\n//   .request(\"GET /repos/{owner}/{repo}/git/trees/{tree_sha}\", {\n//     owner: \"eanby00\",\n//     repo: \"blog\",\n//     tree_sha: \"main\",\n//     headers: {\n//       \"X-GitHub-Api-Version\": \"2022-11-28\",\n//     },\n//   })\n//   .then((response) => {\n//     console.log(response);\n//   });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzIiwibWFwcGluZ3MiOiI7O0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2cvLi9zcmMvYXBwLmpzPzExMTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2N0b2tpdCB9IGZyb20gXCJvY3Rva2l0XCI7XHJcblxyXG5jb25zdCBtb2JpbGVUYWdJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2JpbGUtbWVudVwiKTtcclxuY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tkcm9wXCIpO1xyXG5cclxuY29uc3QgdG9nZ2xlTW9iaWxlTWVudSA9ICgpID0+IHtcclxuICBjb25zdCB0YWdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhZy1jb250YWluZXJcIik7XHJcblxyXG4gIHRhZ0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheS10YWdcIik7XHJcbiAgYmFja2Ryb3AuY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXktYmxvY2tcIik7XHJcbiAgbW9iaWxlVGFnSWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwib3BlblwiKTtcclxufTtcclxuXHJcbm1vYmlsZVRhZ0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vYmlsZU1lbnUpO1xyXG5iYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9iaWxlTWVudSk7XHJcblxyXG5jb25zdCBvY3Rva2l0ID0gbmV3IE9jdG9raXQoe1xyXG4gIGF1dGg6IEFQSV9LRVksXHJcbn0pO1xyXG5cclxub2N0b2tpdFxyXG4gIC5yZXF1ZXN0KFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9jb250ZW50cy97cGF0aH1cIiwge1xyXG4gICAgb3duZXI6IFwiZWFuYnkwMFwiLFxyXG4gICAgcmVwbzogXCJibG9nXCIsXHJcbiAgICBwYXRoOiBcInB1YmxpY1wiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIlgtR2l0SHViLUFwaS1WZXJzaW9uXCI6IFwiMjAyMi0xMS0yOFwiLFxyXG4gICAgfSxcclxuICB9KVxyXG4gIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gIH0pO1xyXG5cclxuLy8gb2N0b2tpdFxyXG4vLyAgIC5yZXF1ZXN0KFwiR0VUIC9yZXBvcy97b3duZXJ9L3tyZXBvfS9naXQvdHJlZXMve3RyZWVfc2hhfVwiLCB7XHJcbi8vICAgICBvd25lcjogXCJlYW5ieTAwXCIsXHJcbi8vICAgICByZXBvOiBcImJsb2dcIixcclxuLy8gICAgIHRyZWVfc2hhOiBcIm1haW5cIixcclxuLy8gICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgXCJYLUdpdEh1Yi1BcGktVmVyc2lvblwiOiBcIjIwMjItMTEtMjhcIixcclxuLy8gICAgIH0sXHJcbi8vICAgfSlcclxuLy8gICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuLy8gICB9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "722a7e741171b275491f"; }
/******/ }();
/******/ 
/******/ }
);