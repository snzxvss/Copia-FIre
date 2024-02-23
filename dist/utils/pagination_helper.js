"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (filters) => {
    const { array, page = 2, quantity = 5 } = filters;
    const startIndex = (page - 1) * quantity;
    const endIndex = startIndex + quantity;
    const itemsToDisplay = array.slice(startIndex, endIndex);
    const totalPageCount = Math.ceil(array.length / quantity);
    const registerCount = array.length;
    return { itemsToDisplay, totalPageCount, registerCount };
};
exports.pagination = pagination;
// const myArray = [   1, 2, 3,
//                     4, 5, 6,
//                     7, 8, 9,
//                     10];
// const currentPage = 3;
// const itemsPerPage = 3;
// const filteredItems = pagination({ array: myArray, page: currentPage, quantity: itemsPerPage });
// console.log(filteredItems); // Output: [9, 10]
//# sourceMappingURL=pagination_helper.js.map