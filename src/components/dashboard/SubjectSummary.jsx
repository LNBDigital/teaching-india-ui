import { Link } from "react-router-dom";

export default function SubjectSummary({
  slug,
  subjectId,
  subject = "subject",
  lesson: { completed, total, remaining },
  img,
  read,
  ...props
}) {
  console.log(read, "err");
  return (
    <Link
      {...props}
      to={`/subject/${slug}`}
      state={{ subjectId }}
      className="p-7 relative bg-peach2 rounded-xl h-[7cm] w-full max-w-lg"
    >
      <p className="text-xl md:text-[2rem] absolute top-15">{subject}</p>
      <img
        width={200}
        alt="icons"
        className=" w-40  sm:w-[200px] xl:w-full xl:max-w-[200px] absolute top-0 xs:top-0 right-0 xs:-right-3"
        src={img}
      />
      <div className="xs:w-[7cm] md:w-xs absolute bottom-7 grid gap-2">
        <span>
          You've completed {completed} of {total} lessons
        </span>
        <div className="w-full h-2 bg-black rounded-lg relative overflow-hidden">
          <div
            className="h-full bg-blue absolute top-0 left-0 rounded-lg"
            style={{ width: read }}
          />
        </div>
        <p className="inline-flex justify-between">
          {read} Complete<span>{remaining} lessons remaining</span>
        </p>
      </div>
    </Link>
  );
}
