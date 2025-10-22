import { Typography, Button, Grid} from "@mui/material";
import { useNavigate} from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import TopicCard from './TopicCard';

export default function TopicSection({meeting, setMeeting}) {
    const meetingService = new MeetingService();
    const navigate = useNavigate();

    const addNewTopic = () => {
        setMeeting((prev) => ({
        ...prev,
        topics: [...prev.topics, { title: "", files: [], subtopics: [] }],
        }));
    };

    return <>
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
        mb={3}
        >
        <Typography variant="h6">Pautas da Reunião</Typography>
            <Button
            onClick={addNewTopic}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
            >
            Adicionar
            </Button>
        </Grid>

        {meeting?.topics?.map((topic, index) => (
            <TopicCard
                meeting={meeting}
                setMeeting={setMeeting}
                topic={topic}
                index={index}
            />
        ))}
    </Grid>
    </>;
}