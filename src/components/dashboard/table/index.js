import React, { useContext, useEffect } from "react";
import { BsArrowDownSquareFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Table } from "rsuite";
import { ThemeContext } from "../../../context/ThemeProvider";
import { token } from "../../../store/authSlice";
import { getAllPatients, getPatientList } from "../../../store/patientsSlice";
import ActionCell from "./ActionCell";
import NameCell from "./NameCell";
const { Column, HeaderCell, Cell } = Table;

const PatientsTable = ({ patientsData }) => {
  const dispatch = useDispatch();
  const access_token = useSelector(token);
  const patients = useSelector(getAllPatients);

  const {
    globalTheme: {
      dashboard: { table: theme },
    },
  } = useContext(ThemeContext);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  useEffect(() => {
    dispatch(getPatientList(access_token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TrendCell = ({ rowData, dataKey, fontSize, ...props }) => {
    if (rowData[dataKey] === undefined) return <Cell {...props} />;
    return (
      <Cell {...props}>
        {rowData[dataKey] ? (
          <BsFillArrowUpSquareFill size={20} color="#65ca5c" />
        ) : (
          <BsArrowDownSquareFill size={20} color="#eb4b4b" />
        )}
      </Cell>
    );
  };

  return (
    <>
      <Table
        autoHeight
        data={patients}
        hover
        className={theme.darkMode === true ? "rs-theme-dark" : ""}>
        <Column width={100} resizable>
          <HeaderCell>Patient Name</HeaderCell>
          <NameCell dataKey="firstName" fontSize={theme.fontSize} />
        </Column>

        {/* <Column width={100}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell
            dataKey="lastName"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column> */}

        <Column width={70}>
          <HeaderCell>Age</HeaderCell>
          <Cell
            dataKey="age"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={70}>
          <HeaderCell>Sex</HeaderCell>
          <Cell
            dataKey="sex"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={100}>
          <HeaderCell>CKD Status</HeaderCell>
          <Cell
            dataKey="status"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={160} resizable>
          <HeaderCell>Primary Care</HeaderCell>
          <Cell
            dataKey="primaryCare"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>
        <Column width={90}>
          <HeaderCell>Last eGFR</HeaderCell>
          <Cell
            dataKey="eGFR"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>
        <Column width={120}>
          <HeaderCell>Last IDWG</HeaderCell>
          <Cell
            dataKey="IDWG"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>
        <Column width={120}>
          <HeaderCell>Last Dry Weight</HeaderCell>
          <Cell
            dataKey="dryWeight"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>
        <Column width={100}>
          <HeaderCell>IDH reported</HeaderCell>
          <Cell
            dataKey="IDH"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>
        {/* ------------------------------------------------------------------------- */}

        <Column width={160}>
          <HeaderCell>Weekly weight trend</HeaderCell>
          <TrendCell
            dataKey="weightTrend"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={160}>
          <HeaderCell>Weekly step count trend</HeaderCell>
          <TrendCell
            dataKey="stepsTrend"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={160}>
          <HeaderCell>Weekly BP trend</HeaderCell>
          <TrendCell
            dataKey="bpTrend"
            style={{ color: theme.color, fontSize: theme.fontSize }}
          />
        </Column>

        <Column width={1000} resizable>
          <HeaderCell>Actions</HeaderCell>
          <ActionCell dataKey="actions" theme={theme.buttons} />
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={patientsData.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
};

export default PatientsTable;
