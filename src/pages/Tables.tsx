import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/Subject';
import TableTwo from '../components/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
