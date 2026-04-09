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

        return response.data;
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

    async uploadFilesForTopics(updatedTopics, localTopics) {
        if (!updatedTopics?.length || !localTopics?.length) return;

        for (let topicIndex = 0; topicIndex < updatedTopics.length; topicIndex++) {
            const updatedTopic = updatedTopics[topicIndex];
            const localTopic = localTopics[topicIndex];

            if (localTopic.files && localTopic.files.length > 0) {
                const newFiles = localTopic.files.filter(f => f instanceof File);
                const existingFiles = localTopic.files.filter(f => f.id);

                if (newFiles.length > 0) {
                    await this.saveFiles(updatedTopic.id, newFiles);
                }

                for (const existingFile of existingFiles) {
                    const blob = this.base64ToBlob(existingFile.fileData, existingFile.fileType);
                    const file = new File([blob], existingFile.fileName, { type: existingFile.fileType });
                    await this.saveFiles(updatedTopic.id, [file]);
                }
            }

            if (updatedTopic.subtopics && updatedTopic.subtopics.length > 0) {
                for (let subIndex = 0; subIndex < updatedTopic.subtopics.length; subIndex++) {
                    const updatedSubtopic = updatedTopic.subtopics[subIndex];
                    const localSubtopic = localTopic.subtopics?.[subIndex];

                    if (localSubtopic?.files && localSubtopic.files.length > 0) {
                        const newFiles = localSubtopic.files.filter(f => f instanceof File);
                        const existingFiles = localSubtopic.files.filter(f => f.id);

                        if (newFiles.length > 0) {
                            await this.saveFiles(updatedSubtopic.id, newFiles);
                        }

                        for (const existingFile of existingFiles) {
                            const blob = this.base64ToBlob(existingFile.fileData, existingFile.fileType);
                            const file = new File([blob], existingFile.fileName, { type: existingFile.fileType });
                            await this.saveFiles(updatedSubtopic.id, [file]);
                        }
                    }
                }
            }
        }
    }

    base64ToBlob(base64, contentType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }
}