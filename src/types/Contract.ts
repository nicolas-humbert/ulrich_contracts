export type Contract = {
  id?: number;
  propositionNum?: number;
  codeProduct?: number;
  nameClient?: string;
  telClient?: string;
  emailClient?: string;
  codeClient?: string;
  payeurCode?: number;
  namePayeur?: string;
  surnamePayeur?: string;
  telPayeur?: string;
  creationDate?: string;
  effectDate?: string;
  expiryDate?: string;
  nameRedac?: string;
  codeAgent?: number;
  status?: string;
  type?: number;
};

export type ContractType = {
  typeName: string;
  statuses: string[];
};
