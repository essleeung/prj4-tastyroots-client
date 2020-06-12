import React from 'react';
import { Link } from 'react-router-dom';
import { List, Icon, Image } from 'semantic-ui-react'
import FamilyAddModal from '../components/FamilyAddModal'
import FamilyCircleJoin from './FamilyCircleJoin';

const UserFamily = props => {
    if (!props.userDetails.families) {
        var family = (
            <List.Item>
                No family circles yet.
            </List.Item>
        )
    }


    var family = props.userDetails.families.map(fam => {
        if (!fam._id) {
            return (
                <List.Item>
                    -
                </List.Item>
            )
        }
        return (
            <List.Item key={fam._id._id}>
                <Icon name='users' />
                <List.Content>
                    <List.Header as={Link} to={`/familycircle/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                    {fam.userRole === 'creator' ? <List.Description>Family Token: {fam._id.familyToken}</List.Description> : <List.Description>Member</List.Description>}
                </List.Content>
            </List.Item>
        )
    })


    return (
        <List relaxed='very'>
            <h2>My Family Circles</h2>
            {family}
            <List.Item>
                {/* <Icon name='add' /> Join a family circle */}
                <FamilyAddModal userDetails={props.userDetails}/>
                <FamilyCircleJoin/>
            </List.Item>
        </List>

    )
}

export default UserFamily
