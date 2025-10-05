import request from '../utils/RequestUtil';

export default class UserService {
    async list() {
        return [ {user_account_id:1, name: "Clayton"}, {user_account_id:2, name: "Kaua"}, {user_account_id:3, name: "Barcelos"} ];
        var response = {};
        try {
            // let url = '/api/user-account';

            // response = await request.get(url);
            // if (response.status != 200) {
            //     throw new Error('Network response was not ok');
            // }

            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            return response.data;
        }
    }
}