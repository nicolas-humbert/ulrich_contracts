import { useAppSelector } from "../store/store";
import { Contract } from "../types/Contract";
import ContractRow from "./ContractRow";

const ReduxList = () => {
  const selector = useAppSelector((state) => state.contracts.contracts);

  return (
    <table>
      <tbody>
        {selector &&
          selector.map((c: Contract, id: number) => {
            return (
              <ContractRow
                contract={c}
                className={id % 2 == 0 ? "evenRow" : "oddRow"}
                key={id}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default ReduxList;
