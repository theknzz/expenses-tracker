import React from 'react'
import styled from "@emotion/styled";
import Wallets from "./Wallets";
import Transactions from "./Transactions";

const Container = styled.div`
    display: flex;
    height: 100%;
    padding: 100px;
    justify-content: space-between;
`

const Dashboard = () => {
    return(
        <Container>
            <Wallets />
            <Transactions />
        </Container>
    );
}

export default Dashboard

