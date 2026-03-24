// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import {
//   Box, Card, CardContent, TextField, Button, Typography,
//   Alert, IconButton, InputAdornment, CircularProgress,
// } from '@mui/material'
// import BoltIcon from '@mui/icons-material/Bolt'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

// export default function LoginPage() {
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ username: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [showPw, setShowPw] = useState(false)

//   const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     try {
//       await login(form.username, form.password)
//       navigate('/dashboard')
//     } catch (err) {
//       setError(err.response?.data?.error || 'Login failed. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Box sx={{
//       minHeight: '100vh', bgcolor: 'background.default',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       p: 2,
//     }}>
//       {/* Background glow */}
//       <Box sx={{
//         position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
//         width: 500, height: 500, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(41,121,255,0.08) 0%, transparent 70%)',
//         pointerEvents: 'none',
//       }} />

//       <Box sx={{ width: '100%', maxWidth: 420 }}>
//         {/* Logo */}
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Box sx={{
//             width: 52, height: 52, borderRadius: 3, bgcolor: 'primary.main',
//             display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 0 24px rgba(41,121,255,0.4)', mb: 2,
//           }}>
//             <BoltIcon sx={{ color: '#fff', fontSize: 26 }} />
//           </Box>
//           <Typography variant="h5" fontWeight={700} color="text.primary">Welcome back</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//             Sign in to your TaskFlow account
//           </Typography>
//         </Box>

//         <Card>
//           <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
//             {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

//             <Box component="form" onSubmit={handleSubmit}>
//               <TextField
//                 label="Username" name="username" value={form.username}
//                 onChange={handleChange} required autoFocus sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Password" name="password" value={form.password}
//                 onChange={handleChange} required
//                 type={showPw ? 'text' : 'password'}
//                 sx={{ mb: 3 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton size="small" onClick={() => setShowPw(p => !p)} edge="end">
//                         {showPw ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Button
//                 type="submit" fullWidth variant="contained" size="large"
//                 disabled={loading}
//                 startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
//               >
//                 Sign In
//               </Button>
//             </Box>

//             <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
//               Don't have an account?{' '}
//               <Typography component={Link} to="/register" variant="body2"
//                 sx={{ color: 'primary.light', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//                 Create account
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    bgcolor: '#1a2236',
    '&:hover fieldset': { borderColor: 'rgba(41,121,255,0.4)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiOutlinedInput-input': {
    WebkitTextFillColor: '#F1F5F9',
  },
  '& input': {
    spellCheck: 'false',
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
    WebkitTextFillColor: '#F1F5F9 !important',
    caretColor: '#F1F5F9',
    borderRadius: '0px',
    transition: 'background-color 9999s ease-in-out 0s',
  },
  '& input:-webkit-autofill:hover': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
  },
  '& input:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0 100px #1a2236 inset !important',
  },
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0A0E1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
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

      <Box sx={{ width: '100%', maxWidth: 400, position: 'relative' }}>

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
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to your TaskFlow account
          </Typography>
        </Box>

        {/* Card */}
        <Box sx={{
          bgcolor: '#111827',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
        }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5, fontSize: '0.85rem' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} autoComplete="on">
            <Stack spacing={2.5}>

              {/* Username */}
              <Box>
                <Typography variant="caption" sx={{
                  fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: 0.5, color: 'text.secondary',
                  display: 'block', mb: 0.8, fontSize: '0.72rem',
                }}>
                  Username
                </Typography>
                <TextField
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  autoFocus
                  fullWidth
                  size="small"
                  autoComplete="username"
                  inputProps={{ spellCheck: false }}
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

              {/* Password */}
              <Box>
                <Typography variant="caption" sx={{
                  fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: 0.5, color: 'text.secondary',
                  display: 'block', mb: 0.8, fontSize: '0.72rem',
                }}>
                  Password
                </Typography>
                <TextField
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  fullWidth
                  size="small"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  inputProps={{ spellCheck: false }}
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
                          sx={{ color: 'text.secondary' }}
                          tabIndex={-1}
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
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

            </Stack>
          </Box>

          <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.07)' }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don't have an account?{' '}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{
                color: 'primary.light',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Create account
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}