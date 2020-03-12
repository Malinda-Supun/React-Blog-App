import React, {Component} from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
// import axios from '../../axios'; if need to use instance
import './Blog.css';


class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false,

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
                this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    clicked={() => this.postSelectedHandler(post.id)}
                    key={post.id}
                    title={post.title}
                    author={post.author}/>
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;
