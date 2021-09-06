import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { getFacilityList } from './redux/FacilityReduxActions';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { useUrlParamsUpdate } from '../../hooks/useUrlParamsUpdate';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import ViewTableDetails from '../../components/ViewDetails/ViewTableDetails';
import UploadFileModal from '../../components/UploadFileModal/UploadFileModal';
import { useWindowHeight } from '../../hooks/useWindowHeight';

const FacilityList = () => {
  const dispatch = useDispatch();

  const [isFacilityDetailModalOpen, setIsFacilityDetailModalOpen] = useState(false);
  const [selectedFacilityData, setSelectedFacilityData] = useState({});
  const windowHeight = useWindowHeight();
  const onCloseFacilityDetailPopup = useCallback(() => {
    setIsFacilityDetailModalOpen(false);
    setSelectedFacilityData([]);
  }, [isFacilityDetailModalOpen]);

  const { page: paramPage, limit: paramLimit } = useQueryParams();

  const { page, limit, pages, total, data, headers } = useSelector(
    ({ facilityReducer }) => facilityReducer?.facilityList ?? {},
  );

  const { isFacilityListLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const getFacilityListWithFilters = useCallback(
    async (params = {}) => {
      const param = {
        page: page || 1,
        limit: limit || 15,
        ...params,
      };
      await dispatch(getFacilityList(param));
    },
    [page, limit],
  );

  const pageActionClick = useCallback(
    async newPage => {
      await getFacilityListWithFilters({ page: newPage, limit });
    },
    [limit],
  );

  const onSelectLimit = useCallback(async newLimit => {
    await getFacilityListWithFilters({ page: 1, limit: newLimit });
  }, []);

  const onSelectFacility = useCallback(selectedFacility => {
    setSelectedFacilityData(selectedFacility);
    setIsFacilityDetailModalOpen(true);
  }, []);

  useEffect(async () => {
    const params = {
      page: paramPage || page || 1,
      limit: paramLimit || limit || 15,
    };
    await getFacilityListWithFilters(params);
  }, []);

  useUrlParamsUpdate(
    {
      page: page || 1,
      limit: limit || 15,
    },
    [page, limit],
  );

  const mobileHeaders = [
    {
      label: 'Facility Id',
      name: 'facilityId',
      type: 'string',
    },
    {
      label: 'Practice Name',
      name: 'practiceName',
      type: 'string',
    },
  ];

  return (
    <div className="table-container">
      {!isFacilityListLoader ? (
        <>
          <div className="page-header">
            <div className="page-header-name">Facility List</div>
            <div className="page-header-button-container">
              <UploadFileModal module="FACILITY" />
              <UploadFileModal module="FACILITY_STAFF" />
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
                  mobileHeaders={mobileHeaders}
                  headers={headers}
                  rowClass="cursor-pointer"
                  recordSelected={onSelectFacility}
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
      {isFacilityDetailModalOpen && (
        <ViewTableDetails
          heading="Facility Detail"
          details={selectedFacilityData}
          onCloseModal={onCloseFacilityDetailPopup}
          fromModule="facility"
        />
      )}
    </div>
  );
};

export default FacilityList;
