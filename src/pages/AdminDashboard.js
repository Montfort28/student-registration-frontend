import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  CircularProgress,
  Pagination,
  Alert,
  Avatar,
  Chip,
  Tooltip,
  Fade,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from 'react-qr-code';
import DownloadIcon from '@mui/icons-material/Download';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const AdminDashboard = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].adminDashboard;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Calculate date ranges for date of birth validation (10-20 years old)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      const response = await adminService.getAllUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError(t.errors.fetchFailed);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchUsers(value);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleQrCodeClick = (user) => {
    setSelectedUser(user);
    setOpenQrDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);

    setTimeout(() => {
      setSelectedUser(null);
      editFormik.resetForm();
    }, 100);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    // Reset selected user after dialog closes
    setTimeout(() => {
      setSelectedUser(null);
    }, 100);
  };

  const handleCloseQrDialog = () => {
    setOpenQrDialog(false);
    // Reset selected user after dialog closes
    setTimeout(() => {
      setSelectedUser(null);
    }, 100);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || !selectedUser.id) {
      setError(t.errors.noUserSelected);
      return;
    }
    
    try {
      setDeleteLoading(true);
      await adminService.deleteUser(selectedUser.id);
      setSuccess(t.success.userDeleted.replace('{name}', `${selectedUser.firstName} ${selectedUser.lastName}`));
      
      // Close dialog first before fetching updated users
      setOpenDeleteDialog(false);
      
      // Clear selected user
      setSelectedUser(null);
      
      // Fetch updated user list
      await fetchUsers(currentPage);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(`${t.errors.deleteFailed}: ${error.response?.data?.message || error.message}`);
      setTimeout(() => setError(''), 5000);
    } finally {
      setDeleteLoading(false);
    }
  };

  const editFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      role: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t.validation.firstNameRequired),
      lastName: Yup.string().required(t.validation.lastNameRequired),
      email: Yup.string().email(t.validation.invalidEmail).required(t.validation.emailRequired),
      dateOfBirth: Yup.date()
        .max(maxDate, t.validation.ageTooYoung)
        .min(minDate, t.validation.ageTooOld)
        .required(t.validation.dobRequired),
      role: Yup.string().oneOf(['admin', 'student']).required(t.validation.roleRequired),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!selectedUser || !selectedUser.id) {
        setError(t.errors.noUserSelected);
        setSubmitting(false);
        return;
      }
      
      try {
        setError('');
        await adminService.updateUser(selectedUser.id, values);
        setSuccess(t.success.userUpdated.replace('{name}', `${values.firstName} ${values.lastName}`));
        
        // Close dialog first
        setOpenEditDialog(false);
        
        // Clear selected user and reset form
        setSelectedUser(null);
        resetForm();
        
        // Fetch updated user list
        await fetchUsers(currentPage);
        
        // Clear success message after delay
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError(error.response?.data?.message || t.errors.updateFailed);
        setTimeout(() => setError(''), 5000);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  // Update form values when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      const dateOfBirth = selectedUser.dateOfBirth
        ? new Date(selectedUser.dateOfBirth).toISOString().split('T')[0]
        : '';

      editFormik.setValues({
        firstName: selectedUser.firstName || '',
        lastName: selectedUser.lastName || '',
        email: selectedUser.email || '',
        dateOfBirth,
        role: selectedUser.role || 'student',
      });
    }
  }, [selectedUser]);

  // Format date for display
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

  // Create QR code data for a user
  const generateQrCodeData = (user) => {
    return JSON.stringify({
      id: user.id,
      registrationNumber: user.registrationNumber,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      dateOfBirth: user.dateOfBirth
    });
  };
  const handleDownloadQrCode = () => {
    if (!selectedUser) return;
    
    // Get the SVG element
    const svgElement = document.getElementById('user-qr-code');
    if (!svgElement) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set dimensions
    const svgRect = svgElement.getBoundingClientRect();
    canvas.width = svgRect.width;
    canvas.height = svgRect.height;
    
    // Create an image from the SVG
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      // Draw the image on the canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Convert to PNG and download
      const fileName = `qrcode-${selectedUser.registrationNumber}.png`;
      
      // For modern browsers
      if (canvas.toBlob) {
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }, 'image/png');
      } else {
        // Fallback for older browsers
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataURL;
        link.click();
      }
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <Container maxWidth="lg">
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
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <SupervisorAccountIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                {t.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {t.subtitle}
              </Typography>
            </Box>
          </Box>

          {error && (
            <Fade in={error !== ''}>
              <Alert severity="error" sx={{ mb: 2, boxShadow: 1 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </Fade>
          )}

          {success && (
            <Fade in={success !== ''}>
              <Alert severity="success" sx={{ mb: 2, boxShadow: 1 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            </Fade>
          )}

          <TableContainer
            component={Paper}
            sx={{
              mt: 3,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.user}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.email}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.registrationNumber}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.dateOfBirth}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.role}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t.tableHeaders.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">{t.noUsersFound}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: user.role === 'admin' ? 'secondary.main' : 'primary.main',
                              width: 36,
                              height: 36
                            }}
                          >
                            {getInitials(user.firstName, user.lastName)}
                          </Avatar>
                          <Typography variant="body1">
                            {`${user.firstName} ${user.lastName}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                          {user.registrationNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(user.dateOfBirth)}</TableCell>
                      <TableCell>
                        <Chip
                          icon={user.role === 'admin' ? <SupervisorAccountIcon /> : <PersonIcon />}
                          label={t.roles[user.role]}
                          size="small"
                          color={user.role === 'admin' ? 'secondary' : 'primary'}
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={t.tooltips?.qrCode || "View QR Code"}>
                          <IconButton
                            onClick={() => handleQrCodeClick(user)}
                            size="small"
                            sx={{
                              mr: 1,
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                              },
                            }}
                          >
                            <QrCodeIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t.tooltips.editUser}>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(user)}
                            size="small"
                            sx={{
                              mr: 1,
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t.tooltips.deleteUser}>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(user)}
                            size="small"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(211, 47, 47, 0.04)',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  '&.Mui-selected': {
                    fontWeight: 'bold',
                  },
                },
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* QR Code Dialog */}
      <Dialog
        open={openQrDialog}
        onClose={handleCloseQrDialog}
        maxWidth="sm"
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', py: 2, display: 'flex', alignItems: 'center' }}>
          <QrCodeIcon sx={{ mr: 1 }} />
          {t.qrDialog?.title || "User QR Code"}
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {selectedUser && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: selectedUser.role === 'admin' ? 'secondary.main' : 'primary.main',
                    width: 56,
                    height: 56
                  }}
                >
                  {getInitials(selectedUser.firstName, selectedUser.lastName)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.registrationNumber}
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  p: 3, 
                  bgcolor: 'white', 
                  borderRadius: 2, 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                  mb: 2 
                }}
              >
                <QRCode 
                  id="user-qr-code"
                  value={generateQrCodeData(selectedUser)} 
                  size={200}
                  level="H"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" align="center">
                {t.qrDialog?.scanInstruction || "Scan this QR code to view user information"}
              </Typography>
              
              
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, display: 'flex', justifyContent: 'space-between' }}>
    <Button 
      onClick={handleDownloadQrCode}
      variant="outlined" 
      color="primary"
      startIcon={<DownloadIcon />}
      sx={{ borderRadius: 2, px: 3 }}
    >
      {t.qrDialog?.downloadButton || "Download QR Code"}
    </Button>
    <Button 
      onClick={handleCloseQrDialog} 
      variant="contained" 
      color="primary"
      sx={{ borderRadius: 2, px: 3 }}
    >
      {t.qrDialog?.closeButton || "Close"}
    </Button>
  </DialogActions>
</Dialog>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseQrDialog} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 2, px: 3 }}
          >
            {t.qrDialog?.closeButton || "Close"}
          </Button>
        </DialogActions>
      

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', py: 2, display: 'flex', alignItems: 'center' }}>
          <EditIcon sx={{ mr: 1 }} />
          {t.editDialog?.title || "Edit User"}
        </DialogTitle>
        <form onSubmit={editFormik.handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label={t.editDialog?.firstName || "First Name"}
                  value={editFormik.values.firstName}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.firstName && Boolean(editFormik.errors.firstName)}
                  helperText={editFormik.touched.firstName && editFormik.errors.firstName}
                  variant="outlined"
                  sx={{ mb: { xs: 0, sm: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label={t.editDialog?.lastName || "Last Name"}
                  value={editFormik.values.lastName}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.lastName && Boolean(editFormik.errors.lastName)}
                  helperText={editFormik.touched.lastName && editFormik.errors.lastName}
                  variant="outlined"
                  sx={{ mb: { xs: 0, sm: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t.editDialog?.email || "Email"}
                  value={editFormik.values.email}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.email && Boolean(editFormik.errors.email)}
                  helperText={editFormik.touched.email && editFormik.errors.email}
                  variant="outlined"
                  sx={{ mb: { xs: 0, sm: 2 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label={t.editDialog?.dateOfBirth || "Date of Birth"}
                  type="date"
                  value={editFormik.values.dateOfBirth}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.dateOfBirth && Boolean(editFormik.errors.dateOfBirth)}
                  helperText={editFormik.touched.dateOfBirth && editFormik.errors.dateOfBirth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  sx={{ mb: { xs: 0, sm: 2 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="role"
                  name="role"
                  select
                  label={t.editDialog?.role || "Role"}
                  value={editFormik.values.role}
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                  error={editFormik.touched.role && Boolean(editFormik.errors.role)}
                  helperText={editFormik.touched.role && editFormik.errors.role}
                  variant="outlined"
                >
                  <MenuItem value="student">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t.roles?.student || "Student"}
                    </Box>
                  </MenuItem>
                  <MenuItem value="admin">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SupervisorAccountIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t.roles?.admin || "Administrator"}
                    </Box>
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleCloseEditDialog} 
              variant="outlined"
              sx={{ borderRadius: 2, px: 3 }}
            >
              {t.editDialog?.cancelButton || "Cancel"}
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={editFormik.isSubmitting}
              sx={{ borderRadius: 2, px: 3, ml: 2 }}
            >
              {editFormik.isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                t.editDialog?.saveButton || "Save Changes"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', py: 2, display: 'flex', alignItems: 'center' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          {t.deleteDialog?.title || "Delete User"}
        </DialogTitle>
        <DialogContent sx={{ pt: 4, pb: 2 }}>
          <DialogContentText>
            {selectedUser && t.deleteDialog?.confirmMessage?.replace('{name}', `${selectedUser.firstName} ${selectedUser.lastName}`) || 
              "Are you sure you want to delete this user? This action cannot be undone."}
          </DialogContentText>
          {selectedUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Avatar
                sx={{
                  mr: 2,
                  bgcolor: selectedUser.role === 'admin' ? 'secondary.main' : 'primary.main',
                  width: 40,
                  height: 40
                }}
              >
                {getInitials(selectedUser.firstName, selectedUser.lastName)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {`${selectedUser.firstName} ${selectedUser.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.email} • {selectedUser.registrationNumber}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            {t.deleteDialog?.cancelButton || "Cancel"}
          </Button>
          <Button 
            onClick={handleDeleteUser} 
            variant="contained" 
            color="error"
            disabled={deleteLoading}
            sx={{ borderRadius: 2, px: 3, ml: 2 }}
          >
            {deleteLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t.deleteDialog?.deleteButton || "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;