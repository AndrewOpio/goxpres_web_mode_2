import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/header';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles'
import Draggable from 'react-draggable';
import bg from '../res/bg.jpg'; 

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
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


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      height: "110%",
      backgroundImage: 'url(' + bg +')', 
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'}}
      >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header page = "Home"/>
        <main>
          {/* Hero unit */}
          <Box sx={{ pt: 8, pb: 8.8,}}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="white" gutterBottom>
                  Hello, How can we help you?
              </Typography>
              <Typography variant="h6" align="center" color="white" paragraph>
                Something short and leading about the collection below—its contents,
                the creator, etc. Make it short and sweet, but not too short so folks
                don&apos;t simply skip over it entirely.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" sx={{bgcolor: '#3399ff'}} onClick={() => navigate("/order")}>Send a package</Button>
                <Button variant="contained" sx={{bgcolor: 'orange'}} onClick={handleClickOpen}>Track a package</Button>
              </Stack>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  Package Details
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Package ID"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Box>
        </main>
        {/* Footer */}
        <Box sx={{ p: 6 }} component="footer">
          <Divider 
           sx={{
            "&::before, &::after": {
              borderColor: "#ffffff",
            },
          }}>
             <Chip label="GoXpres" color="primary"/>
          </Divider>
          <Typography variant="subtitle1" align="center" color="white" component="p" sx = {{mt: 1 }}>Moving the easy way!</Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </Box>
  );
}

