import { Box, Button, Typography } from "@mui/material";
import ActionItemService from "../../../services/ActionItemService";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AuthService from "../../../services/AuthService";
import { useEffect, useState } from "react";
import ActionItemDialog from "../action_item/ActionItemDialog";

export default function ActionItemList() {
    const [actionItemList, setActionItemList] = useState([]);
    const [selectedActionItem, setSelectedActionItem] = useState(null);
    const [openUserModal, setOpenUserModal] = useState(false);
    const authService = new AuthService();
    const actionItemService = new ActionItemService();

    const listActionItems = async () => {
        const data = await actionItemService.list(authService.getUserId());
        setActionItemList(data || []);
    }

    useEffect(() => {
        listActionItems();
    }, []);

    return <>
    {
        actionItemList.length > 0 ?
        <Box mt={2} textAlign="left" width={0.6}>
            <Box>
                <Typography variant="h5" fontWeight="bold">
                Tarefas Pendentes
                </Typography>
            </Box>
            <Box mt={3} display="flex" gap={2} overflow="auto" pb={1} alignItems="stretch">
                {actionItemList.map((item) => (
                    <Box
                        key={item.actionItemId}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                            px: 3,
                            py: 2.5,
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.2s ease",
                            width: "300px",
                            minWidth: "300px",
                            height: "100%",
                            minHeight: "200px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
                            }
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="h6" fontWeight="bold">
                                {item.senderName}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {setSelectedActionItem(item); setOpenUserModal(true); }}
                                sx={{
                                    width: "40px",
                                    minWidth: "40px",
                                    height: "40px",
                                    borderRadius: 1,
                                    p: 0,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                                    }
                                }}
                            >
                                <FullscreenIcon fontSize="small"/>
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {item.comment}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <ActionItemDialog
                openUserModal={openUserModal}
                setOpenUserModal={setOpenUserModal}
                actionItem={selectedActionItem}
                removeActionItem={(id) => setActionItemList((prev) => prev.filter((item) => item.actionItemId !== id))}
            />
        </Box>
        : null
    }
    </>;
}