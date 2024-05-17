import { useState } from 'react';
import { Button, Stack, TableCell, Typography } from '@mui/material';
import MyTable from '../../components/table';
import { HeadCell } from '../../model/table';
import { ColorProps } from '../../types/extended';
import Dot from '../../components/@extended/Dot';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { TableUtil } from 'utils/table';
import { VnfStatus } from 'dto/vnf';
import { PageDto } from 'dto/page-data-dto/page-data-dto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { lcmRequest } from 'request/lcm';
import { toast } from 'react-toastify';

export const EmpList = () => {
  const [filters, setFilters] = useState<any>({});
  const { user } = useAuth();

  const isLoading = false;

  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ['getVnfList'],
    queryFn: () => lcmRequest.getVnfList(),
  });
  const deleteVnfMutation = useMutation({
    mutationFn: (param: any) => lcmRequest.deleteVnf(param),
    onSuccess: () => {
      refetch();
      toast.success('Deleted Successfully');
    },
  });
  const headCells: HeadCell[] = [
    TableUtil.Thead('id', 'Id', { withSort: false }),
    TableUtil.Thead('name', 'Name', { withSort: false, withSearchBox: true }),
    TableUtil.Thead('vnfdName', 'Vnfd Name', { withSort: false }),
    TableUtil.Thead('status', 'Status', {
      withSort: false,
      showSelect: true,
      listItems: [VnfStatus.STARTED, VnfStatus.STOPPED],
    }),
    TableUtil.Thead('desciption', 'Desciption', { withSort: false }),

    TableUtil.Thead('Actions', 'Actions', { withSort: false }),
  ];

  const renderItems = (item: any, index) => {
    return [
      <TableCell align='left'>{item?.id}</TableCell>,
      <TableCell align='left'>{item?.name}</TableCell>,

      <TableCell align='left'>{item?.vnfdName}</TableCell>,
      <TableCell align='left'>
        <Status status={item?.status} />
      </TableCell>,
      <TableCell align='left'>{item?.description}</TableCell>,
      <TableCell>
        <Stack gap={1} direction='row' spacing={0}>
          <Button onClick={() => {}} color='success' variant='contained'>
            Instantiate
          </Button>
          <Button onClick={() => {}} color='inherit' variant='contained'>
            Terminate
          </Button>
          <Button onClick={() => {}} color='info' variant='contained'>
            Details
          </Button>
          <Button onClick={() => {}} color='secondary' variant='contained'>
            Healing
          </Button>
          <Button onClick={() => {}} color='warning' variant='contained'>
            Scale
          </Button>
          <Button
            onClick={() => {
              deleteVnfMutation.mutate(item?.name);
            }}
            variant='contained'
            color='error'
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              navigate('/vnfd/lcmopocc/list');
            }}
            variant='contained'
          >
            LCMOPOCC
          </Button>
        </Stack>
      </TableCell>,
    ];
  };
  return (
    <>
      <Typography variant='h3' mb={2}>
        VNF Instance List
      </Typography>
      <MyTable<any, any, any>
        onFilterChange={(filters) => setFilters(filters)}
        delegate={renderItems}
        rows={data ? data : []}
        headCells={headCells}
        pageTotal={0}
        isLoading={isLoading}
        btnCreateContent='Create VNF Instance'
        btnCreateOnclick={() => {
          navigate('/vnf/create');
        }}
      />
    </>
  );
};

const Status = ({ status }: { status: VnfStatus }) => {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case VnfStatus.STARTED:
      color = 'success';
      title = 'Started';
      break;

    case VnfStatus.STOPPED:
      color = 'error';
      title = 'Stopped';
      break;

    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};
