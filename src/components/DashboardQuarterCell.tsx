import React from "react";
import { IconType } from "react-icons";
import "../styles/dashboard-cells.scss";
import { TbDots } from "react-icons/tb";

type Props = {
  title: string;
  value: number;
  icon?: IconType;
  isCurrency?: boolean;
  currency?: "EUR" | "USD" | "XOF";
  color: "green" | "pink" | "light" | "yellow" | "orange";
  // vals #c2fcc1, #fcdfff, #fefefe, #f4fe9b, #fddbcf;
};

const DashboardQuarterCell = ({
  title,
  value,
  icon,
  isCurrency = false,
  currency = "XOF",
  color = "pink",
}: Props) => {
  const formatValueNumber = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
  }).format(value);

  function defineBgColor() {
    const styles: React.CSSProperties = {};
    switch (color) {
      case "green":
        styles.backgroundColor = "#c2fcc1";
        break;
      case "pink":
        styles.backgroundColor = "#fcdfff";
        break;
      case "light":
        styles.backgroundColor = "#fefefe";
        break;
      case "yellow":
        styles.backgroundColor = "#f4fe9b";
        break;
      case "orange":
        styles.backgroundColor = "#fddbcf";
        break;
    }

    return styles;
  }

  return (
    <div className="dashboard-cell" style={defineBgColor()}>
      <div className="dc-icon">
        <span>{icon && React.createElement(icon)}</span>
        <span className="dc-dots">
          <TbDots />
        </span>
      </div>
      <div className="dc-value">{isCurrency ? formatValueNumber : value}</div>
      <div className="dc-title">{title}</div>
    </div>
  );
};

export default DashboardQuarterCell;
