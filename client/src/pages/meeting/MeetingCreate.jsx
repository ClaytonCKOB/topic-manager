import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';


export default function MeetingCreate() {
    const navigate = useNavigate();

    const redirectMeetingList = () => {
        navigate("/meeting/list");
    }

    return <>
        <Box>
            <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={redirectMeetingList}
            >
            </Button>
        </Box>
    </>;
}