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

    async getVotesByTopicId(topicId) {
        var response = {};
        try {
            let url = '/api/topic-vote/' + topicId;

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

    async saveVote(userId, topicId, comment, status) {
        var response = {};

        try {
            let url = '/api/topic-vote' ;

            response = await request.post(url, {
                user_account_id: userId,
                meeting_topic_id: topicId,
                comment: comment,
                status: status
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