import React from "react";
import {IconButton, Grid} from "@mui/material";
import styles from './page.module.css'
import prisma from "@/src/db";
import ContactForm from "@/src/components/contactForm/ContactForm";
import Header from '@/src/components/header/Header'

export default async function Home() {

    const contacts = await prisma.contact.findMany();

    return (
        <main>
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
                    <Header/>
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
                    justifyContent="center"
                >
                    <ContactForm hasPhoto={false}/>
                </Grid>
                <Grid item xs={2} md={3}>

                </Grid>
            </Grid>
        </main>
    )
}
