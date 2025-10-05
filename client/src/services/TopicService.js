import request from '../utils/RequestUtil';

export default class TopicService {
    async getTopicsByMeetingId(meetingId) {
        var response = {};
        try {
            let url = '/api/meeting-topic/meeting/' + meetingId;

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