import {SEARCH_USERS, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAILED, RESET_SEARCH_STATE, RESET_USERS,
        LOADING_USER_DETAILS, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAILED,
        LOADING_USER_REPOS, GET_USER_REPOS_SUCCESS, GET_USER_REPOS_FAILED} from '../actions/searchAction'


const initialState = {
    lastKey: '',
    isLoading : false,
    isLoadingUserDetails: false,
    isLoadingUserRepos: false,
    totalCount: -1,
    currentPage : 1,
    currentReposPage : 1,
    users: [],
    currentUser: {},
    repos: []
    
}

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_USERS : 
            return {
                ...state,
                isLoading: true,
                lastKey: action.payload.key,
                currentPage: action.payload.page
            }
        case SEARCH_USERS_SUCCESS : 
            return {
                ...state,
                users: state.users.concat(action.payload.users.items),
                currentPage: action.payload.page,
                totalCount: action.payload.users.total_count,
                isLoading: false
            }
        case SEARCH_USERS_FAILED : 
            return {
                ...state,
                isLoading: false
            }
        case RESET_SEARCH_STATE :
            return {
                ...initialState
            }
        case RESET_USERS :
            return {
                ...state,
                totalCount: 0,
                users: [],
                currentPage: 1
            }

        case LOADING_USER_DETAILS :
            return {
                ...state,
                isLoadingUserDetails: true
            }
        case GET_USER_DETAILS_SUCCESS :
            return {
                ...state,
                currentUser: action.payload,
                repos: [],
                currentReposPage: 1,
                isLoadingUserDetails: false
            }
        case GET_USER_DETAILS_FAILED :
            return {
                ...state,
                isLoadingUserDetails: false
            }

        case LOADING_USER_REPOS :
            return {
                ...state,
                isLoadingUserRepos: true
            }
        case GET_USER_REPOS_SUCCESS :
            return {
                ...state,
                repos: state.repos.concat(action.payload.repos),
                currentReposPage: action.payload.page,
                isLoadingUserRepos: false
            }
        case GET_USER_REPOS_FAILED :
            return {
                ...state,
                isLoadingUserRepos: false
            }
    }

    return state
}

export default searchReducer