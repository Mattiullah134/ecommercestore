import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Product from '../../models/Product';
import mongoose from "mongoose";

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Slug = ({ addToCart, product, variants }) => {
  const productData = [{
    _id: {
      "$oid": "640073ef15f55a1a1d3e70e1"
    },
    title: "Glow Tonic",
    desc: "Azadirachta 5ml,Aloe Barbadensis 5ml,chamomila 10ml,Carica papaya 10ml,Apple cider vinegar 5ml,Thea Sinesis 5ml,Vit e 0.5ml,Salicylic Acid 20drops,Distilled Water 70ml,",
    img: "data:image/png;base64,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",
    slug: "glT-500",
    category: "tonic",
    prodtImage: "http://res.cloudinary.com/djx7vn6ho/image/upload/v1677770064/vrrb5mflty9pwahhepvk.png",
    price: 500,

  }]

  const router = useRouter()
  const { slug } = router.query

  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)


  useEffect(() => {
    setColor(product.color)
    setSize(product.size)
  }, [router.query])


  // React tostify
  const addcart = () => toast.success("Item is added in your Cart.!");


  const refresh = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`;
    router.push(url)
  }


  return <>
    <Head>
      <title>ProductDetails_Organic_Cure</title>
      <title>Organic cure</title>
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>



    <section className="text-gray-600 body-font overflow-hidden relative">
      <div className="container min-h-screen px-5 py-10 mx-auto relative">
        <div className="lg:w-4/5 mx-auto justify-center flex flex-wrap relative">
          <img alt="ecommerce" className="lg:w-2/5 h-450 object-contain object-top rounded" src={productData[0].prodtImage} />
          {/* <img src={product.img} className="w-10 absolute top-20 left-60 opacity-75" /> */}

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">organic_cure</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productData[0].title}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>

            </div>
            <div className="leading-relaxed">{productData[0].desc.split(',').map(data => {
              return <p key={data} className='leading-relaxed'>{data}</p>
            })}</div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">


            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${productData[0].price}</span>
              <button onClick={() => { addcart(), addToCart(slug, productData[0].title, 1, productData[0].price, productData[0].prodtImage, size, color) }} className="flex -mt-1 ml-auto bg-indigo-600 text-white rounded-xl font-semibold border-0 py-3 px-6 focus:outline-none hover:bg-indigo-700 text-sm md:text-base">Add to Cart</button>
              <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />


              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}





export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }



  // Pass data to the page via props
  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }
  }

}

export default Slug
