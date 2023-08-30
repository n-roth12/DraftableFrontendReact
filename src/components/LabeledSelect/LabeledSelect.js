import "./LabeledSelect.scss";
import { MenuItem, TextField } from "@mui/material";

const LabeledSelect = ({
  labelValue,
  selectOptions,
  selectedOption,
  handleChange,
  valueAttr,
  textAttr,
  keyAttr,
  extraClassName,
}) => {
  return (
    <div className={`labeled-select ${extraClassName ? extraClassName : ""}`}>
      <label>{labelValue}</label>
      <TextField
        className="labeled-select-input"
        select
        value={selectedOption}
        size="small"
        onChange={handleChange}
      >
        {selectOptions?.length &&
          selectOptions.map((option) => (
            <MenuItem
              key={keyAttr ? option[keyAttr] : option}
              value={valueAttr ? option[valueAttr] : option}
            >
              {textAttr ? option[textAttr] : option}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
};

export default LabeledSelect;
