import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/styles/style";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useLoginMutation } from "@/redux-toolkit/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email!")
        .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
});

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
};

const Login: FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false);
    const [Login, { isError, data, isLoading, error, isSuccess }] = useLoginMutation();
console.log("hdk eror",);

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);  
            const message = data?.message || "Login successful";
            toast.success(message);
            setRoute("Home");
        }
        if (isError && error) {
            if ("data" in error) {
                const ErrorData = error as any;
                toast.error(ErrorData.data?.message || "Login failed. Please try again.");
            }
        }
    }, [data?.message, isError, error, isSuccess, setOpen, setRoute]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            const data = {
                email,
                password
            };
            try {
                await Login(data);
            } catch (error) {
                console.log("hdk eror",error);
                
                toast.error("An error occurred. Please try again.");
            }
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>Login with StudySync</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Email
                    </label>
                    <input
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        placeholder='loginmail@gmail.com'
                        className={`${
                            errors.email && touched.email && "border-red-500"
                        } ${styles.input}`}
                    />
                    {errors.email && touched.email && (
                        <span className='text-red-500 pt-2 block'>
                            {errors.email}
                        </span>
                    )}
                </div>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor='password'>
                        Enter your password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        id='password'
                        placeholder='password!@%'
                        className={`${
                            errors.password && touched.password && "border-red-500"
                        } ${styles.input}`}
                    />
                    {!show ? (
                        <EyeOff
                            className='absolute bottom-3 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={() => setShow(!show)}
                        />
                    ) : (
                        <Eye
                            className='absolute bottom-3 right-2 z-1 cursor-pointer'
                            size={20}
                            onClick={() => setShow(!show)}
                        />
                    )}

                    {errors.password && touched.password && (
                        <span className='text-red-500 pt-2 block'>
                            {errors.password}
                        </span>
                    )}
                </div>
                <div className='w-full mt-5'>
                    <input
                        type='submit'
                        value='Login'
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px text-black dark:text-white'>
                    Or join with
                </h5>
                <div className='flex item-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer mr-2'
                    onClick={() => signIn("google")}
                    />
                    <AiFillGithub size={30} className='cursor-pointer mr-2'
                    onClick={() => signIn("github")}
                    />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Not have any account?{" "}
                    <span
                        className='text-[#219aff] pl-1 cursor-pointer'
                        onClick={() => setRoute("Sign-Up")}
                    >
                        Sign up
                    </span>
                </h5>
                <br />
            </form>
            <br />
        </div>
    );
};

export default Login;
