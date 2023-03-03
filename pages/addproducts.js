import { React, useState } from 'react'
import QRCode from 'qrcode';
// React tostify
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



// Admin pannel
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Stack, TextField, Button, } from "@mui/material";


function Addproducts() {


  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('tonic')
  const [price, setPrice] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('');

  // set the qrcode image url
  const [img, setImg] = useState('');
  const [prodtImage, setProdtImage] = useState('')
  const [media, setMedia] = useState(''); // this is to store the image in the cloudinary

  const imageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', "mystore");
    data.append('cloud_name', 'djx7vn6ho');
    // store the iamge in the cloudinary
    const res = await fetch('https://api.cloudinary.com/v1_1/djx7vn6ho/image/upload', {
      method: 'POST',
      body: data
    })
    const res2 = await res.json();
    // console.log(res2.url);
    setProdtImage(res2.url);
  }

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name === 'category') {
      setCategory(e.target.value)
    }

    else if (e.target.name === 'price') {
      setPrice(e.target.value)
    }
    else if (e.target.name === 'slug') {
      setSlug(e.target.value)
    }
    else if (e.target.name === 'desc') {
      setDesc(e.target.value)
    }
    else if (e.target.name === 'img') {
      // set the media state and send the data to cloudinary
      setMedia(e.target.files[0]);
      imageUpload();
    }
  }
  const submit = async (e) => {
    e.preventDefault()
    console.log(prodtImage);
    // fetch the data from form to makes a file in local system

    let data = { title, price, img, category, desc, slug, prodtImage };


    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.success === true) {
      toast.success(response.message, { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
    else {
      toast.error(response.message, { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
    setTitle('')
    setCategory('')
    setPrice('')
    setDesc('')
    setSlug('')
    setImg('')
    // setProdtImage('')
  }

  return (

    <>

      {/* React tostify */}
      <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      <Grid container spacing={0} className='container w-1/2 my-20 mx-auto'>
        <Grid item xs={12} lg={12}>
          <form method='POST' onSubmit={submit} >
            <Stack spacing={3}>
              <TextField onChange={handleChange} value={title} name="title" label="Title" variant="outlined" />
              <div className="flex ml-6 items-center">
                <span className="mr-3">Category: </span>
                <div className="relative">
                  <select name='category' value={category} onChange={handleChange} className="rounded-md border pl-2 appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-800 text-base l-3 pr-10" >
                    <option value={'tonic'}>Tonic</option>

                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <TextField onChange={handleChange} value={price} name="price" label="Price" variant="outlined" />
              <TextField onChange={handleChange} value={slug} name="slug" label="Slug" variant="outlined" />
              <TextField onChange={handleChange} value={desc} name="desc" label="Description" multiline rows={4} />
              <label htmlFor="img">Select a file:</label>
              <input type="file" onChange={handleChange} id="img" className='border py-2' name="img" />

            </Stack>
            <br />
            <Button type='submit' onClick={() => {
              // this is used to send the image in the cloudinary and set the product image
              imageUpload();
              // create the url for the page
              let data1 = `${process.env.NEXT_PUBLIC_HOST}/product/${slug}`;
              QRCode.toDataURL(data1).then(setImg);
            }} variant="outlined" mt={2}>Submit</Button>
          </form>
        </Grid>
      </Grid>

    </>
  )
}

export default Addproducts