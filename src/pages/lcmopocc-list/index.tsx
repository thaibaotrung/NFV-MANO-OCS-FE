import { useState } from "react";
import { Stack, TableCell, Typography } from "@mui/material";
import MyTable from "../../components/table";
import { HeadCell } from "../../model/table";
import { ColorProps } from "../../types/extended";
import Dot from "../../components/@extended/Dot";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { TableUtil } from "utils/table";
import { VnfStatus } from "dto/vnf";
import { PageDto } from "dto/page-data-dto/page-data-dto";

export const LcmopoccList = () => {
  const [filters, setFilters] = useState<any>({});
  const { user } = useAuth();

  const isLoading = false;

  const navigate = useNavigate();
  const headCells: HeadCell[] = [
    TableUtil.Thead("id", "Id", { withSort: false }),
    TableUtil.Thead("name", "Name", { withSort: false, withSearchBox: true }),

    TableUtil.Thead("operation", "Operation", { withSort: false }),

    TableUtil.Thead("operationStatus", "Operation Status", {
      withSort: false,

      showSelect: true,
      listItems: [VnfStatus.STARTED, VnfStatus.STOPPED],
    }),
    TableUtil.Thead("startedTime", "Start Time", { withSort: false }),
  ];
  const data = {
    data: [
      {
        id: "1",
        name: "ngocDa",
        operationStatus: VnfStatus.STARTED,
        operation: "Hello",
        startedTime: "06-09-2023 12:00:00",
      },
    ],
  } as PageDto<any>;

  const renderItems = (item: any, index) => {
    return [
      <TableCell align="left">{item?.id}</TableCell>,
      <TableCell align="left">{item?.name}</TableCell>,
      <TableCell align="left">{item?.operation}</TableCell>,

      <TableCell align="left">
        <Status status={item?.operationStatus} />
      </TableCell>,
      <TableCell align="left">{item?.startedTime}</TableCell>,
    ];
  };
  return (
    <>
      <Typography variant="h3" mb={2}>
        LCMOPMCC List
      </Typography>
      <MyTable<any, any, any>
        onFilterChange={(filters) => setFilters(filters)}
        delegate={renderItems}
        rows={data?.data ? data.data : []}
        headCells={headCells}
        pageTotal={0}
        isLoading={isLoading}
      />
    </>
  );
};

const Status = ({ status }: { status: VnfStatus }) => {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case VnfStatus.STARTED:
      color = "success";
      title = "Started";
      break;

    case VnfStatus.STOPPED:
      color = "error";
      title = "Stopped";
      break;

    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};
