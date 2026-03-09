import { Typography, Button, TextField, Grid, IconButton, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileList from "../../base/components/files/FileList";
import VoteList from "../../base/components/vote/VoteList";
import AuthService from "../../services/AuthService";

export default function TopicComponent({setMeeting, topic, index, subIndex, isEditable, isSubTopic, backgroundColor = "white", isExpanded, setIsExpanded, hasSubtopics, subtopicsCount}) {
    const textColorStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
            color: "black",
            opacity: 1,
        },
    };
    const authService = new AuthService();
    const onAddSubTopic = (index) => {
        setMeeting((prev) => ({
        ...prev,
        topics: prev.topics.map((t, i) =>
            i === index
            ? { ...t, subtopics: [...(t.subtopics || []), { title: "", files: [] }] }
            : t
        ),
        }));
    };

    const onRemoveTopic = (index, subIndex) => {
        if (isSubTopic) {
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index
                ? { ...t, subtopics: t.subtopics.filter((_, j) => j !== subIndex) }
                : t
            ),
            }));
        } else {
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.filter((_, i) => i !== index),
            }));
        }
    };

    const onChangeTopicTitle = (index, subIndex, newTitle) => {
        if (isSubTopic) {
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index
                ? {
                    ...t,
                    subtopics: t.subtopics.map((s, j) =>
                        j === subIndex ? { ...s, title: newTitle } : s
                    ),
                    }
                : t
            ),
            }));
        } else {
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index ? { ...t, title: newTitle } : t
            ),
            }));
        }
    };

    const onAddTopicFiles = (index, subIndex, fileList) => {
        if (isSubTopic) {
            const files = Array.from(fileList);
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index
                ? {
                    ...t,
                    subtopics: t.subtopics.map((s, j) =>
                        j === subIndex
                        ? { ...s, files: [...(s.files || []), ...files] }
                        : s
                    ),
                    }
                : t
            ),
            }));
        } else {
            const files = Array.from(fileList);
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index ? { ...t, files: [...(t.files || []), ...files] } : t
            ),
            }));
        }
    };

    const onRemoveTopicFile = (index, subIndex, fileIndex) => {
        if (isSubTopic) {
            setMeeting((prev) => ({
            ...prev,
            topics: prev.topics.map((t, i) =>
                i === index
                ? {
                    ...t,
                    subtopics: t.subtopics.map((s, j) =>
                        j === subIndex
                        ? { ...s, files: s.files.filter((_, k) => k !== fileIndex) }
                        : s
                    ),
                    }
                : t
            ),
            }));
        } else {
            setMeeting((prev) => ({
        ...prev,
        topics: prev.topics.map((t, i) =>
            i === index
            ? { ...t, files: t.files.filter((_, j) => j !== fileIndex) }
            : t
        ),
        }));
        }
        
    };

    return <>
    <Grid item key={subIndex ?? index} mb={3} p={3} sx={{
        border: isSubTopic ? '1px solid #e0e0e0' : '1px solid #bdbdbd',
        borderRadius: 2,
        width: 1,
        backgroundColor: backgroundColor,
        transition: 'all 0.2s ease'
    }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">
                Pauta {index + 1}{isSubTopic ? "." + (subIndex + 1) : ""}
                </Typography>

                {!isSubTopic && hasSubtopics && (
                    <IconButton
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="small"
                        sx={{
                            transition: "transform 0.3s ease",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                )}
            </Grid>
            {
            isEditable ?
            <Grid>
                {
                    !isSubTopic ?
                    <IconButton onClick={() => onAddSubTopic(index)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                    : null
                }
                {
                    isSubTopic || (!isSubTopic && index != 0) ?
                    <IconButton color="error" size="small" onClick={() => onRemoveTopic(index, subIndex)}>
                        <DeleteIcon />
                    </IconButton>
                    : null
                }
            </Grid>
            : <></>
            }
        </Grid>

        <TextField
            disabled={!isEditable}
            sx={textColorStyle}
            multiline
            minRows={2}
            placeholder={isSubTopic ? "Adicione a descrição da subpauta..." : "Adicione a descrição da pauta..."}
            fullWidth
            value={topic.title}
            onChange={(e) => onChangeTopicTitle(index, subIndex, e.target.value)}
        />
        <FileList
            files={topic.files}
            isEditable={isEditable}
            removeFile={(fIndex) => {onRemoveTopicFile(index, subIndex, fIndex)}}
        />

        <VoteList votes={topic.votes} isVisible={!isEditable && authService.isAdmin()}/>

        {!isSubTopic && hasSubtopics && !isExpanded && (
            <Grid sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="body2" color="text.secondary">
                    {subtopicsCount} subpauta{subtopicsCount > 1 ? 's' : ''} oculta{subtopicsCount > 1 ? 's' : ''}
                </Typography>
            </Grid>
        )}

        {
            isEditable ?
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
                <Button component="label" variant="contained" startIcon={<AttachFileIcon />}>
                    Adicionar Anexo(s)
                    <Input
                    type="file"
                    inputProps={{ accept: 'application/pdf' }}
                    onChange={(e) => onAddTopicFiles(index, subIndex, e.target.files)}
                    sx={{ display: 'none' }}
                    multiple
                    />
                </Button>
            </Grid>
            : <></>
        }
        </Grid>
    </>;
}