'use client'
import {IconButton, Grid, Avatar} from "@mui/material";
import React from 'react'
import { ContactWithId } from "@/prisma/seed";
import { awsUrl } from "../../s3";
import styles from './Contact.module.css'

interface Props {
    contactData: ContactWithId
}

const Contact = (props: Props) => {
    return (
        <Grid
            container
            key={props.contactData.id}
            sx={{ columnGap: { xs: 2, md: 0 } }}
            flexWrap='nowrap'
        >

            <Grid item xs={2}>
                <Avatar
                    src={ props.contactData.hasPhoto ? `${awsUrl}${props.contactData.id}` : ''}
                />
            </Grid>

            <Grid item container direction='column' xs={10} md={6} rowGap={1}>
                <Grid item>
                    <h3 className={styles.contactName}>{props.contactData.name}</h3>
                </Grid>
                <Grid item>
                    <p className={`message ${styles.phoneNumber}`} style={{color: 'rgba(255, 255, 255, 0.56)'}}>{props.contactData.phone}</p>
                </Grid>
            </Grid>

            <Grid
                item
                container
                justifyContent="flex-end"
                spacing={2}
                pr={1}
                className={styles.hoverableIcons}
            >
                <Grid item>
                    <IconButton disabled className={styles.icon} size='small'>
                        <img src="/icons/Mute.png" alt="mute icon" className={styles.iconImg}/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton disabled className={styles.icon} size="small">
                        <img src="/icons/Call.png" alt="call icon" className={styles.iconImg}/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton disabled className={styles.icon} size='small'>
                        <img src="/icons/More.png" alt="more options icon" className={styles.iconImg}/>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid
                 item
                 container
                 justifyContent="flex-end"
                 spacing={2}
                 pr={1}
                 className={styles.nonHoverableIcons}
            >
                <Grid item>
                    <IconButton disabled className={styles.icon} size='small'>
                        <img src="/icons/More.png" alt="more options icon" className={styles.iconImg}/>
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default Contact
