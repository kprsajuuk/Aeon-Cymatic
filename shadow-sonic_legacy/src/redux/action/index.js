export const SEARCH_MUSIC = 'SEARCH_MUSIC';

export const searchMusic = (searchKey, searchType) => {
    return {type: SEARCH_MUSIC, searchKey, searchType}
};