import request from '../utils/RequestUtil';
import AuthService from './AuthService';

export default class TopicService {
    async getTopic(topicId) {
        var response = {};
        try {
            let url = '/api/meeting-topic/' + topicId;

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
                comment: status != 3 ? "" : comment,
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

    async getTotalVotes(meetingId) {
        var authService = new AuthService();
        let response = {
            "total": 0,
            "missing": 0,
            "voted": 0
        };

        let topics = await this.getTopicsByMeetingId(meetingId);

        if (topics && topics.length) {
            response.total = topics.length;
            let votedByUser = topics.map( t => t.votes.filter(v => v.user.id == authService.getUserId()).length)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            
            response.voted = votedByUser;
            response.missing = topics.length - votedByUser;
        }


        return response;
    }

    async saveFiles(topicId, files) {
        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

        try {
            const response = await request.post(`/api/meeting-topic-file/${topicId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
            
        } catch (error) {
            console.error("Error uploading files:", error);
            throw error;
        }
    }
}