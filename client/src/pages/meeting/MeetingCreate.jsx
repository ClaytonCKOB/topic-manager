import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, IconButton, Input, Select, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useEffect, useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import UserService from '../../services/UserService';
import TopicCard from '../../base/components/TopicCard';

export default function MeetingCreate() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [topics, setTopics] = useState([{title: "", files: [], sub_topics: []}]);

  const meetingService = new MeetingService();
  const userService = new UserService();
  const navigate = useNavigate();

  const redirectMeetingList = () => {
    navigate("/meeting/list");
  };

  
  const saveMeeting = async () => {
    let data = await meetingService.create(
      title,
      `${startDate?.toISOString().split("T")[0]}T${startTime?.toTimeString().slice(0,5)}`,
      `${endDate?.toISOString().split("T")[0]}T${endTime?.toTimeString().slice(0,5)}`,
      topics
    );
    redirectMeetingList();
  };
  
  const addNewTopic = () => {
    setTopics([...topics, { title: "", files: [], sub_topics: [] }]);
  };
  
  const removeTopic = (index) => {
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  const changeTopicTitle = (index, newTitle) => {
    setTopics((prev) =>
      prev.map((t, i) => (i === index ? { ...t, title: newTitle } : t))
    );
  };

  const addSubTopic = (index) => {
    setTopics((prev) =>
      prev.map((t, i) =>
        i === index
          ? { ...t, sub_topics: [...t.sub_topics, { title: "", files: [] }] }
          : t
      )
    );
  };

  const removeSubTopic = (index, subIndex) => {
    setTopics((prev) =>
      prev.map((t, i) =>
        i === index
          ? { ...t, sub_topics: t.sub_topics.filter((_, j) => j !== subIndex) }
          : t
      )
    );
  };

  const changeSubTopicTitle = (index, subIndex, newTitle) => {
    setTopics((prev) =>
      prev.map((t, i) =>
        i === index
          ? {
              ...t,
              sub_topics: t.sub_topics.map((s, j) =>
                j === subIndex ? { ...s, title: newTitle } : s
              ),
            }
          : t
      )
    );
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
          Nova Reunião
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Preencha as informações para criar uma nova reunião.
        </Typography>

        <Grid>
          <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 2, width: 0.8}}>
            <CardContent>

              <Grid container spacing={3} mb={5}>
                <Grid item xs={12} sx={{width: 0.9}}>
                  <Typography  sx={{ mb: 1}}>
                    Título da Reunião
                  </Typography>
                  <TextField
                    sx={{width: 0.5}}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container  mb={5} sx={{display: "flex", justifyContent: "space-between"}}>
                <Grid item xs={12} md={6}>
                  <Typography  sx={{ mb: 1 }}>
                    Início da Reunião
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Data"
                        value={startDate}
                        onChange={setStartDate}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Hora"
                        value={startTime}
                        onChange={setStartTime}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography  sx={{ mb: 1 }}>
                    Fim da Reunião
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Data"
                        value={endDate}
                        onChange={setEndDate}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Hora"
                        value={endTime}
                        onChange={setEndTime}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{border: '2px dotted gray'}} paddingTop={1} paddingInline={5} paddingBottom={3}>
                <Grid spacing={3} paddingTop={5} mb={5} >
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between"}}>
                      <Typography variant="h6"  gutterBottom>
                        Pautas da Reunião
                      </Typography>
                      <Button
                        onClick={addNewTopic}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                      >
                        Adicionar
                      </Button>
                    </Grid>
                </Grid>
                <Grid>
                  {topics.map((topic, index) => (
                    <TopicCard
                      key={index}
                      topic={topic}
                      index={index}
                      onRemoveTopic={removeTopic}
                      onAddSubTopic={addSubTopic}
                      onChangeTitle={changeTopicTitle}
                      onRemoveSubTopic={removeSubTopic}
                      onChangeSubTopicTitle={changeSubTopicTitle}
                    />
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveMeeting}
            sx={{ borderRadius: 2, px: 4, py: 1.2 }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
