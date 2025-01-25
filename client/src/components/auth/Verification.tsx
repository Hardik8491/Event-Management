import { useActivationMutation } from "@/redux-toolkit/features/auth/authApi";
import { styles } from "@/styles/style";
import React, { FC, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
    setRoute: (route: string) => void;
};

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
  
    
    const [activation,{isSuccess,error}]=useActivationMutation();
    useEffect(()=>{
        if(isSuccess){
            toast.success("Account activated successfully");
            setRoute("Login")
        }
           if (error) {
               if ("data" in error) {
                   const ErrorData = error as any;
                   toast.error(ErrorData.data.message);
                   setInvalidError(true);
               } else {
                   console.log("An error occurred:", error);
               }
           }
    },[error, isSuccess, setRoute]);
 
    const [InvalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });
    const inputREF = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verificationHandle = async () => {
     const verificationNumber=Object.values(verifyNumber).join("");
     if(verificationNumber.length!==4){
        setInvalidError(true);
        return;
     }
     await activation({
     activationToken:token,
     activationCode:verificationNumber,
     })
    };
    const handleInputChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return setInvalidError(true);
        setInvalidError(false);

        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);
        if (value === "" && index > 0) {
            inputREF[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputREF[index + 1].current?.focus();
        }
    };
    return (
        <div>
            <div className=''>
                <div className={`${styles.title}`}>Verify your Account</div>
                <br />
                <div className='w-full flex items-center justify-center mt-2'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#497DF2]'>
                        <VscWorkspaceTrusted size={40} />
                    </div>
                </div>
                <br />
                <br />
                <div className='flex items-center justify-around m-auto '>
                    {Object.keys(verifyNumber).map((key, index) => (
                        <input
                            key={key}
                            ref={inputREF[index]}
                            type='number'
                            className={`w-[65px] h-[65px] border-[3px] flex items-center   justify-center text-black dark:text-white text-[18px] font-Poppins outline-none text-center  ${InvalidError} ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
                            max={1}
                            value={verifyNumber[key as keyof VerifyNumber]}
                            onChange={(e) =>
                                handleInputChange(index, e.target.value)
                            }
                        />
                    ))}
                </div>
                <br />
                <br />
                <div className='w-full flex justify-center '>
                    <button
                        className={`${styles.button}`}
                        onClick={verificationHandle}
                    >
                        Verify OTP
                    </button>
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
                    Go black to sing in?{" "}
                    <span
                        className='text-[#2190ff] pl-1 cursor-pointer'
                        onClick={() => setRoute("Login")}
                    >
                        Sign in
                    </span>
                </h5>
            </div>
        </div>
    );
};

export default Verification;
