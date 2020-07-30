import { createStore } from 'redux'
import reducer from '@/reducer';

let store = createStore(todoApp)

export default store;