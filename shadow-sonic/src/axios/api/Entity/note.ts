import api from '../../api';
import { baseUrl } from '../../name';
import { IPage } from '../../interface';

const note = '/note'

/** add Note
 * @returns Promise
 */
const postAddNote = (data: any) => api.post(`${baseUrl}${note}`, data);

/** delete Note
 * @returns Promise
 */
const deleteNote = (params: any) => api.delete(`${baseUrl}${note}`, { params });

/** get note list
 * @returns Promise
 */
const getNoteList = (params) => api.get(`${baseUrl}${note}`, {params});

/** get note
 * @returns Promise
 */
const getNoteById = (id) => api.get(`${baseUrl}${note}/note`, { params: {id} });

/** update note
 * @returns Promise
 */
const putEditNote = (id, data) => api.put(`${baseUrl}${note}`, { ...data, id });

/** update note Score
 * @returns Promise
 */
const putEditNoteScore = (id, score) => api.put(`${baseUrl}${note}/score`, { id, score });

export {
    postAddNote,
    deleteNote, 
    getNoteList,
    getNoteById,
    putEditNote,
    putEditNoteScore
}