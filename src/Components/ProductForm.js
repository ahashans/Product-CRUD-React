import React, {useEffect, useState} from 'react';
import {
    Backdrop, Button,
    CircularProgress,
    FormControl,
    Input,
    InputLabel,
    Paper, Snackbar,
    Typography, Box, FormHelperText
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../Styles/ProductFormStyles";
import {Helmet} from "react-helmet";
import {Link, useHistory, useParams} from "react-router-dom";
import {ArrowBack as ArrowBackIcon, CloudUpload as CloudUploadIcon} from "@material-ui/icons";
import {axiosInstance} from "../Config/axiosInstance";

const ProductForm = () => {
    const alertTypes = {
        SUCCESS:"success",
        ERROR:"error",
        WARNING:"warning",
        INFO:"info",
    }
    const history = useHistory();
    const {id} = useParams();
    const getProductById = (id)=>{
        axiosInstance.get(`product/${id}`)
            .then(response=>{
                setProduct({
                    title:response.data.title,
                    description:response.data.description,
                    price:response.data.price,
                    image: response.data.image
                });
                setImageURL(process.env["REACT_APP_API_BASE_URL"].slice(0,-1)+response.data.image);
            }).catch(error=>{
            if(error.response){
                if(error.response.status===401){
                    history.push("/logout");
                }
            }
        });
    }
    useEffect(()=>{
        console.log(id);
        if(id){
            getProductById(id);
        }
        //eslint-disable-next-line
    },[id])
    const classes = useStyles();
    const header = (
        <Helmet>
            <title>Product Create Page - Product CRUD</title>
        </Helmet>
    );
    const [product, setProduct] = useState({
        title:"",
        titleInvalid:false,
        description:"",
        descriptionInvalid:false,
        price:"",
        priceInvalid:false,
        image:null,
        imageInvalid:false,
    });
    const resetForm = ()=>{
        setProduct({
            title:"",
            titleInvalid:false,
            description:"",
            descriptionInvalid:false,
            price:"",
            priceInvalid:false,
            image:null,
            imageInvalid:false,
        });
        setImageURL(null);
    }
    const [isRequestSent, setIsRequestSent] = useState(false);
    const [alertDetail, setAlertDetail]=useState({show:false, message:"", type:alertTypes.INFO})
    const handleChange = (e)=>{
        setProduct({...product, [e.target.name]:e.target.value, [e.target.name+"Invalid"]:!e.target.value})
    }
    const isValidProduct = ()=>{
        let invalidFields = {};
        if(product.title.trim()===""){
            invalidFields.titleInvalid=true;
        }
        if(product.description.trim()===""){
            invalidFields.descriptionInvalid=true;
        }
        if(!product.price || isNaN(parseFloat(product.price))){
            invalidFields.priceInvalid=true;
        }
        if(!id && !product.image){
            invalidFields.imageInvalid=true;
        }
        if(Object.keys(invalidFields).length){
            setProduct({
                ...product, ...invalidFields
            });
            return false;
        }
        else{
            return true;
        }
    }
    const [imageURL, setImageURL] = useState("");
    const handleImageChange = (e)=>{
        if(e.target.files.length){
            let reader = new FileReader();

            reader.onload = function (ev) {
                // get loaded data and render thumbnail.
                setImageURL(ev.target.result);
            };

            // read the image file as a data URL.
            reader.readAsDataURL(e.target.files[0]);
            setProduct({...product, image:e.target.files[0], imageInvalid: false});
        }
        else{
            setProduct({...product, image:null, imageInvalid: true});
            setImageURL("");
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isValidProduct()){
            setIsRequestSent(true);
            let inputData = new FormData();
            inputData.append("title",product.title);
            inputData.append("description",product.description);
            inputData.append("price",product.price);
            if(typeof product.image === "object"){
                inputData.append("image",product.image);
            }
            // console.log(inputData);
            if(id){
                axiosInstance.post(`product/${id}?_method=put`, inputData)
                    .then(response => {
                        setIsRequestSent(false);
                        setAlertDetail({type: alertTypes.SUCCESS, show: true, message: "Product Updated Successfully!"})

                    }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                        if(error.response.status===401){
                            history.push("/logout");
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log(error);
                    }
                    setIsRequestSent(false);
                    setAlertDetail({type: alertTypes.ERROR, show: true, message: "Product Update Failed!"})
                });
            }
            else{
                axiosInstance.post("products", inputData)
                    .then(response => {
                        console.log(response);
                        setIsRequestSent(false);
                        setAlertDetail({type: alertTypes.SUCCESS, show: true, message: "Product Created Successfully!"})
                        resetForm();
                    }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                        if(error.response.status===401){
                            history.push("/logout")
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log(error);
                    }
                    setIsRequestSent(false);
                    setAlertDetail({type: alertTypes.ERROR, show: true, message: "Product Create Failed!"})
                });
            }
        }
        else{
            setAlertDetail({type: alertTypes.ERROR, show: true, message: "Invalid Input"})
        }
    }
    const handleAlertClose = (e)=>{
        setAlertDetail({...alert, show: false})
    }

    return (
        <main className={classes.main}>
            {header}
            <Backdrop className={classes.backdrop} open={isRequestSent}>
                <CircularProgress color="inherit" />
                <Typography variant="h6">Please wait...</Typography>
            </Backdrop>
            <Box display="flex" flexDirection="row-reverse">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowBackIcon/>}
                    component={Link}
                    to="/products"
                >
                    Go Back To Products
                </Button>
            </Box>
            <Paper className={classes.paper}>
                <Typography variant="h5">Product {id?"Update":"Create"} Form</Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={product.title}
                            error={product.titleInvalid}
                            autoFocus
                        />
                        {product.titleInvalid?<FormHelperText error={true}>Please enter a valid title</FormHelperText>:""}
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="title">Description</InputLabel>
                        <Input
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            value={product.description}
                            error={product.descriptionInvalid}
                        />
                        {product.descriptionInvalid?<FormHelperText error={true}>Please enter a valid description</FormHelperText>:""}
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <Input
                            id="price"
                            name="price"
                            onChange={handleChange}
                            value={product.price}
                            error={product.priceInvalid}
                        />
                        {product.priceInvalid?<FormHelperText error={true}>Please enter a valid price</FormHelperText>:""}
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <input
                            accept="image/*"
                            className={classes.hiddenInput}
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image">
                            <Button variant="contained" color="primary" component="span" endIcon={<CloudUploadIcon/>}>
                                Upload
                            </Button>
                        </label>
                        {imageURL? <img className={classes.image} src={imageURL} alt="product image"/>:""}
                        {product.imageInvalid?<FormHelperText error={true}>Please enter a valid image</FormHelperText>:""}
                    </FormControl>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        disabled={isRequestSent}
                    >
                        {id?"Update":"Create"}
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={alertDetail.show}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleAlertClose}
                    severity={alertDetail.type}
                >
                    {alertDetail.message}
                </Alert>
            </Snackbar>
        </main>
    );
};

export default ProductForm;