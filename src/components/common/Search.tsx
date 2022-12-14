import { useRef } from 'react';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';
import { styled } from '@mui/material';

import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const Search = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef.current) {
      queryParams(router, QUERY_PARAM_KEYWORD.Q, inputRef.current.value, {
        shallow: true,
      });
    }
  };

  return (
    <S.Wrap>
      <TextField
        size="small"
        fullWidth
        placeholder={placeholder}
        inputRef={inputRef}
        variant="outlined"
        onChange={handleChange}
      />
    </S.Wrap>
  );
};

export default Search;

const S = {
  Wrap: styled('div')(() => ({
    width: 350,
    marginLeft: 'auto',
  })),
};
