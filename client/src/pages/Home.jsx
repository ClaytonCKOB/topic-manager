import { 
  Box, Typography
} from "@mui/material";
import AuthService from "../services/AuthService";
import Logout from "./user/Logout";
import MeetingManagement from "./meeting/MeetingManagement";
import MeetingVoteList from "./meeting/MeetingVoteList";
import UserManagement from "./user/UserManagement";
import { useEffect, useState } from "react";
import MeetingService from "../services/MeetingService";

export default function Home() {
  const [meetingList, setMeetingList] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const meetingService = new MeetingService();
  const authService = new AuthService();

  useEffect(() => {    
    setIsRequesting(true);
    getMeetingList();
    setIsRequesting(false);
  }, []);

  const getMeetingList = async (attr = {}) => {
      const data = await meetingService.list(attr);
      setMeetingList(data || []); 
  };

  return (
    <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
      <Box mb={8}>
        <Logout/>
        <Typography variant="h5" fontWeight="bold">
          Bem-vindo(a), {authService.getName()}!
        </Typography>
        <UserManagement/>
      </Box>

      <MeetingVoteList meetingList={meetingList}/>

      <MeetingManagement meetingList={meetingList} isRequesting={isRequesting}/>

    </Box>
  );
}
