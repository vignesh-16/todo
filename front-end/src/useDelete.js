const useDelete = (host) => {

    const deleteMethod = (params)=> {
        let endpoint = host+'/'
        let serverResponse = [];
        console.log('Params and host for delete request: ',params, endpoint);
        try {
            params.forEach(async(task)=>{
                let url = endpoint+task._id;
                console.log('Delete url: ',url)
                let result = await fetch(url,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                serverResponse.push(result)
            })
            return { isSuccess : true, serverResponse: serverResponse }
        } catch (err) {
            console.log('Error while performing DELETE call: ',err);
            return err;
        }
    }

    return deleteMethod;
}
 
export default useDelete;