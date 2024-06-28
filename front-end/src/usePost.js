const usePost = (url) => {

    const postMethod = async (params)=>{
        console.log('%c Info: Server params: ','color: blue; font-size: 15px',params);
        let result = {};
        try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
            }); 
            result = await response.json();
            console.log('Here is the result: ',result);
            return result;
        } catch (err) {
            console.error('%c Error: could not complete post call: ','color: red; font-size: 10px',err)
            return err
        }
    }
    return postMethod;
}
 
export default usePost;