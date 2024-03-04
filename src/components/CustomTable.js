import React, { useEffect, useState } from "react";
import "../styles/Table.css"; 
import Loader from "./Loader";
import Pagination from "./Pagination";
const CustomTable = ({ data, loading, error, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (data?.metadata?.totalCount) {
      const totalCount = data.metadata.totalCount;
      setTotalPages(Math.ceil(totalCount / 5)); 
    } else {
      setTotalPages(1);
    }
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th>#</th>
        <th>Place Name</th>
        <th>Country</th>
      </tr>
    );
  };

  const renderTableData = () => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data?.data?.slice(startIndex, endIndex);

    return (
      <>
        {!slicedData ? (
          <td colSpan={3}>Please search for a city</td>
        ) : slicedData.length === 0 ? (
          <td colSpan={3}>No data found</td>
        ) : (
          <>
            {slicedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.city}</td>
                <td>{item?.country}</td>
              </tr>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{loading ? <Loader /> : renderTableData()}</tbody>
      </table>
      {totalPages > 1 && !loading && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default CustomTable;
