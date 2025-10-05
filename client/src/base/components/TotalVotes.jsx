import { Box, Grid, Typography, Button, IconButton} from "@mui/material"; 

import GroupIcon from '@mui/icons-material/Group';

export default function TotalVotes({icon, votes, text}) {
    return <>
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: 0.2, padding: 2}}>
        <Box mb={2}>
            <GroupIcon/>
        </Box>
        <Box mb={2}>
            <Typography>
                {votes}
            </Typography>
        </Box>
        <Box>
            <Typography>
                {text}
            </Typography>
        </Box>
    </Box>
    </>;
}