import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { getDashboardList, getDashboardTabs } from './redux/DashboardReduxAction';
import { useUrlParamsUpdate } from '../../hooks/useUrlParamsUpdate';
import { useQueryParams } from '../../hooks/GetQueryParamHook';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import Tab from '../../components/Tab/Tab';
import Table from '../../components/Table/Table';
import { changeAccreditionIdAndFacilityIdForAccreditionRedirection } from '../Accredited/redux/AccreditedReduxActions';
import { startGeneralLoaderOnRequest } from '../../components/GeneralLoader/redux/GeneralLoaderAction';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const windowHeight = useWindowHeight();
  const USER_ID = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails?.userId ?? undefined);

  const { page: paramPage, limit: paramLimit } = useQueryParams();

  const [tabs, setTabs] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});
  const { page, limit, pages, total, data, headers } = useSelector(({ dashboard }) => dashboard?.dashboard ?? {});

  const { isDashboardLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const mobileHeaders = [
    { name: 'practiceName', label: 'Practice Name', type: 'string' },
    { name: 'formType', label: 'Form Type', type: 'tag' },
  ];

  const getDashboardListWithFilters = useCallback(
    async (params = {}) => {
      const param = {
        userId: USER_ID ?? params?.userId,
        page: page || params?.page || 1,
        limit: limit || params?.limit || 15,
        status: tabs?.[activeTab]?.value ?? tabs?.[0]?.value,
        ...params,
      };
      await dispatch(getDashboardList(param));
    },
    [page, limit, activeTab, tabs, USER_ID],
  );

  const pageActionClick = useCallback(
    async newPage => {
      await getDashboardListWithFilters({ page: newPage, limit });
    },
    [limit, getDashboardListWithFilters],
  );

  const onSelectLimit = useCallback(
    async newLimit => {
      await getDashboardListWithFilters({ page: 1, limit: newLimit });
    },
    [getDashboardListWithFilters],
  );

  const onSelectRecord = useCallback(
    selectedUser => {
      if (selectedUser?.facilityId && USER_ID !== undefined)
        dispatch(
          changeAccreditionIdAndFacilityIdForAccreditionRedirection(
            selectedUser?.facilityId,
            USER_ID,
            selectedUser?.accreditionId,
          ),
        );
      if (['Practice_Manager', 'Principal_Supervisor'].includes(role) && selectedUser?.formType === 'formB') {
        history.push('/accredited/reaccreditationChecklist');
      } else if (selectedUser?.formType) history.push(`/accredited/${selectedUser?.formType}`);
    },
    [USER_ID, role],
  );

  const onClickTab = useCallback(
    async index => {
      setActiveTab(index);
      await getDashboardListWithFilters({ status: tabs?.[index]?.value, page: 1, limit: 15 });
    },
    [tabs, getDashboardListWithFilters],
  );

  const getTabs = useCallback(
    async userId => {
      const paramsForTabs = { userId };
      const response = await dispatch(getDashboardTabs(paramsForTabs));
      const finalTabs = response?.map(e => ({ name: _.capitalize(e?._id), value: e?._id }));
      if (!['Accreditation_Support_Coordinator', 'Super_Admin'].includes(role)) {
        finalTabs?.filter(e => e?.value !== 'COMPLETE');
      }
      setTabs(finalTabs);
      if (finalTabs?.length > 0) {
        const params = {
          userId,
          page: paramPage || page || 1,
          limit: paramLimit || limit || 15,
          status: tabs?.[activeTab]?.value ?? finalTabs?.[0]?.value,
        };
        await getDashboardListWithFilters(params);
      }
    },
    [role, getDashboardListWithFilters],
  );

  useEffect(() => {
    if (USER_ID !== undefined) {
      startGeneralLoaderOnRequest('isDashboardLoader');
      // waiting for localstorage to set userId for api interceptor
      setTimeout(async () => {
        await getTabs(USER_ID);
      }, 500);
    }
  }, [USER_ID]);

  useUrlParamsUpdate(
    {
      page,
      limit,
      status: tabs?.[activeTab]?.value,
    },
    [page, limit, tabs, activeTab],
  );

  return (
    <div className="table-container">
      {tabs?.length > 0 && <Tab tabs={tabs?.map(tab => tab.name)} tabActive={onClickTab} activeTabIndex={activeTab} />}
      {!isDashboardLoader ? (
        <>
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
                  recordSelected={onSelectRecord}
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
    </div>
  );
};

export default Dashboard;
