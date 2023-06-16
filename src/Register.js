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
import { toast } from 'react-toastify';
import { useUserContext } from './UserContext';
// import { Select } from "@mui/material";
import Select from 'react-select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const Register = () => {

    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const Naviagte = useNavigate();
    const [user, setUser] = useState();
    const { setUserName } = useUserContext();
    const options = [
        'Buyer', 'Seller',
      ];
    
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
            confirm_password: Yup.string().required("Confirm your password").oneOf([Yup.ref('password'), null], 'Passwords must match'),
            // roles: Yup.string().required("Required"), role: values.role,
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
        alert("Form Submitted")

        //call for api to post submit the form

        const requestData = {
            userName: values.name,
            userEmail: values.email,
        };


        setUserName(values.name);

        localStorage.setItem(values.email, JSON.stringify({
            name: values.name, password: values.password, email: values.email,
        }));
        console.log(JSON.parse(localStorage.getItem(values.email)));

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
        Naviagte("/");
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
    const data = {
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
        userId: "",
    };
    const [inputData, setInputData] = useState(data);
    const handleData = (e) => {
        // setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    // alert("The button has been clicked.");

    return (
        <>
            <div>

                {/* <div
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
                </div> */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <h1> Register </h1>
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
                                {({ value, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, }) => (
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
                                            <TextField id="email" label="Email" name="email" variant="outlined" type="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
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
                                            flexDirection: "column",
                                            marginBottom: 5,
                                        }}>
                                            <TextField id="confirm_password" label="Confirm Password" name="confirm_password" variant="outlined" type="text" placeholder="Confirm Password" onChange={handleChange} onBlur={handleBlur} />
                                            {console.log("The error handler: ", touched, errors)}
                                            {touched.confirm_password &&
                                                <span
                                                    style={{
                                                        padding: 5,
                                                        color: "red",
                                                        fontSize: "12",
                                                        fontWeight: "500",
                                                    }}>{errors.confirm_password}</span>}
                                        </div>
                                        <div>
                                        <Dropdown options={options} onChange={handleChange} placeholder="Select your Role" />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant="contained" type="submit" className="" disabled={isSubmitting}>Submit</Button>
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
                {/* <div>
                    {user?.map((item) => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                            <span>{item.body}</span>
                        </div>
                    ))}
                </div> */}
            </div>
        </>
    )
}; 