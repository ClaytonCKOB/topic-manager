import request from '../utils/RequestUtil';


export default class MeetingService {
    async list() {
        var response = {};
        try {
            let url = '/api/meeting';

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

    async create(title, startDate, endDate, meetingTopics) {
        var response = {};
        try {
            response = await request.post('/api/meeting', {
                title,
                start_date: startDate,
                end_date: endDate,
                topics: meetingTopics
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

    async delete(meetingId) {
        var response = {};
        try {
            response = await request.delete('/api/meeting/' + meetingId);

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