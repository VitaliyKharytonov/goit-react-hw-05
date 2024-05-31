import { Field, Form, Formik } from "formik";
import css from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';



export default function SearchBar({ onSearch }) {
    return (
      <>
        <Toaster  position="top-center"
  reverseOrder={false}/>
        <Formik
      initialValues={{ query: "" }}
          onSubmit={(values, actions) => {
            if (values.query.trim() === "") {
              toast.error("Enter a word to search.")
              return
            }
          onSearch(values.query);
          actions.resetForm();
      }}>
        <Form className={css.form}>     
        <Field className={css.input} type="text" name="query" placeholder="Search movies"/>
        <button type="submit" className={css.button}>Search</button>
      </Form>
    </Formik>
      </>
)}