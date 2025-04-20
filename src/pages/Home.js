// frontend/src/pages/Home.js
import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SchoolIcon from '@mui/icons-material/School';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SecurityIcon from '@mui/icons-material/Security';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

// Custom styled components
const HeroButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  borderRadius: '30px',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
}));

const Home = () => {
  const { currentUser } = useAuth();
  const { language, translations } = useLanguage();
  const t = translations[language].home;

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #64b5f6 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, #ffffff 10%, transparent 10.5%), radial-gradient(circle, #ffffff 10%, transparent 10.5%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Hero Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {t.hero.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    mb: 3
                  }}
                >
                  {t.hero.headline}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    maxWidth: '600px',
                    opacity: 0.9 
                  }}
                >
                  {t.hero.description}
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {!currentUser ? (
                    <>
                      <HeroButton
                        component={Link}
                        to="/register"
                        variant="contained"
                        size="large"
                        sx={{ 
                          bgcolor: 'white', 
                          color: 'primary.main', 
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                      >
                        {t.hero.registerNow}
                      </HeroButton>
                      <HeroButton
                        component={Link}
                        to="/login"
                        variant="outlined"
                        size="large"
                        sx={{ 
                          color: 'white', 
                          borderColor: 'white',
                          '&:hover': { 
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        {t.hero.signIn}
                      </HeroButton>
                    </>
                  ) : (
                    <>
                      <HeroButton
                        component={Link}
                        to="/profile"
                        variant="contained"
                        size="large"
                        sx={{ 
                          bgcolor: 'white', 
                          color: 'primary.main', 
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                      >
                        {t.hero.myProfile}
                      </HeroButton>
                      {currentUser.role === 'admin' && (
                        <HeroButton
                          component={Link}
                          to="/admin/dashboard"
                          variant="outlined"
                          size="large"
                          sx={{ 
                            color: 'white', 
                            borderColor: 'white',
                            '&:hover': { 
                              borderColor: 'white',
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          {t.hero.adminDashboard}
                        </HeroButton>
                      )}
                    </>
                  )}
                </Stack>
              </Box>
            </Grid>
            
            {/* Hero Image */}
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    width: '80%',
                    height: '320px',
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'white',
                    color: 'text.primary',
                    transform: 'rotate(-5deg)',
                    transformOrigin: 'center',
                    position: 'absolute',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                      Student Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 2 }}>S</Avatar>
                      <Typography>Student Name</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Registration Number</Typography>
                        <Typography variant="body2" fontWeight="bold">STU2025001</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
                        <Typography variant="body2">January 15, 2005</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
                
                <Paper
                  elevation={10}
                  sx={{
                    width: '80%',
                    height: '320px',
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'white',
                    color: 'text.primary',
                    transform: 'rotate(3deg) translateY(-20px)',
                    transformOrigin: 'center',
                    position: 'absolute',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" color="secondary" fontWeight="bold" gutterBottom>
                      Admin Panel
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, mr: 2 }}>A</Avatar>
                      <Typography>Admin User</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" sx={{ mb: 1 }}>Users Overview</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">42</Typography>
                        <Typography variant="caption" color="text.secondary">Students</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="secondary" fontWeight="bold">3</Typography>
                        <Typography variant="caption" color="text.secondary">Admins</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -8 }, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                <IconWrapper>
                  <HowToRegIcon sx={{ fontSize: 40 }} />
                </IconWrapper>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  {t.features.easyRegistration.title}
                </Typography>
                <Typography color="text.secondary">
                  {t.features.easyRegistration.description}
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                <IconWrapper>
                  <SecurityIcon sx={{ fontSize: 40 }} />
                </IconWrapper>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  {t.features.secureAccess.title}
                </Typography>
                <Typography color="text.secondary">
                  {t.features.secureAccess.description}
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                <IconWrapper>
                  <SpeedIcon sx={{ fontSize: 40 }} />
                </IconWrapper>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  {t.features.fastPerformance.title}
                </Typography>
                <Typography color="text.secondary">
                  {t.features.fastPerformance.description}
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
      
      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            {t.benefits.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            {t.benefits.description}
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t.benefits.profileManagement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.benefits.profileManagement.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                <BarChartIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t.benefits.adminAnalytics.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.benefits.adminAnalytics.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                <SupportIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t.benefits.support.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.benefits.support.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.dark', 
          color: 'white',
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: 'linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff)',
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
          }}
        />
        
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {t.cta.title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              {t.cta.description}
            </Typography>
            
            {!currentUser ? (
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.dark', 
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                {t.cta.getStarted}
              </Button>
            ) : (
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.dark', 
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                {t.cta.goToProfile}
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;