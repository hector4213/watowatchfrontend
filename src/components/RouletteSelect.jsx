import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'

const RouletteSelect = ({ label, value, handleListChange, lists }) => {
  return (
    <FormControl variant='outlined' style={{ width: '300px' }}>
      <InputLabel id='list-select-label'>Select list</InputLabel>
      <Select
        labelId='list-select-label'
        id='list-select'
        value={value}
        label='Select list'
        onChange={handleListChange}
      >
        {lists.map((list) => (
          <MenuItem key={list.title} value={list}>
            {list.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default RouletteSelect
