import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { signIn, signOut } from "../../store/actions/authActions";
import {addTransition} from "../../store/actions/transitionsActions";
import PromptDialog from "./PromptDialog";
import {createWallet, getWallets} from "../../store/actions/walletActions";

const Container = styled.div`
    display: flex;
    min-height: 10vh;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    background-color: orange;
`

const Button = styled.button`
    background-color: green;
    border: none;
    padding: 20px;
    color: white;
    text-transform: uppercase;
`

const TopBar = ({ signIn, signOut, user, add, list, error, getWallets, wallets, createWallet} ) => {

    useEffect(() => {
        user && getWallets();
    }, [])

    const content = user ? (
        <Container>
            <Button onClick={() => {
                getWallets()
                console.log(wallets)
            }}>Get Wallets</Button>
            <Button onClick={() => {
                createWallet({
                    name: 'new_wallet',
                    amount: '420',
                    icon: 'http://placecorgi.com/50/50',
                })
                getWallets()
                console.log('create')
            }}>Create Wallet</Button>
            <PromptDialog add={add}/>
            <Button onClick={() => signOut()}>Logout</Button>
        </Container>
    ) :
        <Container>
            <Button onClick={() => signIn()}>Login</Button>
        </Container>

    return(
        <>
            {content}
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
        signOut: () => dispatch(signOut()),
        add: (transtion) => dispatch(addTransition(transtion)),
        getWallets: () => dispatch(getWallets()),
        createWallet: (wallet) => dispatch(createWallet(wallet)),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.transitions.error,
        wallets: state.wallet.wallets,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

