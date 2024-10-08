import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../utility/axios";
import Layout from "../../Layout/Layout";
import styles from "./answer.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { UserState } from "../../App";
function QuestionAndAnswer() {
  const [questionDetails, setQuestionDetails] = useState({});
  const {user} = useContext(UserState);// Get the user data from the context
  const userId = user?.userid;// Get the user ID
  const { questionId } = useParams(); // Retrieves the `id` from the URL
  const [loading, setLoading] = useState(true);
  const answerInput =useRef();// Create a reference to the answer input
  // Retrieves the value of 'id' from the query string
  useEffect(() => {
    axiosInstance.get(`/question/${questionId}`).then((res) => {
      console.log(res.data);
      setQuestionDetails(res.data);
    });
  }, [questionId]);

  async function handlePostAnswer() {
    const response= await axiosInstance.post("/answer", {
        userid: userId,
        answer:answerInput.current.value,
        questionid:questionId
      })
    try {
      
    if(response.status ===201){
      console.log(response.data)
    }
    else{
      console.log("something went wrong")
    }
    } catch (error) {
      console.log(error)
    }


  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div style={{ display: "flex" }}>
            <div>
              <FaClipboardQuestion size={35} style={{ marginRight: "10px" }} />
            </div>
            <div>
              <h1 className={styles.questionTitle}>
                {questionDetails?.title}
              </h1>
              <p className={styles.questionDescription}>
                {questionDetails?.description}
              </p>
            </div>
          </div>

          <section className={styles.answerSection}></section>
          <h2 style={{ padding: "5px 0", textAlign: "left", fontWeight: "600" }}>
            <MdOutlineQuestionAnswer
              size={35}
              style={{ marginRight: "10px" }}
            />
            Answers From the Community:
          </h2>
          {questionDetails?.answers?.length > 0 ? (
            questionDetails?.answers?.map((answer) => (
              <div key={answer?.answerid} className={styles.answer_holder}>
                <div className={styles.account_holder}>
                  <MdAccountCircle size={40} />
                  <div className={styles.profileName}>{answer?.username}</div>
                </div>
                <div>
                  <p className={styles.answerText}>
                    {answer?.answer}
                  </p>
                  <p className={styles.answer_date}>{answer?.createdAt}</p>
                </div>
              </div>
            ))
          ) : (
            <p>
              <span style={{ color: "red", fontWeight: "bold" }}>
                No answers yet!
              </span>{" "}
              <br /> Be the first to contribute your answer and help the
              community.
            </p>
          )}

          <section className={styles.answerFormSection}>
            <h3 className={styles.answerFormTitle}>Answer The Top Question</h3>
            <Link to="/" className={styles.questionPageLink}>
              Go to Question page
            </Link>
        <form onSubmit={handlePostAnswer}>
        <textarea
              placeholder="Your Answer..."
              className={styles.answerInput}
              required
              ref={answerInput}
            />
            <button
              className={styles.postAnswerButton}
              type="submit"
            >
              Post Your Answer
            </button>
        </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionAndAnswer;
