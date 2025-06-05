import { useRef } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";
import { RulesBox } from "../../../components/layout/home/components";
import { useScroll, useTransform, motion } from "framer-motion";

// Animation config
const CardVariants = ({
  offscreen: {
    y: 0,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
});

export default function SectionThree() {
  const ruleData = [
    {
      heading: "Teaching that ignites curiosity",
      sub: "Through storytelling, visuals, and clarity, our teaching makes even the toughest chapters feel interesting — because real learning starts with curiosity.",
    },
    {
      heading: "Interactive & Visual Learning",
      sub: "We use rich media, real-world examples, and bite-sized concepts to keep learners engaged from the first second to the last.",
    },
    {
      heading: "Built for Every Learner",
      sub: "From quick revision to deep understanding, our approach adapts to different learning styles and speeds.",
    },
  ];

  return (
          <div className="container mx-auto">
    <div className="p-uno py-[10rem] flex flex-wrap items-start gap-16">

      {/* Left Side Content */}
      <div className="flex-1 min-w-[300px] sticky top-20 self-start">
        <div className="grid gap-10">
          <CustomHead className="uppercase text-black leading-16 tracking-wide text-[64px]">
            <span className="text-blue">
              Smart Learning <br />
            </span>
            Start Right <br /> Here
          </CustomHead>
          <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
        </div>
      </div>
      {/* Right Side Rules Boxes */}
      <div className="flex-1 min-w-[300px] space-y-12">
        {ruleData.map((item, i) => {
          const ref = useRef(null);
          const { scrollYProgress } = useScroll({
            target: ref,
          });

          return (
            <motion.div
              key={i}
              ref={ref}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.9 }}
              variants={CardVariants}
            >
              <RulesBox
                spanContent={i + 1}
                headingContent={item.heading}
                subHeading={item.sub}
              />
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
