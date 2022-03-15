import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Header from '../components/header';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://goxpres.com/">
        goxpres
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100%",
        }
      }
    }
  }
});


const style = {
  width: 600,
  p: 2,
  px: 4,
  pb: 3,
  alignItems: "center",
};


export default function Order() {
  const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
      service: 'sts',
      weight: '',
      schedule: 'sdd',
      severity: '',
      text: '',
      type: 'cod',
      category: ''
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (data.get('name') && data.get('sname') && data.get('dropoff')
       && data.get('rname') && data.get('rnumber') && data.get('pickup')) {
  
        axios.post('http://localhost/gxpres/order', {
          email: data.get('email'),
          password: data.get('password'),
        })
        .then(function (response) {
          if (response.data.details[0] != false) {
            setValues({
              ...values,
              text: "Order place successfully.", 
              severity: "error",
            });

            setOpen(true);

          } else {
            setValues({
              ...values,
              text: "An error occurred, please try again.", 
              severity: "error",
            });

            setOpen(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  
      } else {
        setValues({
          ...values,
          text: "Enter all required fields", 
          severity: "error",
        });
        setOpen(true);
      }
    };
  
    
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header page = "Package Details"/>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
          <Collapse in={open}>
            <Alert
              variant="filled" 
              severity={values.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 1 }}
            >
              {values.text}
            </Alert>
          </Collapse>
            <h2 id="unstyled-modal-title">Enter package details</h2>
            <Divider />
            <FormControl fullWidth sx={{mt: 2}}>
                <InputLabel id="demo-simple-select-label">Delivery service</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.service}
                    label="Delivery service"
                    onChange={handleChange("service")}
                >
                    <MenuItem value={"sts"}>Station to Station</MenuItem>
                    <MenuItem value={"std"}>Station to Doorstep</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt: 2, mb: 2}}>
                <InputLabel id="demo-simple-select-label">Delivery schedule</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.schedule}
                    label="Delivery schedule"
                    onChange={handleChange("schedule")}
                >
                    <MenuItem value={"sdd"}>Same day delivery</MenuItem>
                    <MenuItem value={"ndd"}>Next day delivery</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h6" gutterBottom>Sender Details</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Sender / Business name"
                name="name"
                autoComplete="name"
                />
            <TextField
                margin="normal"
                required
                fullWidth
                id="snumber"
                label="Phone Number"
                name="snumber"
                autoComplete="snumber"
                />
            <TextField
                margin="normal"
                required
                fullWidth
                id="dropoff"
                label="Dropoff Point"
                name="dropoff"
                autoComplete="dropoff"
                />
            <FormControl fullWidth sx={{mt: 2, mb: 2}}>
                <InputLabel id="demo-simple-select-label">Product category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.category}
                    label="Product category"
                    onChange={handleChange("category")}
                >
                    <MenuItem value={"sdd"}>Same day delivery</MenuItem>
                    <MenuItem value={"ndd"}>Next day delivery</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h6" gutterBottom>Receiver Details</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="rname"
                label="Receiver / Business name"
                name="rname"
                autoComplete="rname"
                />
            <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="number"
                autoComplete="number"
                />
            <TextField
                margin="normal"
                required
                fullWidth
                id="pickup"
                label="Pickup Point"
                name="pickup"
                autoComplete="pickup"
                />
            <Typography variant="h6" gutterBottom>Payment Details</Typography>
            <FormControl fullWidth sx={{mt: 1, mb: 2}}>
                <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.type}
                    label="Payment Type"
                    onChange={handleChange("type")}
                >
                    <MenuItem value={"cod"}>Cash on delivery</MenuItem>
                    <MenuItem value={"cbd"}>Cash before delivery</MenuItem>
                </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#3399ff'}}
            >
              Submit
            </Button>
          </Box>       
      </Grid>   
        

      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
        <Divider>
          <Chip label="GoXpres" color="primary"/>
        </Divider>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p" sx = {{mt: 1 }}>Moving the easy way!</Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

