/**
 * Function converts App Data Filter Objec to 
 * API based Query String parameters
 * @params DTFilter filterObject
 * Format of DTFilter Filter Object is shown below:
 * {
 *      page: 1 Page Number
        pageSize: Size of page
        sortBy: [],["createdAt", "DESC"] Data should be pushed on this format
        filterBy: [{ key: fieldname, operator: operator value, value: Filter value}]

        Note: value can be an array as well for data range picker which is common filter compnent set as default.
 * }
 */
export const convertAppFilterObjectToDefaultApi = (filterObject) => {
    let queryString = "";
    return queryString;
};
/**
 * displayText wraps confidential user data information
 * and mark/remove value as encrypted
 * @param {*} value
 * @param {*} type
 * @returns
 */
export const displayText = (value, type) => {
    return value;
};
