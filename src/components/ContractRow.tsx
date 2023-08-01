import { Contract } from "../types/Contract";

const ContractRow = (
  {
    proposition_num,
    code_product,
    client_code,
    payeur_code,
    name_client,
    name_payeur,
    creation_date,
    effect_date,
    expiry_date,
    code_agent,
    name_redac,
    officeid_bur_dir,
    contract_statusid_c_status,
    contracts_typeid_contract_type,
    agentsid_agent,
  }: Contract,
  key: number
) => {
  return (
    <tr key={key}>
      <td>{proposition_num}</td>
      <td>{code_product}</td>
      <td>{client_code}</td>
      <td>{payeur_code}</td>
      <td>{name_client}</td>
      <td>{name_payeur}</td>
      <td>{creation_date}</td>
      <td>{effect_date}</td>
      <td>{expiry_date}</td>
      <td>{code_agent}</td>
      <td>{name_redac}</td>
      <td>{officeid_bur_dir}</td>
      <td>{contract_statusid_c_status}</td>
      <td>{contracts_typeid_contract_type}</td>
      <td>{agentsid_agent}</td>
    </tr>
  );
};

export default ContractRow;
