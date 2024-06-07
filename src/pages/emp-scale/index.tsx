import { useEffect, useState } from 'react';
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
import { da } from 'date-fns/locale';

export const EmpScale = () => {
  const [filters, setFilters] = useState<any>({});
  const { user } = useAuth();
  const isLoading = false;
  const navigate = useNavigate();

  const { name } = useParams();
  const { data } = useQuery({
    queryKey: ['getScaleVnf'],
    queryFn: () => lcmRequest.getScaleVnf(name),
  });

  const headCells: HeadCell[] = [
    TableUtil.Thead('id', 'Id', { withSort: false }),
    TableUtil.Thead('name', 'Name', { withSort: false, withSearchBox: true }),
    TableUtil.Thead('currentNumberOfInstance', 'Current Number Of Instance', { withSort: false }),
    TableUtil.Thead('numberScale', 'Number Scale', { withSort: false, withSearchBox: false }),
    TableUtil.Thead('action', 'Action', { withSort: false, withSearchBox: false }),
  ];

  // const renderItems = (item: any, index) => {
  //   return [
  //     <TableCell align='left'>{item?.vnfcList?._id}</TableCell>,
  //     <TableCell align='left'>{item?.vnfcList?.name}</TableCell>,

  //     <TableCell align='left'>{item?.vnfcList?.nodeName}</TableCell>,
  //     <TableCell align='left'>{item?.vnfcList?.state}</TableCell>,
  //   ];
  // };

  const [scaleCountObj, setScaleCountObj] = useState<{}>({});

  const handleScaleItem = (count: number, index) => {
    const obj = scaleCountObj;
    setScaleCountObj({
      ...obj,
      [index]: count,
    });
  };

  const scaleMutation = useMutation({
    mutationFn: ({ name, vnfcName, numberScale }: { name: any; vnfcName: any; numberScale: any }) =>
      lcmRequest.scaleVnfc(name, vnfcName, numberScale),
    onSuccess: () => {
      toast.success('Scaled Successfully');
    },
  });
  const renderItems = (item: any, index) => {
    return [
      <TableCell align='left'>{index + 1}</TableCell>,
      <TableCell align='left'>{item?.name}</TableCell>,

      <TableCell align='left'>{item?.numberofinstance}</TableCell>,
      <TableCell>
        <CountBar
          max={5}
          min={1}
          initial={item?.numberofinstance}
          onCountChange={(count) => {
            handleScaleItem(count, index);
          }}
        />
      </TableCell>,
      <TableCell>
        <Stack gap={1} direction='row' spacing={0}>
          <Button
            onClick={() => {
              console.log('arrayScale', scaleCountObj[index]);
              scaleMutation.mutate({
                name: name,
                vnfcName: item?.name,
                numberScale: scaleCountObj[index],
              });
            }}
            color='success'
            variant='contained'
            disabled={!(scaleCountObj[index] && scaleCountObj[index] !== item?.numberofinstance)}
          >
            Scale
          </Button>
        </Stack>
      </TableCell>,
    ];
  };

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

const CountBar = ({
  max,
  min,
  initial,
  onCountChange,
}: {
  min: number;
  max: number;
  initial: number;

  onCountChange: (count: number) => void;
}) => {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    onCountChange(count);
  }, [count]);

  return (
    <Stack gap={3} direction='row' spacing={0}>
      <Button
        onClick={() => {
          if (count <= min) {
            return;
          }
          setCount(count - 1);
        }}
        variant='outlined'
        disabled={count <= min}
      >
        -
      </Button>
      <Typography
        sx={{
          alignSelf: 'center',
        }}
      >
        {count}
      </Typography>
      <Button
        onClick={() => {
          if (count >= max) {
            return;
          }
          setCount(count + 1);
        }}
        variant='outlined'
        disabled={count >= max}
      >
        +
      </Button>
    </Stack>
  );
};
