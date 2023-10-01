'use client'
import React, { useState } from 'react';
import axios from 'axios';
import {Grid} from "@mui/material";
import styles from './ContactForm.module.css'

interface FormData {
    name: string;
    phone: string;
    email: string;
    hasPhoto: boolean
}

const initialFormData: FormData = {
    name: '',
    phone: '',
    email: '',
    hasPhoto: false
};

const ContactForm: React.FC = ({hasPhoto}) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/contacts", JSON.stringify(formData));
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div
            className={styles.mainContainer}
        >
            <div
                className={styles.formContainer}
            >
                <h2>Add Contact</h2>
                <form onSubmit={handleSubmit}>
                    {/* <Grid item container xs={12}>
                        <Grid item xs={12}> */}
                        <label htmlFor="name" className={styles.labelColor}>Name</label>
                        {/* </Grid>
                        <Grid item xs={12}> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.textInput}
                        />
                         {/* </Grid> */}
                    {/* </Grid> */}
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div className={styles.footerContainer}>
                        <button type='reset' className={styles.cancelBtn}>Cancel</button>
                        <button type="submit" className={styles.submitBtn}>Done</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm
