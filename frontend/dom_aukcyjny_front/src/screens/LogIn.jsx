import React from 'react';
import {useState, useEffect} from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@material-ui/core';
import {logUser} from './requests/log-user';
import {useHistory} from 'react-router-dom'
import {withRouter} from 'react-router';
import Typography from '@mui/material/Typography';

function LogIn(props){
    
 const [checked, setChecked] = React.useState(true);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState(false);
 const [error, setError] = useState("");
 const history = useHistory();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
console.log(error)
  useEffect(() => {
      if(status){
        history.push("/gallery");
      }
  }, [status])

  useEffect(() => {
    setError("")
}, [email, password])

  const handleLogIn = () => {
    logUser(email, password, setStatus, setLoading, setError)
  }

console.log(password, email, status, error)
    return(
       <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
                   {error && 
            <Typography variant="body2" color="text.secondary">
                {error}
            </Typography>}
          <Grid item xs={12}>
            <TextField label="e-mail" onChange={e => setEmail(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" onChange={e => setPassword(e.target.value)} type={'password'}></TextField>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleLogIn} disabled={email=== "" || password === ""}> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
    )
}
export default withRouter(LogIn)