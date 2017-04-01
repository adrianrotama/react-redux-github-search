import axios from 'axios'

export const SEARCH_USERS = 'SEARCH_USERS'
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'
export const SEARCH_USERS_FAILED = 'SEARCH_USERS_FAILED'
export const RESET_USERS = 'RESET_USERS'
export const RESET_SEARCH_STATE = 'RESET_SEARCH_STATE'

export const LOADING_USER_DETAILS = 'LOADING_USER_DETAILS'
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS'
export const GET_USER_DETAILS_FAILED = 'GET_USER_DETAILS_FAILED'

export const LOADING_USER_REPOS = 'LOADING_USER_REPOS'
export const GET_USER_REPOS_SUCCESS = 'GET_USER_REPOS_SUCCESS'
export const GET_USER_REPOS_FAILED = 'GET_USER_REPOS_FAILED'

const isSearchingUsers = (key,page) => {
	return {
		type: SEARCH_USERS,
		payload: {
			key,
			page
		}
	}
}

const isLoadingUserDetails = () => {
	return {
		type: LOADING_USER_DETAILS
	}
}
const isLoadingUserRepos = () => {
	return {
		type: LOADING_USER_REPOS
	}
}

const searchUsersSuccess = (users, page) => {
	return {
		type: SEARCH_USERS_SUCCESS,
		payload: {
			users,
			page
		}
	}
}
const searchUsersFailed = () => {
	return {
		type: SEARCH_USERS_FAILED
	}
}

const getUserDetailsSuccess = (user) => {
	return {
		type: GET_USER_DETAILS_SUCCESS,
		payload: user
	}
}
const getUserDetailsFailed = () => {
	return {
		type: GET_USER_DETAILS_FAILED
	}
}

const getUserReposSuccess = (repos, page) => {
	return {
		type: GET_USER_REPOS_SUCCESS,
		payload: {
			repos,
			page
		}
	}
}
const getUserReposFailed = () => {
	return {
		type: GET_USER_REPOS_FAILED
	}
}


export const resetSearchState = () => {
	return {
		type: RESET_SEARCH_STATE
	}
}

export const searchUsers = (key, page, isSearchInfinite, callback) => {
	return (dispatch, getState) => {
		if(!isSearchInfinite)
			dispatch(isSearchingUsers(key,page))
		
		if(key){
			axios.get(`https://api.github.com/search/users?q=${key}&page=${page}`)
			.then((response) => {
				dispatch(searchUsersSuccess(response.data, page))
			})
			.catch((error) => {
				dispatch(searchUsersFailed())
			})
		}else{
			dispatch(resetSearchState())
		}
	}
}

export const getUserDetails = (id) => {
	return (dispatch, getState) => {
		dispatch(isLoadingUserDetails())
		
		axios.get(`https://api.github.com/users/${id}`)
			.then((response) => {
				dispatch(getUserDetailsSuccess(response.data))
			})
			.catch((error) => {
				dispatch(getUserDetailsFailed())
			})
	}
}

export const getUserRepos = (url, isSearchInfinite, page) => {
	return (dispatch, getState) => {
		if(!isSearchInfinite)
			dispatch(isLoadingUserRepos())
		
		axios.get(`${url}?page=${page}`)
			.then((response) => {
				dispatch(getUserReposSuccess(response.data, page))
			})
			.catch((error) => {
				dispatch(getUserReposFailed())
			})
	}
}

export const resetUsers = () => {
	return {
		type: RESET_USERS
	}
}