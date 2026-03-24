import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const STAT_CARDS = [
  {
    key: "total",
    label: "Total Tasks",
    icon: DashboardIcon,
    color: "#2979FF",
    bg: "rgba(41,121,255,0.12)",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircleIcon,
    color: "#4CAF50",
    bg: "rgba(76,175,80,0.12)",
  },
  {
    key: "pending",
    label: "Pending",
    icon: PendingActionsIcon,
    color: "#FF9800",
    bg: "rgba(255,152,0,0.12)",
  },
  {
    key: "overdue",
    label: "Overdue",
    icon: WarningAmberIcon,
    color: "#F44336",
    bg: "rgba(244,67,54,0.12)",
  },
];

const PRIORITY_DOT = { high: "#F44336", medium: "#FF9800", low: "#4CAF50" };
const STATUS_LABEL = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};
const STATUS_COLOR = {
  pending: "default",
  in_progress: "primary",
  completed: "success",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [s, t] = await Promise.all([
          api.get("/dashboard/"),
          api.get("/tasks/"),
        ]);
        setStats(s.data);
        setRecentTasks(t.data.slice(0, 6));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completionRate =
    stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    // <Box sx={{ maxWidth: 1100, mx: "auto" }}>
    <Box sx={{ maxWidth: 1100, mx: "auto", overflowX: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(41,121,255,0.15) 0%, rgba(41,121,255,0.03) 100%)",
          border: "1px solid rgba(41,121,255,0.2)",
          borderRadius: 0.75,
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          minWidth: 0,
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            {getGreeting()}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" }, lineHeight: 1.2 }}
          >
            {user?.first_name || user?.username} 👋
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
            Here's your task overview for today.
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={Link}
          to="/tasks"
          endIcon={<ArrowForwardIcon />}
          sx={{ whiteSpace: "nowrap", alignSelf: "flex-start" }}
        >
          View All Tasks
        </Button>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {STAT_CARDS.map(({ key, label, icon: Icon, color, bg }) => (
          <Grid item xs={6} sm={6} md={3} key={key}>
            <Card
              sx={{
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.2, sm: 2 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 36, sm: 48 },
                      height: { xs: 36, sm: 48 },
                      borderRadius: 2.5,
                      bgcolor: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color, fontSize: { xs: 18, sm: 24 } }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.72rem", sm: "0.85rem" },
                        mb: 0.3,
                      }}
                    >
                      {label}
                    </Typography>
                    {loading ? (
                      <Box
                        sx={{
                          width: 36,
                          height: 12,
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: 1,
                        }}
                      />
                    ) : (
                      <Typography
                        fontWeight={700}
                        color="text.primary"
                        sx={{
                          fontSize: { xs: "1.3rem", sm: "1.7rem" },
                          lineHeight: 1.1,
                        }}
                      >
                        {stats?.[key] ?? 0}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress + Recent Tasks */}
      <Grid container spacing={2.5}>
        {/* Progress Card */}
        {!loading && stats?.total > 0 && (
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  mb={2.5}
                  color="text.primary"
                >
                  Overall Progress
                </Typography>
                <Box
                  sx={{ position: "relative", display: "inline-flex", mb: 2 }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={completionRate}
                    size={100}
                    thickness={5}
                    sx={{ color: "primary.main" }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={5}
                    sx={{
                      color: "rgba(255,255,255,0.07)",
                      position: "absolute",
                      left: 0,
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {completionRate}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    {
                      label: "Completed",
                      val: stats.completed,
                      color: "#4CAF50",
                    },
                    {
                      label: "In Progress",
                      val: stats.in_progress,
                      color: "#2979FF",
                    },
                    { label: "Pending", val: stats.pending, color: "#FF9800" },
                  ].map((r) => (
                    <Box
                      key={r.label}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: r.color,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {r.label}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {r.val}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Recent Tasks */}
        <Grid item xs={12} md={stats?.total > 0 ? 8 : 12}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2.5,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.primary"
                >
                  Recent Tasks
                </Typography>
                <Button
                  component={Link}
                  to="/tasks"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: "primary.light" }}
                >
                  See all
                </Button>
              </Box>
              <Divider />

              {loading ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <CircularProgress size={32} />
                </Box>
              ) : recentTasks.length === 0 ? (
                <Box sx={{ p: 5, textAlign: "center" }}>
                  <PendingActionsIcon
                    sx={{
                      fontSize: 40,
                      color: "text.secondary",
                      opacity: 0.3,
                      mb: 1.5,
                    }}
                  />
                  <Typography color="text.secondary" variant="body2">
                    No tasks yet.
                  </Typography>
                  <Button
                    component={Link}
                    to="/tasks"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Create your first task
                  </Button>
                </Box>
              ) : (
                <List disablePadding>
                  {recentTasks.map((task, i) => (
                    <Box key={task.id}>
                      {i > 0 && <Divider />}
                      {/* <ListItem sx={{ px: 3, py: 1.5, gap: 1.5 }}>  */}
                      <ListItem
                        sx={{
                          px: { xs: 2, sm: 3 },
                          py: 1.5,
                          gap: 1,
                          flexWrap: "nowrap",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 10,
                              color: PRIORITY_DOT[task.priority],
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          sx={{ minWidth: 0, flex: 1 }}
                          primaryTypographyProps={{
                            variant: "body2",
                            fontWeight: 500,
                            color:
                              task.status === "completed"
                                ? "text.secondary"
                                : "text.primary",
                            sx: {
                              textDecoration:
                                task.status === "completed"
                                  ? "line-through"
                                  : "none",
                            },
                            noWrap: true,
                          }}
                        />
                        <Box
                          // sx={{
                          //   display: "flex",
                          //   gap: 1,
                          //   alignItems: "center",
                          //   flexShrink: 0,
                          // }}
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            alignItems: "center",
                            flexShrink: 0,
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-end", sm: "center" },
                          }}
                        >
                          {task.is_overdue && (
                            <Chip label="Overdue" size="small" color="error" />
                          )}
                          <Chip
                            label={STATUS_LABEL[task.status]}
                            size="small"
                            color={STATUS_COLOR[task.status]}
                            variant="outlined"
                          />
                        </Box>
                      </ListItem>
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
