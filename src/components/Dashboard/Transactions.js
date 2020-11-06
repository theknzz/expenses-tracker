import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {listTransactions} from "../../store/actions/transactionsActions";
import styled from "@emotion/styled";


const Container = styled.div`
    flex: 1;
`


const Transactions = ({ transactions, list }) => {

    useEffect(() => {
        list();
    }, [])

    return (
        <Container>
            <h1>Transactions</h1>
            { transactions.map(transaction => {
                return (
                    <span key={transaction.id}>{transaction.name}</span>
                );
            })}
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions.transactions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        list: () => dispatch(listTransactions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)