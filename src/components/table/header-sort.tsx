import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { SortType } from 'model/table';

interface IProps<S> {
  defaultSortField?: S;
  defaultDirection?: SortType;
  onChange?: (sortField?: S, direction?: SortType) => void;
  currentSortField?: S;
}

export const HeaderSort = <I, S>({ defaultSortField, defaultDirection, onChange, currentSortField }: IProps<S>) => {
  const theme = useTheme();

  const [sortType, setSortType] = useState<SortType | undefined>(defaultDirection);
  const [sortField, setSortField] = useState<S | undefined>(defaultSortField);

  useEffect(() => {
    onChange && onChange(sortField, sortType);
  }, [sortField, sortType]);

  return (
    <Box
      sx={{
        alignSelf: 'center'
      }}
      {...{ className: 'cursor-pointer prevent-select' }}
      onClick={() => {
        const type = sortType === SortType.ASC ? SortType.DESC : SortType.ASC;
        setSortType(type);
      }}
    >
      {/*sort toggler*/}
      <Stack sx={{ color: 'secondary.light' }}>
        <CaretUpOutlined
          style={{
            fontSize: '0.625rem',
            color: sortType === SortType.ASC && currentSortField === defaultSortField ? theme.palette.text.secondary : 'inherit'
          }}
        />
        <CaretDownOutlined
          style={{
            fontSize: '0.625rem',
            marginTop: -2,
            color: sortType === SortType.DESC && currentSortField === defaultSortField ? theme.palette.text.secondary : 'inherit'
          }}
        />
      </Stack>
    </Box>
  );
};
