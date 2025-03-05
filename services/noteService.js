import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database & collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    // Get notes
    async fetchNotes(userId) {
        if (!userId) {
            console.error('Error: userId not found in fetchNotes()');
            return {data:[], error:'User id not found'};
        }

        try {
            const response = await databaseService.fetchDocuments(dbId, colId, [Query.equal('userId', userId)]);
            return response;
        } catch (error) {
            console.error('Error fetching notes:', error.message);
            return {data:[], error:error.message};
        }
    },
    // Add new note
    async addNote(userId, text) {
        if (!text) {
            return { error: 'Note text cannot be empty' };
        }

        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            userId: userId
        };

        const response = await databaseService.createDocument(
            dbId,
            colId,
            data,
            ID.unique()
        );

        if (response.error) { 
            return { error: response.error };
        }

        return { data: response };
    },
    // update note
    async updateNote(id, text) {
        const response = await databaseService.updateDocument(dbId, colId, id, { text });
        if (response.error) {
            return { error: response.error };
        }
        return { data: response };
    },
    // delete note
    async deleteNote(id) {
        const response = await databaseService.deleteDocument(dbId, colId, id);

        if (response.error) {
            return { error: response.error };
        }

        return { success: true };
    }
};

export default noteService;