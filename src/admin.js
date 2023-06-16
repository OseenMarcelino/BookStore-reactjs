import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Admin = (values) => {
    const [search, setSearch] = useState('')

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([])
    // const [userData, setuserData] = useState([])
    const Navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    let userData = JSON.parse(localStorage.getItem(values.email))


    const getLocalData = () => {
        let localData = localStorage.getItem(values.email);
        if(localData === []){
            return [];
        }else {
            return JSON.parse(localData);
            
        }
        
    }

    // useEffect(() => {
    //   axios.post(JSON.parse(localStorage.getItem("KeyItem"))).then(
    //     (response) => {
    //         setRows(response.data)
    //     }
    //   )
    //   console.log("local");
    // }, [])

    


    const handleEdit = () =>{
        Navigate("./edit");
    }
    return (
        <><div>admin</div>
        <div>
        <Card sx={{ minWidth: 900, padding: 4 }}>
                <CardContent>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead width='flex'>
                                    <TableRow>
                                        <TableCell align='center'><b><h2>Name</h2></b></TableCell>
                                        <TableCell align='center'><b><h2>Email</h2></b></TableCell>
                                        <TableCell align='center'><b><h2></h2></b></TableCell>
                                        <TableCell align='center'><b><h2></h2></b></TableCell>
                                        <TableCell align='center'><b><h2></h2></b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                    /* {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .filter((row)=>{return search.toLowerCase() === '' ? row : row.name.toLowerCase().includes(search)}).map((row) => 
                                         */
                                         userData?.items?.map((row, index) => (
                                            
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.link}>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center"></TableCell>
                                                    <TableCell align="center"><Button style={{color:'green'}} onClick={handleEdit}>Edit</Button></TableCell>
                                                    <TableCell align="center"><Button style={{color: 'red'}}>Delete</Button></TableCell>
                                                    
                                                </TableRow>
                                            )
                                        )
                                         }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    </Paper>
                </CardContent>
            </Card>
        </div>
        </>
    )
}
