import { Box, Grid, Typography, Button, IconButton} from "@mui/material"; 

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import TotalVotes from "../../base/components/TotalVotes";

export default function MeetingCreate() {
    return <>
        <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
            <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
                    Progresso da Reunião
                </Typography>
                <Grid sx={{display: "flex"}}>
                    <TotalVotes
                        icon={GroupIcon}
                        votes={2}
                        text={"Votantes Totais"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={2}
                        text={"Votos Registrados"}
                    />
                    <TotalVotes
                        icon={PersonIcon}
                        votes={2}
                        text={"Votos Faltante"}
                    />
                </Grid>
            </Box>
        </Box> 
    </>
}