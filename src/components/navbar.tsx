"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NavbarModel } from "@/models/navbarModel";
import LanguageToggle from "./language_toggle";
import DropdownSvg, { ArrowUpSvg } from "./dropdown_svg";
import Link from "next/link";

interface NavbarProps {
  navbar: NavbarModel[];
}

export default function NavbarComp({ navbar }: NavbarProps) {
  const language = useSelector((state: RootState) => state.language.lang);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#4B2615] py-2 shadow-md">
      <div className="max-w-[90vw] relative mx-auto">
        <div
          className={`flex justify-between items-center ${
            language == "en" ? "flex-row" : "flex-row-reverse"
          } h-16`}
        >
          <a href={"/"}>
            <img
              className="w-16 h-16 object-cover"
              src={"/logo.png"}
              alt={"Logo"}
            />{" "}
          </a>
          <div className="hidden  md:flex space-x-10">
            {navbar.map((item) => (
              <React.Fragment key={item.id}>
                {item.navbar_sublinks.length > 0 &&
                item.Slug.toLowerCase() === "services" ? (
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setServicesOpen((prev) => !prev)}
                      className="text-white text-xs flex items-center cursor-pointer"
                    >
                      {language == "ar" ? (
                        servicesOpen ? (
                          <ArrowUpSvg />
                        ) : (
                          <DropdownSvg />
                        )
                      ) : null}
                      {` ${item.Title} `}
                      {language == "en" ? (
                        servicesOpen ? (
                          <ArrowUpSvg />
                        ) : (
                          <DropdownSvg />
                        )
                      ) : null}
                    </button>

                    <div
                      className={`absolute left-24 top-14 mt-2 max-w-[80vw] w-[80vw] bg-[#4B2615] shadow-lg rounded-md p-4 z-50 transition-all duration-300 ${
                        servicesOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      <div
                        className={`grid grid-cols-4 gap-4 ${
                          language === "en" ? "text-left" : "text-right"
                        }`}
                      >
                        {item.navbar_sublinks.map((sublink) => (
                          <Link
                            key={sublink.id}
                            className="block text-white text-xs hover:bg-gray-50 hover:text-[#4B2615] p-2 rounded transition"
                            onClick={() => setServicesOpen(false)}
                            href={{
                              pathname: sublink.url,
                              query: { title: sublink.Title },
                            }}
                          >
                            {sublink.Title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.url ?? undefined}
                    className="text-white text-xs transition"
                  >
                    {item.Title}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>

          <div
            className={`hidden md:flex items-center space-x-6 ${
              language == "en" ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {" "}
            {searchField ? (
              <div className="relative">
                <button
                  type="submit"
                  className={`absolute top-1/2 text-xs ${
                    language == "en" ? "right-1" : "left-1"
                  } right-1   transform -translate-y-1/2 bg-transparent text-white  rounded-xl hover:bg-brown-700 disabled:opacity-50`}
                >
                  {searchValue != "" ? (
                    <Link
                      href={{
                        pathname: "/search",
                        query: { searchText: searchValue },
                      }}
                    >
                      <img
                        src="/search.svg"
                        alt="search"
                        className="w-4 h-4 mx-2 cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <img
                      src="/search.svg"
                      alt="search"
                      className="w-4 h-4 mx-2 cursor-pointer"
                    />
                  )}
                </button>
                <input
                  type="search"
                  name="search"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  value={searchValue}
                  placeholder={language == "en" ? "Search" : "Search"}
                  className={`text-white ${
                    language == "en" ? "text-left  pr-10" : "text-right  pl-10"
                  } text-xs p-2 rounded-xl bg-transparent border-white border-1 focus:outline-none focus:ring-0  `}
                />
              </div>
            ) : (
              <img
                src="/search.svg"
                alt="search"
                className="w-4 h-4 mx-2 cursor-pointer"
                onClick={() => setSearchField(!searchField)}
              />
            )}
            <LanguageToggle />
            <button className=" mr-6 bg-transparent text-xs border border-white text-white px-4 py-2  rounded-md transition duration-300">
              {language == "en" ? "  Book Appointment" : "احجز موعدًا"}
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul
            className={`flex  flex-col ${
              language == "en" ? "items-start" : "items-end"
            }  justify-between bg-[#4B2615] text-white space-y-4 p-4`}
          >
            {navbar.map((item) => (
              <React.Fragment key={item.id}>
                {item.navbar_sublinks.length > 0 &&
                item.Slug.toLowerCase() === "services" ? (
                  <>
                    <button
                      onClick={() => setServicesOpen((prev) => !prev)}
                      className="flex items-center justify-between"
                    >
                      {language == "ar" ? (
                        servicesOpen ? (
                          <ArrowUpSvg />
                        ) : (
                          <DropdownSvg />
                        )
                      ) : null}
                      {` ${item.Title} `}
                      {language == "en" ? (
                        servicesOpen ? (
                          <ArrowUpSvg />
                        ) : (
                          <DropdownSvg />
                        )
                      ) : null}
                    </button>
                    {servicesOpen && (
                      <ul
                        className={` space-y-2 z-20  ${
                          language == "en"
                            ? "text-left ml-4"
                            : "text-right mr-4"
                        }   `}
                      >
                        {item.navbar_sublinks.map((sublink) => (
                          <li key={sublink.id}>
                            <Link
                              href={{
                                pathname: sublink.url,
                                query: { title: sublink.Title },
                              }}
                              onClick={() => {
                                console.log(`sublink ${sublink.url}`);
                                setServicesOpen(false);
                                setMobileMenuOpen(false);
                              }}
                              className="block py-1"
                            >
                              {sublink.Title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <li>
                    <a
                      href={item.url ?? undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      {item.Title}
                    </a>
                  </li>
                )}
              </React.Fragment>
            ))}

            <div
              className={`flex flex-col  ${
                language == "en" ? "items-start" : "items-end"
              }   justify-between`}
            >
              <div className="pb-4 md:pb-0">
                {searchField ? (
                  <div className="relative">
                    <button
                      type="submit"
                      className={`absolute top-1/2 text-xs ${
                        language == "en" ? "right-1" : "left-1"
                      } right-1   transform -translate-y-1/2 bg-transparent text-white  rounded-xl hover:bg-brown-700 disabled:opacity-50`}
                    >
                      {searchValue != "" ? (
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          href={{
                            pathname: "/search",
                            query: { searchText: searchValue },
                          }}
                        >
                          <img
                            src="/search.svg"
                            alt="search"
                            className="w-4 h-4 mx-2 cursor-pointer"
                          />
                        </Link>
                      ) : (
                        <img
                          src="/search.svg"
                          alt="search"
                          className="w-4 h-4 mx-2 cursor-pointer"
                        />
                      )}
                    </button>
                    <input
                      type="search"
                      name="search"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      value={searchValue}
                      placeholder={language == "en" ? "Search" : "Search"}
                      className={`text-white ${
                        language == "en"
                          ? "text-left  pr-10"
                          : "text-right  pl-10"
                      } text-xs p-2 rounded-xl bg-transparent border-white border-1 focus:outline-none focus:ring-0  `}
                    />
                  </div>
                ) : (
                  <img
                    src="/search.svg"
                    alt="search"
                    className="w-4 h-4 mx-2 cursor-pointer"
                    onClick={() => setSearchField(!searchField)}
                  />
                )}
              </div>
              <LanguageToggle />
              <button className="bg-transparent text-xs border border-white text-white px-4 py-2 rounded-md">
                Book Appointment
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
