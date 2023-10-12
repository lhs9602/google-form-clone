import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeType } from "../../redux/reducer/Reducer";
import { TypeSelectorProps } from "../../data/Type";
import { menuItems } from "../../data/SurveyData";

export const TypeSelector = ({ value, id }: TypeSelectorProps) => {
  const dispatch = useDispatch();
  //질문 타입 변경
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    dispatch(changeType({ id, type: event.target.value as string }));
  };

  return (
    <FormControl sx={{ minWidth: 208 }}>
      {/* 드롭다운으로 질문 타입 선택 */}
      <Select value={value} onChange={handleTypeChange}>
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
