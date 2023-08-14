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
  status?: number; // Needs to be changed to string with ulrich API
};

// API RESPONSE
// "id": 1,
// "propositionNum": 22261,
// "codeProduct": 3120,
// "nameClient": "M. AMOUHOUE YINNOUGBONO BRICE",
// "telClient": null,
// "emailClient": null,
// "codeClient": 1235847,
// "payeurCode": 1235847,
// "namePayeur": "AMOUHOUE",
// "surnamePayeur": null,
// "telPayeur": null,
// "creationDate": "2023-07-17",
// "effectDate": "2023-11-01",
// "expiryDate": "2033-11-01",
// "nameRedac": "MDJ",
// "codeAgent": 6095,
// "status": null
