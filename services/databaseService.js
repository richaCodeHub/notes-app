import { database } from "./appwrite";

const databaseService = {
    // Fetch documents
    async fetchDocuments(dbId, colId, queries = []) {
        try {
            const response = await database.listDocuments(dbId, colId, queries);
            return { data:response.documents || [], error:null };
        } catch (error) {
            console.error('Error fetching document', error.message);
            return { error: error.message };
        }
    },
    // Create document
    async createDocument(dbId, colId, data, id = null) {
        try {
            return await database.createDocument(dbId, colId, id || undefined, data);
        } catch (error) {
            console.error('Error creating document', error.message);
            return {
                error: error.message
            };
        }
    },
    // Update document
    async updateDocument(dbId, colId, id, data) {
        try {
            return await databaseService.updateDocument(dbId, colId, id, data);
        } catch (error) {
            console.error('Error updating document', error.message);
            return {
                error: error.message
            };
        }
    },
    // Delete document
    async deleteDocument(dbId, colId, id) {
        try {
            await databaseService.deleteDocument(dbId, colId, id);
            return { success: true };
        } catch (error) {
            console.error('Error deleting document', error.message);
            return {
                error: error.message
            };
        }
    }
};

export default databaseService;