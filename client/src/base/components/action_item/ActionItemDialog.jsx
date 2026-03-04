import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import formatDate from "../../../utils/FormatDate";
import { useState } from "react";
import ActionItemService from "../../../services/ActionItemService";
import ErrorMessage from "../message/ErrorMessage";

export default function UserModal({ actionItem, removeActionItem, openUserModal, setOpenUserModal}) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "error",
    });
    const actionItemService = new ActionItemService();

    const handleCompleteActionItem = async () => {
        try {
            
            await actionItemService.complete(actionItem.actionItemId);
            removeActionItem(actionItem.actionItemId);
            setSnackbar({
                open: true,
                message: "Tarefa verificada com sucesso.",
                severity: "sucess",
            });
            setOpenUserModal(false);
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: "Erro ao salvar usuário.",
                severity: "error",
            });
        }
    };

    return (
        actionItem &&
    <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)} fullWidth maxWidth="sm">
        <Box
            sx={{
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                px: 3,
                py: 2,
                color: "white",
                borderRadius: "4px 4px 0 0"
            }}
        >
            <Typography variant="h6" fontWeight="bold">
                Verificar Tarefa Pendente
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Detalhes da ação registrada
            </Typography>
        </Box>
        <DialogContent>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 1
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                    <Box width={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Usuário:
                        </Typography>
                        <Typography mt={1} variant="subtitle1">
                            {actionItem.senderName}
                        </Typography>
                    </Box>
                    <Box width={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Data:
                        </Typography>
                        <Typography mt={1} variant="subtitle1">
                                {formatDate(actionItem.createdDate)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                    <Box width={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Reunião:
                        </Typography>
                        <Typography mt={1} variant="subtitle1">
                            {actionItem.meetingTitle}
                        </Typography>
                    </Box>
                    <Box width={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Pauta:
                        </Typography>
                        <Typography mt={1} variant="subtitle1">
                            {actionItem.meetingTopicTitle}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                            Comentário:
                        </Typography>
                        <Typography mt={1} variant="subtitle1">
                            {actionItem.comment}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1, boxShadow: "0 -2px 8px rgba(0,0,0,0.08)" }}>
            <Button
                onClick={() => setOpenUserModal(false)}
                color="inherit"
                sx={{
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600
                }}
            >
                Cancelar
            </Button>
            <Button
                onClick={() => handleCompleteActionItem()}
                color="primary"
                variant="contained"
                sx={{
                    borderRadius: 1,
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                        transform: "translateY(-2px)"
                    }
                }}
            >
                Resolvido
            </Button>
        </DialogActions>
        <ErrorMessage
            snackbar={snackbar}
            setSnackbar={setSnackbar}
        />
    </Dialog>
  );
}