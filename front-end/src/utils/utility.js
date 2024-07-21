/**
 * Compares to string values and returns true or false
 * @param {String} value1 
 * @param {String} value2 
 * @returns {Boolean}
 */
const checkBothString = (value1, value2)=> {
    let caseNeutralized = value1.trim().replace(/[\s]/,'').toLowerCase();
    let caseNeutralized2 = value2.trim().replace(/[\s]/,'').toLowerCase();
    return caseNeutralized === caseNeutralized2;
};

export { checkBothString };