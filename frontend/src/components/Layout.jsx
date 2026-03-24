// import { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   IconButton,
//   Avatar,
//   Divider,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import BoltIcon from "@mui/icons-material/Bolt";

// const DRAWER_WIDTH = 240;

// const navItems = [
//   {
//     label: "Dashboard",
//     path: "/dashboard",
//     icon: <DashboardIcon fontSize="small" />,
//   },
//   { label: "My Tasks", path: "/tasks", icon: <TaskAltIcon fontSize="small" /> },
// ];

// export default function Layout({ children }) {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const drawerContent = (
//     <Box
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         bgcolor: "background.paper",
//       }}
//     >
//       {/* Logo */}
//       <Box
//         sx={{
//           px: 2.5,
//           py: 2.5,
//           display: "flex",
//           alignItems: "center",
//           gap: 1.5,
//         }}
//       >
//         <Box
//           sx={{
//             width: 34,
//             height: 34,
//             borderRadius: 1.5,
//             bgcolor: "primary.main",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 0 14px rgba(41,121,255,0.4)",
//           }}
//         >
//           <BoltIcon sx={{ color: "#fff", fontSize: 18 }} />
//         </Box>
//         <Typography
//           fontWeight={700}
//           fontSize="1rem"
//           color="text.primary"
//           letterSpacing="-0.3px"
//         >
//           TaskFlow
//         </Typography>
//       </Box>

//       <Divider sx={{ borderColor: "divider" }} />

//       {/* Nav Items */}
//       <List
//         sx={{
//           px: 1.5,
//           pt: 2,
//           flexGrow: 1,
//           gap: 0.5,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {navItems.map(({ label, path, icon }) => {
//           const active = location.pathname === path;
//           return (
//             <ListItem key={path} disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to={path}
//                 onClick={() => setMobileOpen(false)}
//                 sx={{
//                   borderRadius: 1.5,
//                   py: 1,
//                   bgcolor: active ? "rgba(41,121,255,0.12)" : "transparent",
//                   color: active ? "primary.light" : "text.secondary",
//                   "&:hover": {
//                     bgcolor: active
//                       ? "rgba(41,121,255,0.15)"
//                       : "rgba(255,255,255,0.04)",
//                     color: "text.primary",
//                   },
//                   transition: "all 0.15s",
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
//                   {icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={label}
//                   primaryTypographyProps={{
//                     fontSize: "0.875rem",
//                     fontWeight: active ? 600 : 400,
//                   }}
//                 />
//                 {/* {active && (
//                   <Box sx={{
//                     width: 4, height: 4, borderRadius: '50%',
//                     bgcolor: 'primary.light', flexShrink: 0,
//                   }} />
//                 )} */}
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>

//       <Divider sx={{ borderColor: "divider" }} />

//       {/* User section */}
//       <Box sx={{ p: 2 }}>
//         {/* User info */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1.2,
//             mb: 1,
//             px: 1,
//             py: 1,
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 32,
//               height: 32,
//               bgcolor: "primary.dark",
//               fontSize: "0.8rem",
//               flexShrink: 0,
//             }}
//           >
//             {(
//               user?.first_name?.[0] ||
//               user?.username?.[0] ||
//               "U"
//             ).toUpperCase()}
//           </Avatar>
//           <Box sx={{ minWidth: 0, flex: 1 }}>
//             <Typography
//               variant="body2"
//               fontWeight={600}
//               color="text.primary"
//               noWrap
//               sx={{ lineHeight: 1.3 }}
//             >
//               {user?.first_name || user?.username}
//             </Typography>
//             <Typography
//               variant="caption"
//               color="text.secondary"
//               noWrap
//               sx={{ display: "block", fontSize: "0.72rem" }}
//             >
//               {user?.email || user?.username}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Sign Out */}
//         <ListItemButton
//           onClick={handleLogout}
//           sx={{
//             borderRadius: 1.5,
//             py: 0.8,
//             color: "text.secondary",
//             "&:hover": { bgcolor: "rgba(244,67,54,0.08)", color: "error.main" },
//             transition: "all 0.15s",
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText
//             primary="Sign Out"
//             primaryTypographyProps={{ fontSize: "0.875rem" }}
//           />
//         </ListItemButton>
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Mobile AppBar */}
//       {isMobile && (
//         <AppBar
//           position="fixed"
//           elevation={0}
//           sx={{
//             bgcolor: "background.paper",
//             borderBottom: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <Toolbar sx={{ gap: 1 }}>
//             <IconButton
//               edge="start"
//               onClick={() => setMobileOpen(true)}
//               sx={{ color: "text.primary" }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Box
//                 sx={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: 1,
//                   bgcolor: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <BoltIcon sx={{ color: "#fff", fontSize: 16 }} />
//               </Box>
//               <Typography
//                 fontWeight={700}
//                 fontSize="0.95rem"
//                 color="text.primary"
//               >
//                 TaskFlow
//               </Typography>
//             </Box>
//           </Toolbar>
//         </AppBar>
//       )}

