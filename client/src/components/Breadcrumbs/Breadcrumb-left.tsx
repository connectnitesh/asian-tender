import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 py-1 sm:flex-row sm:items-center text-white sm:justify-between bg-blue-600 dark:bg-gray-900">
      <nav>
        <ol className="flex items-center gap-2 ">
          <li>
            <Link className="ml-2 text-xl py-2" href="/">
              Home /
            </Link>
          </li>
          <li className="text-xl text-gray-400">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;