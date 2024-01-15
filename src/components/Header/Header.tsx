import React from 'react';
import Navigation from './Navigation';
import Login from './Login';
import Logo from './Logo';

const Header = () => {
    return (
        <div className="flex w-full h-16 bg-black justify-between items-center justify-items-center text-white">
            <Navigation />
            <Logo />
            <Login />
        </div>
    );
};

export default Header;
