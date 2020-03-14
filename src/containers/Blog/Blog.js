import React, {Component} from 'react';
import axios from 'axios';
// import axios from '../../axios'; if need to use instance
import Posts from '../Posts/Posts';
import './Blog.css';
import {Redirect, Route, Switch} from "react-router";
import {Link, NavLink} from "react-router-dom";
// import NewPost from '../NewPost/NewPost';
import asyncComponent from "../../hoc/asyncComponent";

//lazy loading New Post Component
const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth: true,
    }

    render() {
        return (
            <div>
                <header>
                    <nav className={'Blog'}>
                        <ul>
                            <li><NavLink exact to="/posts" activeClassName={'active'}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route exact     path={'/'} render={() => { return <Posts/>}} />*/}
                <Switch>
                    { this.state.auth ?  <Route path={'/new-post'} component={AsyncNewPost}/> : null }
                    <Route path={'/posts'} component={Posts}/>
                    <Redirect from={'/'}  to={'/posts'} />
                </Switch>

            </div>
        );
    }
}

export default Blog;
