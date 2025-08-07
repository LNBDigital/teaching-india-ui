import { Link } from "react-router-dom";

interface LessonType{
    lessonId:string;
    name:string;
    img:string;
    duration:number | string
}


export default function LessonSummary({lessonId,name,img,duration}:LessonType){
    return(
        <Link to={lessonId} className="p-7 relative bg-peach2 rounded-xl h-[7cm] w-full max-w-lg">
            <p className="text-[2rem] absolute top-15">{name}</p>
            <img alt="icons" className="absolute top-auto bottom-10 sm:top-20 md:top-27 xl:top-18 right-4 w-full max-w-[140px] xs:max-w-[140px] sm:max-w-[180px] md:max-w-[120px] xl:max-w-[180px]" src={img} />
            <div className="xs:w-xs absolute bottom-7 grid gap-2">
                <span className="">{duration} mins.</span>
            </div>
        </Link>
    )
}