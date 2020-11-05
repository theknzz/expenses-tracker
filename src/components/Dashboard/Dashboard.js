import React from 'react'
import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`

const Dashboard = () => {
    return(
        <Container>
            <h1>Dashborad</h1>
        </Container>
    );
}

export default Dashboard

