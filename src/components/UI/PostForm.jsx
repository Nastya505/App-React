import React, {useState} from "react";
import MyButton from "./button/MyButton";
import MyInput from "./input/MyInput";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''});
    
    const addPost = (e) => {
      e.preventDefault();
      const newPost = {
        ...post, id: Date.now()
      };
      create(newPost);
      setPost({title:"", body:""});
    }

    return(
        <form>
          <MyInput
          value={post.title}
            type="text"
            placeholder="title post"
            onChange={ e => setPost({...post, title: e.target.value})}/>
          <MyInput
          value={post.body}
            type="text"
            placeholder="body post"
            onChange={ e => setPost({...post, body: e.target.value})}/>

          {/*Пример неуправляемого компонента */
          /* <MyInput
            ref = {bodyInputRef}
            type="text"
            placeholder="text post"/> */}

          <MyButton  onClick={addPost}>Add post</MyButton>
      </form>
    )
}

export default PostForm;