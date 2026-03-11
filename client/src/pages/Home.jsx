import {
  Box, Typography
} from "@mui/material";
import AuthService from "../services/AuthService";
import Header from "../base/components/header/Header";
import MeetingManagement from "./meeting/MeetingManagement";
import MeetingVoteList from "./meeting/MeetingVoteList";
import UserManagement from "./user/UserManagement";
import { useEffect, useState } from "react";
import MeetingService from "../services/MeetingService";
import ActionItemList from "../base/components/action_item/ActionItemList";

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
    <Box bgcolor="#f8fafc" height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <Header />
      <Box p={4} display="flex" justifyContent="space-between" gap={4} flex={1} overflow="hidden">
        <Box width={0.5} display="flex" flexDirection="column" gap={3} overflow="hidden">
          <Box flexShrink={0}>
            <Typography variant="h5" fontWeight="bold">
              Bem-vindo(a), {authService.getName()}!
            </Typography>
          </Box>

          {authService.isAdmin() && (
            <Box flexShrink={0}>
              <UserManagement/>
            </Box>
          )}

          <Box flexShrink={0}>
            <ActionItemList/>
          </Box>

          <Box flex={1} overflow="hidden" display="flex" flexDirection="column">
            <MeetingVoteList meetingList={meetingList}/>
          </Box>
        </Box>

        <Box width={0.5} overflow="hidden" display="flex" flexDirection="column">
          <MeetingManagement meetingList={meetingList} setMeetingList={setMeetingList} isRequesting={isRequesting}/>
        </Box>
      </Box>
    </Box>
  );
}
