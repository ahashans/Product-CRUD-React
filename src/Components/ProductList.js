import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Styles/ProductListStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";
import {axiosInstance} from "../Config/axiosInstance";
import {Edit as EditIcon, Delete as DeleteIcon,AddCircleOutline as AddCircleOutlineIcon} from "@material-ui/icons";



const ProductList = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const header = <Helmet>
        <title>Product List Page -  Product CRUD</title>
    </Helmet>;
    const [products, setProducts] = useState([]);
    const getProducts = async ()=>{
        try {
            let response = await axiosInstance.get("products");
            setProducts(response.data);
        }catch (e) {
            console.log(e);
            if(e?.response?.status===401){
                history.push("/logout")
            }
        }
    }
    useEffect(()=>{
        getProducts();
        //eslint-disable-next-line
    },[]);
    const handleDelete = (id)=>{
        const deleteProduct = async (id)=>{
            try {
                let response = await axiosInstance.delete(`product/${id}`);
                getProducts();
            }catch (e) {
                if(e?.response?.status===401){
                    history.push("/logout")
                }
                console.log(e);
            }
        }
        deleteProduct(id);
    }
    return (
        <Box className={classes.root}>
            {header}
            <Typography variant="h4">Products</Typography>
            <Box display="flex" flexDirection="row-reverse">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddCircleOutlineIcon/>}
                    component={Link}
                    to="/products/new"
                >
                    Add New Product
                </Button>
            </Box>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product,index)=>(
                            <TableRow key={index}>
                                <TableCell component="th" align="left">{index+1}</TableCell>
                                <TableCell align="left">{product.title}</TableCell>
                                <TableCell align="left">{product.description}</TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                                <TableCell align="left"><img className={classes.image} src={`${axiosInstance.defaults.baseURL.slice(0, -1)}${product.image}`} alt="sad"/></TableCell>
                                <TableCell align="center">
                                    <Box display="flex" flexDirection="row">

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<EditIcon />}
                                            component={Link}
                                            to={`/products/edit/${product.id}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                            onClick={()=>handleDelete(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductList;
