import Breadcrumb from '../../components/Breadcrumb';
import SubjectTable from '../../components/Tables/Subject';


const ProperForm = () => {
  return (
    <>
      <Breadcrumb pageName="Proper Application" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <SubjectTable />

        <div className="mb-5">
          <input
            type="submit"
            value="Next"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>


      </div>
    </>
  );
};

export default ProperForm;
