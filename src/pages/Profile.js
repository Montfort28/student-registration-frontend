// frontend/src/pages/Profile.js
import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EventIcon from '@mui/icons-material/Event';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const { language, translations } = useLanguage();
  const t = translations[language].profile;
  
  if (!currentUser) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h5">{t.loading}</Typography>
        </Box>
      </Container>
    );
  }

  // Format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const isAdmin = currentUser.role === 'admin';

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'center',
              mb: { xs: 2, sm: 0 }
            }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: isAdmin ? 'secondary.main' : 'primary.main',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  mr: { xs: 0, sm: 3 },
                  mb: { xs: 2, sm: 0 }
                }}
              >
                {getInitials(currentUser.firstName, currentUser.lastName)}
              </Avatar>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {`${currentUser.firstName} ${currentUser.lastName}`}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={isAdmin ? <SupervisorAccountIcon /> : <PersonIcon />}
              label={t.roles[currentUser.role]}
              size="medium"
              color={isAdmin ? 'secondary' : 'primary'}
              variant="filled"
              sx={{ 
                textTransform: 'capitalize', 
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 1
              }}
            />
          </Box>
          
          <Card 
            variant="outlined" 
            sx={{ 
              mb: 4, 
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              bgcolor: 'primary.main', 
              py: 1.5, 
              px: 3
            }}>
              <Typography variant="h6" color="white" fontWeight="bold">
                {t.personalInfo.title}
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.personalInfo.firstName}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {currentUser.firstName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.personalInfo.lastName}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {currentUser.lastName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.personalInfo.email}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {currentUser.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CakeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.personalInfo.dateOfBirth}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {formatDate(currentUser.dateOfBirth)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card 
            variant="outlined" 
            sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', py: 1.5, px: 3 }}>
              <Typography variant="h6" color="white" fontWeight="bold">
                {t.academicInfo.title}
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ConfirmationNumberIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.academicInfo.registrationNumber}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      ml: 4, 
                      fontFamily: 'monospace', 
                      fontWeight: 'bold',
                      bgcolor: 'grey.100',
                      display: 'inline-block',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1
                    }}
                  >
                    {currentUser.registrationNumber}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SupervisorAccountIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.academicInfo.role}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4, textTransform: 'capitalize' }}>
                    {t.roles[currentUser.role]}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      {t.academicInfo.registrationDate}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {currentUser.createdAt ? formatDate(currentUser.createdAt) : t.academicInfo.notAvailable}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;