import { createStore } from 'redux'
import reducer from '@/redux/reducer';

let store = createStore(reducer);

export default store;