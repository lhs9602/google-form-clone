import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeType } from "../../redux/reducer/Reducer";
import { TypeSelectorProps } from "../../data/Type";
const TypeSelector = ({ value, id }: TypeSelectorProps) => {
  const dispatch = useDispatch();
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    dispatch(changeType({ id, type: event.target.value as string }));
  };
  return (
    <FormControl sx={{ minWidth: 208 }}>
      <Select value={value} onChange={handleTypeChange}>
        <MenuItem value={"text"}>단답형</MenuItem>
        <MenuItem value={"textarea"}>장문형</MenuItem>
        <MenuItem value={"radio"}>객관식 질문</MenuItem>
        <MenuItem value={"checkBox"}>체크박스</MenuItem>
        <MenuItem value={"dropDown"}>드롭다운</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelector;
