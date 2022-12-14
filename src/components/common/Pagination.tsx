import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination as MuiPagination } from '@mui/material';
import { styled } from '@mui/material';

import { accountsSelector } from '@src/store/accounts/accounts';
import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const Pagination = () => {
  const { totalPage } = useSelector(accountsSelector);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    // query string 가져옴 /xxx?query=1
    const path = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(path);

    const page = searchParams.get('page');
    setCurrentPage(page ? Number(page) : 1);
  }, [router]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    queryParams(router, QUERY_PARAM_KEYWORD.PAGE, page.toString(), {
      shallow: true,
    });
  };

  return (
    <S.Pagination
      page={currentPage}
      count={totalPage}
      onChange={handleChange}
    />
  );
};

export default Pagination;

const S = {
  Pagination: styled(MuiPagination)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  })),
};
