export default function Search(){
    return (
        <div className="h-60 flex items-center justify-center bg-[url('/cover.jpg')] bg-center ">
            <div className="mt-8 flex w-1/3">
                <input className="focus:outline-orange-600 rounded w-full h-8 white-box" type="text" />
               
                <button className="orange-box px-2 py-1 text-white  rounded hover:bg-orange-600">Search</button>
            </div>
        </div>
    )
}