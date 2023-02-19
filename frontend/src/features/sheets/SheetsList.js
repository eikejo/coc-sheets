import { useGetSheetsQuery } from "./SheetsApiSlice";
import Sheet from "./Sheet";

const SheetsList = () => {
  const {
    data: sheets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSheetsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p className={"errmsg"}>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = sheets;
    const tableContent = ids?.length
      ? ids.map((sheetId) => <Sheet key={sheetId} sheetId={sheetId} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Charactername
            </th>
            <th scope="col" className="table__th user__username">
              Updated
            </th>
            <th scope="col" className="table__th user__username">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default SheetsList;
