import { NavLink } from "react-router-dom";
import { AiOutlineFile } from "react-icons/ai";
import { CONTRACTS_LINK } from "../routes/links";
import { Contract } from "../types/Contract";

interface IContractRowProps {
  contract: Contract;
  className: string;
}

const ContractRow: React.FC<IContractRowProps> = ({ contract, className }) => {
  const {
    id,
    propositionNum,
    codeProduct,
    nameClient,
    telClient,
    emailClient,
    codeClient,
    payeurCode,
    namePayeur,
    surnamePayeur,
    telPayeur,
    creationDate,
    effectDate,
    expiryDate,
    nameRedac,
    codeAgent,
    status,
  } = contract;
  return (
    <tr className={className}>
      <td className="cell-centered">{propositionNum}</td>
      <td className="cell-centered">{codeProduct}</td>
      <td className="cell-centered">{codeClient}</td>
      <td>{nameClient}</td>
      {/* <td>{telClient}</td> */}
      {/* <td>{emailClient}</td> */}
      <td className="cell-centered">{payeurCode}</td>
      <td>{namePayeur}</td>
      {/* <td>{surnamePayeur}</td> */}
      {/* <td>{telPayeur}</td> */}
      <td className="cell-centered">{creationDate}</td>
      {/* <td>{effectDate}</td> */}
      {/* <td>{expiryDate}</td> */}
      <td className="cell-centered">{nameRedac}</td>
      {/* <td>{codeAgent}</td> */}
      <td className="cell-centered">{status}</td>

      <td className="cell-centered crud-icon">
        <NavLink to={`${CONTRACTS_LINK}/${id}`}>
          <AiOutlineFile />
        </NavLink>
      </td>
    </tr>
  );
};

export default ContractRow;
