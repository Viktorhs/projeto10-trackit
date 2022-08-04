import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../CSS/GlobalStyle'
import Registration from './Registration/ Registration';
import Login from './Login/Login';
import PrivatePage from './PrivatePage';
import Today from './Today/Today';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';
import Habits from './Habits/Habits';

export default function App() {

    const [user, setUser] = useState({})
    const [userHabits, setUserHabits] = useState({})

    return (
        <UserContext.Provider value={{user, setUser, userHabits, setUserHabits}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<Registration />} />
                    <Route path='/hoje' element={
                        <PrivatePage>
                            <Today />
                        </PrivatePage>
                    } />
                    <Route path='/habitos' element={
                        <PrivatePage>
                            <Habits/>
                        </PrivatePage>
                    } />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}