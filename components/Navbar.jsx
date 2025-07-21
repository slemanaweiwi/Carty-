"use client";

import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, useAuth, useUser, UserButton } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleSignInClick = () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      toast.error("You are already signed in. Please sign out first.");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-purple-500 text-purple-700 bg-purple-50">
      <div className="text-2xl font-bold tracking-wide text-purple-700 cursor-pointer select-none">
        CARTY
      </div>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-purple-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-purple-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-purple-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-purple-900 transition">
          Contact
        </Link>
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border border-purple-500 text-purple-700 px-4 py-1.5 rounded-full hover:bg-purple-100"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image
          className="w-4 h-4"
          src={assets.search_icon}
          alt="search icon"
        />
        {user ? (
          <UserButton > 
            <UserButton.MenuItems>
              <UserButton.Action label = "Cart" labelIcon = {<CartIcon />} onClick={()=>router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label = "My Items " labelIcon = {<BagIcon />} onClick={()=>router.push('/cart')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={handleSignInClick}
            className="flex items-center gap-2 hover:text-purple-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          user ? (
          <UserButton>
  <UserButton.MenuItems>
    <UserButton.Action
      label="Home"
      labelIcon={<HomeIcon />}
      onClick={() => router.push('/')}
    />
    <UserButton.Action
      label="Products"
      labelIcon={<BoxIcon />}
      onClick={() => router.push('/all-products')}
    />
    <UserButton.Action
      label="Cart"
      labelIcon={<CartIcon />}
      onClick={() => router.push('/cart')}
    />
    <UserButton.Action
      label="My Items"
      labelIcon={<BoxIcon />}
      onClick={() => router.push('/myorders')}
    />
  </UserButton.MenuItems>
</UserButton>

          
        ) : (
          <button
            onClick={handleSignInClick}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
