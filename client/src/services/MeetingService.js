import request from '../utils/RequestUtil';
import FormatMeetingDate from '../utils/FormatMeetingDate';

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

    async get(meetingId) {
        var response = {};
        try {
            let url = '/api/meeting/' + meetingId;

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

    async update(meeting) {
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