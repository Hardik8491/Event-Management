import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/styles/style";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRegisterMutation } from "@/redux-toolkit/features/auth/authApi";
import toast from "react-hot-toast";


const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string()
        .email("Invalid email!")
        .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
});

type Props = {
    setRoute: (route: string) => void;
};

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);
    const [register, { isError, data, isLoading, error, isSuccess }] =
        useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message =
                data?.message ||
                "Registration successful! Please check your email for activation link";
            toast.success(message);
            toast.success(
                "Registration successful! Please check your email for activation link"
            );
            setRoute("Verification");
        }
        if (error) {
            if ("data" in error) {
                const ErrorData = error as any;
                toast.error(ErrorData.data.message);
            }
        }
    }, [data?.message, error, isSuccess, setRoute]);
    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
         
            const data = {
                name,
                email,
                password,
            };
            await register(data);
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>Join with StudySync</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className={`${styles.label}`} htmlFor='name'>
                        Enter your Name
                    </label>
                    <input
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        id='name'
                        placeholder='John Doe'
                        className={`${
                            errors.name && touched.name && "border-red-500"
                        } ${styles.input}`}
                    />
                    {errors.name && touched.name && (
                        <span className='text-red-500 pt-2 block'>
                            {errors.name}
                        </span>
                    )}
                </div>
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
                            errors.password &&
                            touched.password &&
                            "border-red-500"
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
                        value='Sign Up'
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px text-black dark:text-white'>
                    Or join with
                </h5>
                <div className='flex item-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer mr-2' />
                    <AiFillGithub size={30} className='cursor-pointer mr-2' />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Already have an account?{" "}
                    <span
                        className='text-[#219aff] pl-1 cursor-pointer'
                        onClick={() => setRoute("Login")}
                    >
                        Login
                    </span>
                </h5>
                <br />
            </form>
            <br />
        </div>
    );
};

export default SignUp;
