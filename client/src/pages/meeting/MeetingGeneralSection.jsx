import { Typography, TextField, Grid} from "@mui/material";
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export default function MeetingGeneralSection({meeting, setMeeting, isEditable}) {
    const textColorStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
            color: "black",
            opacity: 1,
        },
    };

    return <>
    <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sx={{width: 0.5}}>
        <Typography sx={{ mb: 1 }}>Título da Reunião</Typography>
        <TextField
            fullWidth
            value={meeting.title}
            disabled={!isEditable}
            sx={textColorStyle}
            onChange={(e) =>
            setMeeting((prev) => ({ ...prev, title: e.target.value }))
            }
        />
        </Grid>
    </Grid>
    <Grid container spacing={4} mb={5} sx={{display: "flex"}}>
        <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 1 }}>Data da Reunião</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <DatePicker
                    label="Data"
                    value={meeting.startDate}
                    disabled={!isEditable}
                    sx={{WebkitTextFillColor: "black"}}
                    onChange={(date) =>
                    setMeeting((prev) => ({ ...prev, startDate: date }))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                />
                </Grid>
                
            </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 1 }}>Início da Reunião</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TimePicker
                        label="Hora"
                        value={meeting.startTime}
                        disabled={!isEditable}
                        sx={{WebkitTextFillColor: "black"}}
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
                    <TimePicker
                        label="Hora"
                        value={meeting.endTime}
                        disabled={!isEditable}
                        sx={{WebkitTextFillColor: "black"}}
                        onChange={(time) =>
                        setMeeting((prev) => ({ ...prev, endTime: time }))
                        }
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </>;
}