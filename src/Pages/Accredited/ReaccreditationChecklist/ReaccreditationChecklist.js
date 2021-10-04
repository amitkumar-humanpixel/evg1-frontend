import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useQueryParams } from '../../../hooks/GetQueryParamHook';
import { getReAccreditedCheckList } from '../redux/AccreditedReduxActions';

const ReaccreditationChecklist = () => {
  const { id } = useQueryParams();
  const dispatch = useDispatch();

  const { facilityName } = useSelector(({ accreditedReducer }) => accreditedReducer?.postDetails ?? {});

  useEffect(() => {
    if (id) dispatch(getReAccreditedCheckList(id));
  }, [id]);

  return (
    <>
      <section>
        <div className="accredited-title mb-10">Reaccreditation Application – {facilityName}</div>
        <div className="common-white-container">
          <div className="standard-texts">
            <p>
              Supervisors and practice managers are referred to the most recent EV Training Post Handbook for guidance
              on current standards for teaching and supervision plus administrative requirements. If not already
              received The Training post handbook is available in electronic form from the Accreditation Support
              Administrator at EVGPT. Handbooks and Quick Guides are also available from the EV website at{' '}
              <a href="https://www.evgptraining.com.au/resources/" target="_blank" rel="noreferrer">
                https://www.evgptraining.com.au/resources/
              </a>
              .
            </p>

            <p>
              Please see instructions below about your reaccreditation application and the documents and information you
              will need to complete it.
            </p>
            <ol>
              <li>
                Documents below will need to be available to electronically attach when submitting the application and
                actions below will need to be completed. There will be a separate checkbox at the end of this document
                that you can fill in to tick the completion off – but this is here to help you prepare.
              </li>
              <li>
                First section (now called Practice Manager Information) to be completed by the Practice Manager. This
                includes information about your working days, the operating hours of the practice, the facility
                accreditation (by AGPAL or QPA or other), some statements about the facility and some basic information
                relating to each supervisor. This includes rostered hours for each supervisor and registrar.
              </li>
              <li>
                Please note that all information on the following pages must be completed for you to submit the
                application, but you can proceed through the form to the next section by pressing Save to retain your
                answers so far and then Next at the bottom right hand of the page.
              </li>
              <li>
                When Practice Manager’s section is submitted, a separate declaration called Supervisor Information is
                sent to each named supervisor. This applies only to currently accredited supervisors seeking
                reaccreditation. New supervisors apply separately.
              </li>
              <li>
                Each supervisor must fill in their declaration and answer the necessary declarations and submit. When
                these have all been completed by each reaccrediting supervisor, the Practice Manager and/or Principal
                Educational Supervisor will be able to complete the Final Application Submission.
              </li>
              <li>
                The Final Application Submission has the checklist to assist identifying completion of each section and
                also provides the practice response to any previous recommendations that have been provided to the
                practice. This may have been at the initial accreditation of the practice, a reaccreditation, or a
                review visit. These will be incorporated into the application in future iterations, but for now, have
                been provided to the practice manager and/or principal supervisor directly by email.
              </li>
            </ol>
            <p>Things you will need to submit your application</p>
            <ol>
              <li>
                All answers in each section should be completed by the appropriate named user and submission by that
                user indicates that the information is true and correct – so is deemed to be a signed declaration.
              </li>
              <li>
                A copy of a current accreditation certificate (AGPAL, QPA or other). This is not required for ACRRM only
                accreditation (Rural).
              </li>
              <li>A copy of an employment contract template used for registrars</li>
              <li>A copy of a registrar specific orientation checklist as used by the practice</li>
              <li>Where supervisors have hospital clinical privileges, a letter confirming this is required.</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReaccreditationChecklist;
