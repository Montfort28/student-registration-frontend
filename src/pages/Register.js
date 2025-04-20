// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Grid, 
  CircularProgress, 
  Alert,
  Fade,
  Avatar,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language].register;

  // Calculate date ranges for date of birth validation (10-20 years old)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate())
    .toISOString().split('T')[0];
  const minDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate())
    .toISOString().split('T')[0];

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t.validation.firstNameRequired),
      lastName: Yup.string().required(t.validation.lastNameRequired),
      email: Yup.string().email(t.validation.invalidEmail).required(t.validation.emailRequired),
      password: Yup.string()
        .min(8, t.validation.passwordMinLength)
        .required(t.validation.passwordRequired),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t.validation.passwordsMustMatch)
        .required(t.validation.confirmPasswordRequired),
      dateOfBirth: Yup.date()
        .max(maxDate, t.validation.minAge)
        .min(minDate, t.validation.maxAge)
        .required(t.validation.dobRequired),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError('');
        setSuccess('');
        
        // Remove confirmPassword as it's not needed in the backend
        const { confirmPassword, ...registerData } = values;
        
        await authService.register(registerData);
        setSuccess(t.success.registrationComplete);
        resetForm();
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setError(error.response?.data?.message || t.errors.registrationFailed);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNextStep = () => {
    // Validate fields for the current step
    if (activeStep === 0) {
      const personalInfoErrors = {};
      if (!formik.values.firstName) personalInfoErrors.firstName = t.validation.required;
      if (!formik.values.lastName) personalInfoErrors.lastName = t.validation.required;
      if (!formik.values.dateOfBirth) personalInfoErrors.dateOfBirth = t.validation.required;
      
      // Set touched for the fields in current step
      formik.setTouched({
        firstName: true,
        lastName: true,
        dateOfBirth: true
      });
      
      // Check if there are errors for the current step
      if (formik.errors.firstName || formik.errors.lastName || formik.errors.dateOfBirth) {
        return;
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Get step labels from translations
  const steps = [t.stepper.personalInfo, t.stepper.accountSetup];

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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" align="center" fontWeight="bold" color="primary">
              {t.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              {t.subtitle}
            </Typography>
          </Box>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Fade in={error !== ''}>
              <Alert severity="error" sx={{ mb: 3, boxShadow: 1 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </Fade>
          )}
          
          {success && (
            <Fade in={success !== ''}>
              <Alert severity="success" sx={{ mb: 3, boxShadow: 1 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            </Fade>
          )}
          
          <form onSubmit={formik.handleSubmit}>
            {activeStep === 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label={t.form.firstNameLabel}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label={t.form.lastNameLabel}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label={t.form.dobLabel}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ 
                      min: minDate,
                      max: maxDate 
                    }}
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextStep}
                    size="large"
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
                    {t.buttons.next}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label={t.form.emailLabel}
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label={t.form.passwordLabel}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label={t.form.confirmPasswordLabel}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBackStep}
                      size="large"
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 2,
                      }}
                    >
                      {t.buttons.back}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={formik.isSubmitting}
                      size="large"
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
                      {formik.isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        t.buttons.register
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </form>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: 3
          }}>
            <Typography variant="body1" color="text.secondary">
              {t.haveAccount}{' '}
              <Link to="/login" style={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold'
              }}>
                {t.loginLink}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;