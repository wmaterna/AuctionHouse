import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import BetModal from "./bet-modal";
import {getPrice} from "../screens/requests/get-price";

export default function ArtCard(props) {

    const [openModal, setModalOpen] = useState(false);
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [priceModal, setPriceModal] = useState(false);
    const [winner, setWinner] = useState(false);
    const handlePriceModal = () => {
      getPrice(setPrice, props.userId, props.pieceId, setLoading, setError, setWinner)
      setPriceModal(true)
    }


    useEffect(() => {
      if(!priceModal){
        setWinner(false);
      }
    },[priceModal])



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return (
      <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.url_link}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setModalOpen(true)}>{props.myBets ? <span>Bet Again</span> : <span>Bet</span>}</Button>
        {props.myBets && 
          <Button size="small" onClick={handlePriceModal}>See your best bet price</Button>
        }
      </CardActions>
    </Card>
    <BetModal userId={props.userId} openModal={openModal} setModalOpen={setModalOpen} pieceId={props.pieceId}/>
    <Modal
        open={priceModal}
        onClose={() => {
          setWinner(false)
          setPriceModal(false)}
          }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <>
        {loading ? 
          <Box>
          <div>Loading .... </div>
        </Box> 
        : 
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            {winner ? <span>You are winning this bet! Congrats!</span> :
            <span>Sorry somone had better bet</span>}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Your best bet price
            </Typography>
            {error && 
            <Typography variant="body2" color="text.secondary">
                {error}
            </Typography>}
          { price !== "" &&
                <span>{price} $</span>
          }  
        </Box>
        }
        </>
</Modal>
    </div>
  );
}