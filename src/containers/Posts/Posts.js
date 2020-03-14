import React, {Component} from 'react'
import Post from "../../components/Post/Post";
import axios from "axios";
import './Posts.css';
import {Link, Route, Switch} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {

    state = {
        posts: [],

    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                // handle success

                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max',
                    }
                });
                this.setState({posts: updatedPosts});

            })
            .catch(error => {
                // handle error
                console.log(error)
                // this.setState({error: true})
            });
    }


    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id})
        // this.props.history.push({pathname: '/' + id});
        this.props.history.push('/posts/' + id);
    }

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/'+post.id}  key={post.id}>
                    <Post
                        clicked={() => this.postSelectedHandler(post.id)}
                        key={post.id}
                        title={post.title}
                        author={post.author}/>
                    // </Link>
                );
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+'/:id'} component={FullPost}/>
            </div>

        );
    }

}

export default Posts;
