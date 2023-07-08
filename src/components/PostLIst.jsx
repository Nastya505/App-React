import React from "react";
import PostItems from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if(!posts.length){
        return(
        <h1 style={{textAlign:"center"}}>Not Posts</h1>
        )
    }
    
    return(
        <div>
            <TransitionGroup>
                <h1 style={{textAlign: "center"}}>{title}</h1>
                {posts.map((post, index) =>
                <CSSTransition
                    key={post.id}
                    classNames='post'
                    timeout={500} > 
                    <PostItems remove={remove}  number={index+1} post={post}/>
                </CSSTransition>
                 )}
            </TransitionGroup>
        </div>
    )
}

export default PostList;