import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
// import BookData from './Data.json';
import { Button } from '@mui/material';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import appStyle from './AppStyle.module.css';
import { Link } from 'react-router-dom';



export const BookList = () => {

    const [search, setSearch] = useState('')

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([])
    const Navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getUsers()
          }, [])

          function getUsers(){
            axios.get("http://localhost:3030/data/").then(
        (response) => {
            setRows(response.data)
        }
      )
          }
    
    function handleDelete(id) {
        fetch('http://localhost:3030/data/'+id, {
            method: 'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getUsers();
            })
        })
    }
    

    return (
        <>
            <div>
                <h1>Book List</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: "#f4f4f4" }}>
        <Toolbar>
          <Container>
            <div className={appStyle.search_input}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Book Here"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="btn btn-outline-success" type="submit">
                Search
              </Button>

            </div>
          </Container>
        </Toolbar>
        
      </div>
      
            <Card sx={{ minWidth: 900, padding: 4 }}>
                <CardContent>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead width='flex'>
                                    <TableRow>
                                        <TableCell align='center'><b><h2>Title</h2></b></TableCell>
                                        <TableCell align='center'><b><h2>Author</h2></b></TableCell>
                                        <TableCell align='center'><b><h2>Price(₹)</h2></b></TableCell>
                                        <TableCell align='center'><b><h2></h2></b></TableCell>
                                        <TableCell align='center'><b><h2></h2></b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .filter((row)=>{return search.toLowerCase() === '' ? row : row.title.toLowerCase().includes(search)}).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.link}>
                                                    <TableCell align="center">{row.title}</TableCell>
                                                    <TableCell align="center">{row.author}</TableCell>
                                                    <TableCell align="center">{row.pages}</TableCell>
                                                    <TableCell align="center">
                                                        <Link className='editbutton' to={`/edit/${row.id}`}>Edit</Link>
                                                        {/* <Button style={{color:'green'}} onClick={handleEdit}>Edit</Button> */}
                                                        </TableCell>
                                                    <TableCell align="center">
                                                        <Button style={{color: 'red'}} onClick={() => handleDelete(row.id)}>Delete</Button></TableCell>
                                                    
                                                </TableRow>
                                            );
                                        })}
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

        </>
    );
}

