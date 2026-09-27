import { useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
  });
  console.log(data);
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {/* <Pagination /> */}
          <button className={css.button}>Create post</button>
        </header>
        {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
        {data && data.length > 0 && <PostList posts={data} />}
      </div>
    </>
  );
}
