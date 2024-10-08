import React, { useContext, useRef } from "react";
import classes from "./askQuestion.module.css";
import {axiosInstance} from "../../../utility/axios";
import { Link,useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import { UserState } from "../../../App";
// this is imported for bootstrap sweet alert
import swal from 'bootstrap-sweetalert';

// import { StatusCodes } from "http-status-codes";
// import { useNavigate } from "react-router-dom";
function AskQuestion() {
  const navigate = useNavigate();
  const {user}=useContext(UserState);

  // const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const userId = user?.userid;
  console.log(user)
  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value; // Make a POST request to your server to create a new question
const userid=userId;
const tag="General";
    // Make a POST request to your server to create a new question
    const response = await axiosInstance.post("/question", { userid, title, description, tag });
    
    try {
      if (response.status === 201) {
        console.log("Question created successfully");
        swal("Success!", "Question created successfully!", "success").then(() => {
          navigate("/") ; // Redirect to the home page and refresh the page
        });
        // window.location.href = "/"; // Redirect to the home page and refresh the page
      } else {
        console.error("Failed to create question");
        swal("Error", "Failed to create question", "error");
      }
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to create question", "error");
    }
  }

  return (
    <Layout>
      <div className={classes.allContainer}>

<div className={classes.question__container}>
  <div className={classes.question__wrapper}>
    <h3 className={classes.question__header__title}>
      <span className={classes.highlight}>Steps To Write A Good Question</span>
    </h3>

    <div className={classes.questionContainer}>
      <h2 className={classes.questionTitle}>How to Ask a Good Question</h2>
      <div className={classes.questionList}>
        <ul className={classes.questionListUl}>
          <li className={classes.questionItem}>
            <span className={classes.icon}>📝</span>
            Summarize your problem in a one-line title.
          </li>
          <li className={classes.questionItem}>
            <span className={classes.icon}>📜</span>
            Describe your problem in more detail.
          </li>
          <li className={classes.questionItem}>
            <span className={classes.icon}>🔍</span>
            Explain what you have tried and what you expected to happen.
          </li>
          <li className={classes.questionItem}>
            <span className={classes.icon}>✅</span>
            Review your question and post it to the site.
          </li>
        </ul>
      </div>
    </div>

    </div>
    <h4 className={classes.highlight}>Post Your Question</h4>
    <div className={classes.question__header__titleTwo}>
      <form onSubmit={handleSubmit} className={classes.question__form}>
        <input
          className={classes.question__title2}
          ref={titleDom}
          type="text"
          placeholder="Question title"
          required
        />
        <textarea
          rows={4}
          className={classes.question__description}
          ref={descriptionDom}
          type="text"
          placeholder="Question Description..."
          required
        />
        <div className={classes.buttonContainer}>
          <button
            className={classes.question__button}
            type="submit"
          >
            Post Question
          </button>
          <Link to="/">
            <button
              className={classes.question__btn}
              type="button"
            >
              Back to Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>

    </Layout>
  );
}

export default AskQuestion;
