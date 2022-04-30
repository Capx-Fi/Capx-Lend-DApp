export const getFilterValues = (loans, keyName) => {
    let filters = []
    for(let i=0; i<loans.length; i++){
        if(!filters.includes(loans[i][keyName])){
            filters.push(loans[i][keyName])
        }
    }
    return filters;
}