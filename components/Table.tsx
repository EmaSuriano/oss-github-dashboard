import React, { FC, ReactNode, useMemo } from 'react';

import {
  useTable,
  useSortBy,
  TableOptions,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  Column,
} from 'react-table';
import { Project } from '../helpers/types';
import styled from 'styled-components';
import {
  Box,
  StyledOcticon,
  Spinner,
  Link,
  Avatar,
  Truncate,
} from '@primer/react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { UseQueryResult } from 'react-query';

type Props = {
  query: UseQueryResult<Project[], unknown>;
};

const CenteredCell = ({
  value = null,
  children,
}: {
  value?: any;
  children: ReactNode;
}) => (
  <Box display="flex" justifyContent="center">
    {value !== null ? value : children}
  </Box>
);

const TableRow = styled(Box).attrs({
  as: 'tr',
  p: 3,
  display: 'flex',
})<{
  header?: boolean;
}>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  cursor: pointer;
`;

const LoadingRow = () => (
  <TableRow>
    <TableItem>
      <Spinner />
    </TableItem>
  </TableRow>
);

const TableItem = styled(Box)`
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
`;

const columns: Column<Project>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ value, row }) => (
      <Truncate title={value} maxWidth={180}>
        <Link href={row.original.url} target="_blank">
          {value}
        </Link>
      </Truncate>
    ),
  },
  {
    Header: 'Issues',
    accessor: (row) => row.issues.totalCount,
    Cell: CenteredCell,
  },
  {
    Header: 'Vulnerabilities',
    accessor: (row) => row.vulnerabilityAlerts.totalCount,
    Cell: CenteredCell,
  },
  {
    Header: 'Pulls',
    accessor: (row) => row.pullRequests.totalCount,
    Cell: CenteredCell,
  },
  {
    Header: 'Status',
    accessor: 'url',
    Cell: ({ value }) => {
      return (
        <CenteredCell>
          <img
            src={`${value}/actions/workflows/master.yml/badge.svg`}
            alt="Build"
          />
        </CenteredCell>
      );
    },
  },
];

export const Table = ({ query }: Props) => {
  const data = useMemo(() => {
    switch (query.status) {
      case 'success':
        return query.data;

      default:
        return [];
    }
  }, [query.status, query.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      data,
      columns,
      manualPagination: true, // Tell the usePagination
    },
    useSortBy,
    usePagination,
  );

  console.log(data);

  return (
    <Box
      as="table"
      minWidth={1000}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.primary"
      borderRadius={2}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} header {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, j) => (
              <TableItem
                as="th"
                key={j}
                sorted={column.isSorted}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                {column.isSorted ? (
                  <StyledOcticon
                    icon={column.isSortedDesc ? ChevronDownIcon : ChevronUpIcon}
                  />
                ) : (
                  <Box ml={2} as="span" />
                )}
              </TableItem>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {query.status === 'success' ? (
          page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <TableItem as="td" key={j} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableItem>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <LoadingRow />
        )}
      </tbody>
    </Box>
  );
};
