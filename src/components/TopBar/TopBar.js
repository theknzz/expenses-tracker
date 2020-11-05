import React, { useState } from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { signIn, signOut } from "../../store/actions/authActions";
import {addTransition, listTransitions} from "../../store/actions/transitionsActions";
import PromptDialog from "./PromptDialog";

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

const TopBar = ({ signIn, signOut, user, add, list, error} ) => {

    const content = user ? (
        <Container>
            <h1 onClick={ () => list()}>{user ? user.displayName : 'undefined'}</h1>
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
        list: () => dispatch(listTransitions()),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.transitions.error,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

