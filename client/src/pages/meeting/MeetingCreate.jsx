import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button, TextField, Grid, Card, CardContent} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useEffect, useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import TopicCard from '../../base/components/TopicCard';

export default function MeetingCreate() {
  const { id } = useParams();
  const [isDetail, setIsDetail] = useState(false);
  const [meeting, setMeeting] = useState({
    title: "",
    description: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    topics: [],
  });

  const meetingService = new MeetingService();
  const navigate = useNavigate();

  const redirectMeetingList = () => navigate("/meeting/list");

  const getMeeting = async (meetingId) => {
    const data = await meetingService.get(meetingId);
    if (data) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      setMeeting({
        id: data.id,
        title: data.title || "",
        description: data.description || "",
        startDate: start,
        startTime: start,
        endDate: end,
        endTime: end,
        topics: data.topics || [],
      });
    }
  };

  useEffect(() => {
    if (id) {
      setIsDetail(true);
      getMeeting(id);
    }
  }, [id]);

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined.toISOString();
  };

  const saveMeeting = async () => {
    const start = combineDateTime(meeting.startDate, meeting.startTime);
    const end = combineDateTime(meeting.endDate, meeting.endTime);
    if (!isDetail) {
      await meetingService.create(meeting.title, start, end, meeting.topics);
    } else {
      await meetingService.update(meeting);
    }

    redirectMeetingList();
  };

  const addNewTopic = () => {
    setMeeting((prev) => ({
      ...prev,
      topics: [...prev.topics, { title: "", files: [], subtopics: [] }],
    }));
  };

  const removeTopic = (index) => {
    setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index),
    }));
  };

  const changeTopicTitle = (index, newTitle) => {
    setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
        i === index ? { ...t, title: newTitle } : t
      ),
    }));
  };

  const addSubTopic = (index) => {
    setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
        i === index
          ? { ...t, subtopics: [...t.subtopics, { title: "", files: [] }] }
          : t
      ),
    }));
  };

  const removeSubTopic = (index, subIndex) => {
    setMeeting((prev) => ({
      ...prev,
      topics: prev.topics.map((t, i) =>
        i === index
          ? { ...t, subtopics: t.subtopics.filter((_, j) => j !== subIndex) }
          : t
      ),
    }));
  };

  const changeSubTopicTitle = (index, subIndex, newTitle) => {
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
        i === index ? { ...t, files: [...t.files, ...files] } : t
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
                j === subIndex ? { ...s, files: [...s.files, ...files] } : s
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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={redirectMeetingList}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isDetail ? "Detalhes da Reunião" : "Nova Reunião"}
        </Typography>

        <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 2, width: 0.8 }}>
          <CardContent>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} sx={{width: 0.4}}>
                <Typography sx={{ mb: 1 }}>Título da Reunião</Typography>
                <TextField
                  fullWidth
                  value={meeting.title}
                  onChange={(e) =>
                    setMeeting((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={5} sx={{display: "flex", justifyContent: "space-between"}}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 1 }}>Início da Reunião</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Data"
                      value={meeting.startDate}
                      onChange={(date) =>
                        setMeeting((prev) => ({ ...prev, startDate: date }))
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Hora"
                      value={meeting.startTime}
                      onChange={(time) =>
                        setMeeting((prev) => ({ ...prev, startTime: time }))
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 1 }}>Fim da Reunião</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Data"
                      value={meeting.endDate}
                      onChange={(date) =>
                        setMeeting((prev) => ({ ...prev, endDate: date }))
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Hora"
                      value={meeting.endTime}
                      onChange={(time) =>
                        setMeeting((prev) => ({ ...prev, endTime: time }))
                      }
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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

              {meeting.topics?.map((topic, index) => (
                <TopicCard
                  key={index}
                  topic={topic}
                  index={index}
                  onRemoveTopic={removeTopic}
                  onAddSubTopic={addSubTopic}
                  onChangeTitle={changeTopicTitle}
                  onRemoveSubTopic={removeSubTopic}
                  onChangeSubTopicTitle={changeSubTopicTitle}
                  onAddTopicFiles={onAddTopicFiles}
                  onRemoveTopicFile={onRemoveTopicFile}
                  onAddSubtopicFiles={onAddSubtopicFiles}
                  onRemoveSubtopicFile={onRemoveSubtopicFile}
                />
              ))}
            </Grid>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={saveMeeting}
                sx={{ borderRadius: 2, px: 4, py: 1.2 }}
              >
                Salvar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}
