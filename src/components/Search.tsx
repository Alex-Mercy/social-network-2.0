import { AccountCircle } from '@mui/icons-material'
import { Box, InputAdornment, TextField } from '@mui/material'
import React, { FC, useState } from 'react'

type SearchProps = {
    label: string;
}

const Search: FC<SearchProps> = ({label}) => {
    

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchValue(e.target.value)
    // }

  return (
    <TextField id="search" label={label}  variant="outlined" />
  )
}

export default Search