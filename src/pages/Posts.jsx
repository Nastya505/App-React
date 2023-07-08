import React, {useEffect, useMemo, useRef, useState} from "react";
import PostItems from "../components/PostItem";
import '../styles/App.css';
import PostList from "../components/PostLIst";
import PostForm from "../components/UI/PostForm"
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModel from "../components/UI/model/MyModel";
import { usePosts } from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import { GetPageCount, GetPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const[model, setModel] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  

  const [fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPage(GetPageCount(totalCount, limit));
  });
  
  useEffect(() =>{
    fetchPosts(limit, page);
  }, [limit]);

  const chengePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModel(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">

      <MyButton style={{marginTop: '30px'}} onClick={() => setModel(true)}>Create note</MyButton>

      <hr style={{margin: '15px 0'}}></hr>

      <MyModel visible={model} setVisible={setModel}>
        <PostForm create={createPost}/>
      </MyModel>

      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue={'number of items per page'}
        options={[
          {value:5, name: '5'},
          {value:10, name: '10'},
          {value:25, name: '25'},
          {value:-1, name: 'all'},
        ]}
      />
      {postError && <h1>Error</h1>}
      {isPostLoading
        ? <div style={{display:"flex", justifyContent:'center', marginTop: 50}}><Loader/></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"LIST"}/>
      }
      
      <Pagination page={page} chengePage={chengePage} totalPages={totalPage}/>

    </div>
  );
}

export default Posts;
