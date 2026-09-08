

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaFacebookF,
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaChevronDown } from "react-icons/fa";
import Swal from 'sweetalert2';

const linkColumns = [
    {
        title: "Explore",
        links: [
            { label: "Home", to: "/" },
            { label: "Find Jobs", to: "/job/findjob" },
            { label: "Contact", to: "/contact/contact-me" },
            { label: "About", to: "/" },
        ],
    },
    {
        title: "For Job Seekers",
        links: [
            { label: "Browse Jobs", to: "/job/findjob" },
            { label: "Saved Jobs", to: "/dashboard" },
            { label: "My Profile", to: "/dashboard/profile" },
            { label: "Applied Jobs", to: "/dashboard/applied-jobs" },
        ],
    },
    {
        title: "For Employers",
        links: [
            { label: "Post a Job", to: "/job/create-job" },
            { label: "Admin Overview", to: "/admin/overview" },
            { label: "Sign up", to: "/auth/register" },
            { label: "Log in", to: "/auth/login" },
        ],
    },
];

const socials = [
    { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
    { icon: FaXTwitter, label: "X (Twitter)", href: "https://x.com" },
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [openSection, setOpenSection] = useState(null);
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTopBtn(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const toggleSection = (title) => {
        setOpenSection(prev => prev === title ? null : title);
    }

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("That doesn't look like a valid email.");
            return;
        }

        setError("");
        setSubmitting(true);

        // TODO: replace with a real call to your newsletter/subscription API
        await new Promise((resolve) => setTimeout(resolve, 900));

        setSubmitting(false);
        setEmail("");

        Swal.fire({
            icon: 'success',
            title: 'Subscribed!',
            text: "You're on the list \u2014 we'll email you the newest jobs.",
            confirmButtonColor: '#dc2626',
            timer: 2500,
            timerProgressBar: true,
        });
    }

    return (
        <footer className='relative bg-[#0f172a] text-gray-300'>
            <div className='max-w-7xl container mx-auto px-4 md:px-6 py-10 md:py-14'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-10'>

                    {/* Brand + newsletter */}
                    <div className='md:col-span-4'>
                        <h1 className='font-extrabold text-white'>
                            <span className='text-red-500 text-[42px]'>D</span>akio
                        </h1>
                        <p className='text-sm text-gray-400 mt-3 max-w-xs'>
                            Find your dream job or hire top talent, all in one place.
                        </p>

                        <div className='flex gap-3 mt-5'>
                            {socials.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={label}
                                    className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200'
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>

                        <form onSubmit={handleSubscribe} className='mt-6' noValidate>
                            <label htmlFor='footer-email' className='text-sm text-gray-300 font-semibold'>
                                Get job alerts in your inbox
                            </label>
                            <div className='flex mt-2'>
                                <input
                                    id='footer-email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                                    placeholder='you@example.com'
                                    className={`w-full min-w-0 p-2.5 md:p-3 text-[13px] md:text-sm bg-white/5 text-white placeholder-gray-500 border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-red-500 transition-colors`}
                                />
                                <button
                                    type='submit'
                                    disabled={submitting}
                                    className='shrink-0 w-[100px] md:w-[120px] text-center text-[12px] md:text-sm cursor-pointer bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed p-2.5 md:p-3 text-white font-semibold transition-colors flex items-center justify-center gap-2'
                                >
                                    {submitting ? (
                                        <span className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </div>
                            {error && <p className='text-red-400 text-[12px] mt-2'>{error}</p>}
                        </form>
                    </div>

                    {/* Link columns */}
                    <div className='md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6'>
                        {linkColumns.map((col) => (
                            <div key={col.title} className='border-b border-white/10 md:border-none pb-3 md:pb-0'>
                                <button
                                    type='button'
                                    onClick={() => toggleSection(col.title)}
                                    className='w-full flex items-center justify-between text-white font-bold text-sm md:mb-4 md:pointer-events-none'
                                >
                                    {col.title}
                                    <FaChevronDown
                                        size={12}
                                        className={`md:hidden transition-transform duration-200 ${openSection === col.title ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <ul className={`flex-col gap-3 mt-3 md:mt-0 ${openSection === col.title ? 'flex' : 'hidden'} md:flex`}>
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <NavLink
                                                to={link.to}
                                                className='text-gray-400 hover:text-red-400 text-sm transition-colors duration-150'
                                            >
                                                {link.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className='md:col-span-3'>
                        <h3 className='text-white font-bold text-sm mb-4'>Contact</h3>
                        <ul className='flex flex-col gap-3 text-sm text-gray-400'>
                            <li className='flex items-center gap-3'>
                                <FaMapMarkerAlt className='text-red-500 shrink-0' />
                                Chattogram, Bangladesh
                            </li>
                            <li className='flex items-center gap-3'>
                                <FaPhoneAlt className='text-red-500 shrink-0' />
                                <a href='tel:+8801000000000' className='hover:text-red-400 transition-colors'>+880 1000-000000</a>
                            </li>
                            <li className='flex items-center gap-3'>
                                <FaEnvelope className='text-red-500 shrink-0' />
                                <a href='mailto:support@dakio.com' className='hover:text-red-400 transition-colors'>support@dakio.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] md:text-sm text-gray-500'>
                    <p>&copy; {new Date().getFullYear()} Dakio. All rights reserved.</p>
                    <div className='flex gap-5'>
                        <NavLink to='/' className='hover:text-red-400 transition-colors'>Privacy Policy</NavLink>
                        <NavLink to='/' className='hover:text-red-400 transition-colors'>Terms of Service</NavLink>
                    </div>
                </div>
            </div>

            <button
                type='button'
                onClick={scrollToTop}
                aria-label='Back to top'
                className={`fixed bottom-6 right-6 w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 ${showTopBtn ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
                <FaArrowUp size={16} />
            </button>
        </footer>
    );
};

export default Footer;
