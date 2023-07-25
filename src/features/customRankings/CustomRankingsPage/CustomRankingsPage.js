import "./CustomRankingsPage.scss";
import "../../../components/EditButton/EditButton.scss";
import Nav from "../../../components/Nav/Nav";
import Footer from "../../../components/Footer/Footer";
import CustomRankingsList from "../CustomRankingsList/CustomRankingsList";
import NewRankingsDialog from "../../../components/Dialogs/NewRankingsDialog/NewRankingsDialog";
import { useGetUserQuery } from "../../acount/accountSlice";
import {
  useGetUserCustomRankingsQuery,
  useCreateNewCustomRankingsMutation,
} from "../customRankingsApiSlice";
import { useState } from "react";
import { useGetCurrentRankingTemplatesQuery } from "../../rankings/rankingsApiSlice";
import { FaAngleRight } from "react-icons/fa";
import LoadingBlock from "../../../components/Loading/LoadingBlock/LoadingBlock";
import Helmet from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";

const CustomRankingsPage = () => {
  const [showNewRankingsDialog, setShowRankingsDialog] = useState(false);
  const [createNewCustomRankings] = useCreateNewCustomRankingsMutation();
  const email = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const createNewLineup = (title, template) => {
    if (email) {
      createNewCustomRankings({
        title: title,
        template: template,
      });
    } else {
      navigate(`/edit/${template}`);
    }
  };

  const {
    data: customRankings,
    isLoading: isRankingsLoading,
    isSuccess: isRankingsSuccess,
    isError: isRankingsError,
    error: rankingsError,
  } = useGetUserCustomRankingsQuery("6449a041b0bbf7e173737793");

  const {
    data: rankingsTemplates,
    isLoading: isTemplatesLoading,
    isSuccess: isTemplatesSuccess,
    isError: isTemplatesError,
    error: templatesError,
  } = useGetCurrentRankingTemplatesQuery();

  let rankingsContent;
  if (isRankingsLoading) {
    rankingsContent = <LoadingBlock />;
  } else if (isRankingsSuccess) {
    customRankings?.length
      ? (rankingsContent = <CustomRankingsList rankings={customRankings} />)
      : (rankingsContent = (
          <p>You have not created any custom rankings yet!</p>
        ));
  } else if (isRankingsError) {
    rankingsContent = (
      <p>
        Please{" "}
        <Link to="/login" className="login-link">
          login
        </Link>{" "}
        in to save your custom rankings.
      </p>
    );
  }

  let templatesContent;
  if (isTemplatesSuccess) {
    templatesContent = (
      <NewRankingsDialog
        open={showNewRankingsDialog}
        disableTitle={!email ? true : false}
        onClose={() => setShowRankingsDialog(false)}
        templates={rankingsTemplates}
        defaultTitle={`Custom Ranking ${
          customRankings ? customRankings.length + 1 : ""
        }`}
        onSubmit={createNewLineup}
      />
    );
  } else {
    templatesContent = null;
  }

  return (
    <div className="custom-rankings-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Custom Fantasy Rankings | Draftabl</title>
        <meta
          name="description"
          content="View and edit multiple custom rankings for your upcoming fantasy football 
        drafts with Draftabl's convenient and free drag-and-drop tiered ranking interface."
        />
      </Helmet>
      <Nav />
      {templatesContent}
      <main>
        <h1>Custom Rankings</h1>
        <p className="description">
          Create and customize your own tiered draft rankings.
        </p>
        <div className="rankings-options">
          <button
            className="edit-button"
            onClick={() => setShowRankingsDialog(true)}
          >
            Create Ranking <FaAngleRight className="new-icon" />
          </button>
        </div>
        {rankingsContent}
      </main>
      <Footer />
    </div>
  );
};

export default CustomRankingsPage;
