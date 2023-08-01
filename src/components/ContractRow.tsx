import { NavLink } from "react-router-dom";
import { Contract } from "../types/Contract";
import { AiOutlineFile } from "react-icons/ai";
import { CONTRACTS_LINK } from "../routes/links";

interface IContractRowProps {
  contract: Contract;
  className: string;
}

const ContractRow: React.FC<IContractRowProps> = ({ contract, className }) => {
  const {
    proposition_num,
    code_product,
    client_code,
    payeur_code,
    name_client,
    name_payeur,
    code_agent,
    name_redac,
    officeid_bur_dir,
    contract_statusid_c_status,
    contracts_typeid_contract_type,
  } = contract;
  return (
    <tr className={className}>
      <td className="cell-centered">{proposition_num}</td>
      <td className="cell-centered">{code_product}</td>
      <td className="cell-centered">{client_code}</td>
      <td className="cell-centered">{payeur_code}</td>
      <td>{name_client}</td>
      <td>{name_payeur}</td>
      {/* <td>{creation_date}</td> */}
      {/* <td>{effect_date}</td> */}
      {/* <td>{expiry_date}</td> */}
      <td className="cell-centered">{code_agent}</td>
      <td>{name_redac}</td>
      <td className="cell-centered">{officeid_bur_dir}</td>
      <td className="cell-centered">{contract_statusid_c_status}</td>
      <td className="cell-centered">{contracts_typeid_contract_type}</td>
      {/* <td>{agentsid_agent}</td> */}

      {/* To ContractDetail button */}
      <td className="cell-centered crud-icon">
        <NavLink to={`${CONTRACTS_LINK}/${proposition_num}`}>
          <AiOutlineFile />
        </NavLink>
      </td>
    </tr>
  );
};

export default ContractRow;
