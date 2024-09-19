import Pagination from "react-js-pagination";

export default function Paginate({ page, type, totalCount, onPageChange }) {
  return (
    <>
      <Pagination
        activePage={page}
        hrefBuilder={(currentPage) => `/main/feed/${currentPage}?type=${type}`}
        itemsCountPerPage={10}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        onChange={onPageChange}
        itemClass="px-3 py-1"
        linkClass="hover:bg-gray-200 text-gray-700"
        activeClass="shadow-md border border-gray-500 text-white"
        activeLinkClass="hover:bg-blue-600"
        disabledClass="opacity-50 cursor-not-allowed"
        innerClass="flex justify-center space-x-2 mt-4"
        nextPageText={">"}
        prevPageText={"<"}
      />
    </>
  );
}
