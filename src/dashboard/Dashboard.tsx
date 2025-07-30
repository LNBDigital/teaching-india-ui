import { useEffect, useState } from "react";
import SubjectSummary from "src/components/dashboard/SubjectSummary";
import { getPrefetchData } from "src/lib/getApi";

interface Prefill {
  name: string;
  class: string;
  subjects: [
    {
      id: string;
      name: string;
      feature_icon: string | null;
      image: string | null;
      slug: string;
      total_lessons: number | number;
      total_duration: number | null;
      lessons_read_count: number | null;
      lessons_read_percentage: string;
    }
  ];
}

function Img() {
  const img = ["1.png", "2.png", "3.png", "4.png"];
  return (
    <div className="grid grid-cols-4 gap-3">
      {img.map((item, index) => (
        <img
          key={index}
          src={`/dashboard/home/${item}`}
          alt="icons"
          className="w-full rounded-2xl"
        />
      ))}
    </div>
  );
}


export default function Dashboard() {
  const [prefillData, setPrefillData] = useState<Prefill | null>(null);
  useEffect(() => {
    getPrefetchData<Prefill>("dashboard").then((data) => {
      if (data) setPrefillData(data);
    });
  }, []);

  const handleSubject = (item)=>{
    
  }

  return (
    <div className="container mx-auto">
      <div className="bg-black mx-8 my-5 rounded-lg p-4">
        <div className="flex justify-between ">
          <h2 className="text-[26px] text-lightBlue4">elevia</h2>
          <span className="text-[18px] text-lightBlue4">Dashboard</span>
          <img alt="user" width={50} src="/dashboard/home/user.png" />
        </div>
        <div className="flex flex-col  gap-2 py-10 px-15">
          <div className="relative">
            <img
              src="/dashboard/home/name-pattern.svg"
              alt="icon"
              className="w-full"
            />
            <div className="absolute top-13 left-13">
              <h4 className=" border-[1.5px] border-black rounded-lg px-4 py-2 w-fit">
                {prefillData?.class}
              </h4>
              <h5 className="text-[4rem] mt-6">
                Welcome Back {prefillData?.name ?? "Guest"} 👋
              </h5>
              <h6 className="text-2xl uppercase">
                You're doing great in your studies. Ready for your next lesson?
              </h6>
            </div>
          </div>
          <Img />
        </div>
      </div>

      <div className="bg-black px-8 py-15 grid grid-cols-3 gap-4">
        {prefillData?.subjects.map((item, index) => (
          <SubjectSummary
          slug={item.slug}
          id={item.id}
            key={index}
            subject={item.name}
            lesson={{
              completed: item.lessons_read_count,
              total: item.total_lessons,
              remaining:item.total_lessons - item.lessons_read_count
            }}
            img={item.feature_icon}
            read={item.lessons_read_percentage}

          />
        ))}
      </div>

        <div className="p-14 flex items-center gap-30">
            <div>
                <h4 className="text-[4.5rem] text-lightBlue5 uppercase">Upcoming Features</h4>
                <div className="flex items-center gap-10 border-4 border-black rounded-2xl w-fit p-10 mt-10">
                    <img width={140} src="/dashboard/home/clip-board.png" />
                    <div>
                        <h5 className="text-[3.5rem]">MCQ Practice Tests</h5>
                        <p>
                            Practice topic-wise MCQs and assess your <br /> understanding instantly.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <img width={430} src="/dashboard/home/up-coming.png" alt="icons" />
            </div>
        </div>
      
    </div>
  );
}
