import { useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

interface Props {
    resPerPage: number,
    filteredRoomCount: number
}


const CustomPagination = ({resPerPage, filteredRoomCount} : Props) => {
    const searchParams = useSearchParams();
    let page = searchParams.get('page') || 1;
    page = Number(page);

    const handlePageChange = (currentPage: string) =>  {

    }

    return (
        <div>
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomCount}
            onChange={handlePageChange}
            nextPageText = {"Next"}
            prevPageText = {"Prev"}
            firstPageText = {"First"}
            lastPageText = {"Last"}
          />
        </div>
    );
}

export default CustomPagination;