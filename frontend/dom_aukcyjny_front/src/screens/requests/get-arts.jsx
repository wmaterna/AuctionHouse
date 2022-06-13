import {getUserToken} from "./userLogginStatus";
export const getArts = (setArts, setLoading, setError) =>{
    const token = getUserToken();
    console.log(token)
    setLoading(true);
    fetch(
        `/api/arts/bulk_arts`, {
            headers: {
                "x-access-token": token
            },
        }
    )
    .then((response) => {
        const data = response.json();
        const res = response.status;
        return Promise.all([res, data])
    })
    .then(([res, data]) => {
        if( res === 200){
            setArts(data.data)
        } else {
           setError(data.error)
        }
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        setLoading(false);
    })
}