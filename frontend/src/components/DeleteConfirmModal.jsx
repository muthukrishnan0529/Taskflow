// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// export default function DeleteConfirmModal({
//   open,
//   onClose,
//   onConfirm,
//   task,
//   loading,
// }) {
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{ sx: { borderRadius: 3 } }}
//     >
//       <DialogContent sx={{ textAlign: "center", pt: 4, pb: 2 }}>
//         <Box
//           sx={{
//             width: 56,
//             height: 56,
//             borderRadius: "50%",
//             bgcolor: "rgba(244,67,54,0.12)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mx: "auto",
//             mb: 2,
//           }}
//         >
//           <DeleteOutlineIcon sx={{ fontSize: 28, color: "error.main" }} />
//         </Box>
//         <Typography variant="h6" gutterBottom>
//           Delete Task
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Are you sure you want to delete
//         </Typography>
//         <Typography
//           variant="body2"
//           fontWeight={600}
//           color="text.primary"
//           sx={{ mt: 0.5, mb: 1, px: 1 }}
//           noWrap
//         >
//           "{task?.title}"
//         </Typography>
//         <Typography variant="caption" color="text.secondary">
//           This action cannot be undone.
//         </Typography>
//       </DialogContent>
//       <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={onClose}
//           color="inherit"
//           sx={{ color: "text.secondary", borderColor: "divider" }}
//         >
//           Cancel
//         </Button>
//         <Button
//           fullWidth
//           variant="contained"
//           color="error"
//           onClick={onConfirm}
//           disabled={loading}
//           startIcon={
//             loading ? (
//               <CircularProgress size={16} color="inherit" />
//             ) : (
//               <DeleteOutlineIcon />
//             )
//           }
//         >
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import {
  Dialog, DialogContent, DialogActions,
  Button, Typography, Box, CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DeleteConfirmModal({
  open, onClose, onConfirm, task, loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#111827",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
          mx: { xs: 2, sm: "auto" },
        },
      }}
    >
      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, pt: 3.5, pb: 2, textAlign: "center" }}>

        {/* Icon */}
        <Box sx={{
          width: 48, height: 48, borderRadius: "50%",
          bgcolor: "rgba(244,67,54,0.1)",
          border: "1px solid rgba(244,67,54,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          mx: "auto", mb: 2,
        }}>
          <WarningAmberIcon sx={{ fontSize: 24, color: "error.main" }} />
        </Box>

        {/* Title */}
        <Typography fontWeight={700} fontSize="1rem" color="text.primary" mb={0.8}>
          Delete Task
        </Typography>

        {/* Message */}
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Are you sure you want to delete
        </Typography>
        <Typography
          variant="body2" fontWeight={600} color="text.primary"
          sx={{ px: 1, mb: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          "{task?.title}"
        </Typography>
        <Typography variant="caption" color="text.secondary"
          sx={{ bgcolor: "rgba(244,67,54,0.06)", px: 1.5, py: 0.5, borderRadius: 1, display: "inline-block" }}>
          This action cannot be undone
        </Typography>

      </DialogContent>

      <DialogActions sx={{ px: { xs: 2.5, sm: 3 }, pb: 3, pt: 1, gap: 1 }}>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            borderRadius: 1.5,
            color: "text.secondary",
            border: "1px solid rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={
            loading
              ? <CircularProgress size={15} color="inherit" />
              : <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          }
          sx={{ borderRadius: 1.5, fontWeight: 600 }}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}