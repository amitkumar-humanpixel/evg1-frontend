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

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const windowHeight = useWindowHeight();

  const USER_ID = localStorage.getItem('userDetails');

  const { role } = useSelector(({ loginReducer }) => loginReducer?.loggedUserDetails ?? {});

  const [tabs, setTabs] = useState([]);

  const [activeTab, setActiveTab] = useState(0);
  const { page: paramPage, limit: paramLimit } = useQueryParams();
  const { page, limit, pages, total, data, headers } = useSelector(({ dashboard }) => dashboard?.dashboard ?? {});

  const { isDashboardLoader } = useSelector(({ generalLoaderReducer }) => generalLoaderReducer ?? false);

  const getDashboardListWithFilters = useCallback(
    async (params = {}) => {
      const param = {
        userId: USER_ID ?? params?.userId,
        page: page ?? params?.page ?? 1,
        limit: limit ?? params?.limit ?? 15,
        status: tabs?.[activeTab]?.value ?? params?.status ?? tabs?.[0]?.value,
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
    [limit],
  );

  const onSelectLimit = useCallback(async newLimit => {
    await getDashboardListWithFilters({ page: 1, limit: newLimit });
  }, []);

  const onSelectRecord = useCallback(
    selectedUser => {
      if (selectedUser?.facilityId && (USER_ID !== null || true))
        dispatch(
          changeAccreditionIdAndFacilityIdForAccreditionRedirection(
            selectedUser?.facilityId,
            USER_ID,
            selectedUser?.accreditionId,
          ),
        );
      if (selectedUser?.formType) history.push(`/accredited/${selectedUser?.formType}`);
    },
    [USER_ID],
  );

  const onClickTab = useCallback(
    async index => {
      setActiveTab(index);
      await getDashboardListWithFilters({ status: tabs?.[index]?.value });
    },
    [tabs, getDashboardListWithFilters],
  );

  const mobileHeaders = [
    { name: 'practiceName', label: 'Practice Name', type: 'string' },
    { name: 'formType', label: 'Form Type', type: 'tag' },
  ];

  // useEffect(async () => {
  //   const params = {
  //     userId: USER_ID,
  //     page: paramPage ?? page ?? 1,
  //     limit: paramLimit ?? limit ?? 15,
  //     status: FINAL_TABS?.[activeTab]?.value ?? FINAL_TABS[0].value,
  //   };
  //   if (USER_ID) {
  //     await getDashboardListWithFilters(params);
  //   }
  // }, [USER_ID]);

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
          page: paramPage ?? page ?? 1,
          limit: paramLimit ?? limit ?? 15,
          status: tabs?.[activeTab]?.value ?? finalTabs?.[0]?.value,
        };
        await getDashboardListWithFilters(params);
      }
    },
    [role],
  );

  useEffect(() => {
    if (USER_ID !== null || undefined) {
      getTabs(USER_ID);
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
