import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useToast } from "../hooks/useToast";
import {
  Box,
  Grid,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function TasksPage() {
  const { toasts, showToast } = useToast();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const { data } = await api.get("/tasks/", { params });
      setTasks(data);
    } catch {
      showToast("Failed to load tasks.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    const t = setTimeout(fetchTasks, 300);
    return () => clearTimeout(t);
  }, [fetchTasks]);

  const handleCreate = async (formData) => {
    setActionLoading(true);
    try {
      const { data } = await api.post("/tasks/", formData);
      setTasks((p) => [data, ...p]);
      setCreateOpen(false);
      showToast("Task created successfully!", "success");
    } catch {
      showToast("Failed to create task.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setActionLoading(true);
    try {
      const { data } = await api.put(`/tasks/${editTask.id}/`, formData);
      setTasks((p) => p.map((t) => (t.id === data.id ? data : t)));
      setEditTask(null);
      showToast("Task updated!", "success");
    } catch {
      showToast("Failed to update task.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await api.delete(`/tasks/${deleteTask.id}/`);
      setTasks((p) => p.filter((t) => t.id !== deleteTask.id));
      setDeleteTask(null);
      showToast("Task deleted.", "success");
    } catch {
      showToast("Failed to delete task.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const hasFilters = search || statusFilter || priorityFilter;
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      {/* ── Page Header ── */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(41,121,255,0.15) 0%, rgba(41,121,255,0.03) 100%)",
          border: "1px solid rgba(41,121,255,0.2)",
          borderRadius: 1,
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Task Manager
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            sx={{ fontSize: { xs: "1.4rem", sm: "1.6rem" } }}
          >
            My Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {loading
              ? "..."
              : `${tasks.length} task${tasks.length !== 1 ? "s" : ""}${hasFilters ? " — filtered" : ""}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
          sx={{ alignSelf: "flex-start", whiteSpace: "nowrap" }}
        >
          New Task
        </Button>
      </Box>

      {/* ── Search & Filter Box ── */}
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          mb: hasFilters ? 1.5 : 3,
          overflow: "hidden",
        }}
      >
        {/* Search */}
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <OutlinedInput
            fullWidth
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            }
            endAdornment={
              search ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearch("")}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            sx={{
              borderRadius: 1.5,
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "divider" },
            }}
          />
        </Box>

        <Divider />

        {/* Filter Row — only icon + 2 dropdowns, nothing else */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <FilterAltIcon
            sx={{ color: "text.secondary", fontSize: 18, flexShrink: 0 }}
          />

          {/* <FormControl size="small" sx={{ flex: 1 }}> */}
          <FormControl
            size="small"
            sx={{ flex: 1, maxWidth: { sm: 160, md: 180 } }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: 1.5, fontSize: "0.85rem" }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#FF9800",
                    }}
                  />
                  Pending
                </Box>
              </MenuItem>
              <MenuItem value="in_progress">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#2979FF",
                    }}
                  />
                  In Progress
                </Box>
              </MenuItem>
              <MenuItem value="completed">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#4CAF50",
                    }}
                  />
                  Completed
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl size="small" sx={{ flex: 1 }}> */}
          <FormControl
            size="small"
            sx={{ flex: 1, maxWidth: { sm: 160, md: 180 } }}
          >
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
              sx={{ borderRadius: 1.5, fontSize: "0.85rem" }}
            >
              <MenuItem value="">All Priorities</MenuItem>
              <MenuItem value="high">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#F44336",
                    }}
                  />
                  High
                </Box>
              </MenuItem>
              <MenuItem value="medium">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#FF9800",
                    }}
                  />
                  Medium
                </Box>
              </MenuItem>
              <MenuItem value="low">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#4CAF50",
                    }}
                  />
                  Low
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* ── Clear Filter — box வெளியே, தனி row ── */}
      {hasFilters && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            size="small"
            startIcon={<FilterAltOffIcon sx={{ fontSize: 15 }} />}
            onClick={clearFilters}
            sx={{
              color: "error.main",
              border: "1px solid",
              borderColor: "rgba(244,67,54,0.3)",
              borderRadius: 1.5,
              px: 2,
              py: 0.6,
              fontSize: "0.78rem",
              fontWeight: 600,
              "&:hover": { bgcolor: "rgba(244,67,54,0.08)" },
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* ── Task Grid ── */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress size={36} />
        </Box>
      ) : tasks.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 6, sm: 10 },
            px: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <AssignmentIcon
            sx={{ fontSize: 52, color: "text.secondary", opacity: 0.2, mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {hasFilters ? "No tasks match your filters" : "No tasks yet"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {hasFilters
              ? "Try adjusting your search or filters."
              : "Create your first task to get started!"}
          </Typography>
          {hasFilters ? (
            <Button
              variant="outlined"
              startIcon={<FilterAltOffIcon />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateOpen(true)}
            >
              Create Task
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} lg={4} key={task.id}>
              <TaskCard
                task={task}
                onEdit={setEditTask}
                onDelete={setDeleteTask}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Modals ── */}
      <TaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        loading={actionLoading}
      />
      <TaskModal
        open={!!editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdate}
        task={editTask}
        loading={actionLoading}
      />
      <DeleteConfirmModal
        open={!!deleteTask}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleDelete}
        task={deleteTask}
        loading={actionLoading}
      />

      {/* ── Toasts ── */}
      {/* {toasts.map((t) => (
        <Snackbar
          key={t.id}
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={t.severity}
            variant="filled"
            sx={{ borderRadius: 2, minWidth: 260 }}
          >
            {t.message}
          </Alert>
        </Snackbar>
      ))} */}
      {toasts.map((t) => (
        <Snackbar
          key={t.id}
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ top: { xs: 70, sm: 16 } }}
        >
          <Alert
            severity={t.severity}
            variant="filled"
            sx={{
              borderRadius: 1.5,
              minWidth: 280,
              fontSize: "0.85rem",
              fontWeight: 500,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}
