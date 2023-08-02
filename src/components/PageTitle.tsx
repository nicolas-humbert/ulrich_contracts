import "../styles/page-main-title.scss";

interface IPageTitleProps {
  text: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ text }) => {
  return <h1 className="page-main-title">{text}</h1>;
};

export default PageTitle;
