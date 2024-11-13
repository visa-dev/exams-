import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import SubjectTable from '../../components/Tables/ProperSubject';
import Buttons from '../UiElements/Buttons';

const ProperForm = () => {
  return (
    <>
      <Breadcrumb pageName="Proper Application" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <SubjectTable />
        <div className="relative">
          <Link
            to="#"
            className="absolute top-0 right-15 inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.285 5.707a1 1 0 0 0-1.414-1.414L9 14.164 5.129 10.293a1 1 0 1 0-1.414 1.414l4.707 4.707a1 1 0 0 0 1.414 0L20.285 5.707z"
                  fill="currentColor"
                />
              </svg>
            </span>
            SUBMIT
          </Link>
        </div>

      </div>
    </>
  );
};

export default ProperForm;
