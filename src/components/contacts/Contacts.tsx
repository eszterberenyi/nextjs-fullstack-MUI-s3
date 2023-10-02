'use client'
import {IconButton, Grid} from "@mui/material";
import styles from "@/src/app/page.module.css"
import ContactForm from "@/src/components/contacts/ContactForm";
import Header from '@/src/components/header/Header';
import React, { useState, useEffect } from 'react';
import Contact from '@/src/components/contacts/Contact';
import { ContactWithId } from "@/prisma/seed";
import axios from 'axios';

interface Props {
    contactsData: ContactWithId[]
}

const Contacts = (props: Props) => {
    const [data, setData] = useState(props.contactsData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const fetchData = async () => {
        try {
          const response = await axios.get('/api/contacts');
          const newData = response.data;
          setData(newData);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
      }, []);
    

    return (
        <>
            <Grid
                container
                className={styles.thinContainer}
            >
                <Grid item xs={2} md={3} className={styles.bordered}>

                </Grid>
                <Grid item xs={8} md={6} className={styles.bordered}>

                </Grid>
                <Grid item xs={2} md={3}>

                </Grid>
            </Grid>

            <Grid
                container
                className={styles.thinContainer}
            >
                <Grid
                    container
                    item
                    xs={2}
                    md={3}
                    sx={{borderRight: '1px solid #282828'}}
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <IconButton disabled className={styles.icon}>
                        <img src="/icons/Back_arrow.png" alt="back arrow icon"/>
                    </IconButton>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    md={6}
                    className={styles.bordered}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Header handleOpenDialog={handleOpenDialog}/>
                </Grid>
                <Grid
                    container
                    item
                    xs={2}
                    md={3}
                    alignItems="center"
                >
                    <IconButton disabled className={styles.icon}>
                        <img src="/icons/Light_mode.png" alt="light mode icon"/>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid
                container
                sx={{ height: '80vh' }}
            >
                <Grid item xs={2} md={3} className={styles.bordered}>

                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    md={6}
                    className={styles.bordered}
                    alignItems="center"
                    justifyContent="flex-start"
                    direction='column'
                    rowGap={2}
                    pt={2}
                    pl={2}
                >
                    {data.map((contact => 
                        <Contact contactData={contact} key={contact.id}/>    
                    ))}
                </Grid>
                <Grid item xs={2} md={3}>

                </Grid>
            </Grid>
            <ContactForm onDataUpdate={fetchData} dialogOpen={dialogOpen} handleCloseDialog={handleCloseDialog}/>
        </>
    )
}

export default Contacts
