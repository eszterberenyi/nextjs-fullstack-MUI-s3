import {IconButton, Grid, Popover} from "@mui/material";
import styles from '../contacts/Contact.module.css';
import React, {MouseEvent} from 'react'

interface Props {
    mousePopoverOpen: boolean;
    mouseAnchorEl: HTMLButtonElement | null;
    handleMouseClose: () => void;
    handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
    handleOpenDialog: () => void
}


const DesktopPopver = (props: Props) => {
    return (
        <Popover
            open={props.mousePopoverOpen}
            anchorEl={props.mouseAnchorEl}
            onClose={props.handleMouseClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            PaperProps = {{
                style: { backgroundColor: '#1E1E1E', padding: '8px 20px 8px 8px' }
            }}
        >
            <Grid container direction='column'>
                <Grid item className={styles.activeIcon}>
                    <IconButton
                        className={styles.icon}
                        size="small"
                        disableRipple
                        onClick={props.handleOpenDialog}
                    >
                        <img src="/icons/Settings.png" alt="edit icon" className={styles.iconImg}/>
                        <span  className="text" style={{color: 'white', marginLeft: '5px'}}>
                            Edit
                        </span>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton disabled className={styles.icon} size="small">
                        <img src="/icons/Favourite.png" alt="favourite icon" className={styles.iconImg}/>
                        <span  className="text" style={{color: 'white', marginLeft: '5px'}}>
                            Favourite
                        </span> 
                    </IconButton>
                </Grid>
                <Grid item className={styles.activeIcon}> 
                    <IconButton
                        disableRipple
                        className={`${styles.icon}`}
                        size="small"
                        onClick={(e) => props.handleDelete(e)}
                    >
                        <img src="/icons/Delete.png" alt="delete icon" className={styles.iconImg}/>
                        <span className="text" style={{color: 'white', marginLeft: '5px'}}>
                            Remove
                        </span>
                    </IconButton>
                </Grid>
            </Grid>
        </Popover>
    )
}

export default DesktopPopver;
