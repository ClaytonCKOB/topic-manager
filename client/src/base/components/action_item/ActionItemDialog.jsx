import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
            
            await actionItemService.complete(actionItem.id);
            removeActionItem(actionItem.id);
            setOpenUserModal(false);
            setSnackbar({
                open: true,
                message: "Tarefa verificada com sucesso.",
                severity: "sucess",
            });
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
    <Dialog open={openUserModal} onClose={() => setOpenUserModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{backgroundColor: "#cfd8dc", marginBottom: 3, fontWeight: 550}}>Verificar Tarefa Pendente</DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <Box>
                    
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