import { Typography, Button, Grid, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import TopicCard from './TopicCard';

export default function TopicSection({meeting, setMeeting, isEditable}) {
    const [collapsed, setCollapsed] = useState(false);

    const addNewTopic = () => {
        setMeeting((prev) => ({
        ...prev,
        topics: [...prev.topics, { title: "", description: "", files: [], subtopics: [] }],
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
        <Typography variant="h6">Itens da Reunião</Typography>
            <IconButton onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
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

        {!collapsed && isEditable && (
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    onClick={addNewTopic}
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1.5,
                        borderWidth: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                    }}
                >
                    Adicionar Item
                </Button>
            </Grid>
        )}
    </Grid>
    </>;
}