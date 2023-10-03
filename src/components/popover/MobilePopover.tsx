import {IconButton, Grid, Popover} from "@mui/material";
import styles from '../contacts/Contact.module.css'
import {MouseEvent} from 'react'

interface Props {
    touchPopoverOpen: boolean;
    touchAnchorEl: HTMLButtonElement | null;
    handleTouchClose: () => void;
    handleOpenDialog: () => void;
    handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MobilePopover = (props: Props) => {
    return (
        <Popover
            open={props.touchPopoverOpen}
            anchorEl={props.touchAnchorEl}
            onClose={props.handleTouchClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            PaperProps = {{
                style: { backgroundColor: '#1E1E1E', padding: '8px 20px 8px 8px' }
            }}
        >
            <Grid container direction='column'>
                <Grid item>
                    <IconButton disabled className={styles.icon} size='small'>
                        <img src="/icons/Mute.png" alt="mute icon" className={styles.iconImg}/>
                        <span  className="text" style={{color: 'white', marginLeft: '5px'}}>
                            Mute
                        </span>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton disabled className={styles.icon} size="small">
                        <img src="/icons/Call.png" alt="call icon" className={styles.iconImg}/>
                        <span  className="text" style={{color: 'white', marginLeft: '5px'}}>
                            Call
                        </span>
                    </IconButton>
                </Grid>
                <Grid item>
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
                <Grid item className={styles.removeIcon}> 
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

export default MobilePopover;
