'use client'
import {IconButton, Grid, Button} from "@mui/material";
import styles from '../../app/page.module.css'
import headerStyles from './Header.module.css'
import Avatar from '@mui/material/Avatar';

interface Props {
    handleOpenDialog: () => void
}

const Header = (props: Props) => {
   
    return (
        <Grid
            container
            alignItems='center'
            ml={2}
        >
            <Grid item xs={6}>
                <h1 className={headerStyles.headerFontSize}>
                    Contacts
                </h1>
            </Grid>
            <Grid
                item
                container
                xs={6}
                justifyContent='flex-end'
                spacing={2}
                alignItems='center'
                pr={2}
                flexWrap="nowrap"
            >
                <Grid item >
                    <IconButton disabled className={`${styles.icon} ${headerStyles.iconSize}`}>
                        <img src="/icons/Settings.png" alt="settings icon"/>
                    </IconButton>
                </Grid>
                <Grid item >
                    <Avatar src="/icons/photo.jpeg" sx={{height: '20px', width: '20px' }}/>
                </Grid>
                <Grid item  > 
                    <Button
                        className={headerStyles.addBtn}
                        onClick={props.handleOpenDialog}
                    >
                        <img src="/icons/Add.png" alt="add icon" className={headerStyles.iconSize}/>
                        <span className='text' style={{color: 'white'}}>
                            Add&nbsp;
                        </span>

                        <span className={`text ${headerStyles.addBtnText}`} style={{color: 'white'}}>
                            new
                        </span>
                    </Button>
                    <IconButton
                        className={headerStyles.addIconBtn}
                        onClick={props.handleOpenDialog}
                    >
                       <img src="/icons/Add.png" alt="add icon" className={headerStyles.iconSize}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header
