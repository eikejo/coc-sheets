import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSheetById } from "./SheetsApiSlice";

const Sheet = ({ sheetId }) => {
  const sheet = useSelector((state) => selectSheetById(state, sheetId));
  const navigate = useNavigate();

  if (sheet) {
    const created = new Date(sheet.createdAt).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(sheet.updatedAt).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
    });
    const handleEdit = () => {
      navigate(`/dash/sheets/${sheetId}`);
    };

    return (
      <tr className="table__row">
        <td className="table__cell note_title">{sheet.charactername}</td>
        <td className="table__cell note_updated">{updated}</td>
        <td className={`table__cell`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};
export default Sheet;
