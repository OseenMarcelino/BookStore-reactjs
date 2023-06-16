import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
//import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
//import { padding } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import LogoutIcon from '@mui/icons-material/Logout';
import { Formik } from "formik";
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Login = () => {

    //const [name, setName] = useState();
    // const [email, setEmail] = useState();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const Naviagte = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
            console.log("User detail: ", res.data)
            setUser(res.data)
        });
    }, []);

    const validationSchema = Yup.object().shape(
        {
            name: Yup.string().min(3, "Name should have atleast 3 characters.").required("Enter a name"),
            email: Yup.string().email("Enter valid email address.").required("Enter email"),
            password: Yup.string().min(4, "Enter password of lenght of atleast 4").required("Enter password"),

        });

    const initialValues = {
        name: "",
        email: "",
    };

    const onHomePageButtonClick = () => {
        Naviagte("/");
    }
    const onFormSubmit = async (values) => {

        console.log("Form submitted", values);
        //console.log("Name:", name);
        // console.log("Email:", email);
        //call for api to post submit the form
        const requestData = {
            userName: values.name,
            userEmail: values.email,
        };

        const userData = JSON.parse(localStorage.getItem(values.email))
        if (userData) {

            if (userData.password === values.password && userData.name === values.name) {
                if (values.name === 'admin' && values.password === 'oseen' && values.email === 'admin@book.com') {
                    Naviagte('/admin');
                    console.log("admin in")
                }
                
                else{console.log(userData.name)
                alert("login successful")

                const res = await axios.post("https://jsonplaceholder.typicode.com/posts", requestData);
                if (res.status === 201) {
                    console.log(res.data.id)
                    toast.success('API call completed successfully', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }


                axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
                    if (res.status === 200) {
                        console.log(res.data.id)
                        toast.success('Data is deleted successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                })
                Naviagte("/books")
            }
            } else {
                console.log("password no match")
                alert("Enter valid password")
            }
        }
        else {
            console.log("mo match")
            alert("Enter valid data")
        }


    };

    const handleClick = (event) => {
        console.log("123");
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    // alert("The button has been clicked.");

    return (
        <>
            <div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                    }}>

                    <div onClick={handleClick}
                        style={{
                            display: "flex",
                            justifyContent: "rigth",
                            alignItems: "center",
                            columnGap: 5,
                            //float:"right"
                        }}>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>OM</Avatar>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <h1> Login </h1>
                </div>


            </div>

            <div style={{
                padding: 5,
            }}>


                <div
                    style={{
                        padding: 5,
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 8,
                    }}>

                    <Container maxWidth="sm" color="black">
                        <Box sx={{ borderColor: "black", height: "flex" }}>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onFormSubmit}
                            >
                                {({ value, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginBottom: 5,
                                            }}>

                                            <TextField id="name" label="Name" name="name" variant="outlined" type="text" placeholder="Name" onChange={handleChange} onBlur={handleBlur} />
                                            {console.log("The error handler: ", touched, errors)}
                                            {touched.name &&
                                                <span
                                                    style={{
                                                        padding: 5,
                                                        color: "red",
                                                        fontSize: "12",
                                                        fontWeight: "500",
                                                    }}>{errors.name}</span>}
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginBottom: 5,
                                            }}>
                                            <TextField id="Email" label="Email" name="email" variant="outlined" type="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
                                            {console.log("The error handler: ", touched, errors)}
                                            {touched.email &&
                                                <span
                                                    style={{
                                                        padding: 5,
                                                        color: "red",
                                                        fontSize: "12",
                                                        fontWeight: "500",
                                                    }}>{errors.email}</span>}
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginBottom: 5,
                                        }}>
                                            <TextField id="password" label="Password" name="password" variant="outlined" type="text" placeholder="Password" onChange={handleChange} onBlur={handleBlur} />
                                            {console.log("The error handler: ", touched, errors)}
                                            {touched.password &&
                                                <span
                                                    style={{
                                                        padding: 5,
                                                        color: "red",
                                                        fontSize: "12",
                                                        fontWeight: "500",
                                                    }}>{errors.password}</span>}
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" type="submit" className="" disabled={isSubmitting}>Login</Button>
                                        </div>
                                        {/* <button onClick={onHomePageButtonClick}>Naviagte to Home Page</button> */}
                                    </form>
                                )}

                            </Formik>
                        </Box>
                    </Container>
                </div>

                <Popover
                    open={open}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <div
                        style={{
                            padding: 5,
                        }}>
                        <Button variant="contained" onClick={onHomePageButtonClick}>
                            <div>Oseen Marcelino </div>
                            <LogoutIcon />
                        </Button>

                    </div>
                    {/* The content of the Popover. */}
                </Popover>
            </div>
        </>
    )
}; 