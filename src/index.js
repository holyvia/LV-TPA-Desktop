import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Navbar from './pages/navbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EditProfile from './pages/EditProfile';
import WorkspaceGallery from './pages/WorkspaceGallery';
import BoardGallery from './pages/BoardGallery';
import BoardDetail from './pages/BoardDetail';
import './output.css'
import { AuthContextProvider } from './pages/AuthContext';
import Kanban from './pages/kanban';
import ViewMember from './pages/ViewMember';
import InvitingView from './pages/InvitingView';
import SignInForJoinWorkspace from './pages/SignInFromWorkspaceInvitation';
import Invitation from './pages/Invitation';
import ViewNotification from './pages/ViewNotification';
// import { Calendar } from 'react-big-calendar';
export const currUserContext = React.createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<currUserContext.Provider>
  <AuthContextProvider>
    <React.StrictMode>
      <Router>
          <Routes>
            <Route exact path = "/signIn/:documentID" element={<SignInForJoinWorkspace/>}/>
            <Route exact path = "/notif/:id" element={<ViewNotification/>}/>
            <Route exact path = "/invitation/:id/:documentID" element={<Invitation/>}/>
            <Route exact path = "/signIn" element={<SignIn/>}/>
            <Route exact path = "/seeMember/:id/:workspaceID" element={<ViewMember/>}/>
            <Route exact path = "/addMember/:id/:workspaceID"element={<InvitingView/>}/>
            <Route exact path = "/editProfile/:id" element={<EditProfile/>}/>
            <Route exact path = "/home/:id" element={<WorkspaceGallery/>}/>
            <Route exact path = "/home/:id/:workspaceID" element={<BoardGallery/>}/>
            <Route exact path = "/home/:id/:workspaceID/:boardID" element={<BoardDetail/>}/>
            <Route exact path = "/kanban" element={<Kanban/>}/> 
            {/* <Route exact path = "/" element = {<Calendar/>}/> */}
            <Route exact path = "/" element={<SignUp/>}/>
          </Routes>
        </Router>
    </React.StrictMode>
  </AuthContextProvider>
  // <Kanban></Kanban>
  // <ViewMember/>
  // <BoardGallery/>
  // <SignUp/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
