import Link from "next/link";

interface BreadcrumbProps {
  mainPage?: string;
  sidePage: string;
  mainLink?: string;
  sideLink: string;
  position?: "left" | "right";
}


const Breadcrumb: React.FC<BreadcrumbProps> = ({ mainPage = 'Dashboard', sidePage = '', mainLink = '/admin_panel/dashboard', sideLink = '/admin_panel/dashboard', position = "right" }) => {
  return (
    
    <div className={`mb-6 flex flex-col gap-3 ${position === "left" ? "bg-blue-600 rounded sm:flex-row sm:items-center sm:justify-between" : "py-1 sm:flex-row sm:items-center text-white sm:justify-between "}`}>
      {position === "right" ? <h2 className={`text-2xl font-semibold text-boxdark dark:text-bodydark1 "}`}>
        {sidePage ? sidePage : mainPage}
      </h2> : ''}
      <nav>
        <ol className="flex items-center gap-2 p-1 ml-2 ">
          <li>
            <Link className={`font-medium  ${position === "left" ? "text-xl py-2 text-white" : "text-boxdark dark:text-bodydark ml-2 text-xl py-2"}`} href={mainLink}>
              {mainPage} /
            </Link>
          </li>
          <li className={`font-medium  ${position === "left" ? "text-xl text-sky-100 mr-2" : "text-xl text-gray-400"}`}>
            <Link  href={sideLink}>
              {sidePage}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
