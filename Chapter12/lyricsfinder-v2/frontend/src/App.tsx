import React from 'react';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Lyrics } from './pages/lyrics';
import Container from 'react-bootstrap/Container';

const App: React.FC = () => {

    return (
        <Container>
            <Jumbotron>
                <h1>LyricsFinder v2</h1>
                <p>
                    This will become the number one source of lyrics on the Interwebs.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            <BrowserRouter>
                <Route exact path='/' component={Home} />
                <Route path='/lyrics' component={Lyrics} />
            </BrowserRouter>
        </Container>
    );
};

export default App;
