import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, IconButton, Input, Select, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MeetingService from '../../services/MeetingService';
import { useEffect, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserService from '../../services/UserService';

export default function MeetingCreate() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [topics, setTopics] = useState([{title: "", files: [], sub_topics: []}]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [meetingParticipants, setMeetingParticipants] = useState([{user_account_id:1, name: "Clayton", role: 1}]);

  const meetingService = new MeetingService();
  const userService = new UserService();
  const navigate = useNavigate();

  const redirectMeetingList = () => {
    navigate("/meeting/list");
  };

  const getUserAccountList = async () => {
    let data = await userService.list();
    setUserAccounts(data || [])
  }

  useEffect(() => {
    getUserAccountList();
  }, []);

  const saveMeeting = async () => {
    let data = await meetingService.create(
      title,
      `${startDate?.toISOString().split("T")[0]}T${startTime?.toTimeString().slice(0,5)}`,
      `${endDate?.toISOString().split("T")[0]}T${endTime?.toTimeString().slice(0,5)}`
    );
    redirectMeetingList();
  };

  const addNewTopic = () => {
    setTopics([...topics, { title: "", files: [], sub_topics: [] }]);
  };

  const removeMeetingParticipant = (user_account_id) => {
    const tempMeetingParticipants = meetingParticipants.filter((m) => m.user_account_id != user_account_id);
    setMeetingParticipants(tempMeetingParticipants);
  };

  const removeTopic = (index) => {
    const tempTopics = topics.filter((_, i) => i !== index);
    setTopics(tempTopics);
  };

  const setTopicFile = (index) => {

  }

  const addSubTopic = (index) => {
    let newTopics = topics.map((topic, i) => {
      if (i === index) {
        return {
          ...topic,
          sub_topics: [...topic.sub_topics, { title: "", files: [] }]
        };
      }
      return topic;
    });

    setTopics(newTopics);
  };

  const removeSubTopic = (index, subIndex) => {
    let newTopics = topics.map((topic, i) => {
      if (i === index) {
        return {
          ...topic,
          sub_topics: topic.sub_topics.filter((_, j) => j !== subIndex)
        };
      }
      return topic;
    });

    setTopics(newTopics);
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
              <Grid mb={5} sx={{border: '2px dotted gray'}} paddingTop={1} paddingInline={5} paddingBottom={3}>
                <Grid spacing={3} paddingTop={5} mb={5} >
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between"}}>
                      <Typography variant="h6"  gutterBottom>
                        Participantes
                      </Typography>
                    </Grid>
                    <Grid sx={{display: "flex", justifyContent: "space-between", width: 0.6, alignItems: "center"}}>
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          Usuário
                        </Typography>
                        <Select sx={{width: 150}}>
                          {
                            userAccounts.map((userAccount, index) => (
                              <MenuItem value={userAccount.user_account_id}>{userAccount.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          Função
                        </Typography>
                        <Select sx={{width: 150}} value="1">
                          <MenuItem value={1}>Participante</MenuItem>
                          <MenuItem value={2}>Chefe</MenuItem>
                        </Select>
                      </Box>
                      <Box>
                        <Button
                          // onClick={addNewTopic}
                          variant="contained"
                          color="primary"
                          sx={{ borderRadius: 2, px: 4, py: 1.2 }}
                        >
                          Adicionar
                        </Button>
                      </Box>
                    </Grid>
                    <Grid mt={3} sx={{width: 0.5}}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            {meetingParticipants.map((meetingParticipant, index) => (
                              <TableRow key={index}>
                                <TableCell>{meetingParticipant.name}</TableCell>
                                <TableCell>{meetingParticipant.role == 1 ? "Participante" : "Chefe"}</TableCell>
                                <TableCell>
                                  <IconButton 
                                    color="error" 
                                    size="small" 
                                    onClick={() => {removeMeetingParticipant(meetingParticipant.user_account_id)}}
                                  >
                                    <DeleteIcon/>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
                  {
                  topics.map((topic, index) => (
                    <Grid>
                      <Grid item key={index} mb={3} p={3} sx={{border: '1px solid gray', borderRadius: 2}}>
                        <Grid sx={{display: "flex", justifyContent: "space-between"}}>
                          <Typography variant="h6" mb={2}>
                            Pauta {index + 1}
                          </Typography>
                          <Grid>
                            <IconButton
                              onClick={() => {addSubTopic(index)}}
                            >
                              <AddCircleOutlineIcon/>
                            </IconButton>
                            <IconButton 
                              color="error" 
                              size="small" 
                              onClick={() => {removeTopic(index)}}
                            >
                              <DeleteIcon/>
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Grid>
                          <TextField
                            multiline
                            minRows={2}
                            placeholder="Adicione a descrição da pauta..."
                            fullWidth
                          />
                        </Grid>
                        <Grid sx={{display: 'flex', justifyContent: 'flex-end', paddingTop: 2}}>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AttachFileIcon />}
                          >
                            Adicionar Anexo(s)
                            <Input 
                              type="file" 
                              inputProps={{ accept: 'application/pdf' }}
                              sx={{display: 'none'}}
                              // onChange={handleFileChange} 
                              multiple 
                            />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid sx={{display: 'flex', alignItems: 'end', flexDirection: 'column'}}>
                        {
                          topic.sub_topics.map((sub_topic, sub_index) => (
                            <Grid item key={sub_index} mb={3} p={3} sx={{border: '1px solid gray', borderRadius: 2, width: 0.9}}>
                              <Grid sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="h6" mb={2}>
                                  Pauta {index + 1}.{sub_index + 1}
                                </Typography>
                                <Grid>
                                  <IconButton 
                                    color="error" 
                                    size="small" 
                                    onClick={() => {removeSubTopic(index, sub_index)}}
                                  >
                                    <DeleteIcon/>
                                  </IconButton>
                                </Grid>
                              </Grid>
                              <TextField
                                multiline
                                minRows={2}
                                placeholder="Adicione a descrição da pauta..."
                                fullWidth
                              />
                            </Grid>
                          ))
                        }
                      </Grid>
                    </Grid>
                  ))
                  }
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
