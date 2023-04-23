import './Search.scss'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';

const Search = () => {
  const [searchVal, setSearchVal] = useState('')

  return (
    <div className='search'>
      <TextField
        placeholder="Search"
        size='small'
        InputProps={{
          startAdornment: <InputAdornment position="end"><FaSearch /></InputAdornment>
        }}
      />
    </div>
  )
}

export default Search