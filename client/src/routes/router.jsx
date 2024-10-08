import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Home from '../pages/Home/Home'
import AskQuestion from "../pages/Question/AskQuestion/AskQuestion";
import HowItWorks from "../pages/Howitworks/HowItWorks";
import Terms from '../components/Footer/Terms'
import Privacy from '../components/Footer/Privacy'
import PrivacyPolicy from '../pages/privacy-policy/Privacy-police'
import QuestionAndAnswer from "../pages/QuestionAndAnswer/QuestionAndAnswer";
import Answer from "../pages/Answer/Answer";
import AuthLayout from "../pages/AuthLayout/AuthLayout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
function AppRouter() {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/ask" element={<AskQuestion/>}/>
                <Route path="/question/:questionId" element={<QuestionAndAnswer/>}/>
                <Route path='/howitworks' element={<HowItWorks/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
                <Route path="/auth" element={<AuthLayout/>} />
                <Route path="*" element={<PageNotFound/>} />


            </Routes>
    
  );
}

export default AppRouter;
