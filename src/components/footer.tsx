"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FooterItem } from "@/models/footerModel";
import EmailSubscriptionForm from "./subscribeform";

interface FooterProps {
  footer: FooterItem[];
}

export default function FooterComp({ footer }: FooterProps) {
  const language = useSelector((state: RootState) => state.language.lang);

  return (
    <section className="bg-[#4D2617] text-white py-10 px-6 md:px-20 ">
      <div
        className={`flex flex-col gap-4 md:flex-row ${
          language == "en"
            ? "  justify-end items-end"
            : "  justify-start items-start"
        }  md:items-center mb-4`}
      >
        <EmailSubscriptionForm />
        <div className={`flex flex-row justify-end items-center `}>
          {" "}
          <div className="text-white text-xs ml-6 mr-2">
            {language == "en" ? "Contacts" : "جهات الاتصال"}
          </div>
          <img src="/fa-twitter.svg" alt="Twitter" className="w-4 h-4 mx-2" />
          <img
            src="/fa-facebook-square.svg"
            alt="Facebook"
            className="w-4 h-4 mx-2"
          />
          <img
            src="/fa-google-plus.svg"
            alt="Instagram"
            className="w-5 h-5 mx-2"
          />
        </div>
      </div>
      <hr className="border-t-2 border-white opacity-30 mb-6" />{" "}
      <div
        className={`  max-w-[90vw] mx-auto flex flex-col gap-4 md:gap-8 ${
          language == "en"
            ? "md:flex-row items-start "
            : "md:flex-row-reverse items-end  "
        }  md:flex-row justify-between  md:items-center `}
      >
        <footer>
          <ul
            className={`flex flex-col ${
              language == "en" ? "items-start" : "items-end"
            }  md:flex-row gap-4 md:gap-8`}
          >
            {footer.map((item) => (
              <li key={item.id}>
                <a href={"/"} className="text-white text-xs">
                  {item.Title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
        <div className="text-white text-center md:text-left w-full md:w-max text-xs">
          {language == "en"
            ? " © 2024 . All rights reserved."
            : "2024 © . جميع الحقوق محفوظة"}
        </div>
      </div>
    </section>
  );
}
