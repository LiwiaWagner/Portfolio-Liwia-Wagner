import Select from "react-select";

export function MultiSelect(props) {
  const options = props.options;
  const onChange = props.onChange;

  return (
    <Select
      options={options}
      isMulti={true}
      onChange={onChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: "0.6rem",
      })}
      classNamePrefix="custom-select"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "rgba(128, 128, 128, 0.1)",
          borderColor: state.isFocused ? "#999999" : "rgba(153, 153, 153, 0.2)",
          color: "black",
          fontFamily: "Manrope, serif",
          fontSize: "0.9rem",
          boxShadow: state.isFocused ? "0 0 0 1px #999999" : "none",
          "&:hover": {
            borderColor: "#999999",
          },
          // minHeight: "30px",
          // height: "30px",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "transparent",
          backdropFilter: "blur(15px)",
          borderRadius: "0.6rem",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "rgba(0, 0, 0, 0.3)"
            : state.isFocused
            ? "rgba(0, 0, 0, 0.1)"
            : "transparent",
          borderRadius: "0.5rem",
        }),
        // indicatorsContainer: (base, state) => ({
        //   ...base,
        //   height: "30px",
        // }),
      }}
    />
  );
}
