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
            <Box mt={3} display="flex" gap={2} overflow={"scroll"} >
                {actionItemList.map((item) => (
                    <Box
                    sx={{
                        backgroundColor: "#e3e9f0",
                        borderRadius: 2,
                        px: 3,
                        py: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        transition: "0.2s",
                        width: "300px !important",
                    }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                {item.sender.name}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {setOpenUserModal(true); setSelectedActionItem(item);}}
                                sx={{
                                    boxSizing: "border-box",
                                    width: "40px",
                                    minWidth: "0px",
                                    justifyContent: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0px",
                                }}
                            >
                                <FullscreenIcon/>
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
                            <Typography width="300px" mt={1} variant="subtitle1" color="text.secondary" gutterBottom>
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
                removeActionItem={(id) => setActionItemList((prev) => prev.filter((item) => item.id !== id))}
            />
        </Box>
        : null
    }
    </>;
}