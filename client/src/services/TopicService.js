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

    flattenTopics(topics, includeSequence = true) {
        const flatList = [];
        topics?.forEach((topic, index) => {
            if (includeSequence) {
                flatList.push({
                    ...topic,
                    sequence: (index + 1).toString(),
                    isParent: true
                });
            } else {
                flatList.push(topic);
            }

            topic.subtopics?.forEach((subtopic, subIndex) => {
                if (includeSequence) {
                    flatList.push({
                        ...subtopic,
                        sequence: `${index + 1}.${subIndex + 1}`,
                        isParent: false
                    });
                } else {
                    flatList.push(subtopic);
                }
            });
        });
        return flatList;
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
            const flatTopics = this.flattenTopics(topics, false);

            response.total = flatTopics.length;
            let votedByUser = flatTopics
                .map(t => t.votes.filter(v => v.user.id == authService.getUserId()).length)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            response.voted = votedByUser;
            response.missing = flatTopics.length - votedByUser;
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

    async deleteFile(fileId) {
        try {
            const response = await request.delete(`/api/meeting-topic-file/${fileId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    async bulkDeleteFiles(fileIds) {
        const deletePromises = fileIds.map(fileId =>
            this.deleteFile(fileId)
                .then(() => ({ fileId, success: true }))
                .catch(err => ({ fileId, success: false, error: err }))
        );

        const results = await Promise.allSettled(deletePromises);

        const summary = {
            success: [],
            failed: []
        };

        results.forEach(result => {
            if (result.status === 'fulfilled') {
                const { fileId, success, error } = result.value;
                if (success) {
                    summary.success.push(fileId);
                } else {
                    summary.failed.push({ fileId, error });
                }
            }
        });

        console.log(`Bulk delete: ${summary.success.length} succeeded, ${summary.failed.length} failed`);

        return summary;
    }

    async uploadFilesForTopics(updatedTopics, localTopics) {
        if (!updatedTopics?.length || !localTopics?.length) return;

        for (let topicIndex = 0; topicIndex < updatedTopics.length; topicIndex++) {
            const updatedTopic = updatedTopics[topicIndex];
            const localTopic = localTopics[topicIndex];

            if (localTopic.files && localTopic.files.length > 0) {
                const newFiles = localTopic.files.filter(f => f instanceof File);

                if (newFiles.length > 0) {
                    await this.saveFiles(updatedTopic.id, newFiles);
                }
            }
            if (updatedTopic.subtopics && updatedTopic.subtopics.length > 0) {
                for (let subIndex = 0; subIndex < updatedTopic.subtopics.length; subIndex++) {
                    const updatedSubtopic = updatedTopic.subtopics[subIndex];
                    const localSubtopic = localTopic.subtopics?.[subIndex];

                    if (localSubtopic?.files && localSubtopic.files.length > 0) {
                        const newFiles = localSubtopic.files.filter(f => f instanceof File);

                        if (newFiles.length > 0) {
                            await this.saveFiles(updatedSubtopic.id, newFiles);
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

    downloadFile(file) {
        const blob = this.base64ToBlob(file.fileData, file.fileType);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    }
}