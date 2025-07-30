import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LessonSummary from "src/components/dashboard/LessonSummary";
import { getPrefetchData } from "src/lib/getApi";

interface Prefill {
  id: string;
  name: string;
  feature_icon: string | null;
  image: string | null;
  slug: string;
  total_lessons: number | number;
  total_duration: number | null;
  lessons_read_percentage: string;
  lessons: [
    {
      id: string;
      name: string;
      description: string;
      duration: number;
      pdf: string;
      question_pdf: string;
      image: string;
      video: string;
      is_read: boolean;
    }
  ];
}

export default function SubjectDetail() {
  const location = useLocation();
  const id = location.state?.id;
  const [lesson, setLesson] = useState<Prefill | null>(null);
  useEffect(() => {
    getPrefetchData<Prefill>(`subjects/${id}`).then((data) => {
      setLesson(data);
    });
  }, []);

  return (
    <div className="bg-black px-8 py-15 h-screen">
        <h3 className="text-peach2 uppercase text-[3rem]">Subject - {lesson?.name}</h3>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {lesson?.lessons?.map((item, index) => (
          <LessonSummary
            key={index}
            slug={item.name}
            id={item.id}
            name={item.name}
            img={item.image}
            duration={item.duration}
          />
        ))}
      </div>
    </div>
  );
}
