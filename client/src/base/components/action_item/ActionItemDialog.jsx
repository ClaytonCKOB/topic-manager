import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
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
        <DialogTitle sx={{backgroundColor: "#cfd8dc", marginBottom: 3, fontWeight: 550}}>Verificar Tarefa Pendente</DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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
        <DialogActions mt={3}>
            <Button onClick={() => setOpenUserModal(false)} color="inherit">
                Cancelar
            </Button>
            <Button onClick={() => handleCompleteActionItem()} color="primary" variant="contained">
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