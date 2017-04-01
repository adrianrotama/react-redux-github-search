import React from 'react'
import { connect } from 'react-redux'

import { getUserRepos } from '../actions/searchAction'

import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import ForkIcon from 'material-ui/svg-icons/device/usb'

import _ from 'lodash'
import Infinite from 'react-infinite'

const SIZE_PER_PAGE = 30

class Repos extends React.Component {

    componentWillMount() {
        if(!_.isEmpty(this.props.user)){
            this.props.getUserRepos(this.props.user.repos_url, false, 1)
        }
    }

    handleInfiniteLoad = () => {
        if(this.props.currentReposPage * SIZE_PER_PAGE < this.props.reposCount){
            this.props.getUserRepos(this.props.user.repos_url, true, this.props.currentReposPage + 1)
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

    render() {
        return (
            this.props.isLoading ? this.renderLoading() :
            <div>
                <Infinite
                    useWindowAsScrollContainer
                    elementHeight={193}
                    infiniteLoadBeginEdgeOffset={100}
                    onInfiniteLoad={this.handleInfiniteLoad}>
                    {!_.isEmpty(this.props.repos) && this.props.repos.map((repo,index)=>{
                        return(
                            <Card className="margin-bottom-20" key={index}>
                                <CardTitle title={repo.name} subtitle={repo.language} />
                                <CardText>
                                    <div>
                                        {repo.description}
                                    </div>
                                    <div className="flex-center margin-top-10">
                                        <div className="flex-center">
                                            <StarIcon color='#333' style={{width:14, height:14}}/>
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                        <div className="flex-center margin-left-10">
                                            <ForkIcon color='#333' style={{width:14, height:14}}/>
                                            <span>{repo.forks_count}</span>
                                        </div>
                                    </div>
                                </CardText>
                            </Card>
                        )
                    })}
                </Infinite>
                {this.props.currentReposPage * SIZE_PER_PAGE < this.props.reposCount && this.renderLoading()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.searchReducer.currentUser,
    reposCount: state.searchReducer.currentUser.public_repos,
    currentReposPage: state.searchReducer.currentReposPage,
    repos: state.searchReducer.repos,
    isLoading: state.searchReducer.isLoadingUserRepos
})

const mapDispatchToProps = (dispatch) => ({
    getUserRepos: (id, isSearchInfinite, page) => dispatch(getUserRepos(id, isSearchInfinite, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Repos)


