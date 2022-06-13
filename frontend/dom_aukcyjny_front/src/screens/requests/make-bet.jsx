import {getUserToken} from "./userLogginStatus";
export const makeBet = (userId, pieceId, price, setStatus, setLoading, setError) =>{
    setLoading(true);
    const token = getUserToken();
    fetch(
        `/api/make-bet`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                user: userId,
                piece: pieceId,
                price: price
            })
        }
    )
    .then((response) => {
        const data = response.json();
        const res = response.status;
        return Promise.all([res, data])
    })
    .then(([res, data]) => {
        if( res === 200){
            if(data.message == "success"){
                setStatus(true);
            }else {
                setError("Your bet was too low")
            }
            
        } else {
            setError("Your bet was too low, you can try higher")
        }
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        setLoading(false);
    })
}