import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const PRIORITY = {
  high: { label: "High", color: "error", dot: "#F44336" },
  medium: { label: "Medium", color: "warning", dot: "#FF9800" },
  low: { label: "Low", color: "success", dot: "#4CAF50" },
};

const STATUS = {
  pending: { label: "Pending", color: "default" },
  in_progress: { label: "In Progress", color: "primary" },
  completed: { label: "Completed", color: "success" },
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const priority = PRIORITY[task.priority] || PRIORITY.medium;
  const statusCfg = STATUS[task.status] || STATUS.pending;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        borderLeft: task.is_overdue
          ? "3px solid #F44336"
          : "3px solid transparent",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        {/* Top row: title + actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.4,
              color:
                task.status === "completed" ? "text.secondary" : "text.primary",
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
              flex: 1,
            }}
          >
            {task.title}
          </Typography>
          <Box sx={{ display: "flex", flexShrink: 0 }}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(task)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(task)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "error.main" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Description */}
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Badges */}
        <Stack
          direction="row"
          spacing={0.8}
          flexWrap="wrap"
          sx={{ mb: 1.5, gap: 0.5 }}
        >
          <Chip
            size="small"
            label={priority.label}
            color={priority.color}
            variant="outlined"
            icon={
              <Box
                component="span"
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: priority.dot,
                  ml: "6px !important",
                }}
              />
            }
          />
          <Chip
            size="small"
            label={statusCfg.label}
            color={statusCfg.color}
            variant="filled"
          />
          {task.is_overdue && (
            <Chip
              size="small"
              label="Overdue"
              color="error"
              icon={<WarningAmberIcon sx={{ fontSize: "13px !important" }} />}
            />
          )}
        </Stack>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Created {format(new Date(task.created_at), "MMM d, yyyy")}
          </Typography>
          {task.due_date && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon
                sx={{
                  fontSize: 12,
                  color: task.is_overdue ? "error.main" : "text.secondary",
                }}
              />
              <Typography
                variant="caption"
                color={task.is_overdue ? "error.main" : "text.secondary"}
                fontWeight={task.is_overdue ? 600 : 400}
              >
                {format(parseISO(task.due_date), "MMM d, yyyy")}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
