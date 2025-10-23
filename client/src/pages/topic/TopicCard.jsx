import { Typography, Button, TextField, Grid, IconButton, Input, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileList from "../../base/components/files/FileList";

export default function TopicCard({meeting, setMeeting, topic, index, isEditable}) {

  const onRemoveTopic = (index) => {
      setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index),
      }));
  };

  const onChangeTopicTitle = (index, newTitle) => {
      setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
          i === index ? { ...t, title: newTitle } : t
      ),
      }));
  };

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

  const onRemoveSubTopic = (index, subIndex) => {
      setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
          i === index
          ? { ...t, subtopics: t.subtopics.filter((_, j) => j !== subIndex) }
          : t
      ),
      }));
  };

  const onChangeSubTopicTitle = (index, subIndex, newTitle) => {
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
  };

  const onAddTopicFiles = (index, fileList) => {
    const files = Array.from(fileList);
    setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
        i === index ? { ...t, files: [...(t.files || []), ...files] } : t
      ),
    }));
  };

  const onRemoveTopicFile = (index, fileIndex) => {
      setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
          i === index
          ? { ...t, files: t.files.filter((_, j) => j !== fileIndex) }
          : t
      ),
      }));
  };

  const onAddSubtopicFiles = (index, subIndex, fileList) => {
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
  };

  const onRemoveSubtopicFile = (index, subIndex, fileIndex) => {
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
  };


  return (
    <Grid key={index}>
      <Grid item mb={3} p={3} sx={{ border: '1px solid gray', borderRadius: 2 }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" mb={2}>
            Pauta {index + 1}
          </Typography>
          {
            isEditable ? 
            <Grid>
              <IconButton onClick={() => onAddSubTopic(index)}>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton color="error" size="small" onClick={() => onRemoveTopic(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            :<></>
          }
        </Grid>

        <Grid>
          <TextField
            multiline
            minRows={2}
            placeholder="Adicione a descrição da pauta..."
            fullWidth
            value={topic.title}
            disabled={!isEditable}
            onChange={(e) => onChangeTopicTitle(index, e.target.value)}
          />
        </Grid>
        <FileList 
          files={topic.files}
          isEditable={isEditable}
          removeFile={(fIndex) => {onRemoveTopicFile(index, fIndex)}}
        />

        {
          isEditable ?
          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
            <Button component="label" variant="contained" startIcon={<AttachFileIcon />}>
              Adicionar Anexo(s)
              <Input
                type="file"
                inputProps={{ accept: 'application/pdf' }}
                onChange={(e) => onAddTopicFiles(index, e.target.files)}
                sx={{ display: 'none' }}
                multiple
              />
            </Button>
          </Grid>
          : <></>
        }
      </Grid>

      <Grid sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
        {topic.subtopics?.map((subtopic, sub_index) => (
          <Grid item key={sub_index} mb={3} p={3} sx={{ border: '1px solid gray', borderRadius: 2, width: 0.9 }}>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" mb={2}>
                Pauta {index + 1}.{sub_index + 1}
              </Typography>
              {
                isEditable ?
                <Grid>
                  <IconButton color="error" size="small" onClick={() => onRemoveSubTopic(index, sub_index)}>
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
              value={subtopic.title}
              onChange={(e) => onChangeSubTopicTitle(index, sub_index, e.target.value)}
            />
            <FileList
              files={subtopic.files}
              isEditable={isEditable}
              removeFile={(fIndex) => {onRemoveSubtopicFile(index, sub_index, fIndex)}}
            />

            {
              isEditable ?
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
                <Button component="label" variant="contained" startIcon={<AttachFileIcon />}>
                  Adicionar Anexo(s)
                  <Input
                    type="file"
                    inputProps={{ accept: 'application/pdf' }}
                    onChange={(e) => onAddSubtopicFiles(index, sub_index, e.target.files)}
                    sx={{ display: 'none' }}
                    multiple
                  />
                </Button>
              </Grid>
              : <></>
            }
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
