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

const AddMonthsToDate = (inMonths) => {
    let monthsToAdd = 1 + inMonths;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + monthsToAdd).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;
    console.info('%c max date after adding required months: ','color: maroon', maxDate);
    return maxDate
}

const AddYearsFromToday = (inYears) => {
    const oneYearFromToday = new Date();
    oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);
}

export { 
    checkBothString,
    AddMonthsToDate,
    AddYearsFromToday
};