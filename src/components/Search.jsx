import React from 'react'
import { connect } from 'react-redux'
import { browserHistory as history } from 'react-router'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import CircularProgress from 'material-ui/CircularProgress'

import _ from 'lodash'
import Infinite from 'react-infinite'

import { searchUsers, resetUsers, resetSearchState } from '../actions/searchAction'

const styles = {
    buttonLabel : {
        textTransform: 'initial',
    }
}

const DEBOUNCE_WAIT_TIME = 800
const SIZE_PER_PAGE = 30

class Search extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            textFieldValue: '',
            loading: false
        }
    }

    componentWillMount() {
        this.props.resetSearchState()
    }

    handleClickUser = (id) => {
        history.push(`/user/${id}`)
    }


    handleChangeTextfield = (e) => {
        this.setState({
            textFieldValue: e.target.value,
            loading: true
        })
        this.resetUsers()
        this.searchUsers()
    }

    handleInfiniteLoad = () => {
        if(this.props.currentPage * SIZE_PER_PAGE < this.props.totalCount){
            this.searchUsersNextPage()
        }
    }

    renderLoading = () => {
        return (
            <div>
                <div className="margin-left-20">
                    <CircularProgress size={20} thickness={2}/> 
                    <span className="margin-left-20">Loading...</span>
                </div>
            </div>
        )
    }

    resetUsers = () => {
        this.props.resetUsers()
    }

    searchUsers = _.debounce(() => {this.props.searchUsers(this.state.textFieldValue, 1, false, this.setState({loading: false}))}, DEBOUNCE_WAIT_TIME)
    searchUsersNextPage = _.debounce(() => {this.props.searchUsers(this.state.textFieldValue, this.props.currentPage+1, true)}, DEBOUNCE_WAIT_TIME)

    render() {
        return (
            <div>
                <div className={"search-page " + (this.props.totalCount === -1 && !this.state.loading ? ' ' : 'short')}>
                    <div className="flex">
                        <div style={{textAlign:'center'}}>
                            <TextField
                                hintText="Ex: Adrian Rotama"
                                floatingLabelText="Type Github Account Name here"
                                className="text-field-search"
                                onChange={this.handleChangeTextfield}
                            />
                            
                            <RaisedButton ref='userInput' onClick={this.searchUser} label="Search" primary={true} labelStyle={styles.buttonLabel} />
                        </div>
                    </div>
                </div>

                { this.state.loading || this.props.isLoading ? this.renderLoading() :
                    !_.isEmpty(this.props.users) &&
                    <List>
                        <Subheader>Search Result</Subheader>

                        <Infinite
                            useWindowAsScrollContainer
                            elementHeight={56}
                            infiniteLoadBeginEdgeOffset={100}
                            onInfiniteLoad={this.handleInfiniteLoad}>
                            {
                                this.props.users.map((user,index) => {
                                return(
                                    <ListItem
                                        onTouchTap={() => this.handleClickUser(user.login)}
                                        key={index}
                                        primaryText={user.login}
                                        leftAvatar={<Avatar src={user.avatar_url} />}
                                    />
                                )})
                            }
                        </Infinite>
                        {this.props.currentPage * SIZE_PER_PAGE < this.props.totalCount && this.renderLoading()}
                    </List>
                }
                {
                    !!this.props.lastKey && _.isEmpty(this.props.users) && !this.state.loading && !this.props.isLoading &&
                    <List>
                        <Subheader>Search Result</Subheader>
                        <div className="padding-20">No Result Found</div>
                    </List>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.searchReducer.users,
    currentPage: state.searchReducer.currentPage,
    totalCount: state.searchReducer.totalCount,
    isLoading: state.searchReducer.isLoading,
    lastKey: state.searchReducer.lastKey,
})

const mapDispatchToProps = (dispatch) => ({
    searchUsers: (key, page, isSearchInfinite, callback) => dispatch(searchUsers(key, page, isSearchInfinite, callback)),
    resetUsers: () => dispatch(resetUsers()),
    resetSearchState: () => dispatch(resetSearchState())
})

export default connect (mapStateToProps, mapDispatchToProps)(Search)
