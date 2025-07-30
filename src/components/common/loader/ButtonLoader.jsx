export default function ButtonLoader({loader=false}){
    return(
       loader && (
        <div className="max-w-2xl max-h-10 w-full bg-[#ce9278] inline-flex justify-center items-center rounded-lg cursor-none">
            <img src={"/icons/spinner.gif"} alt="icon" className="w-10 h-fit" />
        </div>
       )
    )
}