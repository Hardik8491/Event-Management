"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type Props = {};

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className='flex item-center justify-center mx-4'>
            {theme === "light" ? (
                <Moon
                    size={25}
                   color="black"
                    className='cursor-pointer'
                    onClick={() => setTheme("dark")}
                />
            ) : (
                <Sun
                    size={25}
                    className='cursor-pointer'
                    onClick={() => setTheme("light")}
                />
            )}
        </div>
    );
};


