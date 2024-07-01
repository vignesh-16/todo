const usePut = (url) => {

    const putMethod = async (params) => {
        let result = {};
        try {
            let response = await fetch(url,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            });
            result = response.json();
            return result;
        } catch (err) {
            console.log('Error: while calling put Method to server: ',err);
            result.Err = err;
            return result;
        }
    }

    return putMethod;
}
 
export default usePut;