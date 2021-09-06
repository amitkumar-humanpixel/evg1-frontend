import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table/Table';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { useUrlParamsUpdate } from '../../hooks/useUrlParamsUpdate';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { getUserList } from './redux/UserReduxActions';
import ViewTableDetails from '../../components/ViewDetails/ViewTableDetails';
import UploadFileModal from '../../components/UploadFileModal/UploadFileModal';

const UserList = () => {
  const dispatch = useDispatch();
  const windowHeight = useWindowHeight();

  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});

  const onCloseUserDetailPopup = useCallback(() => {
    setIsUserDetailModalOpen(false);
    setSelectedUserData([]);
  }, [isUserDetailModalOpen]);

  const { page: paramPage, limit: paramLimit } = useQueryParams();

  const { page, limit, pages, total, data, headers } = useSelector(({ userReducer }) => userReducer?.userList ?? {});

  const { isUserListLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const getUserListWithFilters = useCallback(
    async (params = {}) => {
      const param = {
        page: page || 1,
        limit: limit || 15,
        ...params,
      };
      await dispatch(getUserList(param));
    },
    [page, limit],
  );

  const pageActionClick = useCallback(
    async newPage => {
      await getUserListWithFilters({ page: newPage, limit });
    },
    [limit],
  );

  const onSelectLimit = useCallback(async newLimit => {
    await getUserListWithFilters({ page: 1, limit: newLimit });
  }, []);

  const onSelectUser = useCallback(selectedUser => {
    setSelectedUserData(selectedUser);
    setIsUserDetailModalOpen(true);
  }, []);

  useEffect(async () => {
    const params = {
      page: paramPage || page || 1,
      limit: paramLimit || limit || 15,
    };
    await getUserListWithFilters(params);
  }, []);

  useUrlParamsUpdate(
    {
      page: page || 1,
      limit: limit || 15,
    },
    [page, limit],
  );

  const mobileHeaders = [
    { name: 'firstName', label: 'First Name', type: 'string' },
    { name: 'lastName', label: 'Last Name', type: 'string' },
  ];

  return (
    <div className="table-container">
      {!isUserListLoader ? (
        <>
          <div className="page-header">
            <div className="page-header-name">User List</div>
            <div className="page-header-button-container">
              <UploadFileModal module="USER" />
            </div>
          </div>
          {data?.length > 0 ? (
            <>
              <div className="common-list-container" style={{ maxHeight: `${windowHeight - 236}px` }}>
                <Table
                  align="left"
                  valign="center"
                  tableClass="main-list-table"
                  mobileHeaders={mobileHeaders}
                  data={data}
                  headers={headers}
                  rowClass="cursor-pointer"
                  recordSelected={onSelectUser}
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
      {isUserDetailModalOpen && (
        <ViewTableDetails heading="User Detail" details={selectedUserData} onCloseModal={onCloseUserDetailPopup} />
      )}
    </div>
  );
};

export default UserList;
