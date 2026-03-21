import { Typography, Button, Grid, IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import TopicCard from './TopicCard';

export default function TopicSection({meeting, setMeeting, isEditable}) {
    const [collapsed, setCollapsed] = useState(false);

    const addNewTopic = () => {
        setMeeting((prev) => ({
        ...prev,
        topics: [...prev.topics, { title: "", files: [], subtopics: [] }],
        }));
    };

    return <>
    <Grid
        sx={{
            border: '2px solid transparent',
            borderRadius: 1,
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(44, 62, 80, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%) border-box',
        }}
        p={4}
        mb={4}
    >
        <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mb={!collapsed ? 3 : 0}
        >
        <Typography variant="h6">Pautas da Reunião</Typography>
            <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {
                    isEditable && !collapsed ?
                    <Button
                    onClick={addNewTopic}
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                    >
                    Adicionar
                    </Button>
                    : <></>
                }

                <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Grid>

        </Grid>

        {!collapsed && meeting?.topics?.map((topic, index) => (
            <TopicCard
                key={index}
                meeting={meeting}
                setMeeting={setMeeting}
                topic={topic}
                index={index}
                isEditable={isEditable}
            />
        ))}
    </Grid>
    </>;
}