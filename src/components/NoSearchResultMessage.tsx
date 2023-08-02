import "../styles/no-search-result-message.scss";

interface INoSearchResultMessageProps {
  text: string;
}

const NoSearchResultMessage: React.FC<INoSearchResultMessageProps> = ({
  text,
}) => {
  return <p className="no-search-result-message">{text}</p>;
};

export default NoSearchResultMessage;
