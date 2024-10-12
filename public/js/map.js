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

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    // @13.6809339,-89.2685604,19.25z?entry=ttu&\r\n    //@13.7015116,-89.2241931,19z\r\n    const lat = 13.7015116;\r\n    const lng = -89.2241931;\r\n    const maps = L.map('maps').setView([lat, lng ], 14);\r\n\r\n    let marker;\r\n\r\n    // Geocoding service from Esri Leaflet plugin to get the address from the coordinates\r\n    const geocoderService = L.esri.Geocoding.geocodeService();\r\n    \r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(maps);\r\n\r\n    // Add marker\r\n    marker = L.marker([lat, lng], {\r\n        draggable: true, // Allow the marker to be dragged\r\n        autoPan: true // Automatically pan the map to the marker's location\r\n    }).addTo(maps); // Add the marker to the map\r\n\r\n    marker.on('moveend', function(e){\r\n        const position = marker.getLatLng();\r\n        maps.panTo( new L.LatLng(position.lat, position.lng) );\r\n\r\n        // get information from street and city\r\n        geocoderService.reverse().latlng(position, 14).run( function(error, result){\r\n            marker.bindPopup( result.address.Match_addr ).openPopup();\r\n\r\n            document.querySelector('.street').textContent = result?.address?.Address ?? '';\r\n\r\n            document.querySelector('#street').value = result?.address?.Address ?? '';\r\n            document.querySelector('#latitude').value = result?.latlng.lat ?? '';\r\n            document.querySelector('#longitude').value = result?.latlng.lng ?? '';\r\n        } );\r\n    });\r\n\r\n})()\r\n\n\n//# sourceURL=webpack://bienes_raices/./src/js/map.js?");

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