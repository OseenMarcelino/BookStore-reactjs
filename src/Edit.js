import { Button } from '@mui/material'
import React from 'react'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { Container } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const Edit = () => {

    const { id } = useParams();
    const [values, setValues] = useState({
        id: id,
        title: '',
        price: '',
    })
    useEffect(() => {
        axios.get(`http://localhost:3030/data/` + id).then(res =>
        //   console.log(res)
        {
            setValues({ ...values, title: res.data.title, pages: res.data.pages })
        }
        ).catch(err => console.log(err))


    }, [])

    const Navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3030/data/` + id, values)
            .then(res =>
            //   console.log(res)
            {
                Navigate('/')

            }
            ).catch(err => console.log(err))
    }


    return (
        <>
            <div>
                <h1>Edit</h1>
            </div>
            <div className='1'>
                <div className='2'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='title'>Title:</label>
                            <input type="text" name='title' className='form-control' placeholder='Enter title' value={values.title}
                                onChange={e => setValues({ ...values, title: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor='price'>Price:</label>
                            <input type="text" name='price' className='form-control' placeholder='Enter price' value={values.pages}
                                onChange={e => setValues({ ...values, pages: e.target.value })} />
                        </div> <br />
                        <button className='btn btn-info'>Edit</button>
                    </form>

                </div>

            </div>
        </>
    )
}

