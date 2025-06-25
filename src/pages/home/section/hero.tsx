import { easeInOut, motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";
import { animationOff } from "../../../lib/global/animationOff";


export default function Hero() {
  // const letter = "elevia";
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20% 0px" });
  const removeAnimate = animationOff();
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // // Animation variants
  // const containerVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  // const letterVariants = {
  //   hidden: { opacity: 0, x: -18 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeInOut",
  //       type: "tween",
  //     },
  //   },
  // };

  return (
    <div className="bg-black mx-5 p-uno" ref={textRef}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center lg:px-10 lg:flex-row md:justify-between">
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:gap-10 items-center max-w-[50%] justify-center">
            {/* <motion.div
              className="flex tracking-normal"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {letter.split("").map((char, index) => (
                <motion.p
                  key={index}
                  variants={letterVariants}
                  className="text-lightBlue gellatio flex md:text-[210px] h-[6cm] will-change-transform"
                >
                  {char}
                </motion.p>
              ))}
            </motion.div> */}
            <img src="/home/elevia.gif"  />

            <CustomHead>Elevate Learning. Empower Minds.</CustomHead>
            <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
          </div>

          {/* Right Animations */}
          {
            !removeAnimate ? 
                   <div className="relative max-w-[475px] xs:hidden">
            <img
              className="float-right relative h-[650px]"
              src="/home/animation/bg.png"
            />

            <motion.img
              className="absolute right-29 lg:right-46 top-5 lg:top-10 w-[80px] lg:w-fit will-change-transform "
              src="/home/animation/bulb-light.svg"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src="/home/animation/bulb.svg"
              className="absolute right-29 lg:right-46 top-6 lg:top-10 will-change-transform w-[80px] lg:w-fit"
            />
            <motion.img
              src="/home/animation/girl.png"
              className="absolute left-[5%] w-[170px] top-18.5 will-change-transform"
            />
            <motion.img
              src="/home/animation/eyes.svg"
              className="absolute left-[9%] lg:left-[5%] top-8 lg:top-18 w-[30px] lg:w-fit will-change-transform "
              initial={{ y: 76, x: 64 }}
              animate={{ x: [60, 62, 64, 62, 60] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-10 lg:right-20 top-10 lg:top-0 will-change-transform"
              src="/home/animation/star.svg"
              animate={{ scale: [0.1, 1.1, 0.1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              className="absolute right-16 lg:right-26 top-24 lg:top-30 w-[80px] lg:w-fit will-change-transform"
              src="/home/animation/notebook.svg"
              animate={{ scale: [0.6, 0.8, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.img
              className="absolute left-0 lg:left-[2%] bottom-40 lg:bottom-50 w-[100px] lg:w-fit will-change-transform"
              src="/home/animation/cloud.svg"
              animate={{ y: [-60, -80, -60], x: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <motion.img
              className="absolute left-[17%] lg:left-[10%] -bottom-10 w-[30px] lg:w-fit will-change-transform"
              src="/home/animation/pencil.svg"
              animate={{ y: [-80, -120, -80] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-0 w-[100px] lg:w-fit bottom-[30%] lg:bottom-[32%] will-change-transform"
              src="/home/animation/aeroplane.svg"
              animate={{
                rotate: [0,20,40,20, 0], // smooth nose tilt
                y: [-10, -30, -10], // gentle vertical arc
                x: [0, 5, 0], // slight forward nudge
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              className="absolute left-[33%] lg:left-[32%] bottom-40 w-[100px] lg:w-fit lg:bottom-56 will-change-transform"
              src="/home/animation/book.svg"
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ duration: 4, ease: easeInOut, repeat: Infinity }}
            />
            <motion.img
              className="absolute right-2 lg:right-3 bottom-26 lg:bottom-26 will-change-transform"
              src="/home/animation/spinner.svg"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute right-10 lg:right-7 bottom-10 lg:bottom-3 p-4 w-[80px] lg:w-fit will-change-transform"
        animate={{ filter: ["invert(40%)", "invert(70%)", "invert(0%)"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            >
              <img src="/home/animation/arrow2.svg" />
            </motion.div>

            <img
              className="absolute right-[35%] bottom-16 lg:bottom-8 w-[100px] lg:w-fit will-change-transform"
              src="/home/animation/boy.svg"
            />
            <motion.img
              src="/home/animation/boy-eyes.svg"
              className="absolute left-[28%] w-[30px] lg:w-fit lg:left-[29%] bottom-[20%] lg:bottom-[25%] will-change-transform"
              initial={{ y: 76, x: 64 }}
              animate={{ x: [58, 60, 62, 64, 62, 60, 58] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          : <div>
            <img src="/gif/home/hero.svg" />
          </div>
          }
   
        </div>
      </div>
    </div>
  );
}
