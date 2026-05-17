"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Badge, Select } from "antd";
import { useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { FiHeart, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useGetCart } from "../tools/cards/hooks/cartHook";
import { useGetWishlist } from "../tools/cards/hooks/wishlistHook";
import { useCookies } from "react-cookie";
import UserAuthButton from "./UserAuthButton";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const getLink = useLocalizedLink();
  // const { items } = useSelector((state: RootState) => state.cart);
  const { cart, isLoadingCart, isAuthenticated } = useGetCart();
  const { wishlist } = useGetWishlist();
  const [cookies] = useCookies(["UserToken"]);

  const navlinks = [
    { linkKey: "home", path: "", name: "الرئيسية" },
    { linkKey: "membershipCards", path: "/membership", name: "بطاقات العضوية" },

    { linkKey: "products", path: "/products", name: "التسوق" },
    {
      linkKey: "loyaltyProgram",
      path: "/loyality-program",
      name: "برنامج الولاء",
    },
    {
      linkKey: "affiliateProgram",
      path: "/affiliate-program",
      name: "برنامج الافلييت",
    },

    // { linkKey: "pages", path: "/", name: "الصفحات" },

    { linkKey: "contactUs", path: "/contact-us", name: "تواصل معنا" },
    { linkKey: "about", path: "/about-us", name: "عن النادي" },
  ];

  const navVariants = {
    hidden: { y: "-200%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.3 },
    },
  };

  const navLists = {
    hidden: { x: "100%" },
    visible: {
      x: "1%",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 25,
        delay: 0.3,
      },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 70, damping: 25, delay: 0.3 },
    },
  };

  const handleReturnNewPath = (value: string) => {
    const segments = pathname.split("/");
    segments[1] = value;
    const newPath = segments.join("/");

    return newPath;
  };

  // useEffect(() => {
  //   const segments = pathname.split("/");
  //   if (segments[1]) {
  //     setCurrentLocale(segments[1]);
  //   }
  // }, [pathname]);

  return (
    <div
      className={`header fixed top-0 bg-[#2b2a40] z-20 py-1 transition-all duration-300 ease-in-out lg:px-4`}
      id={navlinks[0].name}
    >
      <div className="header_inner container relative">
        <div className="min-w-20">
          <Link href={getLink("/")}>
            <Image
              src="/images/logo.png"
              alt="Sand Studio Logo"
              width={80}
              height={42}
            />
          </Link>
        </div>

        <button
          className=" w-full justify-end transition-all duration-200 flex md:hidden"
          onClick={toggleMenu}
        >
          {!isOpen && (
            <RxHamburgerMenu
              className={`cursor-pointer text-3xl duration-300 active:scale-95 !text-white`}
            />
          )}
        </button>

        {/* Desktop Nav */}
        <nav className=" items-center gap-6 hidden md:flex">
          {navlinks.map((navlink, i) => {
            const segments = pathname.split("/");
            const currentLocale = segments[1];
            const fullPath = `/${currentLocale}${navlink.path}`;
            return (
              <Link
                key={i}
                href={fullPath}
                className={`link ${pathname === fullPath ? "active" : ""}`}
              >
                {navlink.name}
              </Link>
            );
          })}
          {/* <Link
            className="link"
            href={handleReturnNewPath(currentLocale === "en" ? "ar" : "en")}
            locale={currentLocale === "en" ? "ar" : "en"}
          >
            {currentLocale === "en" ? "العربية" : "English"}
          </Link>{" "} */}
          {/* <Select
            onChange={handleChangeLang}
            value={currentLocale}
            className="change-lang-select"
            suffixIcon={<GoChevronDown size={16} className="text-primary" />}
          >
            <Select.Option value="en">Eng</Select.Option>
            <Select.Option value="ar">ع ر ب</Select.Option>
          </Select> */}
        </nav>
        <div className="flex items-center gap-2">
          {/* <button
            className="sm:hidden flex items-center justify-center sm:w-10 sm:h-10 w-5 h-6 text-white bg-transparent border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-primary/10  active:scale-95"
            title="بحث"
            onClick={() => {}}
          >
            <FiSearch size={20} />
          </button> */}
          <p className="text-sm text-white">تجريبي</p>
          <UserAuthButton />
          <Link
            href="/cart"
            title="السلة"
            className="flex items-center justify-center sm:w-10 sm:h-10 w-5 h-6 text-white bg-transparent border-none rounded-lg transition-all duration-300 hover:bg-primary/10  active:scale-95"
          >
            <Badge
              count={isAuthenticated ? cart?.items?.length : 0}
              color="#9d9da1"
            >
              <>
                <FiShoppingCart size={20} className="text-white block" />
              </>
            </Badge>
          </Link>
          <Link
            href={getLink("/wishlist")}
            title="المفضلة"
            className="flex items-center justify-center sm:w-10 sm:h-10 w-5 h-6 text-white bg-transparent border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-primary/10  active:scale-95"
          >
            <Badge count={wishlist?.items?.length || 0} color="#9d9da1">
              <>
                <FiHeart size={20} className="text-white block" />
              </>
            </Badge>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-accent fixed -left-3 top-0 z-50 flex h-screen w-[105%] flex-col items-start bg-[#2b2a40] px-10 py-10"
          >
            <div className="flex w-full justify-end pr-6 text-6xl">
              <IoMdClose
                className={`cursor-pointer text-white`}
                onClick={toggleMenu}
              />
            </div>

            <div className="flex h-full flex-col items-start gap-10">
              {navlinks.map((navlink, i) => {
                const segments = pathname.split("/");
                const currentLocale = segments[1];
                const fullPath = `/${currentLocale}${navlink.path}`;
                return (
                  <motion.div
                    key={i}
                    variants={navLists}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={fullPath}
                      onClick={toggleMenu}
                      className={`text-3xl font-light text-primary hover:text-gray-400 ${
                        pathname === fullPath
                          ? "font-semibold text-white"
                          : "text-primary"
                      }`}
                    >
                      {navlink.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Language Selector for Mobile */}
              {/* <motion.div
                variants={navLists}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  className="text-3xl font-light text-primary hover:text-gray-400"
                  href={handleReturnNewPath(
                    currentLocale === "en" ? "ar" : "en"
                  )}
                >
                  {currentLocale === "en" ? "العربية" : "English"}
                </Link>{" "}
               
              </motion.div> */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