//       {/* Drawer - Mobile */}
//       {isMobile ? (
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             "& .MuiDrawer-paper": {
//               width: DRAWER_WIDTH,
//               bgcolor: "background.paper",
//               boxSizing: "border-box",
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       ) : (
//         /* Drawer - Desktop */
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: DRAWER_WIDTH,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: DRAWER_WIDTH,
//               boxSizing: "border-box",
//               bgcolor: "background.paper",
//               borderRight: "1px solid rgba(255,255,255,0.06)",
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       )}

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: { xs: 2, sm: 3, md: 4 },
//           mt: isMobile ? "64px" : 0,
//           minHeight: "100vh",
//           bgcolor: "background.default",
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import BoltIcon from "@mui/icons-material/Bolt";

const DRAWER_WIDTH = 240;

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  { label: "My Tasks", path: "/tasks", icon: <TaskAltIcon fontSize="small" /> },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 1.5,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 14px rgba(41,121,255,0.4)",
          }}
        >
          <BoltIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Typography
          fontWeight={700}
          fontSize="1rem"
          color="text.primary"
          letterSpacing="-0.3px"
        >
          TaskFlow
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      {/* Nav */}
      <List
        sx={{
          px: 1.5,
          pt: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navItems.map(({ label, path, icon }) => {
          const active = location.pathname === path;
          return (
            <ListItem key={path} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  bgcolor: active ? "rgba(41,121,255,0.12)" : "transparent",
                  color: active ? "primary.light" : "text.secondary",
                  "&:hover": {
                    bgcolor: active
                      ? "rgba(41,121,255,0.15)"
                      : "rgba(255,255,255,0.04)",
                    color: "text.primary",
                  },
                  transition: "all 0.15s",
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "divider" }} />

      {/* User */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            mb: 1,
            px: 1,
            py: 1,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.dark",
              fontSize: "0.8rem",
              flexShrink: 0,
            }}
          >
            {(
              user?.first_name?.[0] ||
              user?.username?.[0] ||
              "U"
            ).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              noWrap
              sx={{ lineHeight: 1.3 }}
            >
              {user?.first_name || user?.username}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ display: "block", fontSize: "0.72rem" }}
            >
              {user?.email || user?.username}
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1.5,
            py: 0.8,
            color: "text.secondary",
            "&:hover": { bgcolor: "rgba(244,67,54,0.08)", color: "error.main" },
            transition: "all 0.15s",
          }}
        >
          <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{ fontSize: "0.875rem" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            width: "100%",
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoltIcon sx={{ color: "#fff", fontSize: 16 }} />
              </Box>
              <Typography
                fontWeight={700}
                fontSize="0.95rem"
                color="text.primary"
              >
                TaskFlow
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer - Mobile */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              bgcolor: "background.paper",
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "background.paper",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 3, md: 4 },
          mt: isMobile ? "64px" : 0,
          minHeight: "100vh",
          bgcolor: "background.default",
          // Key fix — mobile overflow
          width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
          maxWidth: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
          minWidth: 0,
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
