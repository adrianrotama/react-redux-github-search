import React from 'react'
import { connect } from 'react-redux'

import { getUserDetails } from '../actions/searchAction'
import Repos from './Repos'

import SwipeableViews from 'react-swipeable-views'
import {Tabs, Tab} from 'material-ui/Tabs'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            tabSlideIndex: 0
        }
    }
    

    componentWillMount() {
        this.props.getUserDetails(this.props.params.username)
    }


    handleTabChange = (value) => {
        this.setState({
            tabSlideIndex: value
        })
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

    render() {
        return (
            this.props.isLoading ? this.renderLoading() :
            <div className="user-page">
                <div className="side-menu">
                    <Avatar src={this.props.user.avatar_url} size={120}/>
                    <div className="margin-top-20 bold font-16">{this.props.user.name}</div>
                    <div>{this.props.user.login}</div>
                    <div className="font-12 margin-top-10 margin-bottom-10">{this.props.user.bio}</div>
                    <div>{this.props.user.html_url}</div>
                    <div>{this.props.user.blog}</div>
                    <div>{this.props.user.company}</div>
                    <div className="margin-bottom-20">{this.props.user.email}</div>
                    <Divider/>
                    <div className="margin-top-20">{this.props.user.location}</div>
                    <div>{this.props.user.hireable ? <div style={{color:'#4ee47c'}}>Hireable</div> : <div style={{color:'#e44e4e'}}>Unhireable</div>}</div>
                </div>

                <div className="user-content">
                    
                    <Tabs onChange={this.handleTabChange} value={this.state.tabSlideIndex} className="tab-header">
                        <Tab
                            value={0}
                            label={
                                <div>
                                    <div>Repositories</div>
                                    <div className="font-weight-300 font-12">{this.props.user.public_repos}</div>
                                </div>
                            }/>
                        <Tab
                            value={1}
                            label={
                                <div>
                                    <div>Followers</div>
                                    <div className="font-weight-300 font-12">{this.props.user.followers}</div>
                                </div>
                            }/>
                        />
                        <Tab
                            value={2}
                            label={
                                <div>
                                    <div>Following</div>
                                    <div className="font-weight-300 font-12">{this.props.user.following}</div>
                                </div>
                            }/>
                        />
                    </Tabs>

                    <SwipeableViews
                        index={this.state.tabSlideIndex}
                        onChangeIndex={this.handleTabChange}>
                        
                        <div className="tab-item-container">
                            <Repos/>
                        </div>
                        
                        <div className="tab-item-container">
                            Coming Soon
                        </div>  

                        <div className="tab-item-container">
                            Coming Soon
                        </div>  
                    </SwipeableViews>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.searchReducer.currentUser,
    isLoading: state.searchReducer.isLoadingUserDetails
})

const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (id) => dispatch(getUserDetails(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)


