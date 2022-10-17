const ColorRadioIcon = (props : {checked: boolean, color: string}) => (
    <svg
        width="38px"
        height="38px"
        viewBox="0 0 24 24"
        fontSize="38px">
        <circle
            cx="50%"
            cy="50%"
            r="9px"
            fill={props.color}
        />
        <circle
            cx="50%"
            cy="50%"
            r="9px"
            stroke={props.checked ? "black" : "white"}
            strokeWidth="3px"
            fill="none"/>
    </svg>
);

export default ColorRadioIcon;