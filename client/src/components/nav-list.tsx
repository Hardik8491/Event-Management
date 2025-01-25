import Link from "next/link";
import React from "react";

export const navItemData = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Courses",
        link: "/courses",
    },
    {
        id: 3,
        name: "Become An Instructor",
        link: "/instructor",
    },
];
interface Props {
    activeItem: number;
    isMobile: boolean;
}
const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex '>
                {navItemData &&
                    navItemData.map((item, index) => (
                        <Link href={item.link} key={item.id} passHref>
                            <span
                                className={`${
                                    activeItem === index
                                        ? "dark:text-[#37a39a] text-[#37a39a]"
                                        : "dark:text-white text-black"
                                }  text-base px-6 font-Poppins font-[600]`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
            </div>
            {isMobile && (
                <div className='800px:hidden   mt-5'>
                    <div className='w-full text-center py-6'>
                        <Link
                            passHref
                            href={"/"}
                            className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                        >
                            StudySync
                        </Link>
                    </div>
                    {navItemData.map((item) => (
                        <Link href={item.link} key={item.id} passHref>
                            <span
                                className={`${
                                    activeItem === item.id
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                } text-[18px] block py-5 px-6 font-Poppins font-[400] `}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default NavItems;
