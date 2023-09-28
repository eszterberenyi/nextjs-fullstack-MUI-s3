import React from "react";
import {IconButton, Grid} from "@mui/material";

export default function Home() {

    return (
        <main>
            <Grid
                container
                sx={{
                    height: '10vh',
                    borderBottom: '1px solid #282828',
                }}
            >
                <Grid item xs={2} md={3} sx={{borderRight: '1px solid #282828'}}>

                </Grid>
                <Grid item xs={8} md={6} sx={{borderRight: '1px solid #282828'}}>

                </Grid>
                <Grid item xs={2} md={3}>

                </Grid>
            </Grid>

            <Grid
                container
                sx={{
                    height: '10vh',
                    borderBottom: '1px solid #282828'
                }}
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
                    <IconButton disabled sx={{color: 'white', paddingRight: '16px'}}>
                        <img src="/icons/Back_arrow.png" alt="back arrow icon"/>
                    </IconButton>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    md={6}
                    sx={{borderRight: '1px solid #282828'}}
                    alignItems="center"
                    justifyContent="center"
                >
                    <h1>Contacts</h1>
                </Grid>
                <Grid
                    container
                    item
                    xs={2}
                    md={3}
                    alignItems="center"
                >
                    <IconButton disabled sx={{color: 'white', paddingLeft: '16px'}}>
                        <img src="/icons/Light_mode.png" alt="light mode icon"/>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid
                container
                sx={{ height: '80vh' }}
            >
                <Grid item xs={2} md={3} sx={{borderRight: '1px solid #282828'}}>

                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    md={6}
                    sx={{borderRight: '1px solid #282828'}}
                    alignItems="center"
                    justifyContent="center"
                >
                    <h1>People</h1>
                </Grid>
                <Grid item xs={2} md={3}>

                </Grid>
            </Grid>
        </main>
    )
}
