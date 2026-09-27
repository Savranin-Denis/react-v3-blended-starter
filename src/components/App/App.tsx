import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import PostForm from "../CreatePostForm/CreatePostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.ceil(data.totalCount / 8) : 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={setSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsCreatePost(true);
            }}
            className={css.button}
          >
            Create post
          </button>
        </header>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>{isCreatePost && <PostForm />}</Modal>
        )}
        {data && data.posts.length > 0 && <PostList posts={data.posts} />}
      </div>
    </>
  );
}
