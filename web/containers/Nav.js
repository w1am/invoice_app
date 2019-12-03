import React from 'react';

import Body from '../components/NagivationBar/Body';
import List from '../components/NagivationBar/List';
import Anchor from '../components/NagivationBar/Anchor';
import decode from 'jwt-decode'
import CompanyName from '../components/NagivationBar/CompanyName';
import SignOutList from '../components/NagivationBar/SignOutList';


let name;
const isAuthenticated = () => {
    try {
        const currentUser = decode(localStorage.getItem('token', {header: true})).user
        if (currentUser.id) {
            name = currentUser.companyName
            return true
        }
    } catch(err) {
        return false
    }
}

export default () => (
    isAuthenticated() ? (
        <Body>
            <CompanyName><Anchor href="/profile">{name.toUpperCase()}</Anchor></CompanyName>
            <List><Anchor href="/">Home</Anchor></List>
            <List><Anchor href="/create">Create</Anchor></List>
            <List><Anchor href="/clients">Clients</Anchor></List>
            <SignOutList><Anchor href="/signout">Sign out</Anchor></SignOutList>
        </Body>
    ) : (
            <Body>
                <List><Anchor href="/">Home</Anchor></List>
                <List><Anchor href="/message">Message</Anchor></List>
                <List><Anchor href="/register">Register</Anchor></List>
                <List><Anchor href="/signin">Sign in</Anchor></List>
            </Body>
        )
)