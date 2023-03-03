import Image from 'next/image';
import React from 'react'
import ahmadBasit from '/public/ahmadBasit.jpg';
import ahmadManzoor from '/public/ahmadManzoor.jpg';
import rizwanRaja from '/public/rizwanRaja.jpeg';
import p2plogo from '/public/p2pCloudsLogo.png';
import tepsLogo from '/public/tepsLogo.png';
import pbiLogo from '/public/pbi.webp';
import anzTechLogo from '/public/anz.webp'

function Statics() {
    return (
        <section className="text-gray-600 body-font ">
            <div className="container px-5 py-5 mx-auto">
                {/* <h1 className='text-center text-3xl sm:text-4xl md:text-6xl font-sans tracking-tight text-black font-semibold mb-2'>Beloved Partners</h1> */}
                <div className="flex flex-wrap -m-4 text-center justify-center aligns-start mb-28 ">
                    <div className="p-4 md:w-72 sm:w-1/2 object-contain  ">
                        <Image src={p2plogo} alt='Sir Ahmad Manzoor' width={200} />
                    </div>
                    <div className="p-2 md:w-72 sm:w-1/2 object-contain ">
                        <Image src={tepsLogo} alt='Mian Ahmad Basit' width={200} />
                    </div>
                    <div className="p-2 md:w-72 sm:w-1/2 object-contain ">
                        <Image src={pbiLogo} width={200} alt='Rizan raja' />
                    </div>
                    {/* <div className="p-2 md:w-72 sm:w-1/2 object-contain ">
                        <Image src={organicCure} width={100} alt='Rizan raja' />
                    </div> */}
                    <div className="p-2 md:w-72 sm:w-1/2 object-contain ">
                        <Image src={anzTechLogo} width={200} alt='Rizan raja' />
                    </div>

                </div>
                <div className="flex flex-wrap -m-4 text-center justify-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <Image src={ahmadManzoor} width={300} alt='Ahmad Manzoor' />
                        {/* <img src={ahmadManzoor} alt='ahmad basit' /> */}
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <Image src={ahmadBasit} height={350} alt='Mian Ahmad Basit' />
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <Image src={rizwanRaja} height={350} alt='Rizan raja' />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Statics