import React from "react";
import {useState, useEffect} from "react";
import {getArts} from "./requests/get-arts";
import ArtCard from "../components/art-card";
import {getUserId} from './requests/userLogginStatus';
import {useHistory} from "react-router-dom"
import { Container, Grid } from "@mui/material";


function GalleryPage(props){
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState();
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        const userId = getUserId();
        if(userId === 'not found'){
            history.push('/')
        }else {
            setUserId(userId)
            getArts(setArts, setLoading, setError)
        }
    }, [])

    return(
        <div>
        { loading && arts.length !==0 ?
        <div>
        witing for loading to finish
        </div>
        :
       <div>
       <Grid container style={{margin: "50px"}}>
       {arts.map((art) => {
           return(
           <Grid item xs={4} style={{padding: "10px"}}>
                    <ArtCard userId={userId} pieceId={art.id_art} url_link={art.url_link} title={art.title} description={art.description} author={art.author}/>
           </Grid>
       )})

       }
       </Grid>
       </div>
        }
        </div>
    )
}
export default GalleryPage;
