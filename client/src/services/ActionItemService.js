import request from '../utils/RequestUtil';

export default class ActionItemService {

    async list(actorId) {
        var response = {};
        try {
            let url = '/api/action-item/' + actorId;

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

    async complete(actionItemId) {
        var response = {};
        try {
            response = await request.post('/api/action-item/' + actionItemId);

            if (response.status != 200) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            return response.data;
        }
    }

    async getPendingActionItemByTopic(topicId) {
        try {
            const response = await request.get(`/api/action-item/topic/${topicId}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            console.error("Error fetching pending action item:", error);
            throw error;
        }
    }
}