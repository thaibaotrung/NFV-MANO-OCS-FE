import { useState } from "react";
import {
  Button,
  Stack,
  styled,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import MyTable from "../../components/table";
import { HeadCell } from "../../model/table";
import { ColorProps } from "../../types/extended";
import Dot from "../../components/@extended/Dot";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { TableUtil } from "utils/table";
import { VnfStatus } from "dto/vnf";
import { PageDto } from "dto/page-data-dto/page-data-dto";

const InputImageAfterIdl = styled(TextField)(({ theme }) => ({
  display: "none",
}));

export const VnfdList = () => {
  const [filters, setFilters] = useState<any>({});
  const { user } = useAuth();

  const isLoading = false;

  const navigate = useNavigate();
  const headCells: HeadCell[] = [
    TableUtil.Thead("id", "Id", { withSort: false }),
    TableUtil.Thead("name", "Name", { withSort: false, withSearchBox: true }),
    TableUtil.Thead("version", "Version", { withSort: false }),
    TableUtil.Thead("createdBy", "Created By", {
      withSort: false,
    }),
    TableUtil.Thead("provider", "Provider", { withSort: false }),
    TableUtil.Thead("action", "Action", { withSort: false }),
  ];
  const data = {
    data: [
      {
        id: "1",
        name: "ngocDa",
        version: "1.0.1",
        createdBy: "NgocDa",
        provider: "HUST",
      },
    ],
  } as PageDto<any>;

  const renderItems = (item: any, index) => {
    return [
      <TableCell align="left">{item?.id}</TableCell>,
      <TableCell align="left">{item?.name}</TableCell>,

      <TableCell align="left">{item?.version}</TableCell>,

      <TableCell align="left">{item?.createdBy}</TableCell>,
      <TableCell align="left">{item?.provider}</TableCell>,

      <TableCell>
        <Stack gap={1} direction="row" spacing={0}>
          <Button onClick={() => {}} variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </TableCell>,
    ];
  };
  return (
    <>
      <Typography variant="h3" mb={2}>
        Upload Tosca File
      </Typography>
      <Stack flexDirection={"row"} mb={2} gap={2}>
        <TextField
          id="fileInputimageAfterIdl"
          name="imageAfterIdl"
          type="file"
          onChange={(e) => {}}
        />
        <Button
          sx={{
            width: "10rem",
            p: 1,
          }}
          variant="contained"
        >
          Upload
        </Button>
      </Stack>
      <Typography variant="h3" mb={2}>
        VNFD List
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
