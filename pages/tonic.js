import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Product from '../models/Product';
import mongoose from "mongoose";

function Tshirt() {
  const productData = [{
    "_id": {
      "$oid": "640073ef15f55a1a1d3e70e1"
    },
    "title": "Glow Tonic",
    "desc": "Azadirachta 5ml,\nAloe Barbadensis 5ml,\nchamomila 10ml,\nCarica papaya 10ml,\nApple cider vinegar 5ml,\nThea Sinesis 5ml,\nVit e 0.5ml,\nSalicylic Acid 20drops,\nDistilled Water 70ml,\n",
    "img": "data:image/png;base64,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",
    "slug": "glT-500",
    "category": "tonic",
    "prodtImage": "http://res.cloudinary.com/djx7vn6ho/image/upload/v1677770064/vrrb5mflty9pwahhepvk.png",
    "price": 500,

  }]



  return (
    <>
      <Head>
        <title>Organic cure / tonic</title>
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
      <div className="bg-white">
        <div className="mx-auto min-h-screen max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          {productData.length === 0 && <div className="font-semibold text-center">Sorry! Currently Stock Unavailble right now. Please wait for the new Stock.!</div>}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

            {productData.map((item) => {
              return <div key={item._id} className="group relative">
                <div className="aspect-w-1 flex justify-center border aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8 ">
                  <img
                    src={item.prodtImage}
                    className="h-full w-full object-contain group-hover:opacity-75"
                  />
                </div>
                <img src={item.img} className="w-10 absolute bottom-20 right-30" />
                <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${item.price}</p>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}





export default Tshirt