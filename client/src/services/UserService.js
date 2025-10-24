import request from '../utils/RequestUtil';

export default class UserService {
    async getUser(userId) {
        var response = {};
        try {
            let url = '/api/user-account/' + userId;

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

    async list() {
        var response = {};
        try {
            let url = '/api/user-account';

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

    async update(user) {
        var response = {};
        try {
            response = await request.put('/api/user-account', {...user});

            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            return response.data;
        }
    }

    async delete(userId) {
        var response = {};
        try {
            response = await request.delete('/api/user-account/' + userId);

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