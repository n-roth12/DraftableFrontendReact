import "./CreateDraftPage.scss";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Helmet } from "react-helmet";
import { TextField, MenuItem, Select } from "@material-ui/core";

const CreateDraftPage = () => {
  const [selectedScoring, setSelectedScoring] = useState("Standard");
  const [scoring, setScoring] = useState(["Standard", "Half-PPR", "PPR"]);

  const handleChangeScoring = (e) => setSelectedScoring(e.target.value);

  return (
    <div className="create-draft-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Draft | Draftabl</title>
        <meta
          name="description"
          content="Start a mock draft with your custom rankings."
        />
      </Helmet>
      <Nav />
      <main>
        <div className="create-draft-page-inner">
          <h1>Create Draft</h1>
          <TextField
            variant="outlined"
            value={selectedScoring}
            onChange={handleChangeScoring}
            select
            size="small"
            style={{ fontSize: "0.8rem", backgroundColor: "white" }}
          >
            {scoring.map((score) => (
              <MenuItem
                key={score}
                value={selectedScoring}
                style={{backgroundColor: "white" }}
              >
                {score}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateDraftPage;
