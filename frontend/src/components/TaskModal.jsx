import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EMPTY = {
  title: "",
  description: "",
  priority: "medium",
  status: "pending",
  due_date: "",
};

export default function TaskModal({ open, onClose, onSubmit, task, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(
        task
          ? {
              title: task.title || "",
              description: task.description || "",
              priority: task.priority || "medium",
              status: task.status || "pending",
              due_date: task.due_date || "",
            }
          : EMPTY,
      );
      setErrors({});
    }
  }, [open, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }
    const payload = { ...form };
    if (!payload.due_date) delete payload.due_date;
    onSubmit(payload);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "#0f172a",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 0,
          mx: { xs: 2, sm: "auto" },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Typography fontWeight={600} fontSize="1rem" color="text.primary">
          {task ? "Edit Task" : "New Task"}
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Body */}
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={2.5}>
          {/* Title */}
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            placeholder="What needs to be done?"
            autoFocus
            fullWidth
            size="small"
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
          />

          {/* Description */}
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add details (optional)"
            multiline
            rows={3}
            fullWidth
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
          />

          {/* Priority + Status */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
            >
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
            </TextField>

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
            >
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
            </TextField>
          </Stack>

          {/* Due Date */}
          <TextField
            label="Due Date"
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            inputProps={{ style: { colorScheme: "dark" } }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
          />
        </Stack>
      </DialogContent>

      {/* Footer */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)" }} />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 1.5,
            px: 2.5,
            "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
          }}
        >
          Cancel
        </Button>
        {/* <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
          sx={{ borderRadius: 1.5, px: 3, fontWeight: 600 }}
        >
          {task ? "Save Changes" : "Create Task"}
        </Button> */}
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={14} color="inherit" /> : null
          }
          sx={{
            borderRadius: 1.5,
            px: 3,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {task ? "Save Changes" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
