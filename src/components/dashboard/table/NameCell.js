import { Link } from "react-router-dom";
import { Button, Popover, Table, Whisper } from "rsuite";
const { Cell } = Table;

const NameCell = ({ rowData, dataKey, fontSize, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Age:</b> {rowData.age}
      </p>
      <p>
        <b>Sex:</b> {rowData.sex}
      </p>
      <p>
        <b>Status:</b> {rowData.status}
      </p>
      <p>
        <b>Diagnosis:</b> {rowData.diagnosis}
      </p>
    </Popover>
  );

  return (
    <Link to={`/patient/${rowData["userId"]}`}>
      <Cell {...props}>
        <Whisper placement="top" speaker={speaker}>
          <Button appearance="link" style={{ fontSize: fontSize }}>
            {`${rowData[dataKey]} ${rowData["lastName"]}` ?? "-"}
          </Button>
        </Whisper>
      </Cell>
    </Link>
  );
};

export default NameCell;
