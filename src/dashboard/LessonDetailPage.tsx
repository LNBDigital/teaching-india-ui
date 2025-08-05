import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SimpleBluBtn } from "src/components/buttons/Button";
import DashboardWrapper from "src/components/wrapper/common/DashboardWrapper";
import { environment } from "src/lib/env";
import { useLessonStore } from "src/lib/store/lessonStore";

const SuccessBtn = ({ active = false, content = "demo", ...props }) => {
  const baseClasses = "rounded-md text-sm text-white px-2 py-1 cursor-pointer";
  const activeClasses = "bg-red-600";
  const inactiveClasses = "bg-green-600 border border-white rounded-sm";

  return (
    <button
      {...props}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {content}
    </button>
  );
};

const TabSwitchBtn = ({ active = false, content = "demo", ...props }) => (
  <button
    {...props}
    className={`rounded-md px-2 md:px-10 py-1 cursor-pointer ${
      active
        ? "bg-lightBlue5 text-white"
        : "bg-transparent border border-black rounded-sm"
    }`}
  >
    {content}
  </button>
);

export default function LessonDetailPage() {
  const { lessonid } = useParams();
  const [currLessonId, setCurrLessonId] = useState(lessonid);
  // Use zustand store data
  const { cache, setLessonData } = useLessonStore();
  const currentLesson = cache?.lessons.find((l) => l.id === currLessonId);
  const [read, setRead] = useState(currentLesson?.is_read);
  const [pdfShow, setPdfShow] = useState(false);

  // Sync read state when switching lessons
  useEffect(() => {
    setRead(currentLesson?.is_read);
    setPdfShow(false); // Reset to summary view on lesson change (optional)
  }, [currLessonId, cache]);

  const toggleReadStatus = async () => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${Cookies.get("authToken")}`,
      };
      const url = `${environment.API_PROD}lessons`;
      if (read) {
        await axios.delete(`${url}/${currLessonId}`, { headers });
      } else {
        await axios.post(url, { id: currLessonId }, { headers });
      }
      // Update Zustand store
      if (cache) {
        const updatedLessons = cache.lessons.map((lesson) =>
          lesson.id === currLessonId ? { ...lesson, is_read: !read } : lesson
        );
        setLessonData({ ...cache, lessons: updatedLessons });
      }
      setRead(!read);
    } catch (err) {
      console.error("Failed to update read status:", err);
    }
  };

  return (
    <DashboardWrapper
      changeBg
      heading={`Lesson - ${currentLesson?.name || "Unknown"}`}
    >
      <div className="w-full flex flex-col gap-3 lg:flex-row lg:gap-15 relative">
        <div className="relative w-full max-w-full xl:max-w-[70%] aspect-video overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={
              currentLesson?.video ||
              "https://www.youtube.com/embed/tgbNymZ7vqY"
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Lesson Video"
          />
        </div>
        <div className="w-full lg:max-w-[30%]">
          <SimpleBluBtn
            className="-top-23 absolute md:-top-28 left-0 xl:left-auto xl:right-12 w-fit"
            link="/dashboard"
          >
            Go to Menu
          </SimpleBluBtn>
          <h4 className="text-xl xl:text-2xl my-1 xl:my-5">{cache?.name}</h4>
          <ul className="flex flex-col gap-1 xl:gap-2">
            {cache?.lessons.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => setCurrLessonId(item.id)}
                  className={`cursor-pointer w-full text-left p-4 text-md xl:text-2xl border-2 rounded-md ${
                    item.id === currLessonId
                      ? "bg-lightBlue3 border-white "
                      : "border-lightBlue4"
                  }`}
                >
                  {item.name} 
                  {currLessonId === item.id && (
                    <div className="flex justify-between">
                    <div>
                   
                      {read ? (
                        <SuccessBtn
                        active={true}
                          onClick={toggleReadStatus}
                          content="Mark as Unread"
                        />
                      ) : (
                        <SuccessBtn
                          onClick={toggleReadStatus}
                          active={false}
                          content="Mark as Read"
                        />
                      )}
                    </div>
                       <img className="absolute top-5 right-7" src={item.feature_icon} width={70} />
                       </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="my-10 w-full xl:w-[70%]">
        <div className="flex justify-between">
          <div className="inline-flex gap-4">
            <TabSwitchBtn
              active={!pdfShow}
              content="Summary"
              onClick={() => setPdfShow(false)}
            />
            <TabSwitchBtn
              active={pdfShow}
              content="PDF"
              onClick={() => setPdfShow(true)}
            />
          </div>
        </div>

        <div className="py-6">
          {!pdfShow ? (
            <p>{currentLesson?.description}</p>
          ) : (
            <iframe
              src={`${currentLesson?.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
              width="100%"
              height="600px"
              title="Lesson PDF"
              style={{ border: "none" }}
            />
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
}
