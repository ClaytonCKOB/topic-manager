import { 
  Box, Typography
} from "@mui/material";
import AuthService from "../../services/AuthService";
import Logout from "../user/Logout";
import MeetingManagement from "./MeetingManagement";
import MeetingVoteList from "./MeetingVoteList";
import UserManagement from "../user/UserManagement";

export default function MeetingList() {
  const authService = new AuthService();

  return (
    <Box p={4} bgcolor="#f2f5f9" minHeight="100vh">
      <Box mb={8}>
        <Logout/>
        <Typography variant="h5" fontWeight="bold">
          Bem-vindo(a), {authService.getName()}!
        </Typography>
        <UserManagement/>
      </Box>

      <MeetingVoteList/>

      <MeetingManagement/>

    </Box>
  );
}
