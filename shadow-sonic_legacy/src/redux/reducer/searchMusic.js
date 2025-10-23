import { SEARCH_MUSIC } from "../action";

const initialState = {
	searchKey: '',
	searchType: '',
};

const searchMusic = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_MUSIC:
			return Object.assign({}, state, {
				searchKey: action.searchKey,
				searchType: action.searchType,
			});
		default:
			return state;
	}
};

export default searchMusic;