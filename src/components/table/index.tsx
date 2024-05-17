import React, { Fragment, ReactNode, useEffect, useState } from "react";

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

// third-party
// project import
// assets
import { HeaderSort } from "./header-sort";
import DebouncedInput from "./debounced-input";
import TablePagination from "./table-pagination";
import { HeadCell, SortType } from "../../model/table";
import { usePagination } from "../../hooks/use-pagination";
import MainCard from "components/MainCard";

// types

// ==============================|| ORDER TABLE - STATUS ||============================== //
// ==============================||  TABLE ||============================== //

export default function MyTable<I, F, S>({
  headCells,
  delegate,
  rows,
  onFilterChange,
  pageTotal,
  isLoading,
  btnCreateContent,
  btnCreateOnclick,
}: {
  headCells: HeadCell[];
  delegate: (item: I, index) => Array<ReactNode>;
  rows: Array<I>;
  onFilterChange: (filter: F) => void;
  pageTotal: number;
  isLoading: boolean;
  btnCreateContent?: string;
  btnCreateOnclick?: () => void;
}) {
  const theme = useTheme();

  const [filter, setFilter] = useState<F>({} as F);
  const [sortField, setSortField] = useState<S | undefined>(undefined);
  const [sortType, setSortType] = useState<SortType>();
  const { limit, setLimit, page, setPage } = usePagination(10);

  useEffect(() => {
    const filters = {
      take: limit,
      page: page - 1,
      orderBy: sortField,
      sortBy: sortType,
    };
    onFilterChange(filters as any);
  }, [page, limit, sortField, sortType]);

  useEffect(() => {
    setSortField(undefined);
  }, []);

  return (
    <Stack gap={2}>
      <MainCard>
        <Stack flexDirection={"row"} sx={{ background: "white" }} gap={2}>
          {headCells?.map((headCell) =>
            headCell.withSearchBox ||
            headCell.showSelect ||
            headCell.showMultiSelect ? (
              <Stack
                key={headCell.id}
                padding={headCell.disablePadding ? "none" : "normal"}
              >
                <Stack
                  gap={1}
                  fontWeight={"700"}
                  fontSize={"0.75rem"}
                  color={"#262626"}
                >
                  {headCell.label}

                  {headCell.searchKey && headCell.withSearchBox && (
                    <DebouncedInput
                      value={""}
                      onFilterChange={(e) => {
                        setSortField(undefined);
                        setSortType(undefined);
                        setFilter({
                          ...filter,
                          [headCell.searchKey as any]: !!e ? e : undefined,
                          take: 10,
                          page: 0,
                        });
                      }}
                    />
                  )}
                  {headCell.showSelect &&
                    headCell.searchKey &&
                    headCell.listItems && (
                      <Autocomplete
                        id={headCell.id}
                        // value={value}
                        onChange={(event: any, newValue: string | null) => {
                          setFilter({
                            ...filter,
                            [headCell.searchKey as any]: newValue,
                            take: 10,
                            page: 0,
                          });
                        }}
                        options={headCell.listItems}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={""}
                            sx={{
                              "& .MuiAutocomplete-input.Mui-disabled": {
                                WebkitTextFillColor: theme.palette.text.primary,
                                border: "1px solid red",
                              },
                            }}
                          />
                        )}
                        sx={{
                          width: "10rem",
                        }}
                      />
                    )}
                  {headCell.showMultiSelect &&
                    headCell.searchKey &&
                    headCell.listItems && (
                      <Autocomplete
                        id={headCell.id}
                        // value={value}
                        getOptionLabel={(option) => option?.fullName}
                        multiple
                        onChange={(event: any, newValue: any[]) => {
                          const listId = newValue?.map((item) => item?.id);
                          setFilter({
                            ...filter,
                            [headCell.searchKey as any]: listId,
                            take: 10,
                            page: 0,
                          });
                        }}
                        options={headCell.listItems}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={""}
                            sx={{
                              "& .MuiAutocomplete-input.Mui-disabled": {
                                WebkitTextFillColor: theme.palette.text.primary,
                                border: "1px solid red",
                              },
                            }}
                          />
                        )}
                        sx={{
                          width: "10rem",
                        }}
                      />
                    )}
                </Stack>
              </Stack>
            ) : null
          )}

          <Button
            onClick={() => {
              setLimit(10);
              setPage(1);
              onFilterChange(filter);
            }}
            sx={{
              alignSelf: "center",
              paddingX: 5,
              paddingY: 1.05,
              mt: "1.6rem",
              width: "8rem",
            }}
            variant="contained"
          >
            Search
          </Button>
          {!!btnCreateContent && (
            <Button
              onClick={btnCreateOnclick}
              sx={{
                alignSelf: "center",
                paddingX: 2,
                paddingY: 1.05,
                mt: "1.5rem",
              }}
              variant="contained"
            >
              {btnCreateContent}
            </Button>
          )}
        </Stack>
      </MainCard>
      <MainCard content={false}>
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            position: "relative",
            display: "block",
            maxWidth: "100%",
            "& td, & th": { whiteSpace: "nowrap" },
            py: 2,
          }}
        >
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells?.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align || "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    <Stack flexDirection={"row"} gap={1}>
                      {headCell.label}
                      {headCell.withSort && (
                        <HeaderSort<any, S>
                          onChange={(sortField, sortType) => {
                            setSortField(sortField);
                            setSortType(sortType);
                          }}
                          currentSortField={sortField}
                          defaultSortField={headCell.defaultSortField}
                        />
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <CircularProgress
                  sx={{
                    alignSelf: "center",
                    marginTop: 3,
                  }}
                  color="primary"
                />
              </Stack>
            ) : (
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      tabIndex={-1}
                      key={index}
                    >
                      {delegate(row, index).map((cell, idx) => (
                        <Fragment key={`${index}-${idx}`}>{cell}</Fragment>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Divider />

        <TablePagination
          currentPageSize={limit}
          setPageSize={(e) => {
            setLimit(e);
            setPage(1);
          }}
          setPageIndex={(e) => setPage(e)}
          totalPage={pageTotal}
          currentPage={page}
        />
      </MainCard>
    </Stack>
  );
}
