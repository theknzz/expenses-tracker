import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { signIn, signOut } from "../../store/actions/authActions";
import {addTransition} from "../../store/actions/transitionsActions";
import PromptDialog from "./PromptDialog";
import {
    addAmountToWallet,
    createWallet,
    deleteWallet,
    getWallets,
    subtractAmountToWallet
} from "../../store/actions/walletActions";

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

const TopBar = ({ signIn, signOut, user, add, list, error, getWallets, wallets, createWallet, deleteWallet, addAmount, subAmount } ) => {

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
            <Button onClick={() => {
                deleteWallet(wallets[0])
            }}>Delete first wallet</Button>
            <Button onClick={() => {
                addAmount(wallets[0].id, 50)
            }}>Add 50$</Button>
            <Button onClick={() => {
                subAmount(wallets[0].id, 50)
            }}>Sub 50$</Button>
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
        deleteWallet: (wallet) => dispatch(deleteWallet(wallet)),
        addAmount: (walletID, amount) => dispatch(addAmountToWallet(walletID, amount)),
        subAmount: (walletID, amount) => dispatch(subtractAmountToWallet(walletID, amount))
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

