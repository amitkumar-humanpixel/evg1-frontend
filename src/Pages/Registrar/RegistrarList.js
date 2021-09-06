import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { useUrlParamsUpdate } from '../../hooks/useUrlParamsUpdate';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { getRegistrarList } from './redux/RegistrarReduxActions';
import ViewTableDetails from '../../components/ViewDetails/ViewTableDetails';
import UploadFileModal from '../../components/UploadFileModal/UploadFileModal';

const RegistrarList = () => {
  const dispatch = useDispatch();

  const mobileHeaders = [
    { name: 'firstName', label: 'First Name', type: 'string' },
    { name: 'lastName', label: 'Last Name', type: 'string' },
  ];

  const [isRegistrarDetailModalOpen, setIsRegistrarDetailModalOpen] = useState(false);
  const [selectedRegistrarData, setSelectedRegistrarData] = useState({});

  const onCloseRegistrarDetailPopup = useCallback(() => {
    setIsRegistrarDetailModalOpen(false);
    setSelectedRegistrarData([]);
  }, [isRegistrarDetailModalOpen]);

  const { page: paramPage, limit: paramLimit } = useQueryParams();

  const { page, limit, pages, total, data, headers } = useSelector(
    ({ registrarReducer }) => registrarReducer?.registrarList ?? {},
  );

  const { isRegistrarListLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const getRegistrarListWithFilters = useCallback(
    async (params = {}) => {
      const param = {
        page: page || 1,
        limit: limit || 15,
        ...params,
      };
      await dispatch(getRegistrarList(param));
    },
    [page, limit],
  );

  const pageActionClick = useCallback(
    async newPage => {
      await getRegistrarListWithFilters({ page: newPage, limit });
    },
    [limit],
  );

  const onSelectLimit = useCallback(async newLimit => {
    await getRegistrarListWithFilters({ page: 1, limit: newLimit });
  }, []);

  const onSelectRegistrar = useCallback(selectedRegistrar => {
    setSelectedRegistrarData(selectedRegistrar);
    setIsRegistrarDetailModalOpen(true);
  }, []);

  useEffect(async () => {
    const params = {
      page: paramPage || page || 1,
      limit: paramLimit || limit || 15,
    };
    await getRegistrarListWithFilters(params);
  }, []);

  useUrlParamsUpdate(
    {
      page: page || 1,
      limit: limit || 15,
    },
    [page, limit],
  );
  const windowHeight = useWindowHeight();
  return (
    <div className="table-container">
      {!isRegistrarListLoader ? (
        <>
          <div className="page-header">
            <div className="page-header-name">Registrar List</div>
            <div className="page-header-button-container">
              <UploadFileModal module="REGISTRAR" />
            </div>
          </div>
          {data?.length > 0 ? (
            <>
              <div className="common-list-container" style={{ maxHeight: `${windowHeight - 236}px` }}>
                <Table
                  align="left"
                  valign="center"
                  tableClass="main-list-table"
                  data={data}
                  headers={headers}
                  mobileHeaders={mobileHeaders}
                  rowClass="cursor-pointer"
                  recordSelected={onSelectRegistrar}
                />
              </div>
              <Pagination
                className="common-list-pagination"
                total={total}
                pages={pages}
                page={page}
                limit={limit}
                pageActionClick={pageActionClick}
                onSelectLimit={onSelectLimit}
              />
            </>
          ) : (
            <div className="no-record-found">No record found</div>
          )}
        </>
      ) : (
        <Loader />
      )}
      {isRegistrarDetailModalOpen && (
        <ViewTableDetails
          heading="Registrar Detail"
          details={selectedRegistrarData}
          onCloseModal={onCloseRegistrarDetailPopup}
        />
      )}
    </div>
  );
};

export default RegistrarList;
