import { DataGrid } from "@mui/x-data-grid";
import formatDate from "../../../utils/FormatDate";
import { mt } from "date-fns/locale";
import { Box } from "@mui/material";

export default function VoteList({votes}) {
    const columns = [
        { field: 'user', headerName: 'Usuário', flex: 0.25,
            renderCell: (params) => {
                return <div>{params.value?.name}</div>;
            } 
        },
        { field: 'status', headerName: 'Voto', flex: 0.25,
            renderCell: (params) => {
                return <div>{params.value}</div>;
            } 
        },
        { field: 'updatedDate', headerName: 'Horário', flex: 0.25,
            renderCell: (params) => {
                const formatted = params.value ? formatDate(params.value) : '';
                return <div>{formatted}</div>;
            } 
        },
        { field: 'comment', headerName: 'Comentário', flex: 0.25,
            renderCell: (params) => {
                return <div></div>;
            } 
        }
    ];

    return <Box sx={{mt: 3}}>
        <DataGrid
            rows={votes}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            getRowId={(row) => row.id}
            initialState={{
            sorting: {
                sortModel: [{ field: 'user', sort: 'asc' }],
            }
            }}
        />
    </Box>;
}