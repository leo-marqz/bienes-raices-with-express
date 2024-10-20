/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    // @13.6809339,-89.2685604,19.25z?entry=ttu&\n    //@13.7015116,-89.2241931,19z\n    const lat = document.querySelector('#latitude').value || 13.7015116;\n    const lng = document.querySelector('#longitude').value || -89.2241931;\n    const maps = L.map('maps').setView([lat, lng ], 14);\n\n    let marker;\n\n    // Geocoding service from Esri Leaflet plugin to get the address from the coordinates\n    const geocoderService = L.esri.Geocoding.geocodeService();\n    \n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(maps);\n\n    // Add marker\n    marker = L.marker([lat, lng], {\n        draggable: true, // Allow the marker to be dragged\n        autoPan: true // Automatically pan the map to the marker's location\n    }).addTo(maps); // Add the marker to the map\n\n    marker.on('moveend', function(e){\n        const position = marker.getLatLng();\n        maps.panTo( new L.LatLng(position.lat, position.lng) );\n\n        // get information from street and city\n        geocoderService.reverse().latlng(position, 14).run( function(error, result){\n            marker.bindPopup( result.address.Match_addr ).openPopup();\n\n            document.querySelector('.street').textContent = result?.address?.Address ?? '';\n\n            document.querySelector('#street').value = result?.address?.Address ?? '---';\n            document.querySelector('#latitude').value = result?.latlng.lat ?? '';\n            document.querySelector('#longitude').value = result?.latlng.lng ?? '';\n        } );\n    });\n\n})()\n\n\n//# sourceURL=webpack://bienes_raices/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;