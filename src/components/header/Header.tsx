'use client'
import {IconButton, Grid} from "@mui/material";
import styles from '../../app/page.module.css'
import headerStyles from './Header.module.css'
import Avatar from '@mui/material/Avatar';

const Header = ({handleOpenDialog}) => {
   

    return (
        <Grid container alignItems='center' ml={2}>
            <Grid item xs={6}>
                <h1 className={headerStyles.headerFontSize}>Contacts</h1>
            </Grid>
            <Grid item container xs={6} justifyContent='flex-end' spacing={2}  alignItems='center' pr={2} flexWrap="nowrap">
                <Grid item >
                    <IconButton disabled className={`${styles.icon} ${headerStyles.iconSize}`}>
                        <img src="/icons/Settings.png" alt="settings icon"/>
                    </IconButton>
                </Grid>
                <Grid item >
                    <Avatar src="/images/profile_placeholder.png" sx={{height: '20px', width: '20px', border: '1px solid white' }}/>
                </Grid>
                <Grid item  > 
                    <IconButton
                        className={headerStyles.addBtn}
                        size='small'
                        onClick={handleOpenDialog}
                    >
                        <img src="/icons/Add.png" alt="add icon" className={headerStyles.iconSize}/>
                        <span className={`text ${headerStyles.addBtnText}`} style={{color: 'white'}}>Add new</span>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
    
}

export default Header
