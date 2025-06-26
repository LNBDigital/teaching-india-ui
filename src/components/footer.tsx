import { motion } from "framer-motion";
import React from "react";

type AnimationProps = {
  finalX?: number | number[];
  finalY?: number | number[];
  initX?: number;
  initY?: number;
  className?: string;
  children?: React.ReactNode;
};

export const FooterAnim = ({
  finalX = 0,
  finalY = 0,
  initX = 0,
  initY = 0,
  className = "",
  children,
}: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initX, y: initY }}
      whileInView={{ opacity: 1, x: finalX, y: finalY }}
      transition={{ duration: 1, ease:"easeInOut", delay:0.20 }}
      viewport={{ amount:0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Footer() {

  return (
    <footer className="bg-black1 w-full">
      <div className="container mx-auto flex flex-col items-center gap-4 lg:gap-8 p-4 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-10 w-full">
          <FooterAnim initX={-60} className="lg:max-w-[575px] w-full">
            <div className="bg-peach p-4 lg:p-10 rounded-[30px] flex justify-center">
              <img
                src="/home/logo.svg"
                alt="Logo"
                className="brightness-0 w-fit lg:w-[440px] h-full"
              />
            </div>
          </FooterAnim>

          <FooterAnim initX={60} className="w-full h-full">
            <div className="bg-lightBlue3 w-full min-w-[280px] max-w-full max-h-[280px] h-full py-2 lg:py-[52px] xs:p-12 rounded-[30px] flex flex-col items-center justify-center">
 <a className="text-lg xs:text-[24px] my-2 cursor-pointer">Link</a>
              <ul className="flex flex-col gap-2">
                <li className="text-[16px]">Class 9</li>
                <li className="text-[16px]">Class 10</li>
                <li className="text-[16px]">Class 11</li>
                <li className="text-[16px]">Class 12</li>
              </ul>
            </div>
          </FooterAnim>
        </div>

      <motion.div
  className="bg-blue rounded-[20px] w-full"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.20 }}
>
  <p className="text-center lg:text-right px-10 py-2 lg:py-7 text-xl lg:text-[32px] w-full">
    Copyright © 2025, Elevia
  </p>
</motion.div>

      </div>
    </footer>
  );
}
