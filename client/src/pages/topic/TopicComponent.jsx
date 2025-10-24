import { Typography, Button, TextField, Grid, IconButton, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileList from "../../base/components/files/FileList";
import VoteList from "../../base/components/vote/VoteList";

export default function TopicComponent({setMeeting, topic, index, subIndex, isEditable, isSubTopic}) {

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
    <Grid item key={subIndex ?? index} mb={3} p={3} sx={{ border: '1px solid gray', borderRadius: 2, width: isSubTopic ? 0.9 : 1 }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" mb={2}>
            Pauta {index + 1}{isSubTopic ? "." + (subIndex + 1) : ""} 
            </Typography>
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
                <IconButton color="error" size="small" onClick={() => onRemoveTopic(index, subIndex)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
            : <></>
            }
        </Grid>

        <TextField
            disabled={!isEditable}
            multiline
            minRows={2}
            placeholder="Adicione a descrição da subpauta..."
            fullWidth
            value={topic.title}
            onChange={(e) => onChangeTopicTitle(index, subIndex, e.target.value)}
        />
        <FileList
            files={topic.files}
            isEditable={isEditable}
            removeFile={(fIndex) => {onRemoveTopicFile(index, subIndex, fIndex)}}
        />

        <VoteList votes={topic.votes} isVisible={!isEditable}/>
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