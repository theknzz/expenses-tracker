import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { createWallet, deleteWallet, getWallets } from "../../store/actions/walletActions";

import styled from '@emotion/styled'

const WalletsContainer = styled.div`
    flex: 1;
    background-color: #fff;
`

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
`

const Wallets = ({ wallets, list, createWallet, deleteWallet }) => {

    useEffect(() => {
        list();
    }, [])

    return (
        <Container>
            <h1>Wallets</h1>
            <WalletsContainer>
                {wallets.map(wallet => {
                    return <span key={wallet.id}>{wallet.name} - {wallet.amount}$</span>
                })}
            </WalletsContainer>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        wallets: state.wallet.wallets,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createWallet: (wallet) => dispatch(createWallet(wallet)),
        deleteWallet: (wallet) => dispatch(deleteWallet(wallet)),
        list: () => dispatch(getWallets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets)