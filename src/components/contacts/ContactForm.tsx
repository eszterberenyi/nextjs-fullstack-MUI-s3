'use client'
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {Grid, Avatar, Dialog, IconButton} from "@mui/material";
import styles from './ContactForm.module.css'
import { generateUploadURL } from "@/src/s3";

interface FormData {
    name: string;
    phone: string;
    email: string;
    hasPhoto: boolean;
    photo: string
}

const initialFormData: FormData = {
    name: '',
    phone: '',
    email: '',
    hasPhoto: false,
    photo: ''
};

const ContactForm = ({dialogOpen, handleCloseDialog}) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [image, setImage] = useState(null);
    // const [imageData, setImageData] = useState(null);
    // const [binaryImage, setBinaryImage] = useState<string>(''); // State to hold the binary string
    const fileInputRef = useRef(null);
     
    const handleFileInputButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileDeleteButtonClick = () => {
        URL.revokeObjectURL(image);
        setImage(null);
        fileInputRef.current.value = '';
        // setFormData({...formData, photo: '', hasPhoto:false});
        // setBinaryImage(''); // Clear the binary image when the image is deleted
        // setImageData(null)
    }

    const handleFileChanged = (event) => {
        const newImage = event.target?.files[0];
        if (newImage) {
            const imageObjectUrl = URL.createObjectURL(newImage);
            // setFormData({...formData, photo: newImage, hasPhoto: true})
            setImage(imageObjectUrl);
            // const reader = new FileReader();
            // reader.onload = (e) => {
            //     const binaryString = e.target.result as string;
            //     setBinaryImage(binaryString);
            // };
            // reader.readAsBinaryString(newImage);
            // setImageData(newImage);
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/contacts", JSON.stringify(formData));
            
            // const res = await axios.put(url, fileInputRef.current.files[0])
            setFormData(initialFormData);
            URL.revokeObjectURL(image);
            setImage(null);
            fileInputRef.current.value = ''
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="modal-modal-add-contact-dialog"
        aria-describedby="modal-modal-add-contact-dialog"
        PaperProps={{
            elevation: 0,
            sx: {
              color: 'inherit',
              boxShadow: 'none',
              backgroundColor: 'inherit',
              minWidth: '300px'
            }
          }}

      >
       <Grid container
            direction='column'
            alignItems='flex-start'
            className={styles.mainContainer}
        >
                <Grid item>
                    <h2>Add Contact</h2>
                </Grid>
                
                <Grid item container spacing={2} alignItems='center' justifyContent={image? 'space-between' : 'flex-start'}>
                    <Grid item >
                        <Avatar src={image} sx={{width: '60px', height: '60px'}}/>
                    </Grid>
                    <Grid item>
                        <IconButton
                            className={styles.addPictureBtn}
                            size='small'
                            onClick={handleFileInputButtonClick}
                        >
                            <input
                                ref={fileInputRef}
                                accept="image/*"
                                // name="photo"
                                // id="photo"
                                type="file" 
                                hidden
                                onChange={handleFileChanged}
                            />  
                            <img 
                                src={`/icons/${image ? 'Change' : 'Add'}.png`} 
                                alt="add icon" 
                            />
                            <span  style={{color: 'white'}}>
                                {image ? 'Change picture' : 'Add picture'}
                            </span>
                        </IconButton>
                    </Grid>
                    {
                        image &&
                        <Grid item >
                            <IconButton onClick={handleFileDeleteButtonClick} className={styles.deleteIcon}>
                                <img 
                                    src={`/icons/Delete.png`} 
                                    alt="delete icon" 
                                />
                            </IconButton>
                        </Grid>
                    }
                </Grid>
                
                <Grid item container flexDirection='column'>
                <form onSubmit={handleSubmit}>
                    <Grid item container direction='column' rowGap={1.5}>
                        <Grid item>
                            <label htmlFor="name" className={styles.labelColor}>Name</label>
                            
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.textInput}
                            />
                        </Grid>
                        
                        <Grid item>
                            <label htmlFor="phone" className={styles.labelColor}>Phone number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={styles.textInput}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="email" className={styles.labelColor}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.textInput}
                            />
                        </Grid>
                        <Grid item container className={styles.footerContainer} justifyContent='flex-end'>
                            <button type='reset' className={styles.cancelBtn} onClick={ () => {
                                handleCloseDialog();
                                handleFileDeleteButtonClick();
                            }
                            }>
                                Cancel
                            </button>
                            <button type="submit" className={styles.submitBtn}>Done</button>
                        </Grid>
                    </Grid>
                </form>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default ContactForm
