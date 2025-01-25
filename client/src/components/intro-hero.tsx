import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";

const Hero: React.FC = () => {
    return (
        <div
            className='w-full px-5 sm:px-10  md:px-20 lg:px-0  flex flex-col lg:flex-row min-h-screen py-32 pt-48 items-center bg-cover bg-center bg'
            style={{ backgroundImage: 'url("/banner-bg.jpg")' }}
        >
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px]  h-[50vh] w-[50vh]  lg:h-[80vh] lg:w-[80vh] xl:h-[50vh] xl:w-[50vh] hero_animation rounded-full ml-8 shadow-sm ' />
            <div className='relative w-full lg:pl-16 xl:pl-8 lg:w-1/2 flex justify-center  items-center  xl:pt-10 md:pt-0 lg:pt-6'>
                <Image
                    src='/banner-img-1.png'
                    alt='home-banner'
                    width={768}
                    height={562}
                    objectFit='contain'
                    quality={100}
                    className='object-contain  1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'
                />
                <span className='banner-icon lg:block hidden'>
                    <Image
                        src='shape-2.svg'
                        alt='img3'
                        width={200}
                        height={200}
                        className='max-w-36 max-h-36 absolute left-40 -bottom-52 lg:block hidden'
                    />
                </span>
            </div>

            <div className='w-full relative lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0 px-5'>
                <span className='banner-icon lg:block hidden'>
                    <Image
                        src='/shape-1.svg'
                        alt={""}
                        width={150}
                        height={150}
                        className='max-w-28 max-h-28 -top-14 absolute -left-12 '
                    />
                </span>
                <h2 className='text-white text-2xl md:text-4xl text-center lg:text-6xl font-medium lg:font-bold font-sans'>
                    Improve Your Online Learning Experience Better Instantly
                </h2>
                <p className='text-white mt-4 text-sm md:text-base text-center lg:text-lg font-mono'>
                    We have <span className='text-yellow-500'>40k+</span> Online
                    courses & <span className='text-yellow-500'>500K+</span>{" "}
                    Online registered students. Find your desired Courses from
                    them.
                </p>
                <div className='relative rounded-lg shadow-sm overflow-hidden w-full mt-6 font-Josefin text-sm md:text-base font-medium'>
                    <input
                        type='search'
                        placeholder='Search Courses'
                        className='w-full p-4 rounded-lg bg-white bg-opacity-30 placeholder-white focus:border text-white  outline-none backdrop-blur-lg'
                    />
                    <button className='absolute top-0 right-0 h-full bg-yellow-500 text-neutral-900 flex items-center rounded-r-lg p-4'>
                        Search Now
                        <Search
                            className='text-black pl-2  md:block hidden'
                            size={24}
                        />
                    </button>
                </div>

                <div className='flex  flex-col gap-2 xl:flex-row items-center mt-8'>
                    <div className='flex items-center'>
                        <Image
                            src='/client-1.jpg'
                            width={50}
                            height={50}
                            className='rounded-full'
                            alt='client-1'
                        />
                        <Image
                            src='/client-2.jpg'
                            width={50}
                            height={50}
                            className='rounded-full ml-[-20px]'
                            alt='client-2'
                        />
                        <Image
                            src='/client-3.jpg'
                            width={50}
                            height={50}
                            className='rounded-full ml-[-20px]'
                            alt='client-3'
                        />
                    </div>
                    <p className='text-white ml-4 font-semibold md:font-bold font-sans text-sm  sm:text-base md:text-lg flex gap-2'>
                        500K+ People already trusted us.{" "}
                        <Link
                            href='/courses'
                            className='text-yellow-500 xl:font-semibold underline font-mono flex justify-center items-center '
                        >
                            View Courses
                            <span className='font-bold flex h-4 items-center '>
                                <BiRightArrowAlt height={10} width={10} />
                            </span>
                        </Link>
                    </p>
                </div>
                <span className='banner-icon lg:block hidden'>
                    <Image
                        src='shape-3.svg'
                        alt='img3'
                        width={200}
                        height={200}
                        className='max-w-40 max-h-40 absolute -bottom-32 right-32'
                    />
                </span>
            </div>
        </div>
    );
};

export default Hero;