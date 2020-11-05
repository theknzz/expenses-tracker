import React from 'react'
import TopBar from "./components/TopBar/TopBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Menu from "./components/Menu/Menu";
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    height: 100%;
`

const LeftWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    min-width: 5vw;
    min-height: 100vh;
    background-color: lightgreen;
    flex: 0;
`

const RightWrapper = styled.div`
    flex: 1;
    background-color: lightblue;
    display: flex;
    flex-flow: column nowrap;
`

function App() {
  return (
    <div className="App">
        <Container>
            <LeftWrapper>
                <Menu />
            </LeftWrapper>
            <RightWrapper>
                <TopBar />
                <Dashboard />
            </RightWrapper>
        </Container>
    </div>
  );
}

export default App;
