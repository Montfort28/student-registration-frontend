// frontend/src/translations/index.js
const translations = {
    en: {
      navbar: {
        title: 'Student Registration',
        home: 'Home',
        login: 'Login',
        register: 'Register',
        profile: 'Profile',
        adminDashboard: 'Admin Dashboard',
        logout: 'Logout',
        role: 'Role'
      },
      home: {
        hero: {
          title: 'STUDENT REGISTRATION SYSTEM',
          headline: 'Streamline Your Academic Journey',
          description: 'A modern platform designed to make student registration seamless, secure, and efficient.',
          registerNow: 'Register Now',
          signIn: 'Sign In',
          myProfile: 'My Profile',
          adminDashboard: 'Admin Dashboard'
        },
        features: {
          easyRegistration: {
            title: 'Easy Registration',
            description: 'Simple and quick registration process for new students with automatic generation of unique registration numbers.'
          },
          secureAccess: {
            title: 'Secure Access',
            description: 'Advanced security with JWT authentication to ensure your data is protected at all times with role-based permissions.'
          },
          fastPerformance: {
            title: 'Fast Performance',
            description: 'Built with modern technologies for quick response times and seamless user experience without delays.'
          }
        },
        benefits: {
          title: 'Why Choose Our Platform?',
          description: 'Our student registration system is designed to streamline administrative processes and enhance student experience.',
          profileManagement: {
            title: 'Profile Management',
            description: 'Students can easily update their information and track their registration status.'
          },
          adminAnalytics: {
            title: 'Admin Analytics',
            description: 'Administrators can view key metrics and manage user accounts efficiently.'
          },
          support: {
            title: '24/7 Support',
            description: 'Get help whenever you need it with our responsive support system.'
          }
        },
        cta: {
          title: 'Ready to Get Started?',
          description: 'Join thousands of students who have simplified their registration process.',
          getStarted: 'Get Started Now',
          goToProfile: 'Go to My Profile'
        }
      },
      login: {
        title: "Login",
        subtitle: "Sign in to access your account",
        form: {
          emailLabel: "Email Address",
          passwordLabel: "Password",
          signInButton: "Sign In"
        },
        validation: {
          emailRequired: "Email is required",
          invalidEmail: "Invalid email address",
          passwordRequired: "Password is required"
        },
        errors: {
          invalidCredentials: "Invalid email or password"
        },
        noAccount: "Don't have an account?",
        registerLink: "Register here"
      },
      register: {
        title: "Register",
        subtitle: "Create a new account to get started",
        stepper: {
          personalInfo: "Personal Information",
          accountSetup: "Account Setup"
        },
        form: {
          firstNameLabel: "First Name",
          lastNameLabel: "Last Name",
          emailLabel: "Email Address",
          passwordLabel: "Password",
          confirmPasswordLabel: "Confirm Password",
          dobLabel: "Date of Birth"
        },
        validation: {
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required",
          emailRequired: "Email is required",
          invalidEmail: "Invalid email address",
          passwordRequired: "Password is required",
          passwordMinLength: "Password must be at least 8 characters",
          confirmPasswordRequired: "Confirm password is required",
          passwordsMustMatch: "Passwords must match",
          dobRequired: "Date of birth is required",
          minAge: "You must be at least 10 years old",
          maxAge: "You must be at most 20 years old",
          required: "Required"
        },
        buttons: {
          next: "Next",
          back: "Back",
          register: "Register"
        },
        success: {
          registrationComplete: "Registration successful! You can now login."
        },
        errors: {
          registrationFailed: "Registration failed. Please try again."
        },
        haveAccount: "Already have an account?",
        loginLink: "Login here"
      },
      admin: {
        dashboard: {
          title: 'Admin Dashboard',
          subtitle: 'Manage registered users and control access to the system',
          user: 'User',
          email: 'Email',
          registrationNumber: 'Registration #',
          dateOfBirth: 'Date of Birth',
          role: 'Role',
          actions: 'Actions',
          noUsers: 'No users found',
          editUser: 'Edit User',
          deleteUser: 'Delete User',
          cancel: 'Cancel',
          update: 'Update',
          updating: 'Updating...',
          delete: 'Delete',
          deleting: 'Deleting...',
          confirmDelete: 'Are you sure you want to delete',
          deleteWarning: 'This action cannot be undone and all associated user data will be permanently removed.'
        }
      },
      profile: {
        loading: "Loading profile...",
        roles: {
          student: "Student",
          admin: "Admin"
        },
        personalInfo: {
          title: "Personal Information",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          dateOfBirth: "Date of Birth"
        },
        academicInfo: {
          title: "Academic Information",
          registrationNumber: "Registration Number",
          role: "Role",
          registrationDate: "Registration Date",
          notAvailable: "Not Available"
        }
      },
      adminDashboard: {
        title: "Admin Dashboard",
        subtitle: "Manage registered users and control access to the system",
        tableHeaders: {
          user: "User",
          email: "Email",
          registrationNumber: "Registration Number",
          dateOfBirth: "Date of Birth",
          role: "Role",
          actions: "Actions"
        },
        roles: {
          student: "Student",
          admin: "Admin"
        },
        noUsersFound: "No users found.",
        tooltips: {
          editUser: "Edit this user",
          deleteUser: "Delete this user"
        },
        editDialog: {
          title: "Edit User",
          fields: {
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            dateOfBirth: "Date of Birth",
            role: "Role"
          },
          buttons: {
            cancel: "Cancel",
            update: "Update",
            updating: "Updating..."
          }
        },
        deleteDialog: {
          title: "Confirm Deletion",
          confirmMessage: "Are you sure you want to delete {name}? This action cannot be undone.",
          buttons: {
            cancel: "Cancel",
            delete: "Delete",
            deleting: "Deleting..."
          }
        },
        success: {
          userDeleted: "User {name} deleted successfully.",
          userUpdated: "User {name} updated successfully."
        },
        errors: {
          fetchFailed: "Failed to fetch users.",
          noUserSelected: "No user selected.",
          updateFailed: "Failed to update user.",
          deleteFailed: "Failed to delete user"
        },
        validation: {
          firstNameRequired: "First name is required",
          lastNameRequired: "Last name is required",
          emailRequired: "Email is required",
          invalidEmail: "Invalid email address",
          dobRequired: "Date of birth is required",
          ageTooYoung: "User must be at least 10 years old",
          ageTooOld: "User must be at most 20 years old",
          roleRequired: "Role is required"
        }
      }
    },
    fr: {
      navbar: {
        title: 'Inscription des Étudiants',
        home: 'Accueil',
        login: 'Connexion',
        register: 'S\'inscrire',
        profile: 'Profil',
        adminDashboard: 'Tableau de Bord Admin',
        logout: 'Déconnexion',
        role: 'Rôle'
      },
      
      home: {
        hero: {
          title: 'SYSTÈME D\'INSCRIPTION DES ÉTUDIANTS',
          headline: 'Simplifiez Votre Parcours Académique',
          description: 'Une plateforme moderne conçue pour rendre l\'inscription des étudiants simple, sécurisée et efficace.',
          registerNow: 'S\'inscrire Maintenant',
          signIn: 'Se Connecter',
          myProfile: 'Mon Profil',
          adminDashboard: 'Tableau de Bord Admin'
        },
        features: {
          easyRegistration: {
            title: 'Inscription Facile',
            description: 'Processus d\'inscription simple et rapide pour les nouveaux étudiants avec génération automatique de numéros d\'inscription uniques.'
          },
          secureAccess: {
            title: 'Accès Sécurisé',
            description: 'Sécurité avancée avec authentification JWT pour garantir que vos données sont protégées en tout temps avec des permissions basées sur les rôles.'
          },
          fastPerformance: {
            title: 'Performance Rapide',
            description: 'Construit avec des technologies modernes pour des temps de réponse rapides et une expérience utilisateur fluide sans délais.'
          }
        },
        benefits: {
          title: 'Pourquoi Choisir Notre Plateforme?',
          description: 'Notre système d\'inscription des étudiants est conçu pour simplifier les processus administratifs et améliorer l\'expérience des étudiants.',
          profileManagement: {
            title: 'Gestion de Profil',
            description: 'Les étudiants peuvent facilement mettre à jour leurs informations et suivre le statut de leur inscription.'
          },
          adminAnalytics: {
            title: 'Analytiques Admin',
            description: 'Les administrateurs peuvent visualiser les métriques clés et gérer efficacement les comptes utilisateurs.'
          },
          support: {
            title: 'Support 24/7',
            description: 'Obtenez de l\'aide quand vous en avez besoin avec notre système de support réactif.'
          }
        },
        cta: {
          title: 'Prêt à Commencer?',
          description: 'Rejoignez des milliers d\'étudiants qui ont simplifié leur processus d\'inscription.',
          getStarted: 'Commencer Maintenant',
          goToProfile: 'Aller à Mon Profil'
        }
      },
      login: {
        title: "Connexion",
        subtitle: "Connectez-vous pour accéder à votre compte",
        form: {
          emailLabel: "Adresse e-mail",
          passwordLabel: "Mot de passe",
          signInButton: "Se connecter"
        },
        validation: {
          emailRequired: "L'adresse e-mail est requise",
          invalidEmail: "Adresse e-mail invalide",
          passwordRequired: "Le mot de passe est requis"
        },
        errors: {
          invalidCredentials: "Adresse e-mail ou mot de passe invalide"
        },
        noAccount: "Vous n'avez pas de compte ?",
        registerLink: "Inscrivez-vous ici"
      },
      register: {
        title: "Inscription",
        subtitle: "Créez un nouveau compte pour commencer",
        stepper: {
          personalInfo: "Informations personnelles",
          accountSetup: "Configuration du compte"
        },
        form: {
          firstNameLabel: "Prénom",
          lastNameLabel: "Nom de famille",
          emailLabel: "Adresse e-mail",
          passwordLabel: "Mot de passe",
          confirmPasswordLabel: "Confirmer le mot de passe",
          dobLabel: "Date de naissance"
        },
        validation: {
          firstNameRequired: "Le prénom est requis",
          lastNameRequired: "Le nom de famille est requis",
          emailRequired: "L'adresse e-mail est requise",
          invalidEmail: "Adresse e-mail invalide",
          passwordRequired: "Le mot de passe est requis",
          passwordMinLength: "Le mot de passe doit contenir au moins 8 caractères",
          confirmPasswordRequired: "La confirmation du mot de passe est requise",
          passwordsMustMatch: "Les mots de passe doivent correspondre",
          dobRequired: "La date de naissance est requise",
          minAge: "Vous devez avoir au moins 10 ans",
          maxAge: "Vous devez avoir au maximum 20 ans",
          required: "Requis"
        },
        buttons: {
          next: "Suivant",
          back: "Retour",
          register: "S'inscrire"
        },
        success: {
          registrationComplete: "Inscription réussie ! Vous pouvez maintenant vous connecter."
        },
        errors: {
          registrationFailed: "L'inscription a échoué. Veuillez réessayer."
        },
        haveAccount: "Vous avez déjà un compte ?",
        loginLink: "Connectez-vous ici"
      },
      admin: {
        dashboard: {
          title: 'Tableau de Bord Admin',
          subtitle: 'Gérer les utilisateurs inscrits et contrôler l\'accès au système',
          user: 'Utilisateur',
          email: 'E-mail',
          registrationNumber: 'N° d\'Inscription',
          dateOfBirth: 'Date de Naissance',
          role: 'Rôle',
          actions: 'Actions',
          noUsers: 'Aucun utilisateur trouvé',
          editUser: 'Modifier l\'Utilisateur',
          deleteUser: 'Supprimer l\'Utilisateur',
          cancel: 'Annuler',
          update: 'Mettre à Jour',
          updating: 'Mise à jour...',
          delete: 'Supprimer',
          deleting: 'Suppression...',
          confirmDelete: 'Êtes-vous sûr de vouloir supprimer',
          deleteWarning: 'Cette action ne peut pas être annulée et toutes les données associées à l\'utilisateur seront définitivement supprimées.'
        }
      },
      profile: {
        loading: "Chargement du profil...",
        roles: {
          student: "Étudiant",
          admin: "Administrateur"
        },
        personalInfo: {
          title: "Informations personnelles",
          firstName: "Prénom",
          lastName: "Nom de famille",
          email: "Email",
          dateOfBirth: "Date de naissance"
        },
        academicInfo: {
          title: "Informations académiques",
          registrationNumber: "Numéro d'inscription",
          role: "Rôle",
          registrationDate: "Date d'inscription",
          notAvailable: "Non disponible"
        }
      },
      adminDashboard: {
        title: "Tableau de bord administrateur",
        subtitle: "Gérer les utilisateurs inscrits et contrôler l'accès au système",
        tableHeaders: {
          user: "Utilisateur",
          email: "Email",
          registrationNumber: "N° d'inscription",
          dateOfBirth: "Date de naissance",
          role: "Rôle",
          actions: "Actions"
        },
        roles: {
          student: "Étudiant",
          admin: "Administrateur"
        },
        noUsersFound: "Aucun utilisateur trouvé.",
        tooltips: {
          editUser: "Modifier cet utilisateur",
          deleteUser: "Supprimer cet utilisateur"
        },
        editDialog: {
          title: "Modifier l'utilisateur",
          fields: {
            firstName: "Prénom",
            lastName: "Nom de famille",
            email: "Email",
            dateOfBirth: "Date de naissance",
            role: "Rôle"
          },
          buttons: {
            cancel: "Annuler",
            update: "Mettre à jour",
            updating: "Mise à jour..."
          }
        },
        deleteDialog: {
          title: "Confirmer la suppression",
          confirmMessage: "Êtes-vous sûr de vouloir supprimer {name} ? Cette action est irréversible.",
          buttons: {
            cancel: "Annuler",
            delete: "Supprimer",
            deleting: "Suppression..."
          }
        },
        success: {
          userDeleted: "Utilisateur {name} supprimé avec succès.",
          userUpdated: "Utilisateur {name} mis à jour avec succès."
        },
        errors: {
          fetchFailed: "Échec du chargement des utilisateurs.",
          noUserSelected: "Aucun utilisateur sélectionné.",
          updateFailed: "Échec de la mise à jour de l'utilisateur.",
          deleteFailed: "Échec de la suppression de l'utilisateur"
        },
        validation: {
          firstNameRequired: "Le prénom est requis",
          lastNameRequired: "Le nom de famille est requis",
          emailRequired: "L'email est requis",
          invalidEmail: "Adresse email invalide",
          dobRequired: "La date de naissance est requise",
          ageTooYoung: "L'utilisateur doit avoir au moins 10 ans",
          ageTooOld: "L'utilisateur doit avoir au maximum 20 ans",
          roleRequired: "Le rôle est requis"
        }
      }      
    }
  };
  
  export default translations;