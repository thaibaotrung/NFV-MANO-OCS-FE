import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports
import FormCustomerAdd from './FormCustomerAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import { handlerCustomerDialog, useGetCustomer, useGetCustomerMaster } from 'api/customer';

// types
import { CustomerList } from 'types/customer';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const AddCustomer = () => {
  // const { customersLoading: loading, customers } = useGetCustomer();
  const customers = [];

  const [list, setList] = useState<CustomerList | null>(null);

  const isModal = true;
  const closeModal = () => handlerCustomerDialog(false);

  // eslint-disable-next-line
  // const customerForm = useMemo(
  //   () => !loading && !customerMasterLoading && <FormCustomerAdd customer={list} closeModal={closeModal} />,
  //   [list, loading, customerMasterLoading]
  // );

  const loading = false;

  return (
    <>
      {isModal && (
        <Modal
          open={true}
          onClose={closeModal}
          aria-labelledby="modal-customer-add-label"
          aria-describedby="modal-customer-add-description"
          sx={{
            '& .MuiPaper-root:focus': {
              outline: 'none'
            }
          }}
        >
          <MainCard
            sx={{ width: `calc(100% - 48px)`, minWidth: 340, maxWidth: 880, height: 'auto', maxHeight: 'calc(100vh - 48px)' }}
            modal
            content={false}
          >
            <SimpleBar
              sx={{
                maxHeight: `calc(100vh - 48px)`,
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              {loading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" justifyContent="center">
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                <FormCustomerAdd customer={list} closeModal={closeModal} />
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
};

export default AddCustomer;
