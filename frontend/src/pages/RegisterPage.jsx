// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import {
//   Box, Card, CardContent, TextField, Button, Typography,
//   Alert, IconButton, InputAdornment, CircularProgress, Stack,
// } from '@mui/material'
// import BoltIcon from '@mui/icons-material/Bolt'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

// export default function RegisterPage() {
//   const { register } = useAuth()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ username: '', email: '', first_name: '', last_name: '', password: '', password2: '' })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [showPw, setShowPw] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm(p => ({ ...p, [name]: value }))
//     if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setErrors({})
//     setLoading(true)
//     try {
//       await register(form)
//       navigate('/dashboard')
//     } catch (err) {
//       const data = err.response?.data
//       if (data && typeof data === 'object') setErrors(data)
//       else setErrors({ non_field_errors: ['Registration failed. Please try again.'] })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fe = (name) => {
//     const v = errors[name]
//     return Array.isArray(v) ? v[0] : v
//   }

//   return (
//     <Box sx={{
//       minHeight: '100vh', bgcolor: 'background.default',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       p: 2,
//     }}>
//       <Box sx={{
//         position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
//         width: 500, height: 500, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(41,121,255,0.08) 0%, transparent 70%)',
//         pointerEvents: 'none',
//       }} />

//       <Box sx={{ width: '100%', maxWidth: 460 }}>
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Box sx={{
//             width: 52, height: 52, borderRadius: 3, bgcolor: 'primary.main',
//             display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 0 24px rgba(41,121,255,0.4)', mb: 2,
//           }}>
//             <BoltIcon sx={{ color: '#fff', fontSize: 26 }} />
//           </Box>
//           <Typography variant="h5" fontWeight={700} color="text.primary">Create account</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//             Start managing tasks with TaskFlow
//           </Typography>
//         </Box>

//         <Card>
//           <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
//             {errors.non_field_errors && (
//               <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{fe('non_field_errors')}</Alert>
//             )}

//             <Box component="form" onSubmit={handleSubmit}>
//               <Stack spacing={2}>
//                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                   <TextField label="First Name" name="first_name" value={form.first_name}
//                     onChange={handleChange} error={!!fe('first_name')} helperText={fe('first_name')} />
//                   <TextField label="Last Name" name="last_name" value={form.last_name}
//                     onChange={handleChange} error={!!fe('last_name')} helperText={fe('last_name')} />
//                 </Stack>

//                 <TextField label="Username *" name="username" value={form.username}
//                   onChange={handleChange} required error={!!fe('username')} helperText={fe('username')} autoFocus />

//                 <TextField label="Email" name="email" type="email" value={form.email}
//                   onChange={handleChange} error={!!fe('email')} helperText={fe('email')} />

//                 <TextField
//                   label="Password *" name="password" value={form.password}
//                   onChange={handleChange} required type={showPw ? 'text' : 'password'}
//                   error={!!fe('password')} helperText={fe('password') || 'Minimum 6 characters'}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setShowPw(p => !p)} edge="end">
//                           {showPw ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField label="Confirm Password *" name="password2" value={form.password2}
//                   onChange={handleChange} required type={showPw ? 'text' : 'password'} />

//                 <Button type="submit" fullWidth variant="contained" size="large"
//                   disabled={loading}
//                   startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
//                   sx={{ mt: 1 }}>
//                   Create Account
//                 </Button>
//               </Stack>
//             </Box>

//             <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
//               Already have an account?{' '}
//               <Typography component={Link} to="/login" variant="body2"
//                 sx={{ color: 'primary.light', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//                 Sign in
//               </Typography>
//             </Typography>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   )
// }

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Box, Stack, TextField, Button, Typography,
  Alert, IconButton, InputAdornment, CircularProgress, Divider,
} from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: '#1a2236',
    '&:hover fieldset': { borderColor: 'rgba(41,121,255,0.4)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
    WebkitTextFillColor: '#F1F5F9 !important',
    caretColor: '#F1F5F9',
    transition: 'background-color 9999s ease-in-out 0s',
  },
  '& input:-webkit-autofill:hover': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
  },
  '& input:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
  },
}

const sharedInputProps = {
  spellCheck: false,
  style: { textOverflow: 'ellipsis' },
}

function FieldLabel({ children }) {
  return (
    <Typography variant="caption" sx={{
      fontWeight: 600, textTransform: 'uppercase',
      letterSpacing: 0.5, color: 'text.secondary',
      display: 'block', mb: 0.8, fontSize: '0.72rem',
    }}>
      {children}
    </Typography>
  )
}

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '', first_name: '', email: '', password: '', password2: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (form.password !== form.password2) {
      setErrors({ password2: 'Passwords do not match' })
      return
    }

    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      const data = err.response?.data
      if (data && typeof data === 'object') setErrors(data)
      else setErrors({ non_field_errors: ['Registration failed. Please try again.'] })
    } finally {
      setLoading(false)
    }
  }

  const fe = (name) => {
    const v = errors[name]
    return Array.isArray(v) ? v[0] : v
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0A0E1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      py: 4,
    }}>
      {/* Glow */}
      <Box sx={{
        position: 'fixed',
        top: '20%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41,121,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Box sx={{ width: '100%', maxWidth: 420, position: 'relative' }}>

        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{
            width: 46, height: 46, borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(41,121,255,0.35)',
            mb: 2,
          }}>
            <BoltIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Start managing your tasks with TaskFlow
          </Typography>
        </Box>

        {/* Card */}
        <Box sx={{
          bgcolor: '#111827',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
        }}>
          {errors.non_field_errors && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5, fontSize: '0.85rem' }}>
              {fe('non_field_errors')}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} autoComplete="on">
            <Stack spacing={2.5}>

              {/* Username */}
              <Box>
                <FieldLabel>Username *</FieldLabel>
                <TextField
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  autoFocus
                  fullWidth
                  size="small"
                  autoComplete="username"
                  inputProps={sharedInputProps}
                  error={!!fe('username')}
                  helperText={fe('username')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Your Name */}
              <Box>
                <FieldLabel>Your Name</FieldLabel>
                <TextField
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  fullWidth
                  size="small"
                  autoComplete="given-name"
                  inputProps={sharedInputProps}
                  error={!!fe('first_name')}
                  helperText={fe('first_name')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Email */}
              <Box>
                <FieldLabel>Email</FieldLabel>
                <TextField
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  fullWidth
                  size="small"
                  autoComplete="email"
                  inputProps={sharedInputProps}
                  error={!!fe('email')}
                  helperText={fe('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Password */}
              <Box>
                <FieldLabel>Password *</FieldLabel>
                <TextField
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                  fullWidth
                  size="small"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  inputProps={sharedInputProps}
                  error={!!fe('password')}
                  helperText={fe('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPw(p => !p)}
                          edge="end"
                          tabIndex={-1}
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPw
                            ? <VisibilityOffIcon sx={{ fontSize: 18 }} />
                            : <VisibilityIcon sx={{ fontSize: 18 }} />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <FieldLabel>Confirm Password *</FieldLabel>
                <TextField
                  name="password2"
                  value={form.password2}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  fullWidth
                  size="small"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  inputProps={sharedInputProps}
                  error={!!fe('password2')}
                  helperText={fe('password2')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Submit */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                sx={{
                  mt: 0.5, py: 1.2,
                  borderRadius: 1.5,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 0 20px rgba(41,121,255,0.25)',
                }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>

            </Stack>
          </Box>

          <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.07)' }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{' '}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: 'primary.light',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}