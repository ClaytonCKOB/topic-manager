import request from '../utils/RequestUtil';
import AuthService from './AuthService';

export default class UserInviteService {
    
    async sendInvitation(role, emails) {
        var response = {};
        var authService = new AuthService();
        const invites = emails.map(email => ({
            sender_id: authService.getUserId(),
            email: email,
            role: role
        }));

        try {
            response = await request.post('/api/user-account-invite', invites);

            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            return response.data;
        }
    }

    async getInvitation(id) {
        var response = {};
        try {
            let url = '/api/user-account-invite/' + id;

            response = await request.get(url);
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