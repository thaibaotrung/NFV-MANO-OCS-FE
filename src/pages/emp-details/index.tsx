import { useState } from 'react';
import { Button, Stack, TableCell, Typography } from '@mui/material';
import MyTable from '../../components/table';
import { HeadCell } from '../../model/table';
import { ColorProps } from '../../types/extended';
import Dot from '../../components/@extended/Dot';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { TableUtil } from 'utils/table';
import { VnfStatus } from 'dto/vnf';
import { PageDto } from 'dto/page-data-dto/page-data-dto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { lcmRequest } from 'request/lcm';
import { toast } from 'react-toastify';
import { NamedTimeZoneImpl } from '@fullcalendar/common';
import React from 'react';

export const EmpDetails = () => {
  const [filters, setFilters] = useState<any>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const { name } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['getVnfcList'],
    queryFn: () => lcmRequest.getVnfcList(name),
  });

  console.log('data', data);

  const headCells: HeadCell[] = [
    TableUtil.Thead('id', 'Id', { withSort: false }),
    TableUtil.Thead('name', 'Name', { withSort: false, withSearchBox: true }),
    TableUtil.Thead('nodeName', 'Node Name', { withSort: false }),
    TableUtil.Thead('ip', 'Ip', { withSort: false }),
    TableUtil.Thead('status', 'Status', {
      withSort: false,
      showSelect: true,
      listItems: [VnfStatus.STARTED, VnfStatus.STOPPED],
    }),
  ];

  const renderItems = (item: any, index) => {
    return [
      <TableCell align='left'>{item?._id}</TableCell>,
      <TableCell align='left'>{item?.name}</TableCell>,

      <TableCell align='left'>{item?.nodeName}</TableCell>,
      <TableCell align='left'>{item?.ip}</TableCell>,
      <TableCell align='left'>{item?.state}</TableCell>,
    ];
  };
  // const renderItems = (item: any, index) => {
  //   return item.vnfcList.map((vnfc: any) => (
  //     <React.Fragment key={vnfc._id}>
  //       <TableCell align='left'>{vnfc._id}</TableCell>
  //       <TableCell align='left'>{vnfc.name}</TableCell>
  //       <TableCell align='left'>{vnfc.nodeName}</TableCell>
  //       <TableCell align='left'>{vnfc.state}</TableCell>
  //     </React.Fragment>
  //   ));
  // };

  return (
    <>
      <Typography variant='h3' mb={2}>
        VNFc List
      </Typography>
      <MyTable<any, any, any>
        onFilterChange={(filters) => setFilters(filters)}
        delegate={renderItems}
        rows={data ? data[0]?.vnfcList : []}
        headCells={headCells}
        pageTotal={0}
        isLoading={isLoading}
      />
    </>
  );
};
