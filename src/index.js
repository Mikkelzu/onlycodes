import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* main Element */
import App from './App';

/* Route Elements */
import Home from './routes/home';
import Feed from './routes/feed/feed';
import Profile from './routes/profile/profile';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Someone from './routes/profile/someone';
import Preferences from './routes/preferences';

/* Chakra ui */
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';


/*  Logging etc  */
import reportWebVitals from './reportWebVitals';

import './index.css'
import theme from './theme';

/* React Query */
import { QueryClient, QueryClientProvider } from 'react-query'
import SinglePost from './routes/feed/single-post';
import Kill from './routes/auth/force-logout';


/* entry point */
function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/Login" />
}

function useAuth() {
    return true;
}

const queryClient = new QueryClient();
const root = document.getElementById('root');

render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<App />}>
                        <Route path="/" element={
                            <Home />
                        } />
                        <Route path="/Feed" element={
                            <PrivateRoute>
                                <Feed />
                            </PrivateRoute>
                        } />

                        <Route path='/Post'>
                            <Route path=':id' element= {
                                <SinglePost />
                            }/>
                            </Route>

                        <Route path="/">
                            <Route path="/Profile">
                                <Route path=":id" element={
                                    <PrivateRoute>
                                        <Someone />
                                    </PrivateRoute>
                                } />
                            </Route>
                            <Route path='/Self'>
                                <Route path=":id" element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                } />
                                <Route path=':id'>
                                    <Route path="Preferences" element={
                                        <PrivateRoute>
                                            <Preferences />
                                        </PrivateRoute>
                                    } />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/kill" element={<Kill />} />

                        {/* No match Route should always be at the bottom. */}
                        <Route path="*" element={<div>404 Page Not Found</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </QueryClientProvider>,
    root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
