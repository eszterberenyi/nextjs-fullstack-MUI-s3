'use client'
import {IconButton, Grid, Avatar} from "@mui/material";
import React from 'react'
import { ContactWithId } from "@/prisma/seed";
import { awsUrl } from "../../s3";

interface Props {
    contactData: ContactWithId
}

const Contact = (props: Props) => {
    return (
        <Grid container key={props.contactData.id}>
            <Grid item xs={2}>
                <Avatar
                    src={ props.contactData.hasPhoto ? `${awsUrl}${props.contactData.id}` : ''}
                />
            </Grid>
            <Grid item container direction='column' xs={6} rowGap={1}>
                <Grid item>
                    <h3>{props.contactData.name}</h3>
                </Grid>
                <Grid item>
                    <p className="message" style={{color: 'rgba(255, 255, 255, 0.56)'}}>{props.contactData.phone}</p>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Contact
