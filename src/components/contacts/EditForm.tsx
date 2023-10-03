'use client'
import React, { useRef, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {Grid, Avatar, Dialog, IconButton} from "@mui/material";
import styles from './ContactForm.module.css'
import { ContactWithId } from '@/prisma/seed';
import { awsUrl } from '@/src/s3';

interface FormData {
    name: string;
    phone: string;
    email: string;
    hasPhoto: boolean;
    photo?: string
}

interface Props {
    dialogOpen: boolean;
    handleCloseDialog: () => void;
    onDataUpdate: () => void;
    contact: ContactWithId
  }

const EditForm = (props: Props) => {

    const initialFormData: FormData = {
        name: props.contact.name,
        phone: props.contact.phone,
        email: props.contact.email,
        hasPhoto: props.contact.hasPhoto,
        photo: props.contact.hasPhoto ? `${awsUrl}${props.contact.id}` : ''
    };

    const emptyFormData: FormData = {
        name: "",
        phone: "",
        email: "",
        hasPhoto: false,
    }

    const [formData, setFormData] = useState<FormData>(emptyFormData);
    const [image, setImage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
     
    const handleFileInputButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileDeleteButtonClick = () => {
        URL.revokeObjectURL(image);
        setImage('');
        fileInputRef.current!.value = '';
    }

    const handleFileChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const newImage = event.target.files[0];
        if (newImage) {
            const imageObjectUrl = URL.createObjectURL(newImage);
            setImage(imageObjectUrl);
            setFormData({...formData, hasPhoto: false})
        }
      };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.handleCloseDialog();
        try {
            await axios.put(`/api/${props.contact.id}`, JSON.stringify(formData));
            if (image) {
                URL.revokeObjectURL(image);
                setImage('');
                fileInputRef.current!.value = ''
            }
            props.onDataUpdate();
            setFormData(emptyFormData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog
        open={props.dialogOpen}
        onClose={props.handleCloseDialog}
        aria-labelledby="modal-modal-edit-contact-dialog"
        aria-describedby="modal-modal--contact-dialog"
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
                    <h2>Edit Contact</h2>
                </Grid>
                
                <Grid
                    item
                    container
                    spacing={2}
                    alignItems='center'
                    justifyContent={image? 'space-between' : 'flex-start'}
                >
                    <Grid item >
                        <Avatar
                            src={formData.hasPhoto? initialFormData.photo : image}
                            sx={{width: '60px', height: '60px'}}
                        />
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
                            <IconButton
                                onClick={handleFileDeleteButtonClick}
                                className={styles.deleteIcon}>
                                <img 
                                    src={`/icons/Delete.png`} 
                                    alt="delete icon" 
                                />
                            </IconButton>
                        </Grid>
                    }
                </Grid>
                
                <Grid
                    item
                    container
                    flexDirection='column'
                >
                    <form onSubmit={handleSubmit}>
                        <Grid
                            item
                            container
                            direction='column'
                            rowGap={1.5}
                        >
                            <Grid item>
                                <label htmlFor="name" className={styles.labelColor}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    placeholder={initialFormData.name}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    autoComplete="off"
                                />
                            </Grid>
                            
                            <Grid item>
                                <label htmlFor="phone" className={styles.labelColor}>
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder={initialFormData.phone}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor="email" className={styles.labelColor}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder={initialFormData.email}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                className={styles.footerContainer}
                                justifyContent='flex-end'
                            >
                                <button
                                    type='reset'
                                    className={styles.cancelBtn}
                                    onClick={ () => {
                                        props.handleCloseDialog();
                                        handleFileDeleteButtonClick();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    onClick={props.handleCloseDialog}
                                >
                                    Done
                                </button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
        </Grid>
        </Dialog>
    );
};

export default EditForm
