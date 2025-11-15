import { Grid, IconButton, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import VoteComponent from "../../base/components/vote/VoteComponent";

export default function TopicTotalizers({topics}) {
    const [collapsed, setCollapsed] = useState(true);
    var totalizer = [];
    var topicList = [];

    topics.forEach((topic, index) => {
        if (topic)
            topic["sequence"] = index + 1;
        topicList.push(topic);

        topic?.subtopics?.forEach((subtopic, sub_index) => {
            if (subtopic)
                subtopic["sequence"] = (index + 1) + "." + (sub_index + 1);

            topicList.push(subtopic);
        })
    });

    function getConclusion(arr) {
        let max = -Infinity;
        let index = -1;
        let count = 0;

        arr.forEach((value, i) => {
            if (value > max) {
            max = value;
            index = i;
            count = 1;     
            } else if (value === max) {
            count++;       
            }
        });

        return count > 1 ? -1 : index;
    }

    topicList.forEach((topic) => {
        let status = [0, 0, 0, 0];

        if (topic.votes?.length > 0) {
            topic.votes?.forEach((vote) => {
                status[vote.status]++;
            });

            totalizer.push({
                "id": topic.id,
                "title": topic?.sequence + " " + topic.title,
                "conclusion": getConclusion(status),
                "aprovado": status[0],
                "reprovado": status[1],
                "abstenho": status[2],
                "diligencia": status[3]
            });
        }
        
    });

    const columns = [
        { field: 'title', headerName: 'Pauta', flex: 0.5 },
        {
            field: 'conclusion',
            headerName: 'Conclusão',
            flex: 0.3,
            renderCell: (params) =>
            params.value !== -1 ? <VoteComponent voteId={params.value} hasBorder={false}/> : null,
            cellClassName: 'centerCell'
        },
        { field: 'aprovado', headerName: 'Aprovado', flex: 0.15, cellClassName: 'centerCell' },
        { field: 'reprovado', headerName: 'Reprovado', flex: 0.15, cellClassName: 'centerCell' },
        { field: 'abstenho', headerName: 'Me abstenho', flex: 0.15, cellClassName: 'centerCell' },
        { field: 'diligencia', headerName: 'Diligência', flex: 0.15, cellClassName: 'centerCell' }
    ];


    return totalizer?.length > 0 && (
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
            <Typography variant="h6">Totalizadores das Pautas</Typography>  

            <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>          
        </Grid>

        {!collapsed && <DataGrid
            rows={totalizer}
            columns={columns}
            disableRowSelectionOnClick
            disableMultipleColumnsSorting
            hideFooter
            getRowId={(row) => row.id}
            initialState={{
            sorting: {
                sortModel: [{ field: 'role', sort: 'asc' }, { field: 'username', sort: 'asc' }],
            }
            }}
            sx={{
                '& .centerCell': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }
            }}
        />}
    </Grid>
    );
}