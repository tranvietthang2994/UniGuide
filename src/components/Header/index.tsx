"use client";
import logoUniguide from "@/../public/images/logo/logo-uniguide-new.png";
import { Menu } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "./ThemeSwitcher";
import { menuData } from "./menuData";
import { onScroll } from "@/libs/scrollActive";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/Auth";
import ProfileModal from "@/components/Auth/ProfileModal";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">(
    "login"
  );
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const pathUrl = usePathname();
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const handleStickyMenu = () => {
    if (window.scrollY > 0) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Auth handlers
  const openLoginModal = () => {
    setAuthModalView("login");
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalView("register");
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!userDropdownOpen) return;
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-999 w-full transition-all duration-300 ease-in-out  ${
          stickyMenu
            ? "bg-white py-4 shadow dark:bg-dark xl:py-0"
            : "bg-transparent py-7 xl:py-0"
        }`}
      >
        <div className="relative mx-auto max-w-[1170px] items-center justify-between px-4 sm:px-8 xl:flex xl:px-0">
          <div className="flex w-full items-center justify-between xl:w-4/12">
            <Link href="/">
              <Image
                src={logoUniguide}
                alt="Logo UniGuide"
                className="h-10 w-auto max-h-10 object-contain"
              />
            </Link>

            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              onClick={navbarToggleHandler}
              aria-label="button for menu toggle"
              className="block xl:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !navbarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !navbarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !navbarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="du-block absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !navbarOpen && "!h-0 delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !navbarOpen && "dealy-200 !h-0"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-8/12 ${
              navbarOpen &&
              "!visible relative mt-4 !h-auto max-h-[400px] overflow-y-scroll rounded-md bg-white p-7.5 shadow-lg dark:bg-gray-dark"
            }`}
          >
            <nav>
              <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-2.5">
                {menuData?.map((item: Menu, key) =>
                  !item?.path && item?.submenu ? (
                    <Dropdown stickyMenu={stickyMenu} item={item} key={key} />
                  ) : (
                    <li
                      key={key}
                      className={`${
                        item?.submenu ? "group relative" : "nav__menu"
                      } ${stickyMenu ? "xl:py-4" : "xl:py-6"}`}
                    >
                      <Link
                        href={
                          item?.path
                            ? item?.path.includes("#") && !item?.newTab
                              ? `/${item?.path}`
                              : item?.path
                            : ""
                        }
                        target={item?.newTab ? "_blank" : ""}
                        rel={item?.newTab ? "noopener noreferrer" : ""}
                        className={`flex rounded-full px-[14px] py-[3px] font-satoshi font-medium ${
                          pathUrl === item?.path
                            ? "bg-primary/5 text-primary dark:bg-white/5 dark:text-white"
                            : "text-black hover:bg-primary/5 hover:text-primary dark:text-gray-5 dark:hover:bg-white/5 dark:hover:text-white"
                        } ${item?.path?.startsWith("#") ? "menu-scroll" : ""}`}
                      >
                        {item?.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            <div className="mt-7 flex flex-wrap items-center lg:mt-0">
              <ThemeSwitcher />

              {isLoading ? (
                // Loading state
                <div className="flex items-center px-5 py-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
              ) : isAuthenticated && user ? (
                // User is logged in - Show user dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 rounded-full bg-gray-1 px-4 py-2 font-satoshi font-medium text-black hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-gray-700"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.fullname}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-stroke bg-white py-2 shadow-lg dark:border-stroke-dark dark:bg-gray-dark">
                      <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="font-medium text-black dark:text-white">
                          {user.fullname}
                        </div>
                        <div>{user.email}</div>
                      </div>
                      <div className="border-t border-stroke dark:border-stroke-dark"></div>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-1 dark:text-white dark:hover:bg-gray-700"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setProfileOpen(true);
                        }}
                      >
                        Thông tin cá nhân
                      </button>
                      <Link
                        href="/my-reviews"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-1 dark:text-white dark:hover:bg-gray-700"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Đánh giá của tôi
                      </Link>
                      <div className="border-t border-stroke dark:border-stroke-dark"></div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-1 dark:text-red-400 dark:hover:bg-gray-700"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // User is not logged in - Show login/register buttons
                <>
                  <button
                    onClick={openLoginModal}
                    className="px-5 py-2 font-satoshi font-medium text-black transition hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={openRegisterModal}
                    className="rounded-full bg-primary px-5 py-2 font-satoshi font-medium text-white transition hover:bg-primary-dark"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
            {/* <!--=== Nav Right End ===--> */}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView={authModalView}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export default Header;
