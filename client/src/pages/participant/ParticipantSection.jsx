import { Grid, IconButton, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function ParticipantSection({participants}) {
    const [collapsed, setCollapsed] = useState(false);
    
    const columns = [
        { field: 'username', headerName: 'Usuário', flex: 0.5},
        { field: 'role', headerName: 'Função', align: 'center', flex: 0.25}
    ];

    return participants?.length > 0 && (
    <Grid
        sx={{ border: '2px dotted gray' }}
        p={4}
        borderRadius={2}
        mb={4}
    >
        <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mb={!collapsed ? 3 : 0}
        >
            <Typography variant="h6">Participantes da Reunião</Typography>  

            <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>          
        </Grid>

        {!collapsed && <DataGrid
            rows={participants}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            getRowId={(row) => row.id}
            sx={{width: 0.5}}
            initialState={{
            sorting: {
                sortModel: [{ field: 'role', sort: 'asc' }, { field: 'username', sort: 'asc' }],
            }
            }}
        />}
    </Grid>
    );
}