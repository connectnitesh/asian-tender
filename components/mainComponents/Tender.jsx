
export default function Tender(props) {

  return (
    <>
      <h1 className="text-xl font-bold orange-box text-white px-4 py-1">
        Tender Details
      </h1>
      <div className="flex">
        <h2 className="text-gray-800 text-xl font-semibold mx-4 my-4 w-3/4">
          {props.title}
        </h2>
        <p className="flex justify-end w-full p-4">
          Tender Id: {props.tID}
        </p>
      </div>
      <div className="mx-4">
        <p className="">
          Tender Title: {props.title}
        </p>
        <p className="">Category: {props.category}</p>
        <p className="">Tender Value: {props.value}</p>
        <p className="">State: {props.state}</p>
        <p className="">Last Date of Bid Submission: {props.closeDate}</p>
      </div>

      <div className="mx-4">
        <p className=" font-semibold">Other Information</p>
        <ul className="list-disc ml-6">
          <li>Attachments: Tender Notice</li>
          <li>Attachments: Tender Document</li>
        </ul>
      </div>
    </>
  );
}
