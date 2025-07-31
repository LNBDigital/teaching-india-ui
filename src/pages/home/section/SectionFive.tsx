import { CustomHead, CustomPara } from "src/components/Content/CustomHead&SubHead";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function SectionFive() {
  return (
    <div className="bg-blue p-2 lg:p-8 flex flex-col gap-6">
      <div className="container mx-auto">
      <CustomHead className="text-white text-center">
        Don’t take our words for it! <br />
        Hear it from our students.
      </CustomHead>
      <div className="">
        <div className="flex justify-center my-10 ">
          <div
            className="w-full max-w-[100%] lg:w-[1250px] relative px-5 lg:px-10 flex items-center rounded-[20px] 
  after:content-[''] after:max-w-[1000px] lg:after:w-[1000px] after:h-50 after:rounded-[20px] after:bg-peach2 after:absolute 
  after:-bottom-10 after:left-1/2 after:-translate-x-1/2 after:flex after:justify-center"
          >
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              
              className="w-full"
            >
              <SwiperSlide>
                <div className="flex justify-center gap-10 lg:pl-30">
                  <div className="max-h-[300px] max-w-[200px] lg-[100px] w-[130px] lg:w-[230px] flex justify-center relative lg:top-30  bg-lightBlue rounded-xl">
                    <img
                      src="/home/students/student1.png"
                      className=" h-full object-cover "
                    />
                  </div>
                  <p className=" lg:pr-[10%] text-[12px] lg:text-[36px] lg:leading-[48px] text-white relative">
                    {" "}
                    Elevia isn’t just another <br /> platform — it’s your
                    academic <br /> advantage. Every lesson, every test, <br />{" "}
                    every feature is crafted to help you <br /> learn faster,
                    deeper, and smarter.
                  </p>
                </div>
                <div className="mt-5 lg:mt-20">
                  <CustomHead className="text-black text-center">
                    EMILY THOMAS
                  </CustomHead>
                  <CustomPara className="text-black text-center">
                    Student
                  </CustomPara>
                </div>
              </SwiperSlide>
              <SwiperSlide>slide 2</SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
