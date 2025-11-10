import request from '../utils/RequestUtil';
import AuthService from './AuthService';

export default class UserInviteService {
    
    async sendInvitation(role, email) {
        var response = {};
        var authService = new AuthService();

        try {
            response = await request.post('/api/user-account-invite/', {
                sender_id: authService.getUserId(),
                role,
                email
            });

            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            return response.data;
        }
    }
}