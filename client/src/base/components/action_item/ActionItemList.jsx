import { Box, Typography } from "@mui/material";
import ActionItemService from "../../../services/ActionItemService";
import AuthService from "../../../services/AuthService";
import { useEffect, useState } from "react";

export default function ActionItemList() {
    const [actionItemList, setActionItemList] = useState([]);
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
        <Box mt={2} textAlign="left">
            <Box>
                <Typography variant="h5" fontWeight="bold">
                Tarefas Pendentes
                </Typography>
            </Box>
            <Box>
                {actionItemList.map((item) => (
                    <></>
                ))}
            </Box>
        </Box>
        : null
    }
    </>;
}