import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./CreatePostForm.module.css";
import { createPost, type NewPost } from "../../services/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const initialValues: NewPost = {
  title: "",
  body: "",
};

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "At least 3 characters")
    .max(50, "No more 50 characters")
    .required("Title is required"),
  body: Yup.string().max(500, "No more 500 characters").required("Title is required"),
});

export default function PostForm() {
  const handleSubmit = (values: NewPost) => {
    mutate(values);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Posts successfully created");
    },
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
