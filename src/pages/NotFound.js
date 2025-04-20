// frontend/src/pages/NotFound.js
import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Grid,
  Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 2,
            background: 'linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'error.main', 
                width: 80, 
                height: 80,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 50 }} />
            </Avatar>
          </Box>
          
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'error.main',
              letterSpacing: '.1em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary',
              mb: 3 
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 500, 
              mx: 'auto', 
              mb: 4,
              fontSize: '1.1rem' 
            }}
          >
            The page you are looking for does not exist or has been moved.
            Please check the URL or navigate back to the home page.
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                color="primary"
                component={Link} 
                to="/"
                size="large"
                startIcon={<HomeIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                Return to Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;