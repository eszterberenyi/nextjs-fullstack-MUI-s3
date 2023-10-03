'use client'
import {IconButton, Grid, Avatar} from "@mui/material";
import React, {useState, MouseEvent} from 'react'
import { ContactWithId } from "@/prisma/seed";
import { awsUrl } from "../../s3";
import styles from './Contact.module.css';
import DesktopPopover from '@/src/components/popover/DesktopPopover';
import MobilePopover from '@/src/components/popover/MobilePopover';
import axios from 'axios';

interface Props {
    contactData: ContactWithId
    onDataUpdate: () => void;
}

const Contact = (props: Props) => {
    const [mouseAnchorEl, setMouseAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [touchAnchorEl, setTouchAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleMouseClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMouseAnchorEl(event.currentTarget);
    };

    const handleMouseClose = () => {
        setMouseAnchorEl(null);
    };

    const handleTouchClick = (event: MouseEvent<HTMLButtonElement>) => {
        setTouchAnchorEl(event.currentTarget);
    };

    const handleTouchClose = () => {
        setTouchAnchorEl(null);
    };

    const mousePopoverOpen = Boolean(mouseAnchorEl);
    const touchPopoverOpen = Boolean(touchAnchorEl);

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          const { id } = props.contactData;
          await axios.delete(`/api/${id}`);
          props.onDataUpdate();
        //   props.onDataUpdate();
        } catch (error) {
          console.error('Error:', error);
        }
    };

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
                    <h3 className={styles.contactName}>
                        {props.contactData.name}
                    </h3>
                </Grid>
                <Grid item>
                    <p className={`message ${styles.phoneNumber}`} style={{color: 'rgba(255, 255, 255, 0.56)'}}>
                        {props.contactData.phone}
                    </p>
                </Grid>
            </Grid>

            <Grid
                item
                container
                justifyContent="flex-end"
                spacing={2}
                pr={1}
                className={`${mousePopoverOpen ? styles.hoverableIconsVisibityUnderPopOver : styles.hoverableIcons}`}
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
                    <IconButton
                        className={`${styles.icon} ${styles.moreIcon}`}
                        size='small'
                        onClick={handleMouseClick}
                    >
                        <img src="/icons/More.png" alt="more options icon" className={styles.iconImg}/>
                    </IconButton>

                   <DesktopPopover
                        mousePopoverOpen={mousePopoverOpen}
                        mouseAnchorEl={mouseAnchorEl}
                        handleMouseClose={handleMouseClose}
                        handleDelete={(e) => handleDelete(e)}
                   />

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
                    <IconButton
                        size='small'
                        onClick={handleTouchClick}
                        className={`${styles.icon} ${styles.moreIcon}`}
                    >
                        <img src="/icons/More.png" alt="more options icon" className={styles.iconImg}/>
                    </IconButton>
                </Grid>

                <MobilePopover
                    handleTouchClose={handleTouchClose}
                    touchAnchorEl={touchAnchorEl}
                    touchPopoverOpen={touchPopoverOpen}
                />
                
            </Grid>

        </Grid>
    )
}

export default Contact
