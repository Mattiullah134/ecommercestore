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