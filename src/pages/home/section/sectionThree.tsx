import { useRef } from "react";
import { CustomBlueImgBtn } from "../../../components/buttons/button";
import { CustomHead } from "../../../components/global";
import { RulesBox } from "../../../components/layout/home/components";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
 
type Rulebox = {
  item:{
    heading:string,
    sub:string
  }
  index: number 
}

// Animated Rule Box Component
function AnimatedRuleBox({item, index }:Rulebox) { 
  const containerRef = useRef(null);
;
const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
 
  const card1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const card1Y = useTransform(scrollYProgress, [0, 1], [50, 600]);
 
    const card2Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const card2Y = useTransform(scrollYProgress, [0, 1], [50, 600]);
 
    const card3Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 1]);
    const card3Y = useTransform(scrollYProgress, [0, 1], [50, 0]);
 
 
  const ruleData = [
    {
      heading: "Teaching that ignites curiosity",
      sub: "Through storytelling, visuals, and clarity, our teaching makes even the toughest chapters feel interesting — because real learning starts with curiosity.",
    opacity: card1Opacity,
      y: card1Y, // Always stays at top
      isSticky: true
    },
    {
      heading: "Interactive & Visual Learning",
      sub: "We use rich media, real-world examples, and bite-sized concepts to keep learners engaged from the first second to the last.",
       opacity: card2Opacity,
      y: card2Y,
      isSticky: false
    },
    {
      heading: "Built for Every Learner",
      sub: "From quick revision to deep understanding, our approach adapts to different learning styles and speeds.",
       opacity: card3Opacity,
      y: card3Y,
      isSticky: false
    },
  ];
  return (
    <motion.div
      ref={containerRef}
      className={`rounded-2xl min-h-[350px] bg-white`}
      style={{
              opacity: ruleData[index].opacity,
              y:  ruleData[index].y,
              zIndex: index +1
            }}
    >
      <RulesBox
        spanContent={index + 1}
        headingContent={item.heading}
        subHeading={item.sub}
      />
    </motion.div>
  );
}
 
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
 
  const container = useRef(null);
 
  return (
    <div className="container mx-auto "  ref={container}>
      <div className="p-uno py-4 lg:py-[10rem] lg:px-6 flex flex-col lg:flex-row flex-wrap justify-center lg:items-start gap-16"  >
        {/* Left Side Content */}
        <div className="flex-1 min-w-[300px] sticky top-[150px] self-start px-6 lg:px-0">
          <div className="grid gap-10">
            <CustomHead className="uppercase text-black lg:leading-16 tracking-wide text-4xl lg:text-[64px]">
              <span className="text-blue">
                Smart Learning <br />
              </span>
              Start Right <br /> Here
            </CustomHead>
            <CustomBlueImgBtn>Start Learning</CustomBlueImgBtn>
          </div>
        </div>
        {/* Right Side Rules Boxes */}
        <div className="flex-1 min-w-[300px] flex flex-col gap-5" >
          {ruleData.map((item, i) => (
            <AnimatedRuleBox
              key={i}
              item={item}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}