import request from '../utils/RequestUtil';

export default class UserService {
    async getUser(userId) {
        
        var response = {};
        try {
            let url = '/api/user/' + userId;

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
            response = await request.put('/api/meeting/' + meeting.id, {
                title: meeting.title,
                start_date: FormatMeetingDate(meeting.startDate, meeting.startTime),
                end_date: FormatMeetingDate(meeting.endDate, meeting.endTime),
                topics: meeting.topics
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