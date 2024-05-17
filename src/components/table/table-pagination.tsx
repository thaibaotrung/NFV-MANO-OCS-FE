import { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';

// third-party
import { Updater } from '@tanstack/react-table';

interface TablePaginationProps {
  setPageSize: (updater: Updater<number>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  totalPage: number;
  initialPageSize?: number;
  currentPage: number;
  currentPageSize: number;
}

// ==============================|| TABLE PAGINATION ||============================== //

const TablePagination = ({ currentPageSize, currentPage, totalPage, setPageIndex, setPageSize, initialPageSize }: TablePaginationProps) => {
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(currentPage || 1);
  let options: number[] = [10, 25, 50];

  if (initialPageSize) {
    options = [...options, initialPageSize]
      .filter((item, index) => [...options, initialPageSize].indexOf(item) === index)
      .sort(function (a, b) {
        return a - b;
      });
  }

  // eslint-disable-next-line
  useEffect(() => setPageSize(initialPageSize || 10), []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Grid spacing={1} container alignItems="center" justifyContent="space-between" sx={{ width: 'auto' }} p={2}>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Row per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={currentPageSize}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                {options.map((option: number) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="secondary">
            Go to
          </Typography>
          <TextField
            size="small"
            type="number"
            value={page}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0;
              if (page > totalPage) {
                setPage(totalPage);
                return;
              }
              setPage(page);
            }}
            onBlur={() => {
              setPageIndex(page);
            }}
            onFocus={() => console.log('focus')}
            sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
          count={totalPage}
          page={currentPage}
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
};

export default TablePagination;
