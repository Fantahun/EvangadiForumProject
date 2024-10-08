import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HowItWorks.module.css";
import Layout from "../../Layout/Layout";
import { UserState } from "../../App";
import Header from "../../components/Header/Header";

const HowItWorks = () => {
  const {user}=useContext(UserState);
  const userId = user?.userid;


  return (
  //  <Layout>
     <div className={styles.container}>
      <h2 className={styles.title}>Purpose of the Platform</h2>
      <p className={styles.description}>
        The site’s purpose is to foster collaborative learning among students by
        enabling them to ask questions, answer peers, and review responses. It
        creates an interactive platform where students can share knowledge,
        support each other, and enhance their understanding through discussion
        and feedback.
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>User Authentication</h3>
          <p>
            Students begin by creating an account to access all features of the
            platform. This allows them to manage their profile, track their
            activity, and receive notifications.
          </p>
        </div>

        <div className={styles.step}>
          <h3>Q&A Features</h3>
          <p>
            Once registered, students can post questions related to their
            academic challenges or queries, providing a space for others to
            help.
            <br />
            Students also can browse existing questions and contribute by
            providing their answers, offering insights, solutions, or guidance.
          </p>
        </div>

        <div className={styles.step}>
          <h3>Review Answers</h3>
          <p>
            After reviewing the answers, students can rate them, helping to
            highlight the best responses and improve the overall quality of the
            platform.
          </p>
        </div>
      </div>

      <div className="parentContainer">
        
    {
      userId ? (
       <>
        <Link to={"/"}>Go to Home page</Link>
       </>):(
       
      <div className={styles.buttonContainer}>
          <Link to={"/auth"}>
            <button className={styles.signupButton}>Join us Sign Up Now</button>
          </Link>
          <span>
            Already have an account?
            <Link to="/auth" className={styles.login}>
              Login
            </Link>
          </span>
        </div> 
    )
    }
      </div>
    </div>
  //  </Layout>
  );
};

export default HowItWorks;
